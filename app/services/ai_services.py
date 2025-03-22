import google.generativeai as genai
from app.config import settings
from app.models.chat import ChatMessage, ChatResponse

class AIService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL_NAME)

    async def get_completion(self, messages: list[ChatMessage], system_prompt: str = None) -> ChatResponse:
        """
        Gets a completion from the Gemini API.

        Args:
            messages: A list of ChatMessage objects representing the conversation.
            system_prompt: An optional system prompt.

        Returns:
            A ChatResponse object containing the model's response.
        """

        # Format messages for Gemini API
        contents = []

        if system_prompt:
          contents.append(f"System: {system_prompt}")

        for msg in messages:
            if msg.role == "user":
                contents.append(f"User: {msg.content}")
            elif msg.role == "assistant":
                contents.append(f"Assistant: {msg.content}")

        # Join the contents into a single string
        prompt = "\n".join(contents)

        # Generate response from Gemini API
        response = self.model.generate_content(prompt)

        # Extract the response text
        if response.parts:
            content = response.text
        else:
            content = "No response from the model."

        return ChatResponse(content=content)