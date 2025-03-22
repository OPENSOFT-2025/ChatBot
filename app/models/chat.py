from pydantic import BaseModel
from typing import List, Optional

# Similar to interfaces in TypeScript
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    system_prompt: Optional[str] = None

class ChatResponse(BaseModel):
    content: str