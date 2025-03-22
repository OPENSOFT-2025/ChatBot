from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, Text, JSON
import datetime

Base = declarative_base()

class Employee(Base):
    __tablename__ = "employees"
    
    id = Column(String, primary_key=True, index=True)  # Employee ID provided as string
    is_selected = Column(Boolean, default=False)
    shap_values = Column(JSON)  # Stores list of features in descending order
    # For feature scores, you can either create individual columns or store as JSON.
    feature_scores = Column(JSON)  # Expecting a JSON with keys like "feature1", "feature2", etc.
    employee_name = Column(String, default="")
    employee_email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # Hashed password
    report = Column(Text, default="")
    sentimental_score = Column(Integer)
    is_resolved = Column(Boolean, default=False)
    role = Column(String, default="employee")  # employee, admin, etc.
    
class HRUser(Base):
    __tablename__ = "hr_users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # Hashed password
    role = Column(String, default="admin")
