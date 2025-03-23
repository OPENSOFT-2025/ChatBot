from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from app.models.chat import ChatRequest, ChatResponse, ChatMessage
from app.services.ai_services import AIService
from app.services.question_bank import QuestionBank
from jose import JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()
ai_service = AIService()
question_bank = QuestionBank()

# def get_current_user(token: str = Depends(oauth2_scheme)):
#     try:
#         payload = jwt.decode(token, "your_secret_key", algorithms=["HS256"])
#         username: str = payload.get("sub")
#         if username is None:
#             raise HTTPException(status_code=401, detail="Invalid token")
#         return username
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # For demonstration, assume a dominant feature is determined.
        dominant_feature = "leave_dataset"
        contextual_questions = question_bank.get_questions_by_feature(dominant_feature)
        
        if not request.messages:
            first_question = contextual_questions[0] if contextual_questions else "How are you feeling today?"
            request.messages.append(ChatMessage(role="assistant", content=first_question))
        
        response = await ai_service.get_completion(
            messages=request.messages,
            system_prompt=request.system_prompt
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
