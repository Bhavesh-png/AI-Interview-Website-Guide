import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client.ai_interview_db
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    db = None

def get_db():
    return db
