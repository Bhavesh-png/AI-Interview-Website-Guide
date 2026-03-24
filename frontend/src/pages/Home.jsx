import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Server, Users, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const roles = [
  {
    id: 'frontend',
    name: 'Frontend Dev',
    description: 'React, CSS, JavaScript & browser APIs',
    icon: Code2,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    glow: 'hover:shadow-blue-500/20',
  },
  {
    id: 'backend',
    name: 'Backend Dev',
    description: 'APIs, databases, system design',
    icon: Server,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'hover:shadow-emerald-500/20',
  },
  {
    id: 'hr',
    name: 'HR / Behavioral',
    description: 'Soft skills, teamwork, leadership',
    icon: Users,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    glow: 'hover:shadow-purple-500/20',
  },
];

const difficulties = [
  { label: 'Easy', color: 'text-emerald-400', activeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { label: 'Medium', color: 'text-amber-400', activeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { label: 'Hard', color: 'text-red-400', activeClass: 'bg-red-500/20 text-red-300 border-red-500/40' },
];

const features = [
  { icon: Sparkles, text: 'AI-powered feedback', color: 'text-indigo-400' },
  { icon: Zap, text: 'Real-time evaluation', color: 'text-amber-400' },
  { icon: Shield, text: 'Industry questions', color: 'text-emerald-400' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Home = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [difficulty, setDifficulty] = React.useState('Medium');

  const handleStart = () => {
    if (selectedRole) {
      navigate('/interview', { state: { role: selectedRole, difficulty } });
    }
  };

  const selectedDiff = difficulties.find(d => d.label === difficulty);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-6">
          <Sparkles size={14} />
          AI-Powered Interview Practice
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-5 leading-tight">
          <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            Master Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Next Interview
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Practice with AI-powered feedback, real-time evaluation, and curated
          questions tailored to your role.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {features.map(({ icon: Icon, text, color }) => (
            <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
              <Icon size={14} className={color} />
              {text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Role Selection */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="text-center text-slate-500 text-sm font-semibold uppercase tracking-widest mb-6">
          Choose your interview track
        </motion.p>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRole(role.id)}
              className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 shadow-xl ${
                selectedRole === role.id
                  ? `border-indigo-500 bg-indigo-500/10 shadow-indigo-500/20`
                  : `border-white/5 bg-white/[0.03] hover:bg-white/[0.06] ${role.glow}`
              }`}
            >
              {selectedRole === role.id && (
                <div className="absolute top-3 right-3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              )}
              <div className={`inline-flex p-3 rounded-xl ${role.bg} border ${role.border} mb-4`}>
                <role.icon className={role.color} size={24} />
              </div>
              <h3 className="font-bold text-lg mb-1.5">{role.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{role.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Difficulty + CTA */}
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <div>
              <p className="text-center text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">
                Select difficulty
              </p>
              <div className="flex gap-2 p-1 bg-slate-900/80 border border-white/10 rounded-xl">
                {difficulties.map((d) => (
                  <button
                    key={d.label}
                    onClick={() => setDifficulty(d.label)}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all border ${
                      difficulty === d.label
                        ? `${d.activeClass} shadow-md`
                        : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              className="group flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-indigo-600/30 text-lg"
            >
              Start Interview
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
