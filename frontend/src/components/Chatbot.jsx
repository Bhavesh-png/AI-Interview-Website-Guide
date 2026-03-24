import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import api from '../services/api'; // Or standard fetch if you prefer

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your AI Interview platform guide. Let me know if you need help with the platform or some quick interview tips!" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage.trim() };
    const newHistory = [...messages, userMessage];
    
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      // In production, you would send newHistory to /api/chat so OpenAI gets full context
      const response = await api.post('/chat', { messages: newHistory });
      setMessages([...newHistory, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newHistory, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[70vh] glass-card bg-white/95 dark:bg-slate-900/95 flex flex-col rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-indigo-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold text-sm">Platform Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50 dark:bg-slate-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${
                      msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' : 'bg-indigo-600 text-white'
                    }`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-sm' 
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-sm border border-slate-100 dark:border-slate-700'
                    }`}>
                      {msg.content}
                    </div>

                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex w-full justify-start">
                  <div className="flex items-end gap-2 max-w-[85%] flex-row">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                      <Bot size={14} />
                    </div>
                    <div className="px-5 py-3 rounded-2xl text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-sm border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-1">
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2, ease: "easeInOut" }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4, ease: "easeInOut" }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-xl pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="absolute right-2 p-1.5 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors shadow-sm"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-indigo-600/30 transition-colors focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default Chatbot;
