from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
import requests
import json
from dotenv import load_dotenv
import os
from question_bank import question_bank
from gemini import generate_text
from database.conn import get_db
from typing import List, Dict
from datetime import datetime
from openai import chat_with_gpt4o

from database.models import Conversation,Message


load_dotenv()
API_KEY = os.getenv("GENAI_API_KEY")
BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

router = APIRouter()

class StartConversationRequest(BaseModel):
    employee_name: str
    employee_id: str
    shap: List[str]

class MessageRequest(BaseModel):
    employee_name: str
    employee_id:str
    shap: List[str]
    message: str
    conversation_id:int
    selected_questions:List[str]
    already_asked:List[str]

class PromptRequest(BaseModel):
    prompt: str


@router.post("/start")
async def start_conversation(request: StartConversationRequest, db: Session = Depends(get_db)):
    greeting_prompt = f"Generate a greeting message for {request.employee_name} and ask his/her vibe of today."
    greeting_message = generate_text(greeting_prompt)
    gemini_message = Message(
        content=greeting_message,
        sender_type="chatbot"
    )
    db.add(gemini_message)
    db.commit()
    db.refresh(gemini_message)

    # Pre-select the questions based on `shap` topics
    selected_questions = []
    for topic in request.shap:
        if topic in question_bank:
            selected_questions.extend(question_bank[topic])

    if not selected_questions:
        raise HTTPException(status_code=400, detail="No valid questions found for the given SHAP topics")
    
    new_conversation = Conversation(
        employee_id=request.employee_id,
        employee_name=request.employee_name,
        message_ids=[gemini_message.id]  # Store the message ID
    )
    db.add(new_conversation)
    db.commit()
    db.refresh(new_conversation)
    return {"chatbot_response":greeting_message , "conversation_id":new_conversation.id ,"selected_questions":selected_questions}   # Send the conversation id along with the message



@router.post("/message")
async def send_message(request: MessageRequest, db: Session = Depends(get_db)):
    """
    Accepts employee message, generates chatbot response, and appends both
    message IDs to the existing conversation using `conversation_id`.
    """
    try:
        # Retrieve existing conversation using `conversation_id`
        conversation = db.query(Conversation).filter_by(id=request.conversation_id).first()

        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")

        # Store the employee's message in `Message` table
        employee_message = Message(
            content=request.message,
            sender_type="employee"
        )
        db.add(employee_message)
        db.commit()
        db.refresh(employee_message)

        # Retrieve the pre-selected questions
        questions = request.selected_questions
        if not questions:
            raise HTTPException(status_code=404, detail="No pre-selected questions found")
        
        already_asked=request.already_asked
        already_asked_text = "\n".join([f"- {q}" for q in already_asked])

        # Construct the AI prompt
        question_text = "\n".join([f"- {q}" for q in questions])


        # Generate AI's response
        ai_prompt = (
    f"The employee's response is: {request.message}. "
    f"Based on this response, ask **ONLY ONE follow-up question** strictly from the question bank provided below. "
    f"- **Your response must be in a single sentence only.** "
    f"- **Do not include explanations, lists, or multiple questions.** "
    f"- **Do not repeat any questions from the list of previously asked questions.**\n\n"
    f"List of previously asked questions: {already_asked}\n"
    f"Question bank:\n{question_text}\n"        )

        generated_message = generate_text(request.message)

        # Store the AI response in `Message` table
        chatbot_message = Message(
            content=generated_message,
            sender_type="chatbot"
        )
        db.add(chatbot_message)
        db.commit()
        db.refresh(chatbot_message)

        # Append both message IDs to the existing conversation
        conversation.message_ids.append(employee_message.id)
        conversation.message_ids.append(chatbot_message.id)
        db.commit()

        # Append the new question and update the list
        already_asked.append(generated_message)
        return {
            "ai_prompt":ai_prompt,
            "chatbot_response": generated_message,
            "conversation_id": conversation.id,
            "already_asked":already_asked
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.post("/test")
def generate(request: PromptRequest):
    try:
        response = generate_text(request.prompt)
        return {"response": response}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")   
