from pydantic import BaseModel, EmailStr, constr, Field
from typing import List, Dict, Optional

# Schemas for user registration and login

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: constr(min_length=6)
    confirm_password: constr(min_length=6)

    class Config:
        schema_extra = {
            "example": {
                "name": "Alice Johnson",
                "email": "alice@example.com",
                "password": "strongpassword",
                "confirm_password": "strongpassword"
            }
        }

class UserLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        schema_extra = {
            "example": {
                "email": "alice@example.com",
                "password": "strongpassword"
            }
        }

class Token(BaseModel):
    access_token: str
    token_type: str

# Ingestion schema for employee data

class EmployeeIngestion(BaseModel):
    id: str = Field(..., description="Unique Employee ID")
    is_selected: bool
    shap_values: List[float]  # or List[Dict[str, float]] if each feature is a dict
    feature_scores: Dict[str, int]  # Example: {"workload": 80, "leave_balance": 30}
    employee_name: str = ""
    employee_email: EmailStr
    password: str
    report: str = ""
    sentimental_score: int
    is_resolved: bool
    role: str  # "employee" or "admin"

    class Config:
        json_schema_extra = {
            "example": {
                "id": "E123",
                "is_selected": True,
                "shap_values": [0.45, 0.32, 0.23],
                "feature_scores": {"workload": 80, "leave_balance": 30, "performance": 70},
                "employee_name": "Alice Johnson",
                "employee_email": "alice@example.com",
                "password": "plaintextpassword",
                "report": "Employee has a high workload",
                "sentimental_score": 45,
                "is_resolved": False,
                "role": "employee"
            }
        }

class HRUserIngestion(BaseModel):
    email: EmailStr
    password: str
    role: str  # typically "admin"

    class Config:
        json_schema_extra = {
            "example": {
                "email": "hr@example.com",
                "password": "securepassword",
                "role": "admin"
            }
        }
