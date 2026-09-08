import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { apiFetch } from '../../../lib/api';

const faqs = [
  { q: 'What is CareerWise?', a: 'CareerWise is an AI-powered platform to help students map out their educational and career paths.' },
  { q: 'How much does it cost?', a: 'CareerWise offers a free basic plan. Premium features will be available soon.' },
  { q: 'Is my data secure?', a: 'Yes, we take privacy seriously. Your data is encrypted and never sold.' },
];

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Chat state
  const [messages, setMessages] = useState<{ id: string; content: string; isUser: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const historyToSend = messages.slice(-4).map(m => ({
        role: m.isUser ? 'user' : 'assistant',
        content: m.content
      }));
      historyToSend.push({ role: 'user', content: newMessage.content });

      const response = await apiFetch('/chat/', {
        method: 'POST',
        body: JSON.stringify({ 
          prompt: newMessage.content,
          messages: historyToSend
        })
      });

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: response.response || "I'm sorry, I couldn't process that request.",
        isUser: false,
      }]);
    } catch (err: any) {
      console.error("Chat API Error:", err);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (location.pathname === '/chat') {
    return null;
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* Popover Window */}
      <div 
        className={`mb-4 w-80 sm:w-96 bg-white border border-brand-slate/20 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-brand-ink p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-neon/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-brand-neon" />
            </div>
            <h3 className="font-bold text-white">
              {isLandingPage ? 'Frequently Asked Questions' : 'Quick Assistant'}
            </h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-brand-slate hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLandingPage ? (
          /* FAQ Content */
          <div className="p-4 max-h-96 overflow-y-auto custom-scrollbar">
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-brand-slate/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-3 text-left font-bold text-brand-ink text-sm flex justify-between items-center bg-brand-mist hover:bg-brand-slate/5 transition-colors"
                  >
                    {faq.q}
                    {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openFaq === idx && (
                    <div className="p-3 bg-white text-sm text-brand-slate">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Content */
          <div className="flex flex-col h-96">
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 bg-brand-mist/30">
              {messages.length === 0 && (
                <div className="text-center text-brand-slate text-sm mt-4">
                  Ask me any quick doubts you have!
                </div>
              )}
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    msg.isUser 
                      ? 'bg-brand-neon text-brand-ink rounded-br-none' 
                      : 'bg-white border border-brand-slate/10 text-brand-ink rounded-bl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-brand-slate/10 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-neon animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-brand-neon animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-brand-neon animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 bg-white border-t border-brand-slate/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask a question..."
                  className="flex-1 bg-brand-mist border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-neon/50 outline-none text-brand-ink placeholder:text-brand-slate/50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-9 h-9 rounded-full bg-brand-ink text-white flex items-center justify-center hover:bg-brand-ink/80 disabled:opacity-50 transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-brand-ink text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Icon */}
        <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />

        {/* Pulse Animation */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-brand-neon opacity-50 animate-ping"></div>
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className={`absolute right-full mr-3 px-3 py-2 bg-brand-ink text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}>
            {isLandingPage ? 'Have questions?' : 'Ask a doubt'}
            <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-l-brand-ink border-t-4 border-t-transparent border-b-4 border-b-transparent transform -translate-y-1/2"></div>
          </div>
        )}

        {/* Notification Dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-neon rounded-full flex items-center justify-center shadow-sm">
            <span className="text-[10px] font-bold text-brand-ink">!</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingChatButton;