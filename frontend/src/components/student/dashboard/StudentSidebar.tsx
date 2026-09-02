import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  BookOpen,
  Zap,
  Target,
  Library,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Briefcase,
  Star,
  Bell,
} from "lucide-react";

interface StudentSidebarProps {
  onClose?: () => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "explore",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isSectionActive = (basePath: string) =>
    location.pathname.startsWith(basePath);

  const menuSections = [
    {
      id: "explore",
      title: "Explore & Discover",
      icon: <Compass className="h-5 w-5" />,
      basePath: "/student-dashboard/college",
      description: "Career exploration and discovery tools",
      items: [
        {
          path: "/student-dashboard/college/explorer",
          label: "College Explorer",
          description: "Find colleges that fit your goals"
        },
        {
          path: "/student-dashboard/college/majors",
          label: "Major Explorer",
          description: "Explore academic majors and career outcomes"
        },
      ],
    },
    {
      id: "prepare",
      title: "Prepare for Future",
      icon: <Target className="h-5 w-5" />,
      basePath: "/student-dashboard/planning",
      description: "Future preparation and career readiness",
      items: [
        {
          path: "/student-dashboard/planning/career-path",
          label: "Career Path Planner",
          description: "Map out your career journey"
        },
        {
          path: "/student-dashboard/planning/resume-builder",
          label: "Resume Builder",
          description: "Create and export your resume"
        },
        {
          path: "/student-dashboard/learning/interview-prep",
          label: "AI Interview Practice",
          description: "AI-powered interview practice and coaching"
        }
      ],
    },
    {
      id: "succeed",
      title: "Study & Succeed",
      icon: <BookOpen className="h-5 w-5" />,
      basePath: "/student-dashboard/academics",
      description: "Academic success and study tools",
      items: [
        {
          path: "/student-dashboard/planning/goals",
          label: "Set Goals",
          description: "Set and track your objectives"
        },
        {
          path: "/student-dashboard/academics/goal-tracker",
          label: "Track Progress",
          description: "Monitor your academic progress",
        },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white h-full flex flex-col border-r border-brand-slate/20">
      {/* Header */}
      <div className="p-6 border-b border-brand-slate/20 bg-white">
        <Link onClick={() => onClose?.()} to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-display font-bold text-brand-ink">
              Careerist
            </span>
            <p className="text-xs text-brand-slate font-medium">Student Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar px-3 space-y-1">
        {/* Dashboard Home */}
        <Link
          onClick={() => onClose?.()}
          to="/student-dashboard"
          className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
            isActive("/student-dashboard")
              ? "text-brand-ink bg-brand-mist"
              : "text-brand-slate hover:text-brand-ink hover:bg-brand-mist"
          }`}
        >
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </Link>

        {/* AI Chat */}
        <Link
          onClick={() => onClose?.()}
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

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.id} className="mb-1">
            {/* Handle Resources as a direct button */}
            {section.id === "resources" ? (
              <Link
                onClick={() => onClose?.()}
                to="/student-dashboard/resources/document-manager"
                className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  location.pathname.startsWith("/student-dashboard/resources") || expandedSections.includes(section.id)
                    ? "text-brand-ink bg-brand-mist"
                    : "text-brand-slate hover:text-brand-ink hover:bg-brand-mist"
                }`}
              >
                <div className="mr-3">
                  {section.icon}
                </div>
                <span>{section.title}</span>
              </Link>
            ) : (
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                isSectionActive(section.basePath) || expandedSections.includes(section.id)
                  ? "text-brand-ink bg-brand-mist"
                  : "text-brand-slate hover:text-brand-ink hover:bg-brand-mist"
              }`}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {section.icon}
                </div>
                <span>{section.title}</span>
              </div>
              <div className="transition-transform duration-300">
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>
            )}

            {expandedSections.includes(section.id) && section.items.length > 0 && (
              <div className="mt-1 space-y-1 ml-4 border-l-2 border-brand-slate/10 pl-3">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    onClick={() => onClose?.()}
                    to={item.path}
                    className={`flex items-center py-2 pr-3 text-sm rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "text-brand-ink font-semibold border-l-[3px] border-brand-neon pl-[9px]"
                        : "text-brand-slate hover:text-brand-ink hover:bg-brand-mist border-l-[3px] border-transparent pl-3"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-brand-neon/15 text-brand-ink">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="border-t border-brand-slate/20 p-4 bg-white">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-brand-mist rounded-xl border border-brand-slate/20">
          <div className="w-10 h-10 bg-brand-ink rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-brand-ink truncate">
              Demo Student
            </p>
            <p className="text-xs text-brand-slate truncate font-medium">High School Senior</p>
          </div>
          <Bell className="h-5 w-5 text-brand-slate hover:text-brand-ink cursor-pointer transition-colors duration-300" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center px-3 py-2 text-xs font-semibold text-brand-slate hover:text-brand-ink hover:bg-brand-mist rounded-xl transition-all duration-300">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </button>
          <Link
            onClick={() => onClose?.()}
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

export default StudentSidebar;