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
  HelpCircle,
} from "lucide-react";
import Button from "../../shared/ui/Button";

import { useAppContext } from "../../../contexts/AppContext";

const CareerPathPlanner: React.FC = () => {
  const { state } = useAppContext();
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
        { id: "tech-path", label: "Technology", status: "available", x: -300, y: 450, parent: "skill-exploration", color: "brand-mist" },
        { id: "business-path", label: "Business", status: "available", x: -300, y: 520, parent: "skill-exploration", color: "brand-mist" },
        { id: "creative-path", label: "Creative Arts", status: "available", x: -300, y: 590, parent: "skill-exploration", color: "brand-mist" },
        { id: "stem-path", label: "STEM Research", status: "available", x: 300, y: 450, parent: "skill-exploration", color: "brand-mist" },
        { id: "healthcare-path", label: "Healthcare", status: "available", x: 300, y: 520, parent: "skill-exploration", color: "brand-mist" },
        { id: "social-path", label: "Social Sciences", status: "available", x: 300, y: 590, parent: "skill-exploration", color: "brand-mist" },
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
        { id: "projects", label: "Personal Projects", status: "locked", x: -250, y: 850, parent: "build-portfolio", color: "brand-mist" },
        { id: "internship", label: "Internships", status: "locked", x: -250, y: 910, parent: "build-portfolio", color: "brand-mist" },
        { id: "competitions", label: "Competitions", status: "locked", x: 250, y: 850, parent: "build-portfolio", color: "brand-mist" },
        { id: "leadership", label: "Leadership Roles", status: "locked", x: 250, y: 910, parent: "build-portfolio", color: "brand-mist" },
      ],

      // Advanced preparation items
      advancedItems: [
        { id: "ap-courses", label: "AP/IB Courses", status: "locked", x: -230, y: 1050, parent: "advanced-prep", color: "brand-mist" },
        { id: "sat-act", label: "SAT/ACT Prep", status: "locked", x: -230, y: 1110, parent: "advanced-prep", color: "brand-mist" },
        { id: "subject-tests", label: "Subject Tests", status: "locked", x: 230, y: 1050, parent: "advanced-prep", color: "brand-mist" },
        { id: "research", label: "Research Papers", status: "locked", x: 230, y: 1110, parent: "advanced-prep", color: "brand-mist" },
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
    switch (status) {
      case "completed":
        return {
          bg: "bg-brand-neon",
          border: "border-brand-neon",
          text: "text-brand-ink",
          hover: "hover:bg-brand-neon/90 hover:border-brand-neon/90",
        };
      case "in-progress":
      case "available":
        return {
          bg: "bg-brand-mist",
          border: "border-brand-neon",
          text: "text-brand-ink",
          hover: "hover:bg-brand-neon hover:text-brand-ink",
        };
      case "locked":
        return {
          bg: "bg-white",
          border: "border-brand-slate/20",
          text: "text-brand-slate",
          hover: "hover:bg-brand-mist",
        };
      default:
        return {
          bg: "bg-white",
          border: "border-brand-slate/20",
          text: "text-brand-slate",
          hover: "hover:bg-brand-mist",
        };
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle className="w-5 h-5 text-brand-ink" />;
    if (status === "in-progress") return <Circle className="w-5 h-5 text-brand-neon" />;
    if (status === "locked") return <Lock className="w-4 h-4 text-brand-slate/60" />;
    return <Circle className="w-5 h-5 text-brand-neon" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-mist via-white to-brand-mist/50 p-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-ink to-brand-darkgreen rounded-xl flex items-center justify-center shadow-lg">
                  <Map className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-ink to-brand-darkgreen bg-clip-text text-transparent">
                  {roadmapStructure.title}
                </h1>
              </div>
              <div className="flex items-center gap-4 ml-16">
                <span className="px-3 py-1 bg-brand-neon/20 text-brand-ink border border-brand-neon/30 rounded-full text-sm font-semibold">
                  {roadmapStructure.progress}
                </span>
                <button className="text-sm text-brand-darkgreen font-medium hover:text-brand-neon transition-colors flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  Track Progress
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="border-brand-slate/20 text-brand-ink hover:bg-brand-mist">
                <ExternalLink className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-gradient-to-r from-brand-ink to-brand-darkgreen hover:from-brand-darkgreen hover:to-brand-ink border-none">
                <Sparkles className="w-4 h-4 mr-2" />
                Personalize
              </Button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-white border-l-4 border-brand-neon rounded-xl p-4 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="bg-brand-mist p-2 rounded-lg">
                <Info className="w-5 h-5 text-brand-neon flex-shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-brand-ink mb-1 text-lg">
                  Personalized for {state.user.firstName}
                </h3>
                <p className="text-sm text-brand-slate max-w-3xl">
                  This roadmap is customized based on your interests, goals, and current progress. Click on any node to view details and resources.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Canvas */}
        <div className="bg-white rounded-3xl shadow-xl p-12 relative overflow-hidden border border-brand-slate/10">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {/* SVG for connections */}
          <svg
            className="absolute inset-0 pointer-events-none z-10"
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
                <polygon points="0 0, 10 3, 0 6" fill="#15C196" /> {/* brand-neon */}
              </marker>
              <marker
                id="arrowhead-inactive"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#5C6B67" opacity="0.3" /> {/* brand-slate */}
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
                  stroke={isCompleted ? "#15C196" : "rgba(92, 107, 103, 0.2)"}
                  strokeWidth="3"
                  markerEnd={isCompleted ? "url(#arrowhead)" : "url(#arrowhead-inactive)"}
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
                stroke="rgba(92, 107, 103, 0.2)"
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
                stroke="rgba(92, 107, 103, 0.3)"
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
                stroke="rgba(92, 107, 103, 0.2)"
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
                stroke="rgba(92, 107, 103, 0.2)"
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
                stroke="rgba(92, 107, 103, 0.2)"
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
                    stroke="rgba(92, 107, 103, 0.2)"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* Render all nodes */}
          <div className="relative z-20" style={{ minHeight: "1500px" }}>
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
                      border-2 rounded-2xl px-6 py-4 font-bold text-center cursor-pointer
                      transition-all duration-300 shadow-md
                      ${isHovered ? "scale-105 shadow-xl" : ""}
                      ${node.type === "start" || node.type === "end" ? "px-8 py-5 text-lg" : ""}
                      min-w-[220px] relative flex items-center justify-center gap-3
                    `}
                  >
                    {getStatusIcon(node.status)}
                    <span>{node.label}</span>
                    
                    {/* Hover tooltip */}
                    {isHovered && node.description && (
                      <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 w-72 bg-white text-brand-ink p-5 rounded-2xl shadow-2xl z-50 text-sm border border-brand-slate/10 animate-in fade-in slide-in-from-top-2">
                        <p className="font-medium text-brand-slate">{node.description}</p>
                        <div className="mt-4 flex gap-2">
                          <button className="flex-1 bg-gradient-to-r from-brand-ink to-brand-darkgreen text-white hover:opacity-90 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity">
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
                      border-2 rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer
                      transition-all duration-300 shadow-sm hover:shadow-lg flex items-center gap-2
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
                      border-2 rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer
                      transition-all duration-300 shadow-sm hover:shadow-lg flex items-center gap-2
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
                      border-2 rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer
                      transition-all duration-300 shadow-sm
                      whitespace-nowrap flex items-center gap-2
                    `}
                  >
                    {getStatusIcon(node.status)} {node.label}
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
                      border-2 rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer
                      transition-all duration-300 shadow-sm hover:shadow-lg
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
                      border-2 rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer
                      transition-all duration-300 shadow-sm hover:shadow-lg
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
                <div className="bg-white border border-brand-slate/20 shadow-sm rounded-xl px-4 py-3 text-sm text-brand-ink cursor-pointer hover:bg-brand-mist hover:border-brand-neon transition-all whitespace-nowrap flex items-center font-medium">
                  <HelpCircle className="w-4 h-4 text-brand-neon mr-2" />
                  {node.label}
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
                <div className="bg-white border-l-4 border-brand-neon rounded-xl p-5 shadow-lg max-w-xs transition-transform hover:scale-105 duration-300">
                  <h4 className="font-bold text-brand-ink mb-2 text-base">
                    {box.title}
                  </h4>
                  <p className="text-sm text-brand-slate leading-relaxed">{box.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-brand-slate/10">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-brand-neon rounded-md flex items-center justify-center">
                 <CheckCircle className="w-3 h-3 text-brand-ink" />
              </div>
              <span className="text-brand-ink">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-brand-mist border-2 border-brand-neon rounded-md"></div>
              <span className="text-brand-ink">In Progress / Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white border-2 border-brand-slate/20 rounded-md flex items-center justify-center">
                <Lock className="w-3 h-3 text-brand-slate/60" />
              </div>
              <span className="text-brand-slate">Locked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white border border-brand-slate/20 rounded-md flex items-center justify-center">
                 <HelpCircle className="w-3 h-3 text-brand-neon" />
              </div>
              <span className="text-brand-ink">Tips & Questions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathPlanner;