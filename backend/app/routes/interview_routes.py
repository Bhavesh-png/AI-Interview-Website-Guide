from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from ..services.dataset_service import get_random_question
from ..services.ai_service import evaluate_answer
from ..models.schemas import EvaluateRequest

router = APIRouter()

@router.get("/question/{role}")
def fetch_question(role: str, difficulty: Optional[str] = None):
    question = get_random_question(role, difficulty)
    if not question:
        raise HTTPException(status_code=404, detail="No questions found for this role/difficulty")
    return question

@router.post("/evaluate")
def evaluate(data: EvaluateRequest):
    return evaluate_answer(data.question, data.answer)
