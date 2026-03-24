from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-it")
ALGORITHM = "HS256"

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@router.post("/register")
async def register(user: UserRegister):
    # This is a simplified registration without DB check for now
    # In a real app, check if user exists in users_collection
    hashed_password = pwd_context.hash(user.password)
    return {"message": "User registered successfully!", "user": user.email}

@router.post("/login")
async def login(user: UserLogin):
    # Mock login
    return {"access_token": "mock-token", "token_type": "bearer"}
