from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
# from app.services.csv_ingestion import ingest_csv_data

# router = APIRouter()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.post("/ingest")
# async def ingest_data(
#     table: str = "employee",  # default to employee if not provided
#     file: UploadFile = File(...),
#     db: Session = Depends(get_db)
# ):
#     """
#     Agnostic CSV ingestion endpoint for HR.
    
#     This endpoint ingests CSV data into the specified table.
#     Supported tables: 'employee', 'hr', 'conversation', and 'message'.
    
#     The 'table' query parameter determines the target table for ingestion.
#     If not provided, it defaults to 'employee'.
#     """
#     table = table.lower()
#     if table not in {"employee", "hr", "conversation", "message"}:
#         raise HTTPException(
#             status_code=400,
#             detail="Invalid table specified for ingestion. Supported values: employee, hr, conversation, message."
#         )
    
#     # Check if the file extension is .csv (ignoring case)
#     if not file.filename.lower().endswith(".csv"):
#         raise HTTPException(status_code=400, detail="Please upload a CSV file.")
    
#     try:
#         file_content = await file.read()
#         count = ingest_csv_data(file_content, table, db)
#         return {"message": f"Ingested {count} records into {table} table successfully."}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Ingestion error: {str(e)}")
