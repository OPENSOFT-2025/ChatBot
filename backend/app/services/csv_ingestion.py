import csv
import io
from sqlalchemy.orm import Session
from app.database.models import Employee, HRUser, Conversation, Message
from app.utils.security import hash_password

def parse_bool(value: str) -> bool:
    return value.strip().lower() == "true"

def parse_float(value: str) -> float:
    try:
        return float(value)
    except (ValueError, TypeError):
        return 0.0

def parse_int(value: str) -> int:
    try:
        return int(value)
    except (ValueError, TypeError):
        return 0
    
def parse_shap_values(value: str):
    """
    Parse comma-separated feature names into a list of strings.
    e.g. "Performance_Rating,Promotion_Consideration,Leave_Type"
    -> ["Performance_Rating", "Promotion_Consideration", "Leave_Type"]
    """
    if not value:
        return []
    # Split by comma and strip whitespace
    return [item.strip() for item in value.split(",")]

def ingest_csv_data(file_content: bytes, table: str, db: Session):
    """
    Reads CSV data from the given bytes and ingests records into the specified table.
    Supported tables: 'employee', 'hr', 'conversation', 'message'
    """
    decoded = file_content.decode("utf-8")
    reader = csv.DictReader(io.StringIO(decoded))
    records = []
    table = table.lower()

    if table == "employee":
        for row in reader:
            employee_id = row.get("employee_id")
            if not employee_id:
                raise ValueError("Missing employee_id")
            # Map CSV columns to fixed fields in the Employee model

            shap_str = row.get("shap_values", "")
            shap_list = parse_shap_values(shap_str)

            employee = Employee(
                employee_id=row.get("employee_id"),
                shap_values=shap_list,
                # employee_name=row.get("employee_name", ""),
                # employee_email=row.get("employee_email"),
                # password=hash_password(row.get("password")),
                # role=row.get("role", "employee"),
                # report=row.get("report", ""),
                sentimental_score=parse_int(row.get("sentimental_score", "0")),
                # is_resolved=parse_bool(row.get("is_resolved", "false")),

                work_hours=parse_float(row.get("work_hours", "0.0")),
                leave_days=parse_int(row.get("leave_days", "0")),
                leave_type=row.get("leave_type", ""),
                performance_rating=parse_int(row.get("performance_rating", "0")),
                manager_feedback=row.get("manager_feedback", ""),
                promotion_consideration=parse_bool(row.get("promotion_consideration", "false")),
                reward_points=parse_int(row.get("reward_points", "0")),
                award_type=row.get("award_type", ""),
                team_messages_sent=parse_int(row.get("team_messages_sent", "0")),
                vibe_score=parse_int(row.get("vibe_score", "0"))
            )
            db.add(employee)
            records.append(employee)
    elif table == "hr":
        for row in reader:
            hr_user = HRUser(
                email=row.get("email"),
                password=hash_password(row.get("password")),
                role=row.get("role", "admin")
            )
            db.add(hr_user)
            records.append(hr_user)
    elif table == "conversation":
        for row in reader:
            try:
                messages_arr = json.loads(row.get("messages", "[]"))
            except Exception:
                messages_arr = []
            conversation = Conversation(
                id=int(row.get("conv_id")),  # assuming conv_id is provided as integer
                employee_id=row.get("employee_id"),
                messages=messages_arr
            )
            db.add(conversation)
            records.append(conversation)
    elif table == "message":
        for row in reader:
            message = Message(
                id=int(row.get("message_id")),  # assuming message_id is provided as integer
                conv_id=int(row.get("conv_id")),
                content=row.get("content")
            )
            db.add(message)
            records.append(message)
    else:
        raise ValueError("Invalid table specified for ingestion.")
    
    db.commit()
    return len(records)
