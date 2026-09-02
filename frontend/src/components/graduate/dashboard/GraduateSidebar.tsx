import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Target,
  Library,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Briefcase,
  Bell,
  MessageSquare,
  Building,
  GraduationCap,
  Laptop,
  Users,
  Palette,
  Video,
  Lightbulb,
  Book,
  PenTool,
  BarChart,
  Crosshair,
  Mic,
  Map,
  FileText
} from "lucide-react";

const GraduateSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(["prepare"]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isSectionActive = (basePath: string) => location.pathname.startsWith(basePath);

  const menuSections = [
    {
      id: "skills",
      title: "Skills & Learning",
      icon: <GraduationCap className="h-5 w-5" />,
      basePath: "/graduate-dashboard/skills",
      items: [
        { path: "/graduate-dashboard/skills/gap-analyzer", label: "Skill Gap Analyzer", icon: <Target className="w-4 h-4" /> },
        { path: "/graduate-dashboard/skills/tech", label: "Tech Skills", icon: <Laptop className="w-4 h-4" /> },
        { path: "/graduate-dashboard/skills/soft", label: "Soft Skills", icon: <Users className="w-4 h-4" /> },
        { path: "/graduate-dashboard/learning/courses", label: "Online Courses", icon: <Video className="w-4 h-4" /> },
        { path: "/graduate-dashboard/learning/projects", label: "Project Portfolio", icon: <Lightbulb className="w-4 h-4" /> },
      ],
    },
    {
      id: "prepare",
      title: "Career Prep",
      icon: <Target className="h-5 w-5" />,
      basePath: "/graduate-dashboard/planning",
      items: [
        { path: "/graduate-dashboard/learning/interview-prep", label: "Interview Preparation", icon: <Mic className="w-4 h-4" /> },
        { path: "/graduate-dashboard/planning/career-path", label: "Career Strategy", icon: <Map className="w-4 h-4" /> },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      icon: <Library className="h-5 w-5" />,
      basePath: "/graduate-dashboard/resources",
      items: [
        { path: "/graduate-dashboard/resources/document-manager", label: "Document Manager", icon: <FileText className="w-4 h-4" /> },
        { path: "/graduate-dashboard/resources/resume-builder", label: "Resume Builder", icon: <PenTool className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white h-full flex flex-col border-r border-brand-slate/20">
      {/* Header */}
      <div className="p-6 border-b border-brand-slate/20 bg-white">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-display font-bold text-brand-ink">
              Careerist
            </span>
            <p className="text-xs text-brand-slate font-medium">Graduate Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar px-3 space-y-1">
        <Link
          to="/graduate-dashboard"
          className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
            isActive("/graduate-dashboard") || isActive("/graduate-dashboard/")
              ? "text-brand-ink bg-brand-mist"
              : "text-brand-slate hover:text-brand-ink hover:bg-brand-mist"
          }`}
        >
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </Link>
        
        {/* Job Matches (Placeholder) */}
        <div className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all group text-brand-slate/50 cursor-not-allowed">
          <Briefcase className="h-5 w-5 mr-3" />
          Job Matches
          <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-brand-mist text-brand-slate font-bold rounded-md">Soon</span>
        </div>

        <Link
          to="/chat"
          className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 text-brand-slate hover:text-brand-ink hover:bg-brand-mist"
        >
          <div className="w-5 h-5 mr-3 bg-brand-neon rounded-full flex items-center justify-center border border-brand-slate/20">
            <span className="text-brand-ink text-[10px] font-bold">AI</span>
          </div>
          Careerist AI
          <div className="w-2 h-2 bg-brand-neon rounded-full ml-auto animate-pulse"></div>
        </Link>

        <div className="h-4"></div> {/* Spacer */}

        {menuSections.map((section) => (
          <div key={section.id} className="mb-1">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  isSectionActive(section.basePath) && !expandedSections.includes(section.id)
                    ? "text-brand-ink bg-brand-mist"
                    : "text-brand-slate hover:text-brand-ink hover:bg-brand-mist"
                }`}
              >
                <div className="mr-3">{section.icon}</div>
                <div className="flex-1 text-left">{section.title}</div>
                <div className="ml-2">
                  {expandedSections.includes(section.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </button>

            {expandedSections.includes(section.id) && section.items.length > 0 && (
              <div className="mt-1 space-y-1 ml-4 border-l-2 border-brand-slate/10 pl-3">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "text-brand-ink font-semibold bg-brand-mist"
                        : "text-brand-slate font-medium hover:text-brand-ink hover:bg-brand-mist"
                    }`}
                  >
                    <span className="mr-2 text-sm flex-shrink-0">{item.icon}</span>
                    <span className="flex-1 min-w-0 truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="border-t border-brand-slate/20 p-4 bg-white">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-brand-mist rounded-xl border border-brand-slate/20">
          <div className="w-10 h-10 bg-brand-ink rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-brand-ink truncate">Demo Graduate</p>
            <div className="flex items-center mt-0.5">
              <span className="text-xs text-brand-slate font-medium">Recent Grad</span>
            </div>
          </div>
          <button className="text-brand-slate hover:text-brand-ink transition-colors">
            <Bell className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center px-3 py-2 text-xs font-semibold text-brand-slate hover:text-brand-ink hover:bg-brand-mist rounded-xl transition-all duration-300">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </button>
          <Link
            to="/"
            className="flex items-center justify-center px-3 py-2 text-xs font-semibold text-brand-slate hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GraduateSidebar;
