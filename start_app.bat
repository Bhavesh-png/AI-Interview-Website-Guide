@echo off
echo Starting AI Interview Practice Web App...

:: Start Backend
start cmd /k "cd backend && uvicorn app.main:app --reload --port 8000"

:: Start Frontend
start cmd /k "cd frontend && npm run dev"

echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173 (usually)
echo.
echo Both servers are starting in separate windows.
pause
