from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from .stt import speech_to_text
from .tts import text_to_speech
from routes.chats import send_message, MessageRequest
from database.conn import get_db
import os
import tempfile
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/voice_message")
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
        logger.info(f"Received voice message request: conversation_id={conversation_id}, employee_name={employee_name}, employee_id={employee_id}")
        logger.info(f"SHAP: {shap}, Selected Questions: {selected_questions}")

        # Save the uploaded audio file temporarily
        suffix = os.path.splitext(audio.filename)[1] or ".opus"
        logger.info(f"Saving audio file with suffix: {suffix}")
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_audio:
            temp_audio.write(await audio.read())
            temp_audio_path = temp_audio.name
        logger.info(f"Temporary audio file saved at: {temp_audio_path}")

        # Convert voice to text
        user_message = speech_to_text(temp_audio_path)

        # Clean up the temporary audio file
        logger.info("Cleaning up temporary audio file...")
        os.remove(temp_audio_path)

        if not user_message:
            logger.warning("No transcription result received.")
            raise HTTPException(status_code=400, detail="Could not transcribe audio")

        logger.info(f"Transcribed user message: {user_message}")

        # Create a MessageRequest object to pass to the existing send_message function
        message_request = MessageRequest(
            employee_name=employee_name,
            employee_id=employee_id,
            shap=shap,
            message=user_message,
            conversation_id=conversation_id,
            selected_questions=selected_questions
        )
        logger.info("Created MessageRequest object.")

        # Call the existing send_message function to get the chatbot response
        logger.info("Calling send_message to get chatbot response...")
        response = await send_message(message_request, db)
        logger.info(f"Chatbot response: {response['chatbot_response']}")

        # Convert the chatbot response to speech and save in the static folder
        output_audio_path = f"static/response_{conversation_id}.mp3"
        logger.info(f"Converting chatbot response to speech, saving to: {output_audio_path}")
        text_to_speech(response["chatbot_response"], output_audio_path)
        logger.info("Text-to-speech conversion completed.")

        return {
            "chatbot_response": response["chatbot_response"],
            "audio_file": output_audio_path,
            "conversation_id": conversation_id
        }

    except Exception as e:
        logger.error(f"Error in voice_message: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")