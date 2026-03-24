import json
import random
import os

# Adjust path based on relative position to app/
DATASET_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "dataset", "questions.json")

def get_questions_from_file():
    if not os.path.exists(DATASET_PATH):
        return []
    with open(DATASET_PATH, "r") as f:
        return json.load(f)

def get_random_question(role: str, difficulty: str = None):
    questions = get_questions_from_file()
    filtered = [q for q in questions if q["role"].lower() == role.lower()]
    
    if difficulty:
        filtered = [q for q in filtered if q.get("difficulty", "").lower() == difficulty.lower()]
        
    if not filtered:
        return None
        
    return random.choice(filtered)
