from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, Text, JSON, Float
from sqlalchemy.ext.mutable import MutableList, MutableDict

Base = declarative_base()

class Employee(Base):
    __tablename__ = "employees"
    
    employee_id = Column(String, primary_key=True, index=True)                   # Employee ID provided as string
    employee_name = Column(String, default="")                          # Default: empty string.
    employee_email = Column(String, index=True, default="")
    password = Column(String, default="")                           # Hashed password.
    is_selected = Column(Boolean, default=False)                        # Default: not selected for conversation.
    shap_values = Column(MutableList.as_mutable(JSON), default=[])      # Default: empty list.
    report = Column(Text, default="")                                   # Default: empty string.
    sentimental_score = Column(Integer, default=0)                      # Default: 0.
    is_resolved = Column(Boolean, default=False)                        # Default: not resolved.
    role = Column(String, default="employee")                           # Default: "employee".

    work_hours = Column(Float, default=0.0)
    leave_days = Column(Integer, default=0)
    leave_type = Column(String, default="")
    performance_rating = Column(Integer, default=0)
    manager_feedback = Column(String, default="")
    promotion_consideration = Column(Boolean, default=False)
    reward_points = Column(Integer, default=0)
    award_type = Column(String, default="")
    team_messages_sent = Column(Integer, default=0)
    vibe_score = Column(Integer, default=0)

    
class HRUser(Base):
    __tablename__ = "hr_users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)                           # Hashed password.
    role = Column(String, default="admin")                              # Default: "admin".  


class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(Integer, primary_key=True, index=True)  # Conversation ID.
    employee_id = Column(String, nullable=False)         # Reference to Employee.id.
    messages = Column(MutableList.as_mutable(JSON), default=[])  # List of message IDs.

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)   # Message ID.
    conv_id = Column(Integer, nullable=False)            # Reference to Conversation.id.
    content = Column(Text, nullable=False)