import openai
import os

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_with_gpt4o(prompt):
    """Generates a response from GPT-4o."""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )

        # Validate the response structure
        if 'choices' in response and len(response['choices']) > 0:
            return response['choices'][0]['message']['content'].strip()
        else:
            print("Invalid response format:", response)
            return "No valid response generated."

    except openai.error.OpenAIError as e:
        print(f"OpenAI API Error: {e}")
        return f"OpenAI Error: {str(e)}"

    except Exception as e:
        print(f"Unexpected Error: {e}")
        return f"Error: {str(e)}"
