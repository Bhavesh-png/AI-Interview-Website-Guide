from fastapi import APIRouter, HTTPException, Depends
from app.services.dataset_service import get_random_question
from app.services.ai_service import evaluate_answer
from app.models.schemas import EvaluateRequest

router = APIRouter()

@router.get("/question/{role}")
def fetch_question(role: str, difficulty: str = None):
    question = get_random_question(role, difficulty)
    if not question:
        raise HTTPException(status_code=404, detail="No questions found for this role/difficulty")
    return question

@router.post("/evaluate")
def evaluate(data: EvaluateRequest):
    return evaluate_answer(data.question, data.answer)
