# AI Interview Practice Web App

A modern, AI-powered interview practice platform with real-time feedback, video recording, and speech recognition.

## 🚀 Quick Start (Windows)

1. **Install Prerequisites**:
   - [Node.js](https://nodejs.org/) (v18+)
   - [Python](https://www.python.org/) (v3.10+)
   - [MongoDB Community Server](https://www.mongodb.com/try/download/community)

2. **Clone & Setup**:
   ```bash
   # Install backend dependencies
   cd backend
   pip install -r requirements.txt
   
   # Setup environment variables
   # Create a .env file in the backend folder (copy .env.example if available)
   # Add your OPENAI_API_KEY
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Run the App**:
   From the root directory, run:
   ```powershell
   ./start_app.ps1
   ```
   *Note: If you get a script execution error, run `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` in PowerShell.*

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS v4, Framer Motion, Lucide React
- **Backend**: FastAPI, MongoDB (Motor), OpenAI API
- **AI**: GPT-4o for evaluation and feedback

## 📁 Project Structure
- `/frontend`: Vite + React source code
- `/backend`: FastAPI service and AI logic
- `start_app.ps1`: Automated startup script

## ❓ Troubleshooting (Another Laptop?)
If the app doesn't run on a new machine, check:
1. **Python/Node in PATH**: Open a terminal and type `python --version` and `node --version`.
2. **MongoDB**: Ensure the MongoDB service is running.
3. **.env file**: Make sure you copied the `.env` file to the backend folder and filled in the `OPENAI_API_KEY`.
4. **Ports**: Ensure ports 8000 (Backend) and 5173 (Frontend) are not being used by other apps.
