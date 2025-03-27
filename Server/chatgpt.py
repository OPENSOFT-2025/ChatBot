from openai import OpenAI 
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize the OpenAI client
client = OpenAI()
client.api_key = os.getenv("OPENAI_API_KEY")

def chat_with_gpt4o(prompt):
    """Generates a response from GPT-4o."""
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )

        # ✅ Access the response using dot notation
        if response.choices and len(response.choices) > 0:
            return response.choices[0].message.content.strip()
        else:
            print("Invalid response format:", response)
            return "No valid response generated."

    except Exception as e:
        print(f"Unexpected Error: {e}")
        return f"Error: {str(e)}"
