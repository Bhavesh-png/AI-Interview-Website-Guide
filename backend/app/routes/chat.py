from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Configure Gemini
gemini_key = os.getenv("GEMINI_API_KEY")
if gemini_key:
    genai.configure(api_key=gemini_key)

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]

@router.post("")
async def chat_with_bot(request: ChatRequest):
    if not gemini_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not set.")

    try:
        # We prepend a system prompt wrapper
        system_instruction = (
            "You are an expert AI interview coach and platform guide for a website called 'AI Interview'. "
            "Your role is to help users navigate the platform, prepare for standard/behavioral interviews, "
            "or practice algorithms. Be concise, encouraging, and highly professional."
        )
        
        # Initialize the model with system instructions
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=system_instruction
        )
        
        # Translate OpenAI message format to Gemini format
        # Gemini uses 'user' and 'model' for roles. Our frontend sends 'user' and 'assistant'.
        gemini_history = []
        message_count = len(request.messages)
        for i in range(message_count - 1): # All except the last message
            msg = request.messages[i]
            role = "user" if msg["role"] == "user" else "model"
            gemini_history.append({"role": role, "parts": [msg["content"]]})
            
        # The last message is the current prompt
        current_prompt = request.messages[message_count - 1]["content"] if message_count > 0 else ""
        
        # Create a chat session with the converted history
        chat_session = model.start_chat(history=gemini_history)
        
        # Send the latest message
        response = chat_session.send_message(current_prompt)
        
        reply = response.text.strip()
        
        return {"reply": reply}
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Unable to process chat request at this time. Check API key or quotas.")
