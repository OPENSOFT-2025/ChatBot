from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from .stt import speech_to_text
from .tts import text_to_speech
from routes.chats import send_message, MessageRequest
from database.conn import get_db
import os
import tempfile

router = APIRouter()

@router.post("/voice")
async def voice_message(
    conversation_id: int,
    employee_name: str,
    employee_id: str,
    shap: list[str],
    selected_questions: list[str],
    audio: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Accept a voice message, convert it to text, process it through the chatbot,
    and return a voice response.
    """
    try:
        # Save the uploaded audio file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
            temp_audio.write(await audio.read())
            temp_audio_path = temp_audio.name

        # Convert voice to text
        user_message = speech_to_text(temp_audio_path)

        # Clean up the temporary audio file
        os.remove(temp_audio_path)

        if not user_message:
            raise HTTPException(status_code=400, detail="Could not transcribe audio")

        # Create a MessageRequest object to pass to the existing send_message function
        message_request = MessageRequest(
            employee_name=employee_name,
            employee_id=employee_id,
            shap=shap,
            message=user_message,
            conversation_id=conversation_id,
            selected_questions=selected_questions
        )

        # Call the existing send_message function to get the chatbot response
        response = await send_message(message_request, db)

        # Convert the chatbot response to speech and save in the static folder
        output_audio_path = f"static/response_{conversation_id}.mp3"
        text_to_speech(response["chatbot_response"], output_audio_path)

        return {
            "chatbot_response": response["chatbot_response"],
            "audio_file": output_audio_path,
            "conversation_id": conversation_id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")