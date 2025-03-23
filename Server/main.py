from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
from fastapi.middleware.cors import CORSMiddleware
from hugging_face import get_huggingface_response  # Import the Hugging Face function
from sqlalchemy.orm import Session, sessionmaker
from routes import chats, check_database # Import the user router
import psycopg2, os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from database.models import Base
from database.conn import engine

app = FastAPI(
    title="ChatBot API",
    description="API for the ChatBot application with employee data and Hugging Face integration",
    version="1.0.0"
)
app.include_router(chats.router)
app.include_router(check_database.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/", tags=["root"])
def read_root():
    """
    Root endpoint with information about the API and available endpoints.
    """
    return {
        "message": "Welcome to the ChatBot API",
        "available_endpoints": {
            "API Documentation": "/docs",
            "Chat with AI": "/chats/chats",
            "Check Database": "/database/employees",
            "Ingest CSV Data": "/database/database/ingest"
        }
    }