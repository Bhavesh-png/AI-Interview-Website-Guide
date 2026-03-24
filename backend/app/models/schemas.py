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
