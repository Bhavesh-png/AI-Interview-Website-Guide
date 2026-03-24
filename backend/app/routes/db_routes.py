from fastapi import APIRouter, HTTPException
from ..models.schemas import InterviewRecord
from ..services.db_service import save_interview, get_user_history, get_average_score

router = APIRouter()

@router.post("/save-interview")
async def save_interview_route(data: InterviewRecord):
    try:
        record_id = await save_interview(data)
        return {"message": "Interview saved successfully", "id": record_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save interview: {e}")

@router.get("/history/{userId}")
async def get_history_route(userId: str):
    try:
        history = await get_user_history(userId)
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {e}")

@router.get("/average-score/{userId}")
async def get_avg_score(userId: str):
    try:
        score = await get_average_score(userId)
        return {"userId": userId, "averageScore": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate score: {e}")
