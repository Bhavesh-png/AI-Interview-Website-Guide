import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def evaluate_answer(question: str, user_answer: str):
    if not os.getenv("OPENAI_API_KEY"):
        # Mock response if no API key
        return {
            "score": 7,
            "feedback": "No OpenAI API key found, using mock evaluation. Good effort!",
            "improvement": "Try to provide more technical details."
        }

    prompt = f"""
    Evaluate the following interview answer based on the question.
    Question: {question}
    User Answer: {user_answer}
    
    Provide a JSON response with:
    - score (number out of 10)
    - feedback (concise feedback)
    - improvement (how to improve)
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        # In a real app, you'd parse response.choices[0].message.content as JSON
        # For simplicity, returning a simulated response here or parsing if possible
        content = response.choices[0].message.content
        return {"content": content} # You can parse this later
    except Exception as e:
        return {"error": str(e)}
