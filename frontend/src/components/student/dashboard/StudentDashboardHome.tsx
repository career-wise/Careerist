import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Target,
  BookOpen,
  Users,
  Calendar,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  Brain,
  GraduationCap,
  Zap,
  Star,
  ChevronRight,
  BarChart3,
  Trophy,
  Activity,
  Bell,
  Settings,
  Search,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const StudentDashboardHome: React.FC = () => {
  const quickActions = [
    {
      title: "Take Career Assessment",
      description: "Discover careers that match your interests",
      icon: <Brain className="h-6 w-6 text-[#2B3674]" />,
      path: "/student-dashboard/exploration/career-explorer",
      gradient: "from-[#2B3674] to-[#3d4d9e]",
      bgColor: "bg-[#2B3674]/10",
      borderColor: "border-[#2B3674]/20",
      progress: 0,
      badge: "New",
      badgeColor: "from-[#C8A860] to-[#d4b870]",
    },
    {
      title: "AI Career Chat",
      description: "Get personalized career advice",
      icon: <Sparkles className="h-6 w-6 text-[#3EBFB0]" />,
      path: "/chat",
      gradient: "from-[#3EBFB0] to-[#5ed4c7]",
      bgColor: "bg-[#3EBFB0]/10",
      borderColor: "border-[#3EBFB0]/20",
      progress: 0,
      badge: "Popular",
      badgeColor: "from-[#3EBFB0] to-[#5ed4c7]",
    },
    {
      title: "Develop Skills",
      description: "Build essential skills",
      icon: <Zap className="h-6 w-6 text-[#C8A860]" />,
      path: "/student-dashboard/skills/tech",
      gradient: "from-[#C8A860] to-[#d4b870]",
      bgColor: "bg-[#C8A860]/10",
      borderColor: "border-[#C8A860]/20",
      progress: 60,
    },
    {
      title: "Plan Your Future",
      description: "Set goals and milestones",
      icon: <Target className="h-6 w-6 text-[#2B3674]" />,
      path: "/student-dashboard/planning/goals",
      gradient: "from-[#2B3674] to-[#3EBFB0]",
      bgColor: "bg-gradient-to-br from-[#2B3674]/5 to-[#3EBFB0]/5",
      borderColor: "border-[#2B3674]/20",
      progress: 40,
    },
  ];

  const stats = [
    {
      label: "Assessments",
      value: "3",
      total: "6",
      icon: <Award className="h-5 w-5" />,
      progress: 50,
      color: "navy",
      change: "+2",
      changeType: "positive",
    },
    {
      label: "Career Paths",
      value: "12",
      total: "20",
      icon: <TrendingUp className="h-5 w-5" />,
      progress: 60,
      color: "teal",
      change: "+4",
      changeType: "positive",
    },
    {
      label: "Study Hours",
      value: "24",
      total: "30",
      icon: <Clock className="h-5 w-5" />,
      progress: 80,
      color: "gold",
      change: "-2",
      changeType: "negative",
    },
    {
      label: "Goals",
      value: "5",
      total: "8",
      icon: <Target className="h-5 w-5" />,
      progress: 62,
      color: "gradient",
      change: "+1",
      changeType: "positive",
    },
  ];

  const recentActivities = [
    {
      activity: "Completed Interest Assessment",
      time: "2 hours ago",
      icon: "✅",
      type: "achievement",
      color: "teal",
    },
    {
      activity: "Explored Computer Science",
      time: "1 day ago",
      icon: "🔍",
      type: "exploration",
      color: "navy",
    },
    {
      activity: "Added 3 colleges",
      time: "2 days ago",
      icon: "🏫",
      type: "planning",
      color: "gold",
    },
  ];

  const upcomingTasks = [
    { task: "Complete Personality Test", due: "Today", priority: "high" },
    { task: "Research scholarships", due: "Tomorrow", priority: "medium" },
    { task: "Schedule interview", due: "This week", priority: "medium" },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      navy: {
        bg: "bg-[#2B3674]/10",
        text: "text-[#2B3674]",
        border: "border-[#2B3674]/20",
        gradient: "from-[#2B3674] to-[#3d4d9e]",
        hover: "hover:bg-[#2B3674]/20",
      },
      teal: {
        bg: "bg-[#3EBFB0]/10",
        text: "text-[#3EBFB0]",
        border: "border-[#3EBFB0]/20",
        gradient: "from-[#3EBFB0] to-[#5ed4c7]",
        hover: "hover:bg-[#3EBFB0]/20",
      },
      gold: {
        bg: "bg-[#C8A860]/10",
        text: "text-[#C8A860]",
        border: "border-[#C8A860]/20",
        gradient: "from-[#C8A860] to-[#d4b870]",
        hover: "hover:bg-[#C8A860]/20",
      },
      gradient: {
        bg: "bg-gradient-to-br from-[#2B3674]/10 to-[#3EBFB0]/10",
        text: "text-[#2B3674]",
        border: "border-[#2B3674]/20",
        gradient: "from-[#2B3674] via-[#3EBFB0] to-[#2B3674]",
        hover: "hover:from-[#2B3674]/20 hover:to-[#3EBFB0]/20",
      },
    };
    return colors[color] || colors.navy;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5">
      {/* Top Bar with Brand Colors */}
      <div className="bg-white border-b border-[#2B3674]/10 sticky top-0 z-40 backdrop-blur-sm bg-white/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-gray-600">Welcome back, Student 👋</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-[#3EBFB0]/10 rounded-lg transition-colors relative">
                <Bell className="h-5 w-5 text-[#2B3674]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#C8A860] rounded-full animate-pulse"></span>
              </button>
              <button className="p-2 hover:bg-[#3EBFB0]/10 rounded-lg transition-colors">
                <Settings className="h-5 w-5 text-[#2B3674]" />
              </button>
              <div className="flex items-center space-x-3 pl-3 border-l border-[#2B3674]/10">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#3EBFB0]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics with Brand Colors */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const colorClass = getColorClasses(stat.color);
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-5 border ${colorClass.border} hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${colorClass.bg} rounded-xl flex items-center justify-center ${colorClass.text} group-hover:scale-110 transition-transform shadow-sm`}>
                    {stat.icon}
                  </div>
                  <div className={`flex items-center space-x-1 text-xs font-semibold ${
                    stat.changeType === 'positive' ? 'text-[#3EBFB0]' : 'text-red-500'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${stat.changeType === 'negative' ? 'rotate-180' : ''}`} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-[#2B3674]">{stat.value}</span>
                    <span className="text-sm text-gray-400">/ {stat.total}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{stat.label}</p>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full bg-gradient-to-r ${colorClass.gradient} transition-all duration-500`}
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions with Brand Colors */}
            <div className="bg-white rounded-2xl p-6 border border-[#2B3674]/10 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#2B3674]">Quick Actions</h2>
                <Button variant="ghost" size="sm" className="text-sm text-[#3EBFB0] hover:text-[#2B3674]">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.path}>
                    <div className={`relative ${action.bgColor} p-5 rounded-2xl border ${action.borderColor} hover:border-[#3EBFB0] hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden`}>
                      {action.badge && (
                        <span className={`absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r ${action.badgeColor} text-white text-xs font-bold rounded-full shadow-md`}>
                          {action.badge}
                        </span>
                      )}
                      <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm border ${action.borderColor}`}>
                        {action.icon}
                      </div>
                      <h3 className="font-bold text-[#2B3674] mb-1 text-sm group-hover:text-[#3EBFB0] transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">{action.description}</p>
                      {action.progress > 0 && (
                        <div className="space-y-1">
                          <div className="w-full bg-white/50 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full bg-gradient-to-r ${action.gradient}`}
                              style={{ width: `${action.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{action.progress}%</span>
                        </div>
                      )}
                      <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-gray-400 group-hover:text-[#3EBFB0] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Activity Chart with Brand Colors */}
            <div className="bg-white rounded-2xl p-6 border border-[#2B3674]/10 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#2B3674]">Activity Overview</h2>
                  <p className="text-sm text-gray-500">Track updates every 3 hours</p>
                </div>
                <select className="text-sm border border-[#2B3674]/20 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#3EBFB0] text-[#2B3674]">
                  <option>01-07 May</option>
                  <option>08-14 May</option>
                </select>
              </div>
              <div className="relative h-48 flex items-end justify-between space-x-2">
                {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                    <div className="w-full bg-gradient-to-t from-[#2B3674] to-[#3EBFB0] rounded-t-lg hover:from-[#3EBFB0] hover:to-[#2B3674] transition-all duration-300 cursor-pointer relative group shadow-sm"
                         style={{ height: `${height}%` }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#2B3674] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-semibold shadow-lg">
                        {Math.round(height * 100)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">0{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm pt-4 border-t border-[#2B3674]/10">
                <span className="text-gray-600">Total activity</span>
                <span className="font-bold text-[#2B3674] text-lg">32,210</span>
              </div>
            </div>

            {/* Recent Activity with Brand Colors */}
            <div className="bg-white rounded-2xl p-6 border border-[#2B3674]/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#2B3674]">Recent Activity</h2>
                <Button variant="ghost" size="sm" className="text-sm text-[#3EBFB0] hover:text-[#2B3674]">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentActivities.map((item, index) => {
                  const colorClass = getColorClasses(item.color);
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-xl ${colorClass.hover} transition-colors cursor-pointer group border border-transparent hover:border-[#3EBFB0]/20`}
                    >
                      <div className={`w-10 h-10 ${colorClass.bg} rounded-lg flex items-center justify-center text-lg border ${colorClass.border}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#2B3674] group-hover:text-[#3EBFB0] transition-colors">
                          {item.activity}
                        </p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#3EBFB0] group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar with Brand Colors */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-gradient-to-br from-[#C8A860]/10 via-[#C8A860]/5 to-white rounded-2xl p-6 border border-[#C8A860]/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3EBFB0]/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-[#2B3674] mb-2">
                  Upgrade Your <span className="text-[#C8A860]">Progress</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4">Complete tasks for better results</p>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-[#C8A860]/20"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.78)}`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#C8A860" />
                          <stop offset="100%" stopColor="#3EBFB0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#2B3674]">78%</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-gradient-to-r from-[#C8A860] to-[#3EBFB0] hover:from-[#3EBFB0] hover:to-[#C8A860] text-white shadow-lg"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Now
                </Button>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-2xl p-6 border border-[#2B3674]/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#2B3674]">Your Goals</h3>
                <Button variant="ghost" size="sm" className="text-sm text-[#3EBFB0] hover:text-[#2B3674]">
                  View More
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Complete Profile", username: "@profile", progress: 85, color: "teal" },
                  { name: "Take Assessment", username: "@assessment", progress: 60, color: "navy" },
                  { name: "Explore Careers", username: "@explore", progress: 45, color: "gold" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#3EBFB0]/5 transition-colors cursor-pointer group border border-transparent hover:border-[#3EBFB0]/20">
                    <img
                      src={`https://images.unsplash.com/photo-${['1494790108377-be9c29b29330', '1507003211169-0a1dd7228f2d', '1438761681033-6461ffad8d80'][i]}?w=150&h=150&fit=crop&q=80`}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#3EBFB0]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#2B3674]">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#2B3674]">{item.progress}%</p>
                      <div className="w-12 bg-gray-200 rounded-full h-1 mt-1 overflow-hidden">
                        <div
                          className={`h-1 rounded-full bg-gradient-to-r ${getColorClasses(item.color).gradient}`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-2xl p-6 border border-[#2B3674]/10 shadow-sm">
              <h3 className="text-lg font-bold text-[#2B3674] mb-4">Upcoming Tasks</h3>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl border border-[#2B3674]/10 hover:border-[#3EBFB0] hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-semibold text-[#2B3674] group-hover:text-[#3EBFB0] transition-colors flex-1">
                        {task.task}
                      </p>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-600 border border-red-200"
                            : task.priority === "medium"
                            ? "bg-[#C8A860]/20 text-[#C8A860] border border-[#C8A860]/30"
                            : "bg-[#3EBFB0]/20 text-[#3EBFB0] border border-[#3EBFB0]/30"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">{task.due}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;