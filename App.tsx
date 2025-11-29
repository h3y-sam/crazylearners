import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/Home';
import StudyMaterials from './pages/StudyMaterials';
import MCQPage from './pages/MCQ';
import UpdatesPage from './pages/Updates';
import Login from './pages/Login';
import Syllabus from './pages/Syllabus';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { askAiTutor } from './services/geminiService';
import { Message } from './types';
import { AuthProvider } from './contexts/AuthContext';

// --- AI Chat Widget ---
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Hi! I\'m CrazyBot 🤖. Stuck on a Physics derivation or Organic mechanism? Ask me anything!', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await askAiTutor(input);
    
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: aiResponseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-neonBlue to-neonPurple p-4 rounded-full shadow-[0_0_20px_rgba(138,79,255,0.5)] text-white"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] z-50 rounded-3xl overflow-hidden glass-panel flex flex-col shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-neonBlue/20 to-neonPurple/20 p-4 border-b border-white/10 flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <Bot size={20} className="text-neonBlue" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Crazy Tutor AI</h3>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-gray-300">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#050813]/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-neonBlue text-navy rounded-br-none font-medium' 
                    : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-black/20">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-neonBlue/50 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a doubt..."
                  className="bg-transparent border-none outline-none text-sm text-white flex-1 placeholder-gray-500"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="text-neonBlue hover:text-white transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/materials" element={<StudyMaterials />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/mcq" element={<MCQPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <AIChatWidget />
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;