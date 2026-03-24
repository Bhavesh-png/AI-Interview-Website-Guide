@echo off
echo Setting up AI Interview Practice Web App dependencies...

echo 1. Installing Backend dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing backend dependencies. Make sure Python is installed.
    pause
    exit /b %errorlevel%
)

echo.
echo 2. Installing Frontend dependencies...
cd ../frontend
npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies. Make sure Node.js is installed.
    pause
    exit /b %errorlevel%
)

echo.
echo Setup complete! You can now run the app using start_app.bat
pause
