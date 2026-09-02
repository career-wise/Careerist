import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  ChevronLeft
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
  const [activeConversationId, setActiveConversationId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('persona, onboarding_answers')
          .eq('id', user.id)
          .single();
        if (data) {
          setUserProfile(data);
        }
      }
    };
    fetchProfile();
  }, []);

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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    let targetConversationId = activeConversationId;
    
    // Create a new conversation if one doesn't exist
    if (!targetConversationId) {
      targetConversationId = Date.now().toString();
      const newConversation: Conversation = {
        id: targetConversationId,
        title: inputValue.slice(0, 40) + "...",
        lastMessage: "",
        messages: [],
      };
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversationId(targetConversationId);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === targetConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: inputValue,
            title: conv.title === "New Conversation" ? inputValue.slice(0, 40) + "..." : conv.title,
          };
        }
        return conv;
      }),
    );

    const promptText = inputValue;
    setInputValue("");
    setIsTyping(true);
    setError(null);

    try {
      // Send the last 6 messages for context, plus the new one
      const historyToSend = [...(currentConversation?.messages || []), newMessage]
        .slice(-6)
        .map(m => ({
          role: m.isUser ? 'user' : 'assistant',
          content: m.content
        }));

      const { data, error: funcError } = await supabase.functions.invoke('chat', {
        body: { 
          prompt: promptText,
          messages: historyToSend,
          userContext: userProfile
        }
      });

      if (funcError) throw funcError;
      if (data.error) throw new Error(data.error);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || "I'm sorry, I didn't get a response. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === targetConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, aiResponse],
            };
          }
          return conv;
        }),
      );
    } catch (err: any) {
      console.error("Chat API Error:", err);
      setError(err.message || "Failed to reach AI. Please try again.");
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

  return (
    <div className="flex h-screen bg-brand-mist font-switzer">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-brand-slate/10 p-4 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setIsSidebarOpen(true)} className="hover:bg-brand-slate/10">
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
          <Link to="/student-dashboard">
            <Button variant="ghost" className="hover:bg-brand-slate/10">
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
        w-80 bg-white border-r border-brand-slate/10 flex flex-col
        transition-transform duration-300 ease-in-out
        h-full shadow-2xl md:shadow-none
      `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4 border-b border-brand-slate/10">
          <Button variant="ghost" onClick={() => setIsSidebarOpen(false)} className="hover:bg-brand-slate/10">
            <X className="w-5 h-5 text-brand-ink" />
          </Button>
        </div>

        {/* Header with Logo */}
        <div className="p-6 border-b border-brand-slate/10">
          <Link to="/student-dashboard" className="inline-flex items-center gap-2 text-brand-slate hover:text-brand-ink text-sm font-medium mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-slate/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 bg-brand-mist border border-brand-slate/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-ink/20 focus:border-brand-ink transition-all font-medium placeholder:text-brand-slate/60"
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
                className="text-brand-slate/60 hover:text-red-500 text-xs font-medium flex items-center gap-1 transition-colors"
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
                    ? "bg-brand-slate/10" 
                    : "hover:bg-brand-mist"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  conv.id === activeConversationId 
                    ? "bg-brand-ink" 
                    : "bg-white border border-brand-slate/10"
                }`}>
                  <MessageCircle className={`w-4 h-4 ${
                    conv.id === activeConversationId ? "text-white" : "text-brand-slate"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${
                    conv.id === activeConversationId ? "text-brand-ink" : "text-brand-slate"
                  }`}>
                    {conv.title}
                  </p>
                  <p className="text-xs text-brand-slate truncate font-medium">{conv.lastMessage}</p>
                </div>
                <button
                  onClick={(e) => handleDeleteConversation(conv.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-brand-slate/20 rounded-md transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5 text-brand-slate/60 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-brand-slate/10 bg-white">
          <Link to="/settings" className="flex items-center gap-3 mb-3 p-2 rounded-xl hover:bg-brand-mist transition-colors">
            <Settings className="w-5 h-5 text-brand-slate" />
            <span className="text-sm font-semibold text-brand-slate">Settings & Preferences</span>
          </Link>
          <div className="flex items-center gap-3 p-3 bg-brand-mist rounded-xl border border-brand-slate/10">
            <div className="w-10 h-10 bg-brand-ink rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AN</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-brand-ink">Andrew Nelson</p>
              <p className="text-xs text-brand-slate font-medium">Pro Member</p>
            </div>
            <div className="w-2 h-2 bg-brand-neon border border-brand-slate/10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0 bg-white md:m-4 md:rounded-[2rem] md:shadow-sm md:border md:border-brand-slate/10 overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 md:p-6 border-b border-brand-slate/10 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center shadow-sm">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-brand-ink">Careerist AI</span>
              <p className="text-xs text-brand-slate font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse"></span>
                Online & Ready to Help
              </p>
            </div>
          </div>
          <Button variant="ghost" className="hidden md:flex hover:bg-brand-mist rounded-full w-10 h-10 p-0 items-center justify-center text-brand-slate hover:text-brand-ink">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="text-center mt-20">
                <div className="w-20 h-20 bg-brand-mist border border-brand-slate/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
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
                    <div key={i} className="p-5 bg-white border border-brand-slate/10 rounded-2xl hover:border-brand-ink hover:shadow-md transition-all cursor-pointer group flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-brand-mist flex items-center justify-center group-hover:bg-brand-ink transition-colors">
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
                        : 'bg-brand-mist border border-brand-slate/10 text-gray-800 rounded-[1.5rem] rounded-tl-sm'
                    }`}>
                      {message.isUser ? (
                        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none leading-relaxed"
                          style={{
                            ['--tw-prose-body' as string]: '#374151',
                            ['--tw-prose-headings' as string]: '#111827',
                            ['--tw-prose-bold' as string]: '#111827',
                          }}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({children}) => <h1 className="text-lg font-bold text-gray-900 mt-3 mb-1">{children}</h1>,
                              h2: ({children}) => <h2 className="text-base font-bold text-gray-900 mt-3 mb-1">{children}</h2>,
                              h3: ({children}) => <h3 className="text-sm font-bold text-gray-900 mt-2 mb-1">{children}</h3>,
                              p: ({children}) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                              ul: ({children}) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
                              li: ({children}) => <li className="leading-relaxed">{children}</li>,
                              strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                              em: ({children}) => <em className="italic">{children}</em>,
                              code: ({children}) => <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                              blockquote: ({children}) => <blockquote className="border-l-4 border-brand-ink/30 pl-3 italic text-gray-600 my-2">{children}</blockquote>,
                              table: ({children}) => <div className="overflow-x-auto my-2"><table className="min-w-full text-xs border-collapse">{children}</table></div>,
                              thead: ({children}) => <thead className="bg-gray-100">{children}</thead>,
                              th: ({children}) => <th className="border border-gray-300 px-2 py-1 font-semibold text-left">{children}</th>,
                              td: ({children}) => <td className="border border-gray-300 px-2 py-1">{children}</td>,
                            }}
                          >{message.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                    {!message.isUser && (
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap px-1">
                        <button className="p-2 hover:bg-brand-slate/10 rounded-lg transition-colors text-brand-slate/60 hover:text-brand-ink">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-brand-slate/10 rounded-lg transition-colors text-brand-slate/60 hover:text-brand-ink">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-brand-slate/10 rounded-lg transition-colors text-brand-slate/60 hover:text-brand-ink">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-brand-slate hover:text-brand-ink hover:bg-brand-slate/10 rounded-lg transition-colors ml-auto font-semibold">
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
                  <div className="bg-brand-mist border border-brand-slate/10 py-4 px-5 rounded-[1.5rem] rounded-tl-sm inline-flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-brand-ink rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brand-ink rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-2 h-2 bg-brand-ink rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="flex gap-4 justify-start">
                <div className="flex-1 max-w-3xl">
                  <div className="bg-red-50 border border-red-200 text-red-700 py-3 px-4 rounded-xl flex items-center gap-3">
                    <Trash2 className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-brand-slate/10 shrink-0">
          <div className="flex gap-3 items-end max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <div className="flex items-center gap-3 bg-brand-mist border border-brand-slate/10 rounded-[1.5rem] px-5 py-3.5 focus-within:border-brand-ink focus-within:ring-2 focus-within:ring-brand-ink/10 transition-all shadow-sm">
                <div className="w-8 h-8 bg-brand-ink rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-brand-neon" />
                </div>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Careerist AI anything about your career..."
                  className="flex-1 resize-none bg-transparent outline-none text-brand-ink placeholder:text-brand-slate/60 max-h-32 font-medium"
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
          <p className="text-[11px] font-medium text-center text-brand-slate/60 mt-3">
            Careerist AI is powered by AI and may make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;