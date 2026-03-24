import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Server, Users, ArrowRight } from 'lucide-react';

const roles = [
  { id: 'frontend', name: 'Frontend Developer', icon: Code2, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'backend', name: 'Backend Developer', icon: Server, color: 'text-green-400', bg: 'bg-green-400/10' },
  { id: 'hr', name: 'HR / Behavioral', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

const difficulties = ['Easy', 'Medium', 'Hard'];

const Home = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [difficulty, setDifficulty] = React.useState('Medium');

  const handleStart = () => {
    if (selectedRole) {
      navigate('/interview', { state: { role: selectedRole, difficulty } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent italic">
          Master Your Next Interview
        </h1>
        <p className="text-slate-400 text-lg">
          Practice with AI-powered feedback and real-time evaluation.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {roles.map((role) => (
          <motion.div
            key={role.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedRole(role.id)}
            className={`p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center gap-4 ${
              selectedRole === role.id 
                ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20' 
                : 'border-white/5 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className={`p-4 rounded-2xl ${role.bg}`}>
              <role.icon className={role.color} size={32} />
            </div>
            <h3 className="font-bold text-lg">{role.name}</h3>
          </motion.div>
        ))}
      </div>

      {selectedRole && (
        <motion.div 
          initial={{ opacity: 0, opacity: 0 }}
          animate={{ opacity: 1, opacity: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex gap-4 p-1 bg-white/5 rounded-2xl border border-white/10">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  difficulty === d 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <button 
            onClick={handleStart}
            className="group flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            Start Interview
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
