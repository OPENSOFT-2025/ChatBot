import os
from openai import OpenAI
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
client = OpenAI(api_key=openai_api_key)

def speech_to_text(audio_file):
    """Convert audio file to text using OpenAI Whisper API."""
    logger.info(f"Transcribing audio file: {audio_file}")
    try:
        with open(audio_file, "rb") as audio:
            response = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio,
                language="en"
            )
        transcript = response.text
        logger.info(f"Transcription result: {transcript}")
        return transcript
    except Exception as e:
        logger.error(f"Error in speech_to_text: {str(e)}", exc_info=True)
        raise