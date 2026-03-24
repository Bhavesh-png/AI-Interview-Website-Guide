from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]

@router.post("")
async def chat_with_bot(request: ChatRequest):
    try:
        # We prepend a system prompt to guide the chatbot to act as an assistant
        system_prompt = {
            "role": "system",
            "content": (
                "You are an expert AI interview coach and platform guide for a website called 'AI Interview'. "
                "Your role is to help users navigate the platform, prepare for standard/behavioral interviews, "
                "or practice algorithms. Be concise, encouraging, and highly professional."
            )
        }
        
        # Combine system prompt with user history
        full_messages = [system_prompt] + request.messages
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo", # Using 3.5-turbo as it handles most requests flawlessly and is cheaper
            messages=full_messages,
            max_tokens=300,
            temperature=0.7
        )
        
        reply = response.choices[0].message.content.strip()
        
        return {"reply": reply}
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Unable to process chat request at this time. Check API key limits.")
