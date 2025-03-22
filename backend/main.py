from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
from fastapi.middleware.cors import CORSMiddleware
from hugging_face import get_huggingface_response  # Import the Hugging Face function
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

# CORS configuration for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text:str
    user_id:str

class ChoiceBase(BaseModel):
    choice_text:str
    is_correct:bool
class QuestionBase(BaseModel):
    question:str
    flag:bool

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message":"Hugging Face Chatbot is running!"}

@app.post("/chat")
def chat(message:Message):
    try:
        response  = get_huggingface_response(message.text)
        return {"response":response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

