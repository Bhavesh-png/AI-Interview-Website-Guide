import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["ai_interview"]

users_collection = db["users"]
interviews_collection = db["interviews"]
history_collection = db["history"]

async def get_db():
    return db
