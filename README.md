# 🚀 AI Interview Practice Platform

![AI Interviewer Banner](/C:/Users/ansar/.gemini/antigravity/brain/eea0d0c4-b5f0-4db6-8c79-945b206f6cc7/ai_interviewer_banner_1774350640493.png)

### Ace Your Next Technical Interview with Generative AI

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini_2.0_Flash-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 🌟 Overview

**AI Interview Practice** is a state-of-the-art platform designed to help candidates prepare for both verbal and coding interviews. Powered by **Google Gemini 2.0 Flash**, it generates dynamic, role-specific questions and evaluates submissions in real-time, providing actionable feedback to help you land your dream job.

![Mockup](/C:/Users/ansar/.gemini/antigravity/brain/eea0d0c4-b5f0-4db6-8c79-945b206f6cc7/ai_interview_mockup_1774350748127.png)

---

## 🔥 Key Features

### 🎙 AI-Driven Verbal Interviews
- **Dynamic 5-Question Session**: Tailored questions based on your specific role (Frontend, Backend, HR, etc.) and difficulty level.
- **Real-time Evaluation**: Your answers are analyzed immediately for technical accuracy and depth.
- **Speech-to-Text Integration**: Practice your verbal communication using built-in speech recognition.
- **Comprehensive Final Reports**: Receive a detailed performance breakdown with a score out of 10, key strengths, weaknesses, and a personalized improvement plan.

### 💻 AI Coding Platform
- **On-the-Fly Challenge Generation**: AI creates unique algorithmic challenges with descriptions, constraints, and starter code.
- **AI-Powered Code Execution**: Test your code against example test cases directly using AI logic.
- **Automated Complexity Analysis**: Get immediate feedback on the time and space complexity (O-notation) of your solutions.
- **Language Support**: Practice in both **JavaScript** and **Python 3**.

![Features Grid](/C:/Users/ansar/.gemini/antigravity/brain/eea0d0c4-b5f0-4db6-8c79-945b206f6cc7/ai_interview_features_grid_1774350659202.png)

---

## 🛠 Tech Stack

Our platform is built using modern, scalable technologies:

| Layer | Technologies |
|---|---|
| **Frontend** | React, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | FastAPI (Python), Motor (Async MongoDB), JWT Auth |
| **AI Engine** | Google Gemini 2.0 Flash (Recommended) / OpenAI GPT |
| **Database** | MongoDB Atlas |
| **Editor** | CodeMirror |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+ 
- Node.js 18+
- MongoDB instance (local or Atlas)
- Gemini API Key

### Installation

1. **Clone the project**
   ```bash
   git clone [your-repo-link]
   cd AI-Interview-Practice
   ```

2. **Backend Setup**
   ```bash
   cd backend
   # Create a virtual environment
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
   Create a `.env` file in the `backend/` directory:
   ```env
   GEMINI_API_KEY=your_key_here
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
   Launch the server:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 🎬 Project Showcase
For a detailed breakdown of the technical components and library usage, see our [Tech Stack Showcase](./tech_stack_showcase.md).

---

Developed with ❤️ by the Google Deepmind team & antigravity AI.
