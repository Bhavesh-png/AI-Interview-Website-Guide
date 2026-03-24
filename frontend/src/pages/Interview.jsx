import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, StopCircle, RefreshCw, Send, Timer as TimerIcon, AlertTriangle, VideoOff, ChevronRight } from 'lucide-react';
import { getQuestion, evaluateAnswer } from '../services/api';

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, difficulty } = location.state || { role: 'frontend', difficulty: 'Medium' };

  const [question, setQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [cameraError, setCameraError] = useState(null);

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
      if (err.name === 'NotAllowedError') setCameraError('Camera access denied. Please allow camera permissions and reload.');
      else if (err.name === 'NotFoundError') setCameraError('No camera found on this device.');
      else setCameraError('Could not access camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
  };

  const setupSpeechToText = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setSpeechSupported(false); return; }
    recognitionRef.current = new SR();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.onresult = (event) => {
      let t = '';
      for (let i = 0; i < event.results.length; i++) t += event.results[i][0].transcript;
      setTranscript(t);
    };
    recognitionRef.current.onerror = () => {
      setIsRecording(false);
      clearInterval(timerRef.current);
    };
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      recognitionRef.current?.stop();
      clearInterval(timerRef.current);
    } else {
      setIsRecording(true);
      setTranscript('');
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

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const difficultyColor = {
    Easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Hard: 'bg-red-500/15 text-red-400 border-red-500/30',
  }[difficulty] || 'bg-slate-700/50 text-slate-400 border-slate-600';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
        </div>
        <p className="text-slate-400 text-sm animate-pulse">Loading your question...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-400 capitalize">{role}</span>
          <ChevronRight size={14} className="text-slate-600" />
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${difficultyColor}`}>
            {difficulty}
          </span>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/15 border border-red-500/30 rounded-full text-red-400 text-xs font-bold">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Recording
          </div>
        )}
      </div>

      {!speechSupported && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl px-5 py-3 mb-6 text-sm"
        >
          <AlertTriangle size={16} className="shrink-0" />
          Speech recognition not supported. Use Chrome/Edge or type your answer below.
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT — Question + Response */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          {/* Question card */}
          <div className="glass-card p-7 min-h-[260px] flex flex-col justify-between">
            <div>
              <span className="tag mb-5 inline-block">Question</span>
              <h2 className="text-xl font-semibold leading-relaxed text-slate-100 mt-2">
                {question?.question}
              </h2>
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
              <span className="text-xs text-slate-600 font-medium uppercase tracking-widest">Role: {role}</span>
              <button
                onClick={fetchNewQuestion}
                className="text-xs text-slate-500 hover:text-indigo-400 transition-colors font-medium flex items-center gap-1.5"
              >
                <RefreshCw size={12} /> New question
              </button>
            </div>
          </div>

          {/* Response area */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-200">Your Response</h3>
              <div className={`flex items-center gap-1.5 font-mono text-sm font-bold tabular-nums ${isRecording ? 'text-red-400' : 'text-slate-500'}`}>
                <TimerIcon size={15} />
                {formatTime(timer)}
              </div>
            </div>

            {speechSupported ? (
              <div className={`bg-slate-950/60 rounded-xl p-4 min-h-[140px] border text-sm leading-relaxed transition-all ${
                isRecording ? 'border-red-500/30 shadow-inner shadow-red-500/5' : 'border-white/5'
              } ${transcript ? 'text-slate-200' : 'text-slate-600 italic'}`}>
                {transcript || 'Your speech will appear here as you talk...'}
              </div>
            ) : (
              <textarea
                className="w-full bg-slate-950/60 rounded-xl p-4 min-h-[140px] border border-white/5 text-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none placeholder:text-slate-600 leading-relaxed transition-all"
                placeholder="Speech recognition unavailable. Type your answer here..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
            )}
          </div>
        </motion.div>

        {/* RIGHT — Camera + Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          {/* Camera */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900/80 border border-white/10 shadow-2xl">
            {cameraError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500 p-8 text-center">
                <VideoOff size={36} className="text-slate-700" />
                <p className="text-sm leading-relaxed">{cameraError}</p>
              </div>
            ) : (
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            )}
            {/* Overlay gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
          </div>

          {/* Action buttons */}
          <div className="glass-card p-5">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleToggleRecording}
                disabled={!speechSupported}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/25'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
                }`}
              >
                {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
                {isRecording ? 'Stop' : 'Start Answering'}
              </button>

              <button
                onClick={handleSubmit}
                disabled={!transcript || evaluating}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/25"
              >
                {evaluating ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
                {evaluating ? 'Evaluating...' : 'Submit'}
              </button>
            </div>
            {!transcript && (
              <p className="text-center text-xs text-slate-600 mt-3">Record or type your answer before submitting</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Interview;
