from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("GENAI_API_KEY")
BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

router = APIRouter(
    prefix="/chats",       # Base route prefix
    tags=["chats"]          # Tags for Swagger documentation
)

# Request model for incoming prompts
class PromptRequest(BaseModel):
    prompt: str

@router.get("/")
def read_root():
    return {"message": "Gemini Text Generation API is running!"}

@router.post("/generate")
def generate_text(request: PromptRequest):
    url = f"{BASE_URL}?key={API_KEY}"
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [
            {
                "parts": [{"text": request.prompt}]
            }
        ]
    }
    try:
        # Send request to Gemini API
        response = requests.post(url, headers=headers, data=json.dumps(data))
        response.raise_for_status()

        # Parse the response
        result = response.json()
        gemini_response = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response")

        return {"response": gemini_response}

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
