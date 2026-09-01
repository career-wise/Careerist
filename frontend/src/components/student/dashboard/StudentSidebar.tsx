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

const StudentSidebar: React.FC = () => {
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
      basePath: "/student-dashboard/exploration",
      description: "Career exploration and discovery tools",
      items: [
        {
          path: "/student-dashboard/college/explorer",
          label: "College Explorer",
          icon: "🏫",
          description: "Find colleges that fit your goals"
        },
        {
          path: "/student-dashboard/college/majors",
          label: "Major Explorer",
          icon: "🎓",
          description: "Explore academic majors and career outcomes"
        },
      ],
    },
    {
      id: "learn",
      title: "Learn & Develop",
      icon: <Zap className="h-5 w-5" />,
      basePath: "/student-dashboard/skills",
      description: "Skill development and learning resources",
      items: [
        {
          path: "/student-dashboard/skills/tech",
          label: "Tech Skills",
          icon: "💻",
          description: "Build essential digital literacy skills"
        },
        {
          path: "/student-dashboard/skills/soft",
          label: "Soft Skills",
          icon: "🤝",
          description: "Develop interpersonal and communication skills"
        },
        {
          path: "/student-dashboard/skills/creative",
          label: "Creative Skills",
          icon: "🎨",
          description: "Develop artistic abilities and creative expression"
        },
        {
          path: "/student-dashboard/learning/courses",
          label: "Online Courses",
          icon: "🎥",
          description: "High-quality online courses to supplement education"
        },
        {
          path: "/student-dashboard/learning/projects",
          label: "Project Ideas",
          icon: "💡",
          description: "Creative projects to build skills and portfolio"
        },
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
          path: "/student-dashboard/academics/study-resources",
          label: "Study Resources",
          icon: "📖",
          description: "Tools and materials to enhance learning"
        },
        {
          path: "/student-dashboard/academics/study-skills",
          label: "Study Skills Trainer",
          icon: "📝",
          badge: "New",
          description: "Master effective study techniques"
        },
        {
          path: "/student-dashboard/academics/test-prep",
          label: "Test Prep Strategies",
          icon: "📊",
          description: "Prepare for standardized tests"
        },
        {
          path: "/student-dashboard/planning/goals",
          label: "Goal Setting",
          icon: "🎯",
          description: "Set and track your objectives"
        },
      ],
    },
    {
      id: "prepare",
      title: "Prepare for Future",
      icon: <Target className="h-5 w-5" />,
      basePath: "/student-dashboard/learning",
      description: "Future preparation and career readiness",
      items: [
        {
          path: "/student-dashboard/learning/interview-prep",
          label: "Interview Preparation",
          icon: "🎤",
          description: "AI-powered interview practice and coaching"
        },
        {
          path: "/student-dashboard/planning/career-path",
          label: "Career Path Planner",
          icon: "🗺️",
          description: "Plan your educational and career journey"
        },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      icon: <Library className="h-5 w-5" />,
      basePath: "/student-dashboard/resources",
      description: "Document management and resources",
      items: [],
    },
  ];

  return (
    <div className="w-64 bg-white h-full flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <Link to="/" className="flex items-center space-x-3 group">
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
          to="/student-dashboard"
          className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
            isActive("/student-dashboard")
              ? "text-brand-ink bg-gray-100"
              : "text-brand-slate hover:text-brand-ink hover:bg-gray-50"
          }`}
        >
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </Link>

        {/* AI Chat */}
        <Link
          to="/chat"
          className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 text-brand-slate hover:text-brand-ink hover:bg-gray-50"
        >
          <div className="w-5 h-5 mr-3 bg-brand-neon rounded-full flex items-center justify-center border border-gray-200">
            <span className="text-brand-ink text-[10px] font-bold">AI</span>
          </div>
          Careerist AI
          <div className="w-2 h-2 bg-brand-teal rounded-full ml-auto animate-pulse"></div>
        </Link>

        <div className="h-4"></div> {/* Spacer */}

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.id} className="mb-1">
            {/* Handle Resources as a direct button */}
            {section.id === "resources" ? (
              <Link
                to="/student-dashboard/resources/document-manager"
                className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  location.pathname.startsWith("/student-dashboard/resources")
                    ? "text-brand-ink bg-gray-100"
                    : "text-brand-slate hover:text-brand-ink hover:bg-gray-50"
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
                isSectionActive(section.basePath)
                  ? "text-brand-ink bg-gray-50"
                  : "text-brand-slate hover:text-brand-ink hover:bg-gray-50"
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
              <div className="mt-1 space-y-1 ml-4 border-l-2 border-gray-100 pl-3">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "text-brand-ink font-semibold bg-gray-100"
                        : "text-brand-slate font-medium hover:text-brand-ink hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-2 text-sm flex-shrink-0">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-brand-neon text-brand-ink">
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
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
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
          <button className="flex items-center justify-center px-3 py-2 text-xs font-semibold text-brand-slate hover:text-brand-ink hover:bg-gray-100 rounded-xl transition-all duration-300">
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

export default StudentSidebar;