# app/routes/report.py

from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session
from jinja2 import Environment, FileSystemLoader
from xhtml2pdf import pisa
from io import BytesIO
from datetime import datetime
from pydantic import BaseModel
from typing import Dict
from database.conn import get_db
from database.models import Conversation, Message

router = APIRouter()

# Pydantic model for request payload with employee_id
class ReportRequest(BaseModel):
    conversation_id: int
    employee_id: str  # Added employee_id field
    shap_values: Dict[str, float]  # SHAP values as a dict of feature: contribution pairs

@router.post("/report")
def generate_report(request: ReportRequest, db: Session = Depends(get_db)):
    # Retrieve conversation record by conversation_id
    conversation = db.query(Conversation).filter(Conversation.id == request.conversation_id).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if not conversation.message_ids:
        raise HTTPException(status_code=404, detail="No messages found for this conversation")
    
    # Retrieve and sort messages
    messages = db.query(Message).filter(Message.id.in_(conversation.message_ids)).all()
    messages.sort(key=lambda m: m.id)
    
    # Build conversation history
    conversation_history = [
        {"role": "Chatbot" if msg.sender_type.lower() == "assistant" else "Employee", "content": msg.content}
        for msg in messages
    ]
    
    # Use SHAP values and employee_id from the request
    shap_dict = request.shap_values

    # Prepare report data
    report_data = {
        "logo_url": "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",  # Replace with your company logo URL
        "employee_name": conversation.employee_name,  # Still fetched from DB
        "employee_id": request.employee_id,  # Use employee_id from request instead of DB
        "date": conversation.date.strftime("%Y-%m-%d") if conversation.date else datetime.now().strftime("%Y-%m-%d"),
        "time": conversation.time.strftime("%H:%M:%S") if conversation.time else datetime.now().strftime("%H:%M:%S"),
        "executive_summary": (
            "This report summarizes the employee’s conversation with the chatbot, highlighting key factors "
            "affecting their well-being based on provided SHAP values and sentiment analysis."
        ),
        "conversation_history": conversation_history,
        "shap_values": shap_dict,  # From request
        "sentiment": "Neutral",  # Replace with actual sentiment analysis if added later
        "sentiment_commentary": "The employee’s responses indicate a balanced mood with areas for exploration.",
        "detailed_insights": (
            "Recommendations: Schedule a follow-up to address potential concerns identified in the conversation."
        )
    }
    
    # Render the HTML template using Jinja2
    env = Environment(loader=FileSystemLoader("templates"))
    template = env.get_template("report_template.html")
    html_content = template.render(report_data=report_data)
    
    # Generate PDF with xhtml2pdf
    pdf_file = BytesIO()
    pisa_status = pisa.CreatePDF(html_content, dest=pdf_file)
    
    if pisa_status.err:
        raise HTTPException(status_code=500, detail="Error generating PDF with xhtml2pdf")
    
    pdf_bytes = pdf_file.getvalue()
    pdf_file.close()
    
    filename = f"report_{request.employee_id}_{request.conversation_id}.pdf"
    headers = {
        "Content-Disposition": f"attachment; filename={filename}"
    }
    
    return Response(content=pdf_bytes, media_type="application/pdf", headers=headers)