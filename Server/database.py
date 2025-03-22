import psycopg2
import csv

# AWS RDS PostgreSQL connection details
HOST = "opensoft.c9w2i6somhki.ap-south-1.rds.amazonaws.com"
DATABASE = "postgres"   # Replace with your actual database name
USER = "datamaster"
PASSWORD = "databaseforever"
CSV_FILE = "./cleaned_employee_data.csv"

# Connect to PostgreSQL
try:
    conn = psycopg2.connect(
        host=HOST,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )
    print("✅ Connected to PostgreSQL")

    cursor = conn.cursor()

    # Ensure the table exists (create it if it doesn't)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS employees (
        Employee_ID TEXT PRIMARY KEY,
        Work_Hours FLOAT,
        Leave_Days INT,
        Leave_Type TEXT,
        Performance_Rating INT,
        Manager_Feedback TEXT,
        Promotion_Consideration BOOLEAN,
        Reward_Points INT,
        Award_Type TEXT,
        Team_Messages_Sent INT,
        Vibe_Score INT,
        shap TEXT
    );
    """)
    print("✅ Table checked/created")

    # Open CSV file and import data
    with open(CSV_FILE, 'r') as f:
        reader = csv.reader(f)
        header = next(reader)  # Skip header row
        expected_cols = 12

        for row in reader:
            # Validate row length before inserting
            if len(row) == expected_cols:
                cursor.execute("""
                INSERT INTO employees (
                    Employee_ID, Work_Hours, Leave_Days, Leave_Type, Performance_Rating,
                    Manager_Feedback, Promotion_Consideration, Reward_Points, Award_Type,
                    Team_Messages_Sent, Vibe_Score, shap
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, row)
            else:
                print(f"⚠️ Skipping invalid row: {len(row)} (length: {len(row)})")

    conn.commit()
    print("✅ CSV data imported successfully!")

except Exception as e:
    print(f"🔥 Error: {e}")
finally:
    cursor.close()
    conn.close()
    print("🔌 PostgreSQL connection closed")