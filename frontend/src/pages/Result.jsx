import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, AlertCircle, TrendingUp, RotateCcw, Star } from 'lucide-react';

const ScoreRing = ({ score }) => {
  const pct = Math.min(Math.max(score / 10, 0), 1);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dash = pct * circumference;

  const color = score >= 8 ? '#34d399' : score >= 5 ? '#818cf8' : '#f87171';

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-white">{score}</span>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">/ 10</span>
      </div>
    </div>
  );
};

const getScoreLabel = (score) => {
  if (score >= 9) return { label: 'Exceptional', color: 'text-emerald-400' };
  if (score >= 7) return { label: 'Strong', color: 'text-emerald-400' };
  if (score >= 5) return { label: 'Good', color: 'text-indigo-400' };
  if (score >= 3) return { label: 'Needs Work', color: 'text-amber-400' };
  return { label: 'Weak', color: 'text-red-400' };
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, question, answer } = location.state || {};

  const evaluation = result?.content
    ? { score: 7, feedback: result.content, improvement: 'Practice more on technical depth.' }
    : (result || { score: 0, feedback: 'Evaluation not available.', improvement: 'N/A' });

  const scoreInfo = getScoreLabel(evaluation.score);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-4">
          <Award className="text-indigo-400" size={32} />
        </div>
        <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Interview Completed!
        </h1>
        <p className="text-slate-400">Here's your performance breakdown</p>
      </motion.div>

      {/* Score + Feedback grid */}
      <div className="grid md:grid-cols-3 gap-5 mb-5">
        {/* Score Card */}
        <motion.div variants={itemVariants} className="glass-card p-8 flex flex-col items-center justify-center text-center md:col-span-1">
          <ScoreRing score={evaluation.score} />
          <div className="mt-5">
            <p className={`text-lg font-bold ${scoreInfo.color}`}>{scoreInfo.label}</p>
            <p className="text-slate-500 text-sm mt-0.5">Overall Score</p>
          </div>
          <div className="mt-4 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={14}
                className={i <= Math.round(evaluation.score / 2) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}
              />
            ))}
          </div>
        </motion.div>

        {/* Feedback cards */}
        <div className="md:col-span-2 space-y-4">
          <motion.div variants={itemVariants} className="glass-card p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 bg-emerald-500/15 rounded-lg border border-emerald-500/20">
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>
              <h3 className="font-semibold text-emerald-400">AI Feedback</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{evaluation.feedback}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 bg-amber-500/15 rounded-lg border border-amber-500/20">
                <AlertCircle size={16} className="text-amber-400" />
              </div>
              <h3 className="font-semibold text-amber-400">How to Improve</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{evaluation.improvement}</p>
          </motion.div>
        </div>
      </div>

      {/* Answer comparison */}
      <motion.div variants={itemVariants} className="glass-card p-6 mb-8">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-1.5 bg-indigo-500/15 rounded-lg border border-indigo-500/20">
            <TrendingUp size={16} className="text-indigo-400" />
          </div>
          <h3 className="font-semibold text-slate-200">Answer Comparison</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950/50 rounded-xl p-5 border border-white/5">
            <span className="block text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-3">Your Answer</span>
            <p className="text-slate-300 leading-relaxed italic">"{answer || 'No answer recorded.'}"</p>
          </div>
          <div className="bg-indigo-500/5 rounded-xl p-5 border border-indigo-500/15">
            <span className="block text-[10px] text-indigo-500 font-bold uppercase tracking-widest mb-3">Ideal Points</span>
            <p className="text-slate-300 leading-relaxed">{question?.answer || 'N/A'}</p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-xl shadow-indigo-600/25 active:scale-95"
        >
          <RotateCcw size={18} />
          Try Another Question
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Result;
