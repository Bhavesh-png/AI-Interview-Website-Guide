import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, AlertCircle, TrendingUp, RotateCcw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, question, answer } = location.state || {};

  // Parse simulated OpenAI response if needed
  const evaluation = result?.content 
    ? { score: 7, feedback: result.content, improvement: "Practice more on technical depth." } // Mock parsing
    : (result || { score: 0, feedback: "Evaluation failed", improvement: "N/A" });

  const chartData = [
    { name: 'Score', value: evaluation.score },
    { name: 'Remaining', value: 10 - evaluation.score },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <div className="inline-flex p-4 rounded-full bg-indigo-500/10 mb-4">
          <Award className="text-indigo-400" size={48} />
        </div>
        <h1 className="text-4xl font-bold italic mb-2">Interview Completed!</h1>
        <p className="text-slate-400">Here is your performance overview</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1 glass-card p-8 flex flex-col items-center justify-center text-center">
          <div className="w-full h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#6366f1" />
                  <Cell fill="rgba(255,255,255,0.05)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{evaluation.score}</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Out of 10</span>
            </div>
          </div>
          <h3 className="font-bold text-lg mt-4">Overall Score</h3>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold italic">
              <CheckCircle2 size={24} /> Feedback
            </div>
            <p className="text-slate-300 leading-relaxed">
              {evaluation.feedback}
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold italic">
              <AlertCircle size={24} /> Points for Improvement
            </div>
            <p className="text-slate-300 leading-relaxed">
              {evaluation.improvement}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 mb-12">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2 italic">
          <TrendingUp className="text-indigo-400" /> Comparison
        </h3>
        <div className="space-y-6 text-sm">
          <div className="rounded-2xl bg-white/5 p-6 border border-white/5">
            <span className="block text-indigo-400 font-bold uppercase mb-2 tracking-widest text-[10px]">Your Answer</span>
            <p className="leading-relaxed text-slate-300 italic">"{answer}"</p>
          </div>
          <div className="rounded-2xl bg-indigo-500/5 p-6 border border-indigo-500/20">
            <span className="block text-indigo-400 font-bold uppercase mb-2 tracking-widest text-[10px]">Ideal Points</span>
            <p className="leading-relaxed text-slate-300">
              {question?.answer}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
        >
          <RotateCcw size={20} /> Try Another Question
        </button>
      </div>
    </div>
  );
};

export default Result;
