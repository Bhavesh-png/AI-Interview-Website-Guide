from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import interview, auth, chat

app = FastAPI(title="AI Interview Practice API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(interview.router, prefix="/api", tags=["Interview"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chatbot"])

@app.get("/")
def home():
    return {"message": "AI Interview Practice API is running!"}
