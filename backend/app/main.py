from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, hr, chat
# from app.database.database import engine
# from app.database.models import Base


app = FastAPI(title="AI Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.on_event("startup")
# def on_startup():
#     Base.metadata.create_all(bind=engine)

app.include_router(chat.router, prefix="/api", tags=["chat"])
# app.include_router(auth.router, prefix="/auth", tags=["auth"])
# app.include_router(hr.router, prefix="/hr", tags=["hr"])
