import requests
import os
from dotenv import load_dotenv

load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")

def get_huggingface_response(prompt: str) -> str:
    """Use Hugging Face Inference API for chatbot responses"""
    API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }


    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 8008,        # Set a lower token limit
            "temperature": 0.5,           # Reduce randomness
            "top_p": 0.9,                  # Nucleus sampling
            "do_sample": True              # Enable sampling
        }
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        result = response.json()[0]["generated_text"]

        # ✅ Extract only the first answer (splitting by newline or punctuation)
        # if "\n" in result:
        #     return result.split("\n")[3]  # Only the first line
        return result
    else:
        return f"Error: {response.status_code}, {response.text}"