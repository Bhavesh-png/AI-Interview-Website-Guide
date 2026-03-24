# Start Backend
Start-Process powershell -ArgumentList "cd backend; uvicorn app.main:app --reload --port 8000"

# Start Frontend
Start-Process powershell -ArgumentList "cd frontend; npm.cmd run dev"

Write-Host "AI Interview Practice Web App is starting..." -ForegroundColor Cyan
Write-Host "Backend: http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend: Check the console for the dev server URL (usually http://localhost:5173)" -ForegroundColor Green
