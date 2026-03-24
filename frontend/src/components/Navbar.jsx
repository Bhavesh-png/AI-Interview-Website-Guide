import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrainCircuit, Home as HomeIcon, LogIn, Menu, X, User, LogOut, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Check auth state
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleAuthChange = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-change'));
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate('/login');
  };

  const mockUser = {
    name: "Alex Developer",
    email: "alex@example.com",
    role: "Full Stack"
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled
        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-1.5 bg-indigo-600/20 rounded-lg border border-indigo-500/30 group-hover:bg-indigo-600/30 transition-colors">
            <BrainCircuit size={20} className="text-indigo-400" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI Interview
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/') ? 'bg-indigo-500/15 text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <HomeIcon size={16} /> Home
          </Link>
          
          <ThemeToggle />
          
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <User size={18} className="text-slate-600 dark:text-slate-300" />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{mockUser.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{mockUser.email}</p>
                    <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {mockUser.role}
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Settings size={16} /> Account Settings
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-800 py-1">
                    <button onClick={handleLogout} className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <LogIn size={16} /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-4 py-4 space-y-4">
          <div className="space-y-1">
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-sm font-medium">
              <HomeIcon size={16} /> Home
            </Link>
          </div>
          
          <div className="px-4 py-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Theme</span>
            <ThemeToggle />
          </div>
          
          {isLoggedIn ? (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="px-4 mb-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <User size={18} className="text-slate-600 dark:text-slate-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{mockUser.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{mockUser.email}</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-sm font-medium">
                  <Settings size={16} /> Account Settings
                </Link>
                <button onClick={handleLogout} className="flex items-center w-full gap-2 px-4 py-2.5 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-sm font-medium">
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 rounded-lg text-white text-sm font-semibold transition-all">
                <LogIn size={16} /> Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
