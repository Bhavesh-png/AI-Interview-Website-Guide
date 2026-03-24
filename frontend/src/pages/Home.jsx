import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Server, Users, ArrowRight, Sparkles, Zap, Shield, Layers } from 'lucide-react';

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
    if (selectedRole) {
      navigate('/interview', { state: { role: selectedRole, difficulty } });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background soft blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-yellow-50/50 rounded-full blur-[100px]" />

      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden"
        >
          {/* Header */}
          <div className="mb-10 text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-3 block">
              Choose Interview Branch
            </span>
            <h1 className="text-4xl font-extrabold text-[#0f172a] mb-3 tracking-tight">
              Pick your specialty
            </h1>
            <p className="text-[#64748b] text-base font-medium">
              Select a branch below to practice the most relevant interview questions for your role.
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
                      ? `bg-gradient-to-br ${role.id === 'backend' ? 'from-[#bd4be3] to-[#ef4ec0]' : role.gradient} text-white shadow-xl shadow-indigo-200/50`
                      : 'bg-[#f8fafc]/80 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100 hover:border-white'
                  }`}
                >
                  {/* Icon Box */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all ${
                    isSelected ? 'bg-white/20' : 'bg-[#f1f5f9]'
                  }`}>
                    <role.icon 
                      size={22} 
                      className={isSelected ? 'text-white' : 'text-[#64748b] group-hover:text-[#0f172a]'} 
                    />
                  </div>

                  {/* Text */}
                  <h3 className={`font-bold text-lg mb-1.5 ${isSelected ? 'text-white' : 'text-[#1e293b]'}`}>
                    {role.name}
                  </h3>
                  <p className={`text-xs leading-relaxed font-medium ${isSelected ? 'text-white/80' : 'text-[#94a3b8]'}`}>
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
          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#ea580c' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full py-4.5 bg-[#f97316] text-white text-lg font-bold rounded-2xl transition-all shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)]"
            >
              Start {roles.find(r => r.id === selectedRole)?.name} Interview
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
