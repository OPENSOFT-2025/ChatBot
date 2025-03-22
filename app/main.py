from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat
from app.routes import auth

app = FastAPI(title="AI Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
