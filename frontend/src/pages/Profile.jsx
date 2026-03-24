import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Briefcase, Camera, Save, Shield } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Developer',
    email: 'alex@example.com',
    role: 'Full Stack',
    bio: 'Passionate about building scalable web applications and learning new technologies.',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the data to your backend API
    console.log('Saved profile data:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* Header Cover / Background */}
        <div className="h-32 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-blue-500/30 relative">
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
        </div>

        <div className="p-8 sm:p-10 pb-12 relative">
          {/* Avatar Section */}
          <div className="absolute -top-16 left-8 sm:left-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden shadow-xl">
                <User size={64} className="text-slate-400" />
              </div>
              <button className="absolute bottom-0 right-0 p-2.5 bg-indigo-500 text-white rounded-full border-4 border-slate-900 hover:bg-indigo-400 transition-colors shadow-lg">
                <Camera size={16} />
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Save size={18} /> Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10 active:scale-95"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="mt-8 sm:mt-0 pt-16 sm:pt-4">
            <h1 className="text-3xl font-bold text-white mb-2">{formData.name}</h1>
            <div className="flex items-center gap-3 text-slate-400 mb-8">
              <span className="flex items-center gap-1.5 text-sm"><Mail size={16} /> {formData.email}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              <span className="flex items-center gap-1.5 text-sm text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                <Shield size={14} /> {formData.role}
              </span>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 border rounded-xl text-white text-sm outline-none transition-all ${
                      isEditing 
                        ? 'border-indigo-500/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10' 
                        : 'border-white/5 opacity-70 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 border rounded-xl text-white text-sm outline-none transition-all ${
                      isEditing 
                        ? 'border-indigo-500/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10' 
                        : 'border-white/5 opacity-70 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Current Specialty / Role</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Briefcase size={18} />
                  </div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 border rounded-xl text-white text-sm outline-none transition-all appearance-none ${
                      isEditing 
                        ? 'border-indigo-500/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10' 
                        : 'border-white/5 opacity-70 cursor-not-allowed'
                    }`}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="DevOps">DevOps</option>
                    <option value="System Design">System Design</option>
                    <option value="Behavioral">Behavioral</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Bio / About Me</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full p-4 bg-slate-900/50 border rounded-xl text-white text-sm outline-none transition-all resize-none ${
                    isEditing 
                      ? 'border-indigo-500/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10' 
                      : 'border-white/5 opacity-70 cursor-not-allowed'
                  }`}
                />
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
