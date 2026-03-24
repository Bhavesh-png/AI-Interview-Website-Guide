import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, History, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          <BrainCircuit className="text-indigo-400" />
          AI Interview
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
            <HomeIcon size={18} /> Home
          </Link>
          <Link to="/history" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
            <History size={18} /> History
          </Link>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all font-medium">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
