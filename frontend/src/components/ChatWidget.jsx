import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/assets';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUser, FaPaperPlane, FaQuestionCircle, FaInfoCircle, FaStethoscope } from 'react-icons/fa';

// --- Sub-Components for Modern UI ---

const UrgencyBadge = memo(({ urgency }) => {
  const urgencyStyles = {
    'Faible': 'bg-green-100 text-green-800',
    'Modéré': 'bg-yellow-100 text-yellow-800',
    'Élevé': 'bg-red-100 text-red-800',
    'Critique': 'bg-red-700 text-white animate-pulse',
    'Indéterminée': 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`text-xs font-bold mr-2 px-2.5 py-1 rounded-full ${urgencyStyles[urgency] || urgencyStyles['Indéterminée']}`}>
      Urgence : {urgency}
    </span>
  );
});

const TypingIndicator = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2 p-3 rounded-lg max-w-xs lg:max-w-md bg-gray-200"
  >
    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
  </motion.div>
));

const AIMessage = memo(({ msg }) => (
  <div className="flex items-end gap-2">
    <img src={assets.logo} alt="AI Avatar" className="w-8 h-8 rounded-full bg-white p-1 shadow-md"/>
    <div className="p-4 rounded-lg rounded-bl-none max-w-md bg-white shadow-sm border border-gray-100">
      {msg.urgency && <UrgencyBadge urgency={msg.urgency} />}
      <p className="text-gray-800 mt-2">{msg.text}</p>
      {msg.advice && (
        <blockquote className="mt-3 p-3 border-l-4 border-cyan-400 bg-cyan-50 text-sm text-gray-700 rounded-r-lg">
          <FaInfoCircle className="inline mr-2 text-cyan-500"/>
          <strong>Conseil :</strong> {msg.advice}
        </blockquote>
      )}
      {msg.questions && msg.questions.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><FaQuestionCircle className="inline mr-2 text-cyan-500"/>Questions de clarification :</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {msg.questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
      )}
      {msg.recommendations && msg.recommendations.length > 0 && (
        <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><FaStethoscope className="inline mr-2 text-cyan-500"/>Spécialistes recommandés :</h4>
            <div className="space-y-2">
                {msg.recommendations.map((doc) => <RecommendationCard key={doc.id} doc={doc} />)}
            </div>
        </div>
      )}
    </div>
  </div>
));

const UserMessage = memo(({ msg }) => (
    <div className="flex items-end gap-2 justify-end">
        <div className="p-3 rounded-lg rounded-br-none max-w-md bg-cyan-500 text-white shadow-sm">
            {msg.text}
        </div>
        <FaUser className="w-8 h-8 p-1.5 rounded-full bg-gray-200 text-gray-500"/>
    </div>
));

const RecommendationCard = memo(({ doc }) => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors">
        <h5 className="font-bold text-gray-800">{doc.name}</h5>
        <p className="text-sm text-cyan-600 font-semibold">{doc.speciality}</p>
        <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">{doc.experience} d'expérience</p>
            <Link to={`/appointment/${doc.id}`} className="bg-cyan-500 text-white text-xs font-bold py-1 px-3 rounded-full hover:bg-cyan-600 transition-colors">
                Prendre RDV
            </Link>
        </div>
    </div>
));

// --- Main Chat Widget Component ---

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Bonjour ! Je suis l'assistant IA de MediLab. Décrivez vos symptômes et je vous aiderai à trouver le bon spécialiste.",
    },
  ]);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:4000/api/ai/chat', { message: input });
      if (response.data.success) {
        const aiMessage = {
          sender: 'ai',
          text: response.data.message,
          recommendations: response.data.recommendations || [],
          urgency: response.data.urgency,
          advice: response.data.advice,
          questions: response.data.questions || [],
          isEmergency: response.data.isEmergency || false,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      const errorMessage = { sender: 'ai', text: "Désolé, une erreur technique m'empêche de répondre. Veuillez réessayer plus tard." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-cyan-500 text-white rounded-full p-4 shadow-2xl hover:bg-cyan-600 transition-colors duration-300"
        >
          <FaStethoscope className="w-8 h-8" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 inset-x-4 h-[80vh] md:bottom-24 md:right-8 md:left-auto md:w-full md:max-w-md md:h-[70vh] bg-gray-100 rounded-2xl shadow-2xl flex flex-col border border-gray-200 font-sans"
          >
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-2xl flex justify-between items-center shadow-lg">
              <h3 className="font-bold text-lg">Assistant IA MediLab</h3>
              <button onClick={() => setIsOpen(false)} className="text-white text-2xl font-bold hover:opacity-80 transition-opacity">&times;</button>
            </div>

            <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-6">
              {messages.map((msg, index) => (
                msg.sender === 'user' ? <UserMessage key={index} msg={msg} /> : <AIMessage key={index} msg={msg} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Décrivez vos symptômes..."
                  className="w-full p-3 border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 text-white p-3 rounded-r-full hover:bg-cyan-600 disabled:bg-cyan-300 transition-colors flex items-center justify-center w-16"
                  disabled={!input.trim() || isTyping}
                >
                  <FaPaperPlane className="w-5 h-5"/>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;