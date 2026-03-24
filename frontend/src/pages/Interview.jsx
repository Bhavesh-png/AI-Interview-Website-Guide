import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, StopCircle, RefreshCw, Send, Timer as TimerIcon } from 'lucide-react';
import { getQuestion, evaluateAnswer } from '../services/api';

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, difficulty } = location.state || { role: 'frontend', difficulty: 'Medium' };

  const [question, setQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchNewQuestion();
    startCamera();
    setupSpeechToText();

    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const fetchNewQuestion = async () => {
    setLoading(true);
    try {
      const res = await getQuestion(role, difficulty);
      setQuestion(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const setupSpeechToText = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let currentTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop
      setIsRecording(false);
      recognitionRef.current?.stop();
      clearInterval(timerRef.current);
    } else {
      // Start
      setIsRecording(true);
      setTranscript("");
      setTimer(0);
      recognitionRef.current?.start();
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    }
  };

  const handleSubmit = async () => {
    if (!transcript) return;
    setEvaluating(true);
    try {
      const res = await evaluateAnswer(question.question, transcript);
      navigate('/result', { state: { result: res.data, question, answer: transcript } });
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="flex items-center justify-center h-[70vh]"><RefreshCw className="animate-spin text-indigo-500" size={48} /></div>;

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 py-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="glass-card p-8 min-h-[300px] flex flex-col justify-between">
          <div>
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider">
              Question
            </span>
            <h2 className="text-2xl font-bold mt-6 leading-tight">
              {question?.question}
            </h2>
          </div>
          <p className="text-slate-500 italic mt-8 border-t border-white/5 pt-4">
            Difficulty: <span className="text-slate-300 capitalize">{difficulty}</span>
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Your Response</h3>
            <div className="flex items-center gap-2 text-indigo-400 font-mono">
              <TimerIcon size={18} /> {formatTime(timer)}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 min-h-[150px] border border-white/5 text-slate-300">
            {transcript || "Your speech will appear here..."}
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {isRecording && (
              <span className="flex items-center gap-2 px-3 py-1 bg-red-500/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Recording
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={handleToggleRecording}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
            }`}
          >
            {isRecording ? <StopCircle /> : <Mic />}
            {isRecording ? "Stop Recording" : "Start Answering"}
          </button>

          <button 
            disabled={!transcript || evaluating}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            {evaluating ? <RefreshCw className="animate-spin" /> : <Send />}
            {evaluating ? "Evaluating..." : "Submit Answer"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Interview;
