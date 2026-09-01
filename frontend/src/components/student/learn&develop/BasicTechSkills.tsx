import React, { useState } from "react";
import { 
  Code, 
  Globe, 
  Database, 
  GitBranch, 
  Layers, 
  Search, 
  Clock, 
  Target, 
  ChevronRight, 
  Play,
  Monitor,
  CheckCircle
} from "lucide-react";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";

const BasicTechSkills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const modules = [
    {
      id: "python-basics",
      title: "Python Basics",
      category: "Programming",
      difficulty: "Beginner",
      duration: "10-15 hours",
      description: "Learn the fundamentals of Python programming, including variables, loops, and basic data structures.",
      skills: ["Python", "Logic", "Problem Solving"],
      icon: <Code className="w-8 h-8" />,
      progress: 45,
    },
    {
      id: "web-dev",
      title: "Web Development Fundamentals",
      category: "Web",
      difficulty: "Beginner",
      duration: "15-20 hours",
      description: "Build your first websites using HTML, CSS, and basic JavaScript. Understand how the web works.",
      skills: ["HTML", "CSS", "JavaScript"],
      icon: <Globe className="w-8 h-8" />,
      progress: 80,
    },
    {
      id: "data-analysis",
      title: "Data Analysis Intro",
      category: "Data",
      difficulty: "Intermediate",
      duration: "12-18 hours",
      description: "Learn how to collect, process, and analyze data using spreadsheets and introductory data tools.",
      skills: ["Spreadsheets", "Data Cleaning", "Charts"],
      icon: <Database className="w-8 h-8" />,
      progress: 0,
    },
    {
      id: "version-control",
      title: "Version Control with Git",
      category: "Tools",
      difficulty: "Intermediate",
      duration: "5-8 hours",
      description: "Master the basics of Git and GitHub to track changes and collaborate on software projects.",
      skills: ["Git", "GitHub", "Collaboration"],
      icon: <GitBranch className="w-8 h-8" />,
      progress: 100,
    },
    {
      id: "no-code",
      title: "No-Code Tools",
      category: "Tools",
      difficulty: "Beginner",
      duration: "8-12 hours",
      description: "Build apps and automate workflows without writing a single line of code using modern platforms.",
      skills: ["Automation", "Webflow", "Zapier"],
      icon: <Layers className="w-8 h-8" />,
      progress: 25,
    },
  ];

  const categories = [
    { name: "All", icon: Monitor },
    { name: "Programming", icon: Code },
    { name: "Web", icon: Globe },
    { name: "Data", icon: Database },
    { name: "Tools", icon: Layers },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-brand-neon/10 text-brand-darkgreen border-brand-neon/30";
      case "Intermediate": return "bg-brand-ink/10 text-brand-ink border-brand-ink/30";
      case "Advanced": return "bg-brand-darkgreen/10 text-brand-darkgreen border-brand-darkgreen/30";
      default: return "bg-brand-mist text-brand-slate border-brand-slate/10";
    }
  };

  const filteredModules = modules.filter(mod => {
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" ||
      mod.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-brand-mist/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-ink to-brand-darkgreen rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-neon opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                <Monitor className="w-8 h-8 text-brand-neon" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Basic Tech Skills
                </h1>
                <p className="text-brand-mist/90 text-lg">
                  Build essential digital literacy and technical modules
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 border-brand-slate/10 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-slate w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-mist border-brand-slate/10 focus:border-brand-neon text-brand-ink rounded-xl pl-12 h-12 outline-none border transition-colors"
            />
          </div>
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="flex gap-3 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                    selectedCategory === category.name.toLowerCase()
                      ? "bg-brand-ink text-white border-brand-ink shadow-md"
                      : "bg-white text-brand-ink border-brand-slate/10 hover:border-brand-neon/50 hover:bg-brand-mist"
                  }`}
                >
                  <category.icon className={`w-4 h-4 ${
                    selectedCategory === category.name.toLowerCase() ? "text-brand-neon" : "text-brand-slate"
                  }`} />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-brand-slate">
            Found <span className="font-bold text-brand-ink">{filteredModules.length}</span> modules
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-6">
          {filteredModules.map((mod) => (
            <div
              key={mod.id}
              className="bg-white rounded-2xl overflow-hidden border border-brand-slate/10 hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Header section with Icon */}
              <div className="p-6 bg-gradient-to-br from-brand-mist to-white border-b border-brand-slate/10 relative">
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(mod.difficulty)}`}>
                    {mod.difficulty}
                  </div>
                </div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-brand-ink mb-4 group-hover:scale-110 transition-transform duration-300">
                  {mod.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-ink mb-2 group-hover:text-brand-neon transition-colors">
                  {mod.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-brand-neon/10 text-brand-darkgreen rounded-md text-xs font-semibold border border-brand-neon/20">
                    {mod.category}
                  </span>
                </div>
              </div>

              {/* Module Info */}
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-sm text-brand-slate leading-relaxed mb-4 flex-grow">
                  {mod.description}
                </p>

                {/* Duration */}
                <div className="mb-4 flex items-center gap-2 text-sm text-brand-slate">
                  <Clock className="w-4 h-4 text-brand-neon" />
                  <span>{mod.duration}</span>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-brand-ink mb-2">Skills You'll Build</h4>
                  <div className="flex flex-wrap gap-2">
                    {mod.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-brand-slate/5 text-brand-ink rounded-full text-xs font-medium border border-brand-slate/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-brand-slate">Progress</span>
                    <span className="text-brand-ink">{mod.progress}%</span>
                  </div>
                  <div className="w-full bg-brand-mist rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${mod.progress === 100 ? 'bg-brand-neon' : 'bg-brand-darkgreen'}`} 
                      style={{ width: `${mod.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-gradient-to-r from-brand-ink to-brand-darkgreen hover:from-brand-darkgreen hover:to-brand-ink shadow-md"
                >
                  {mod.progress > 0 ? (mod.progress === 100 ? "Review Module" : "Continue Module") : "Start Module"}
                  {mod.progress === 100 ? <CheckCircle className="w-4 h-4 ml-2" /> : <Play className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicTechSkills;
