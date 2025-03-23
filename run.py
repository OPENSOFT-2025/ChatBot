import os
import sys

os.chdir(os.path.join(os.path.dirname(__file__), "Server"))

sys.path.insert(0, os.path.abspath("."))

if __name__ == "__main__":
    import uvicorn
    print("Starting server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
