from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    text:str
    user_id:str

# Create a router instance
router = APIRouter(
    prefix="/chats",       # Base route prefix
    tags=["chats"]          # Tags for Swagger documentation
)

@router.get("/")
def read_root():
    return {"message":"Hugging Face Chatbot is running!"}

@router.post("/chats")
def chat(message:Message):
    try:
        response  = get_huggingface_response(message.text)
        return {"response":response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

