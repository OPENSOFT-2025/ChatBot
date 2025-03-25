from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, Text, JSON, Float
from sqlalchemy.ext.mutable import MutableList, MutableDict

Base = declarative_base()

class Master(Base):
    __tablename__ = "master_table"
    
    employee_id = Column(String, primary_key=True, index=True)                   # Employee ID provided as string
    employee_name = Column(String, default="")                          # Default: empty string.
    employee_email = Column(String, index=True, default="")
    # password = Column(String, default="")                           # Hashed password.
    feature_vector = Column(MutableList.as_mutable(JSON), default=[])      # Default: empty list.
    is_selected = Column(Boolean, default=False)                        # Default: not selected for conversation.
    shap_values = Column(MutableList.as_mutable(JSON), default=[])      # Default: empty list.
    report = Column(Text, default="")                                   # Default: empty string.
    sentimental_score = Column(Integer, default=0)                      # Default: 0.
    is_resolved = Column(Boolean, default=False)                        # Default: not resolved.
    role = Column(String, default="employee")                           # Default: "employee".

    # work_hours = Column(Float, default=0.0)
    # leave_days = Column(Integer, default=0)
    # leave_type = Column(String, default="")
    # performance_rating = Column(Integer, default=0)
    # manager_feedback = Column(String, default="")
    # promotion_consideration = Column(Boolean, default=False)
    # reward_points = Column(Integer, default=0)
    # award_type = Column(String, default="")
    # team_messages_sent = Column(Integer, default=0)
    # vibe_score = Column(Integer, default=0)

    
class HRUser(Base):
    __tablename__ = "hr_users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    # password = Column(String, nullable=False)                           # Hashed password.
    role = Column(String, default="admin")                              # Default: "admin".  


# class Conversation(Base):
#     __tablename__ = "conversations"
    
#     id = Column(Integer, primary_key=True, index=True)  # Conversation ID.
#     employee_id = Column(String, nullable=False)         # Reference to Employee.id.
#     messages = Column(MutableList.as_mutable(JSON), default=[])  # List of message IDs.

# class Message(Base):
#     __tablename__ = "messages"
    
#     id = Column(Integer, primary_key=True, index=True)   # Message ID.
#     conv_id = Column(Integer, nullable=False)            # Reference to Conversation.id.
#     content = Column(Text, nullable=False)
    

class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, nullable=False)
    shap_values = Column(MutableList.as_mutable(JSON), default=[])  # e.g., ["Work_Hours", "Leave_Type", ...]
    current_question_index = Column(Integer, default=0)
    is_closed = Column(Boolean, default=False)                         # whether a conversation is finished or active
    messages = Column(MutableList.as_mutable(JSON), default=[])  # Store message IDs or texts

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    # conv_id = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    sender_type = Column(String, nullable=False)  # "assistant" or "user"
    content_type = Column(String, nullable=False)  # "text" or "voice"

# Activity Tracker
class ActivityTracker(Base):
    __tablename__ = "activity_tracker"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, index=True, nullable=False)
    date = Column(String, nullable=True)  
    teams_messages_sent = Column(Integer, default=0)
    emails_sent = Column(Integer, default=0)
    work_hours = Column(Float, default=0.0)
    meetings_attended = Column(Integer, default=0)



# Leave Records
class Leave(Base):
    __tablename__ = "leave"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, index=True, default="")
    leave_type = Column(String, default="")
    leave_start_date = Column(String, nullable=True)
    leave_end_date = Column(String, nullable=True)
    leave_days = Column(Integer, default=0)  # Duration in days or hours


# Onboarding Experience
class Onboarding(Base):
    __tablename__ = "onboarding"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, index=True, nullable=False)
    joining_date = Column(String, nullable=True)
    onboarding_feedback = Column(Text, default="")
    mentor_assigned = Column(Boolean, default=False)
    initial_training_completed = Column(Boolean, default=False)


# Performance Management
class Performance(Base):
    __tablename__ = "performance"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, index=True, nullable=False)
    review_period = Column(String, nullable=True)
    performance_rating = Column(Integer, default=0)
    manager_feedback = Column(Text, default="")
    promotion_consideration = Column(Boolean, default=False)


# Rewards & Recognition
class Rewards(Base):
    __tablename__ = "rewards"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, index=True, nullable=False)
    award_date = Column(String, nullable=True)
    award_type = Column(String, default="")
    reward_points = Column(Integer, default=0)


# Vibemeter Responses
class Vibemeter(Base):
    __tablename__ = "vibemeter"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, index=True, nullable=False)
    response_date = Column(String, nullable=True)
    emotion_zone = Column(String, default="")  
    vibe_score = Column(Integer, default=0)