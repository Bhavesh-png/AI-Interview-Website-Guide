import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, BrainCircuit, ChevronRight, Briefcase, GraduationCap, Building2, FileText, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: '', skillLevel: '', preferredLanguage: '',
    collegeName: '', yearOfStudy: '', targetCompany: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculatePasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length > 8) score += 25;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) score += 25;
    if (pass.match(/\d/)) score += 25;
    if (pass.match(/[^a-zA-Z\d]/)) score += 25;
    return score;
  };

  const strength = calculatePasswordStrength(formData.password);

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill all basic fields'); return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match'); return false;
    }
    if (strength < 50) {
      setError('Please use a stronger password'); return false;
    }
    setError(''); return true;
  };

  const validateStep2 = () => {
    if (!formData.role || !formData.skillLevel || !formData.preferredLanguage) {
      setError('Please fill all required profile fields'); return false;
    }
    setError(''); return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    setError(''); setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Backend expects UserCreate schema: name, email, password, role, skillLevel, preferredLanguage, collegeName, yearOfStudy, targetCompany
      await api.post('/auth/register', formData);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[30rem] h-[30rem] bg-indigo-500/10 dark:bg-purple-600/10 rounded-full blur-[100px] absolute top-1/2 left-1/4 -translate-y-1/2" />
        <div className="w-[20rem] h-[20rem] bg-blue-500/10 dark:bg-indigo-600/10 rounded-full blur-[80px] absolute top-1/4 right-1/4" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl mb-5 shadow-sm">
            <BrainCircuit size={28} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Create your account</h1>
          <p className="text-slate-500 dark:text-slate-400">Join the ultimate AI interview practice platform.</p>
        </div>

        <div className="glass-card shadow-xl p-6 sm:p-10 mb-8 rounded-[2rem]">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= i 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}>
                  {step > i ? <CheckCircle2 size={16} /> : i}
                </div>
                {i < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    step > i ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-800'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 mb-6 text-sm"
            >
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* STEP 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field pl-10" placeholder="Alex Developer" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field pl-10" placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="input-field pl-10 pr-10" placeholder="••••••••" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2 flex gap-1 h-1.5">
                        <div className={`flex-1 rounded-full transition-colors ${strength >= 25 ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                        <div className={`flex-1 rounded-full transition-colors ${strength >= 50 ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                        <div className={`flex-1 rounded-full transition-colors ${strength >= 75 ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                        <div className={`flex-1 rounded-full transition-colors ${strength >= 100 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-field pl-10" placeholder="••••••••" required />
                    </div>
                  </div>

                  <button type="button" onClick={handleNext} className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all active:scale-[0.98]">
                    Continue <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Profile Info */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Target Role <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <select name="role" value={formData.role} onChange={handleChange} className="input-field pl-10 appearance-none bg-no-repeat" style={{backgroundPosition: 'calc(100% - 1rem) center', backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg width='12' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`}}>
                        <option value="" disabled>Select your specialty</option>
                        <option value="Frontend">Frontend Developer</option>
                        <option value="Backend">Backend Developer</option>
                        <option value="Full Stack">Full Stack Developer</option>
                        <option value="DevOps">DevOps Engineer</option>
                        <option value="System Design">System Architecture</option>
                        <option value="Behavioral">Behavioral / HR</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Current Skill Level <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({...formData, skillLevel: level})}
                          className={`py-3 px-2 text-sm font-medium rounded-xl border transition-all ${
                            formData.skillLevel === level 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-500/50 dark:text-indigo-300' 
                              : 'bg-transparent border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Preferred Language <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 gap-3">
                      {['English', 'Hindi'].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setFormData({...formData, preferredLanguage: lang})}
                          className={`py-3 px-2 text-sm font-medium rounded-xl border transition-all ${
                            formData.preferredLanguage === lang 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-500/50 dark:text-indigo-300' 
                              : 'bg-transparent border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={handleBack} className="w-1/3 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all">Back</button>
                    <button type="button" onClick={handleNext} className="w-2/3 flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all active:scale-[0.98]">
                      Continue <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Optional Info */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                    These fields are optional but help us tailor the interview simulation to your specific background.
                  </p>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">College / University</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} className="input-field pl-10" placeholder="MIT, Stanford, etc." />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Year of Study</label>
                    <input type="text" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className="input-field" placeholder="e.g. 3rd Year, Graduated" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Target Company</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" name="targetCompany" value={formData.targetCompany} onChange={handleChange} className="input-field pl-10" placeholder="Google, Microsoft, Stripe" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50 mt-6">
                    <div className="flex gap-3 pt-4">
                      <button type="button" onClick={handleBack} disabled={loading} className="w-1/3 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all disabled:opacity-50">Back</button>
                      <button type="submit" disabled={loading} className="w-2/3 flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                        <UserPlus size={18} />
                        {loading ? 'Creating Account...' : 'Finish Sign Up'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 mx-auto">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
