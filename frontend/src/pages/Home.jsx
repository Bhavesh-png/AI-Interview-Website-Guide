import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Server, Users, ArrowRight, Sparkles, Zap, Shield, Layers, Terminal, Target, Activity, Brain } from 'lucide-react';

const roles = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'React, Vue, Angular, UI/UX patterns',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Node.js, Python, APIs, databases',
    icon: Server,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'fullstack',
    name: 'Full Stack',
    description: 'Both frontend and backend skills',
    icon: Layers,
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'devops',
    name: 'DevOps',
    description: 'CI/CD, Docker, Kubernetes, deployment',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    description: 'Communication, teamwork, problem-solving',
    icon: Users,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Architecture, scalability, tradeoffs',
    icon: Shield,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'coding',
    name: 'Coding',
    description: 'Algorithms, data structures, LeetCode-style',
    icon: Terminal,
    gradient: 'from-emerald-400 to-cyan-500',
  },
  {
    id: 'mixed',
    name: 'Mixed',
    description: 'A mix of questions from all specialties',
    icon: Sparkles,
    gradient: 'from-slate-700 to-slate-900',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = React.useState('backend');
  const [difficulty, setDifficulty] = React.useState('Medium');

  const handleStart = () => {
    if (!selectedRole) return;

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    
    // Determine the target route based on specialty
    const targetRoute = selectedRole === 'coding' ? '/coding-interview' : '/interview';

    if (!token) {
      // Defer login: send them to login but remember where they wanted to go
      navigate('/login', { state: { message: "Please log in to start your interview practice.", from: { pathname: targetRoute, state: { role: selectedRole, difficulty } } } });
    } else {
      // Allowed to proceed immediately
      navigate(targetRoute, { state: { role: selectedRole, difficulty } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background soft blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-100/50 dark:bg-purple-900/30 rounded-full blur-[120px] pointer-events-none transition-colors" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-indigo-900/30 rounded-full blur-[120px] pointer-events-none transition-colors" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-yellow-50/50 dark:bg-amber-900/10 rounded-full blur-[100px] pointer-events-none transition-colors" />

      <div className="max-w-6xl w-full relative z-10 pt-4 pb-20">
        
        {/* DASHBOARD SECTION - MOVED TO TOP */}
        <motion.div
          id="dashboard-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 shadow-xl dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white dark:border-slate-800 relative overflow-hidden transition-colors duration-300 mx-auto max-w-4xl mb-24"
        >
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-3 block">
              Dashboard
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight transition-colors">
              Pick your specialty
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base font-medium transition-colors">
              Select a branch below to practice the most relevant questions for your target role.
            </p>
          </div>

          {/* Grid Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <motion.div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden ${
                    isSelected
                      ? `bg-gradient-to-br ${role.id === 'backend' ? 'from-[#bd4be3] to-[#ef4ec0]' : role.gradient} text-white shadow-xl shadow-indigo-200/50 dark:shadow-indigo-900/20`
                      : 'bg-[#f8fafc]/80 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-indigo-500/5 border border-slate-100 dark:border-slate-700/50 hover:border-white dark:hover:border-slate-600'
                  }`}
                >
                  {/* Icon Box */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all ${
                    isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700/50'
                  }`}>
                    <role.icon 
                      size={22} 
                      className={isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors'} 
                    />
                  </div>

                  {/* Text */}
                  <h3 className={`font-bold text-lg mb-1.5 transition-colors ${isSelected ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                    {role.name}
                  </h3>
                  <p className={`text-xs leading-relaxed font-medium transition-colors ${isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
                    {role.description}
                  </p>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-5 right-5 text-white"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#ea580c' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full sm:w-2/3 py-4 bg-[#f97316] text-white text-lg font-bold rounded-2xl transition-all shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] dark:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.2)] flex items-center justify-center gap-2"
            >
              Start {roles.find(r => r.id === selectedRole)?.name} Interview <ArrowRight size={20} />
            </motion.button>
            {!localStorage.getItem('token') && (
               <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">You will be asked to log in first.</p>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
