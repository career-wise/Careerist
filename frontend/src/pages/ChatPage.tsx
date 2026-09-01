import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Send, 
  Settings, 
  MessageCircle, 
  Search, 
  Menu, 
  X,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Sparkles,
  Brain,
  Zap,
  Trash2,
  Target,
  TrendingUp,
} from 'lucide-react';
import Button from '../components/shared/ui/Button';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  messages: Message[];
}

const ChatPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState("6");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Career Path Exploration",
      lastMessage: "What career suits me best?",
      messages: [
        { id: "1", content: "What career suits me best based on my interests in technology?", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "Based on your interest in technology, I can suggest several exciting career paths! Let me help you explore options in software development, data science, AI/ML, cybersecurity, and more. What specific areas intrigue you most?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "2",
      title: "Resume Building Tips",
      lastMessage: "How to improve my resume?",
      messages: [
        { id: "1", content: "How can I improve my resume for tech jobs?", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "Great question! For tech resumes, focus on: 1) Highlighting technical skills and projects, 2) Using action verbs and quantifiable achievements, 3) Including relevant certifications, 4) Showcasing your GitHub portfolio. Would you like specific examples?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "3",
      title: "Interview Preparation",
      lastMessage: "Tips for tech interviews",
      messages: [
        { id: "1", content: "What should I prepare for tech interviews?", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "Tech interviews typically cover: coding challenges, system design, behavioral questions, and technical knowledge. I recommend practicing on LeetCode, understanding data structures, and preparing STAR method stories. Shall we practice some questions?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "4",
      title: "Skill Development Roadmap",
      lastMessage: "Learning path for AI",
      messages: [
        { id: "1", content: "What's the best learning path for AI and machine learning?", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "Excellent choice! Here's a structured roadmap: 1) Python programming fundamentals, 2) Mathematics (linear algebra, calculus, statistics), 3) ML basics and libraries (scikit-learn), 4) Deep learning (TensorFlow/PyTorch), 5) Specialized areas (NLP, Computer Vision). Would you like detailed resources?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "5",
      title: "Salary Negotiation",
      lastMessage: "How to negotiate salary?",
      messages: [
        { id: "1", content: "Tips for negotiating my first job offer?", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "Salary negotiation is crucial! Key tips: 1) Research market rates for your role, 2) Consider total compensation (benefits, equity, bonuses), 3) Express enthusiasm first, then negotiate, 4) Have a target range ready, 5) Be prepared to walk away if needed. Want to practice?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "6",
      title: "Career Transition Strategy",
      lastMessage: "Switching careers advice",
      messages: [
        {
          id: "1",
          content: "I want to transition from marketing to data analytics. What steps should I take?",
          isUser: true,
          timestamp: new Date(),
        },
        {
          id: "2",
          content:
            "That's an exciting career move! Here's a strategic approach:\n\n1. **Build foundational skills**: Start with Excel, SQL, and basic statistics. These are essential for any data analyst role.\n\n2. **Learn data visualization**: Master tools like Tableau or Power BI to communicate insights effectively.\n\n3. **Leverage your marketing background**: Your domain knowledge is valuable! Focus on marketing analytics roles where your experience gives you an edge.\n\n4. **Create a portfolio**: Work on real projects - analyze datasets, create dashboards, and showcase your analytical thinking.\n\n5. **Network strategically**: Connect with data analysts in marketing companies. Your industry knowledge is an advantage.\n\n6. **Consider certifications**: Google Data Analytics or similar credentials can boost your credibility.\n\nYour marketing experience actually positions you well for analytics roles in marketing teams. Companies value candidates who understand both data and business context!",
          isUser: false,
          timestamp: new Date(),
        },
        {
          id: "3",
          content: "How long will this transition typically take?",
          isUser: true,
          timestamp: new Date(),
        },
        {
          id: "4",
          content:
            "Great question! The timeline varies based on your commitment and current skills:\n\n**Accelerated path (3-6 months)**: If you dedicate 15-20 hours/week to learning and portfolio building, you could be job-ready in 3-6 months. This works well if you have some analytical background.\n\n**Moderate pace (6-12 months)**: Most career transitioners find success in 6-12 months with consistent effort (10-15 hours/week). This allows time to build skills gradually while working.\n\n**Part-time approach (12-18 months)**: If you're working full-time and can only dedicate 5-10 hours weekly, expect 12-18 months to build competitive skills and land your first role.\n\nPro tip: Try to get some analytics experience in your current marketing role - even small data projects can significantly shorten your transition timeline and make your story more compelling to employers!",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentConversation = conversations.find((conv) => conv.id === activeConversationId);
  const messages = currentConversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleConversationSelect = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    const newConversationId = Date.now().toString();
    const newConversation: Conversation = {
      id: newConversationId,
      title: "New Conversation",
      lastMessage: "",
      messages: [],
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversationId);
    setIsSidebarOpen(false);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all conversations?")) {
      setConversations([]);
      setActiveConversationId("");
    }
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(conversations[0]?.id || "");
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          const updatedMessages = [...conv.messages, newMessage];
          return {
            ...conv,
            messages: updatedMessages,
            lastMessage: inputValue,
            title: conv.title === "New Conversation" ? inputValue.slice(0, 40) + "..." : conv.title,
          };
        }
        return conv;
      }),
    );

    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with career-focused content
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm Careerist AI, your career guide! I understand your question and I'm here to provide personalized career guidance. Let me help you navigate your professional journey with insights tailored to your goals and aspirations.",
        isUser: false,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, aiResponse],
            };
          }
          return conv;
        }),
      );
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-switzer">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setIsSidebarOpen(true)} className="hover:bg-gray-100">
            <Menu className="w-5 h-5 text-brand-ink" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-ink rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-display font-bold text-brand-ink tracking-tight">
              Careerist AI
            </h1>
          </div>
          <Link to="/">
            <Button variant="ghost" className="hover:bg-gray-100">
              <X className="w-4 h-4 text-brand-ink" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-brand-ink/50 backdrop-blur-sm z-50" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar with Sleek Minimalist Styling */}
      <div
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 fixed md:relative z-50 md:z-0
        w-80 bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
        h-full shadow-2xl md:shadow-none
      `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4 border-b border-gray-100">
          <Button variant="ghost" onClick={() => setIsSidebarOpen(false)} className="hover:bg-gray-100">
            <X className="w-5 h-5 text-brand-ink" />
          </Button>
        </div>

        {/* Header with Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-brand-ink tracking-tight">
                Careerist AI
              </h1>
              <p className="text-xs font-medium text-brand-slate">Your AI Career Mentor</p>
            </div>
          </div>
          <Button
            onClick={handleNewChat}
            className="w-full bg-brand-ink text-white hover:bg-gray-800 rounded-full py-3 flex items-center justify-center gap-2 transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Conversation
          </Button>
        </div>

        {/* Search */}
        <div className="px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-ink/20 focus:border-brand-ink transition-all font-medium placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
          <div className="mb-2 px-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-brand-slate uppercase tracking-wider">Recent</p>
              <button 
                onClick={handleClearAll}
                className="text-gray-400 hover:text-red-500 text-xs font-medium flex items-center gap-1 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleConversationSelect(conv.id)}
                className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  conv.id === activeConversationId 
                    ? "bg-gray-100" 
                    : "hover:bg-gray-50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  conv.id === activeConversationId 
                    ? "bg-brand-ink" 
                    : "bg-white border border-gray-200"
                }`}>
                  <MessageCircle className={`w-4 h-4 ${
                    conv.id === activeConversationId ? "text-white" : "text-brand-slate"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${
                    conv.id === activeConversationId ? "text-brand-ink" : "text-gray-700"
                  }`}>
                    {conv.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate font-medium">{conv.lastMessage}</p>
                </div>
                <button
                  onClick={(e) => handleDeleteConversation(conv.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-md transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <Link to="/settings" className="flex items-center gap-3 mb-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5 text-brand-slate" />
            <span className="text-sm font-semibold text-brand-slate">Settings & Preferences</span>
          </Link>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-10 h-10 bg-brand-ink rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AN</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-brand-ink">Andrew Nelson</p>
              <p className="text-xs text-brand-slate font-medium">Pro Member</p>
            </div>
            <div className="w-2 h-2 bg-brand-neon border border-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0 bg-white md:m-4 md:rounded-[2rem] md:shadow-sm md:border md:border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center shadow-sm">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-brand-ink">Careerist AI</span>
              <p className="text-xs text-brand-slate font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse"></span>
                Online & Ready to Help
              </p>
            </div>
          </div>
          <Button variant="ghost" className="hidden md:flex hover:bg-gray-50 rounded-full w-10 h-10 p-0 items-center justify-center text-brand-slate hover:text-brand-ink">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="text-center mt-20">
                <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Sparkles className="w-10 h-10 text-brand-ink" />
                </div>
                <h3 className="text-3xl font-display font-bold text-brand-ink mb-3 tracking-tight">Welcome to Careerist!</h3>
                <p className="text-brand-slate font-medium text-lg mb-10">Your AI-powered career mentor is here to guide you.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {[
                    { icon: Target, text: "Explore career paths" },
                    { icon: Zap, text: "Build your skills" },
                    { icon: TrendingUp, text: "Prepare for interviews" },
                    { icon: Brain, text: "Get personalized advice" },
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-white border border-gray-200 rounded-2xl hover:border-brand-ink hover:shadow-md transition-all cursor-pointer group flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-brand-ink transition-colors">
                        <item.icon className="w-5 h-5 text-brand-ink group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-sm font-semibold text-brand-ink">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex gap-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  {!message.isUser && (
                    <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 rounded-xl flex items-center justify-center bg-brand-ink shadow-sm mt-1">
                      <Brain className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  )}
                  <div className={`flex-1 max-w-3xl ${message.isUser ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1.5 px-1">
                      <span className="text-xs font-bold text-brand-slate uppercase tracking-wider">
                        {message.isUser ? "You" : "Careerist AI"}
                      </span>
                      {!message.isUser && (
                        <span className="px-1.5 py-0.5 bg-brand-neon text-brand-ink text-[10px] font-bold rounded-md">
                          AI
                        </span>
                      )}
                    </div>
                    <div className={`p-4 md:p-5 text-sm md:text-base ${
                      message.isUser 
                        ? 'bg-brand-ink text-white ml-auto rounded-[1.5rem] rounded-tr-sm shadow-sm' 
                        : 'bg-gray-50 border border-gray-100 text-gray-800 rounded-[1.5rem] rounded-tl-sm'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {!message.isUser && (
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap px-1">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-brand-ink">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-brand-ink">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-brand-ink">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-brand-ink hover:bg-gray-100 rounded-lg transition-colors ml-auto font-semibold">
                          <RefreshCw className="w-3.5 h-3.5" />
                          Regenerate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-ink rounded-xl flex items-center justify-center mt-1 shadow-sm">
                  <Brain className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 px-1">
                    <span className="text-xs font-bold text-brand-slate uppercase tracking-wider">Careerist AI</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 py-4 px-5 rounded-[1.5rem] rounded-tl-sm inline-flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-brand-ink rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brand-ink rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-2 h-2 bg-brand-ink rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-100 shrink-0">
          <div className="flex gap-3 items-end max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-[1.5rem] px-5 py-3.5 focus-within:border-brand-ink focus-within:ring-2 focus-within:ring-brand-ink/10 transition-all shadow-sm">
                <div className="w-8 h-8 bg-brand-ink rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-brand-neon" />
                </div>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Careerist AI anything about your career..."
                  className="flex-1 resize-none bg-transparent outline-none text-brand-ink placeholder:text-gray-400 max-h-32 font-medium"
                  rows={1}
                />
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-brand-ink text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 shadow-md"
            >
              <Send className="w-5 h-5 ml-1" />
            </Button>
          </div>
          <p className="text-[11px] font-medium text-center text-gray-400 mt-3">
            Careerist AI is powered by AI and may make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;