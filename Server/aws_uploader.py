import boto3
from dotenv import load_dotenv
import os

# Load AWS credentials from the .env.aws file
load_dotenv(".env.aws")

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

def upload_pdf_to_s3(pdf_filepath, pdf_filename):
    """
    Uploads the PDF to AWS S3 and returns the public URL.
    """
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
        region_name=AWS_REGION
    )

    # Upload PDF to S3
    s3_client.upload_file(
        Filename=pdf_filepath,
        Bucket=BUCKET_NAME,
        Key=pdf_filename,
        ExtraArgs={"ACL": "public-read"}  # Make the file publicly accessible
    )

    # Generate the file URL
    file_url = f"https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{pdf_filename}"
    
    return file_url
