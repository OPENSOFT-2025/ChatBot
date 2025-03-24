from fastapi import FastAPI, HTTPException,Depends
from pydantic import BaseModel
from typing import List, Annotated
from fastapi.middleware.cors import CORSMiddleware
from routes import chats
from sqlalchemy.orm import Session,sessionmaker
from routes import check_database, auth # Import the user router
import psycopg2,os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from database.models import Base
from database.conn import engine

app = FastAPI()
app.include_router(chats.router)
app.include_router(check_database.router)
app.include_router(auth.router)

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