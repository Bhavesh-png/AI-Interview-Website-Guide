import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getQuestion = (role, difficulty) => 
  api.get(`/question/${role}`, { params: { difficulty } });

export const evaluateAnswer = (question, answer) => 
  api.post('/evaluate', { question, answer });

export default api;
