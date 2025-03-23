from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    GEMINI_API_KEY: str
    GEMINI_MODEL_NAME: str = "gemini-2.0-flash"
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()