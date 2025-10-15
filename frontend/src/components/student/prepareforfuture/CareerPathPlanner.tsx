import React, { useState } from "react";
import {
  Map,
  Target,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Circle,
  Lock,
  Star,
  BookOpen,
  Briefcase,
  Users,
  Lightbulb,
  Award,
  Zap,
  Code,
  Brain,
  Trophy,
  ExternalLink,
  MessageCircle,
  Info,
  ArrowRight,
  Settings,
} from "lucide-react";
import Button from "../../shared/ui/Button";

const CareerPathPlanner: React.FC = () => {
  const [completedNodes, setCompletedNodes] = useState<string[]>([
    "start",
    "assessment",
  ]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Roadmap structure - mimicking roadmap.sh layout
  const roadmapStructure = {
    title: "Your High School to College Career Journey",
    progress: "0 of 52 Done",
    
    // Main vertical flow
    mainPath: [
      {
        id: "start",
        label: "Start Your Journey",
        type: "start",
        status: "completed",
        y: 50,
      },
      {
        id: "assessment",
        label: "Career Assessment",
        type: "primary",
        status: "completed",
        description: "Discover your interests and strengths",
        y: 150,
      },
      {
        id: "academic-foundation",
        label: "Academic Foundation",
        type: "primary",
        status: "in-progress",
        description: "Build strong fundamentals in core subjects",
        y: 250,
      },
      {
        id: "skill-exploration",
        label: "Explore Career Paths",
        type: "primary",
        status: "available",
        description: "Research different career options",
        y: 400,
      },
      {
        id: "specialization",
        label: "Choose Specialization",
        type: "primary",
        status: "locked",
        description: "Select your focus area",
        y: 650,
      },
      {
        id: "build-portfolio",
        label: "Build Portfolio",
        type: "primary",
        status: "locked",
        description: "Create projects and experiences",
        y: 850,
      },
      {
        id: "advanced-prep",
        label: "Advanced Preparation",
        type: "primary",
        status: "locked",
        description: "AP courses and standardized tests",
        y: 1050,
      },
      {
        id: "college-apps",
        label: "College Applications",
        type: "primary",
        status: "locked",
        description: "Apply to your dream schools",
        y: 1250,
      },
      {
        id: "success",
        label: "College & Career Success",
        type: "end",
        status: "locked",
        y: 1400,
      },
    ],

    // Side branches and details
    branches: {
      // Academic Foundation branches
      academicSubjects: [
        { id: "mathematics", label: "Mathematics", status: "in-progress", x: -250, y: 250, parent: "academic-foundation" },
        { id: "sciences", label: "Sciences", status: "in-progress", x: -250, y: 310, parent: "academic-foundation" },
        { id: "english", label: "English & Writing", status: "available", x: -250, y: 370, parent: "academic-foundation" },
      ],

      // Career Path Options
      careerPaths: [
        { id: "tech-path", label: "Technology", status: "available", x: -300, y: 450, parent: "skill-exploration", color: "yellow" },
        { id: "business-path", label: "Business", status: "available", x: -300, y: 520, parent: "skill-exploration", color: "yellow" },
        { id: "creative-path", label: "Creative Arts", status: "available", x: -300, y: 590, parent: "skill-exploration", color: "yellow" },
        { id: "stem-path", label: "STEM Research", status: "available", x: 300, y: 450, parent: "skill-exploration", color: "yellow" },
        { id: "healthcare-path", label: "Healthcare", status: "available", x: 300, y: 520, parent: "skill-exploration", color: "yellow" },
        { id: "social-path", label: "Social Sciences", status: "available", x: 300, y: 590, parent: "skill-exploration", color: "yellow" },
      ],

      // Technology specialization details (when tech path selected)
      techDetails: [
        { id: "web-dev", label: "Web Development", status: "locked", x: -280, y: 700, parent: "specialization", subparent: "tech-path" },
        { id: "app-dev", label: "Mobile Apps", status: "locked", x: -280, y: 760, parent: "specialization", subparent: "tech-path" },
        { id: "data-science", label: "Data Science", status: "locked", x: -280, y: 820, parent: "specialization", subparent: "tech-path" },
        { id: "ai-ml", label: "AI & Machine Learning", status: "locked", x: 280, y: 700, parent: "specialization", subparent: "tech-path" },
        { id: "cybersecurity", label: "Cybersecurity", status: "locked", x: 280, y: 760, parent: "specialization", subparent: "tech-path" },
        { id: "game-dev", label: "Game Development", status: "locked", x: 280, y: 820, parent: "specialization", subparent: "tech-path" },
      ],

      // Portfolio building activities
      portfolioItems: [
        { id: "projects", label: "Personal Projects", status: "locked", x: -250, y: 850, parent: "build-portfolio", color: "yellow" },
        { id: "internship", label: "Internships", status: "locked", x: -250, y: 910, parent: "build-portfolio", color: "yellow" },
        { id: "competitions", label: "Competitions", status: "locked", x: 250, y: 850, parent: "build-portfolio", color: "yellow" },
        { id: "leadership", label: "Leadership Roles", status: "locked", x: 250, y: 910, parent: "build-portfolio", color: "yellow" },
      ],

      // Advanced preparation items
      advancedItems: [
        { id: "ap-courses", label: "AP/IB Courses", status: "locked", x: -230, y: 1050, parent: "advanced-prep", color: "beige" },
        { id: "sat-act", label: "SAT/ACT Prep", status: "locked", x: -230, y: 1110, parent: "advanced-prep", color: "beige" },
        { id: "subject-tests", label: "Subject Tests", status: "locked", x: 230, y: 1050, parent: "advanced-prep", color: "beige" },
        { id: "research", label: "Research Papers", status: "locked", x: 230, y: 1110, parent: "advanced-prep", color: "beige" },
      ],

      // Question nodes (side info)
      questions: [
        { id: "q1", label: "What are my strengths?", x: 400, y: 150, type: "question" },
        { id: "q2", label: "Which subjects interest me?", x: 400, y: 250, type: "question" },
        { id: "q3", label: "What career fits me?", x: 400, y: 400, type: "question" },
        { id: "q4", label: "What skills do I need?", x: 400, y: 650, type: "question" },
        { id: "q5", label: "How do I stand out?", x: 400, y: 850, type: "question" },
      ],
    },

    // Information boxes
    infoBoxes: [
      {
        id: "info1",
        title: "Foundation Years",
        description: "Focus on building strong academic fundamentals and exploring different interests",
        x: -450,
        y: 150,
      },
      {
        id: "info2",
        title: "Exploration Phase",
        description: "Try different activities, join clubs, and discover what you're passionate about",
        x: -480,
        y: 400,
      },
      {
        id: "info3",
        title: "Build Your Brand",
        description: "Create a portfolio of projects and experiences that showcase your unique abilities",
        x: -450,
        y: 750,
      },
    ],
  };

  const getNodeColor = (status: string, customColor?: string) => {
    if (customColor === "yellow") {
      return {
        bg: "bg-[#FFE66D]",
        border: "border-[#FFE66D]",
        text: "text-gray-900",
        hover: "hover:bg-[#FFD93D]",
      };
    }
    if (customColor === "beige") {
      return {
        bg: "bg-[#FFF4E0]",
        border: "border-[#FFE4B5]",
        text: "text-gray-900",
        hover: "hover:bg-[#FFE4B5]",
      };
    }

    switch (status) {
      case "completed":
        return {
          bg: "bg-green-500",
          border: "border-green-600",
          text: "text-white",
          hover: "hover:bg-green-600",
        };
      case "in-progress":
        return {
          bg: "bg-[#FFE66D]",
          border: "border-[#FFD93D]",
          text: "text-gray-900",
          hover: "hover:bg-[#FFD93D]",
        };
      case "available":
        return {
          bg: "bg-[#FFE66D]",
          border: "border-[#FFD93D]",
          text: "text-gray-900",
          hover: "hover:bg-[#FFD93D]",
        };
      case "locked":
        return {
          bg: "bg-gray-200",
          border: "border-gray-300",
          text: "text-gray-500",
          hover: "hover:bg-gray-300",
        };
      default:
        return {
          bg: "bg-white",
          border: "border-gray-300",
          text: "text-gray-700",
          hover: "hover:bg-gray-50",
        };
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") return "✓";
    if (status === "in-progress") return "○";
    if (status === "locked") return "🔒";
    return "○";
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-lg flex items-center justify-center shadow-lg">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {roadmapStructure.title}
                </h1>
              </div>
              <div className="flex items-center gap-4 ml-13">
                <span className="px-3 py-1 bg-[#FFE66D] text-gray-900 rounded-full text-sm font-medium">
                  {roadmapStructure.progress}
                </span>
                <button className="text-sm text-[#3EBFB0] hover:underline flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  Track Progress
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0]">
                <Sparkles className="w-4 h-4 mr-2" />
                Personalize
              </Button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-white border-l-4 border-[#3EBFB0] rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#3EBFB0] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Personalized for You
                </h3>
                <p className="text-sm text-gray-600">
                  This roadmap is customized based on your interests, goals, and current progress. Click on any node to view details and resources.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Canvas */}
        <div className="bg-white rounded-xl shadow-lg p-12 relative overflow-hidden border border-gray-200">
          {/* SVG for connections */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#3B82F6" />
              </marker>
            </defs>

            {/* Main path connections */}
            {roadmapStructure.mainPath.slice(0, -1).map((node, index) => {
              const nextNode = roadmapStructure.mainPath[index + 1];
              const isCompleted = completedNodes.includes(node.id) && completedNodes.includes(nextNode.id);
              
              return (
                <line
                  key={`main-${node.id}`}
                  x1="50%"
                  y1={node.y + 40}
                  x2="50%"
                  y2={nextNode.y - 20}
                  stroke={isCompleted ? "#3EBFB0" : "#3B82F6"}
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}

            {/* Branch connections - Academic */}
            {roadmapStructure.branches.academicSubjects.map((branch) => (
              <line
                key={`branch-${branch.id}`}
                x1="50%"
                y1={250}
                x2={`calc(50% + ${branch.x}px)`}
                y2={branch.y}
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            ))}

            {/* Branch connections - Career Paths */}
            {roadmapStructure.branches.careerPaths.map((branch) => (
              <line
                key={`career-${branch.id}`}
                x1="50%"
                y1={400}
                x2={`calc(50% + ${branch.x}px)`}
                y2={branch.y}
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            ))}

            {/* Branch connections - Tech Details */}
            {roadmapStructure.branches.techDetails.map((branch) => (
              <line
                key={`tech-${branch.id}`}
                x1="50%"
                y1={650}
                x2={`calc(50% + ${branch.x}px)`}
                y2={branch.y}
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            ))}

            {/* Branch connections - Portfolio */}
            {roadmapStructure.branches.portfolioItems.map((branch) => (
              <line
                key={`portfolio-${branch.id}`}
                x1="50%"
                y1={850}
                x2={`calc(50% + ${branch.x}px)`}
                y2={branch.y}
                stroke="#3B82F6"
                strokeWidth="2"
              />
            ))}

            {/* Branch connections - Advanced */}
            {roadmapStructure.branches.advancedItems.map((branch) => (
              <line
                key={`advanced-${branch.id}`}
                x1="50%"
                y1={1050}
                x2={`calc(50% + ${branch.x}px)`}
                y2={branch.y}
                stroke="#3B82F6"
                strokeWidth="2"
              />
            ))}

            {/* Question node connections */}
            {roadmapStructure.branches.questions.map((q, index) => {
              const mainNode = roadmapStructure.mainPath.find(n => n.y === q.y);
              if (mainNode) {
                return (
                  <line
                    key={`question-${q.id}`}
                    x1="50%"
                    y1={q.y}
                    x2={`calc(50% + ${q.x}px - 100)`}
                    y2={q.y}
                    stroke="#E5E7EB"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* Render all nodes */}
          <div className="relative" style={{ minHeight: "1500px" }}>
            {/* Main path nodes */}
            {roadmapStructure.mainPath.map((node) => {
              const colors = getNodeColor(node.status);
              const isHovered = hoveredNode === node.id;

              return (
                <div
                  key={node.id}
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{ top: `${node.y}px` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(node.id)}
                >
                  <div
                    className={`
                      ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                      border-2 rounded-xl px-6 py-3 font-medium text-center cursor-pointer
                      transition-all duration-200 shadow-md
                      ${isHovered ? "scale-105 shadow-xl" : ""}
                      ${node.type === "start" || node.type === "end" ? "px-8 py-4 text-lg font-bold" : ""}
                      min-w-[200px] relative
                    `}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>{getStatusIcon(node.status)}</span>
                      <span>{node.label}</span>
                    </div>
                    
                    {/* Hover tooltip */}
                    {isHovered && node.description && (
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-64 bg-[#2B3674] text-white p-4 rounded-lg shadow-2xl z-50 text-sm">
                        <p>{node.description}</p>
                        <div className="mt-2 flex gap-2">
                          <button className="flex-1 bg-[#3EBFB0] hover:bg-[#3EBFB0]/90 px-3 py-1 rounded text-xs font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Academic subject branches */}
            {roadmapStructure.branches.academicSubjects.map((node) => {
              const colors = getNodeColor(node.status);
              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{ top: `${node.y}px`, left: `calc(50% + ${node.x}px)` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div
                    className={`
                      ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                      border-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer
                      transition-all duration-200 shadow-sm hover:shadow-md
                      whitespace-nowrap
                    `}
                  >
                    {getStatusIcon(node.status)} {node.label}
                  </div>
                </div>
              );
            })}

            {/* Career path branches */}
            {roadmapStructure.branches.careerPaths.map((node) => {
              const colors = getNodeColor(node.status, node.color);
              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{ top: `${node.y}px`, left: `calc(50% + ${node.x}px)` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div
                    className={`
                      ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                      border-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer
                      transition-all duration-200 shadow-md hover:shadow-lg
                      whitespace-nowrap
                    `}
                  >
                    {node.label}
                  </div>
                </div>
              );
            })}

            {/* Tech specialization branches */}
            {roadmapStructure.branches.techDetails.map((node) => {
              const colors = getNodeColor(node.status);
              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{ top: `${node.y}px`, left: `calc(50% + ${node.x}px)` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div
                    className={`
                      ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                      border-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer
                      transition-all duration-200 shadow-sm
                      whitespace-nowrap
                    `}
                  >
                    {node.label}
                  </div>
                </div>
              );
            })}

            {/* Portfolio branches */}
            {roadmapStructure.branches.portfolioItems.map((node) => {
              const colors = getNodeColor(node.status, node.color);
              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{ top: `${node.y}px`, left: `calc(50% + ${node.x}px)` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div
                    className={`
                      ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                      border-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer
                      transition-all duration-200 shadow-md
                      whitespace-nowrap
                    `}
                  >
                    {node.label}
                  </div>
                </div>
              );
            })}

            {/* Advanced prep branches */}
            {roadmapStructure.branches.advancedItems.map((node) => {
              const colors = getNodeColor(node.status, node.color);
              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{ top: `${node.y}px`, left: `calc(50% + ${node.x}px)` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div
                    className={`
                      ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                      border-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer
                      transition-all duration-200 shadow-md
                      whitespace-nowrap
                    `}
                  >
                    {node.label}
                  </div>
                </div>
              );
            })}

            {/* Question nodes */}
            {roadmapStructure.branches.questions.map((node) => (
              <div
                key={node.id}
                className="absolute"
                style={{ top: `${node.y}px`, left: `calc(50% + ${node.x}px)` }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="bg-purple-50 border-2 border-purple-300 rounded-lg px-3 py-2 text-sm text-purple-700 cursor-pointer hover:bg-purple-100 transition-all whitespace-nowrap shadow-sm">
                  ❓ {node.label}
                </div>
              </div>
            ))}

            {/* Info boxes */}
            {roadmapStructure.infoBoxes.map((box) => (
              <div
                key={box.id}
                className="absolute"
                style={{ top: `${box.y}px`, left: `calc(50% + ${box.x}px)` }}
              >
                <div className="bg-blue-50 border-l-4 border-[#3EBFB0] rounded-lg p-4 shadow-sm max-w-xs">
                  <h4 className="font-bold text-[#2B3674] mb-1 text-sm">
                    {box.title}
                  </h4>
                  <p className="text-xs text-gray-600">{box.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#FFE66D] rounded"></div>
              <span>In Progress / Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span>Locked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border-2 border-purple-300 rounded"></div>
              <span>Tips & Questions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathPlanner;