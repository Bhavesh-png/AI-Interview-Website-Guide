import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === 'dark' ? 0 : 36,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center text-amber-300"
      >
        <Moon size={18} fill="currentColor" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          y: theme === 'light' ? 0 : -36,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center text-amber-500"
      >
        <Sun size={20} fill="currentColor" />
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
