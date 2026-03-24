import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Target, Layers, Code2, Server } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background soft blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-100/50 dark:bg-purple-900/30 rounded-full blur-[120px] pointer-events-none transition-colors" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none transition-colors" />
      
      <div className="max-w-6xl w-full relative z-10 pt-4 pb-20">
        <div className="w-full flex flex-col gap-16 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white dark:border-slate-800 transition-colors">
          
          {/* About & Mission / Vision */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
                <Brain size={16} /> <span>About Our Platform</span>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Our AI Interview Practice Platform is designed to help students and developers prepare for real-world technical and HR interviews with confidence. The platform provides structured interview questions from a curated dataset and evaluates user responses using advanced AI.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                With features like <strong className="text-slate-900 dark:text-slate-200">real-time feedback, video recording, and speech-to-text analysis</strong>, users can simulate real interview environments and improve their performance effectively.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Built using modern technologies like React, FastAPI, and MongoDB, this platform focuses on delivering a smooth, intelligent, and user-friendly experience.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-900/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To empower students and aspiring developers by providing a smart and accessible platform for interview preparation using AI-driven insights and real-world practice.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-amber-50/50 dark:bg-amber-900/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Vision</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To become a go-to platform for interview preparation by combining technology, data, and AI to enhance learning and career growth.
                </p>
              </div>
            </motion.div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800/60 my-4" />

          {/* Team Section */}
          <div className="text-center mb-6">
             <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">👨‍💻 Our Team</h2>
             <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Meet the brilliant developers behind the AI Interview project.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Bhavesh Borse",
                role: "Full Stack Developer",
                desc: "Focused on building scalable and efficient web applications. Passionate about backend development, system design, and creating impactful tech solutions.",
                bg: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5",
                icon: Layers
              },
              {
                name: "Mehul Tiwari",
                role: "Frontend Developer",
                desc: "Specializes in designing modern, responsive, and interactive user interfaces. Dedicated to delivering clean UI/UX using React and Tailwind CSS.",
                bg: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5",
                icon: Code2
              },
              {
                name: "Moin Ansari",
                role: "Backend Developer",
                desc: "Expert in API development and database management. Works on building secure, high-performance backend systems using FastAPI and MongoDB.",
                bg: "from-orange-500/10 to-red-500/10 dark:from-orange-500/5 dark:to-red-500/5",
                icon: Server
              }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`flex flex-col items-center text-center p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-gradient-to-b ${member.bg} glass-card transition-all`}
              >
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg mb-6 border border-slate-100 dark:border-slate-700">
                  <member.icon size={32} className="text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4">{member.role}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
