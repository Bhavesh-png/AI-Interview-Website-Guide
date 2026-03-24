from pydantic import BaseModel
from typing import List, Optional

class QuestionBase(BaseModel):
    id: int
    role: str
    category: str
    difficulty: str
    question: str
    answer: str
    tags: List[str]

class EvaluateRequest(BaseModel):
    question: str
    answer: str

class InterviewRecord(BaseModel):
    userId: str
    role: str
    difficulty: str
    questions: List[dict]
    totalScore: float

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "Full Stack"
    skillLevel: Optional[str] = "Intermediate"
    preferredLanguage: Optional[str] = "English"
    collegeName: Optional[str] = ""
    yearOfStudy: Optional[str] = ""
    targetCompany: Optional[str] = ""

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    
class Token(BaseModel):
    access_token: str
    token_type: str
