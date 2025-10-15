import React, { useState } from "react";
import {
  Lightbulb,
  Code,
  Camera,
  BookOpen,
  Rocket,
  Palette,
  Music,
  Beaker,
  TrendingUp,
  Heart,
  Search,
  Sparkles,
  Clock,
  Target,
  Users,
  Award,
  ChevronRight,
  Star,
  Briefcase,
} from "lucide-react";
import Button from "../../shared/ui/Button";

const ProjectIdeas: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedProjects, setSavedProjects] = useState<string[]>([]);

  const projects = [
    {
      id: "personal-website",
      title: "Build Your Portfolio Website",
      category: "Technology",
      difficulty: "Beginner",
      duration: "2-3 weeks",
      description: "Create a portfolio website to showcase your projects and skills to colleges and employers",
      skills: ["HTML/CSS", "JavaScript", "Web Design"],
      icon: <Code className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&q=80",
      matchScore: 95,
    },
    {
      id: "photography-blog",
      title: "Start a Photography Blog",
      category: "Creative",
      difficulty: "Beginner",
      duration: "1-2 weeks",
      description: "Document your creative journey by sharing your photography work online",
      skills: ["Photography", "Content Writing", "Social Media"],
      icon: <Camera className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop&q=80",
      matchScore: 88,
    },
    {
      id: "research-paper",
      title: "Write a Research Paper",
      category: "Academic",
      difficulty: "Advanced",
      duration: "6-8 weeks",
      description: "Investigate a topic you're passionate about and publish your findings",
      skills: ["Research Methods", "Academic Writing", "Data Analysis"],
      icon: <BookOpen className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&q=80",
      matchScore: 92,
    },
    {
      id: "mobile-app",
      title: "Create a Mobile App",
      category: "Technology",
      difficulty: "Intermediate",
      duration: "4-6 weeks",
      description: "Build a mobile app that solves a real problem in your community",
      skills: ["Flutter/React Native", "UI/UX Design", "Problem Solving"],
      icon: <Rocket className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
      matchScore: 94,
    },
    {
      id: "community-service",
      title: "Start a Community Initiative",
      category: "Leadership",
      difficulty: "Intermediate",
      duration: "8-12 weeks",
      description: "Make a difference in your community while developing leadership skills",
      skills: ["Leadership", "Project Management", "Communication"],
      icon: <Heart className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&q=80",
      matchScore: 90,
    },
    {
      id: "digital-art",
      title: "Create a Digital Art Portfolio",
      category: "Creative",
      difficulty: "Beginner",
      duration: "4-6 weeks",
      description: "Build a professional art portfolio for college applications",
      skills: ["Digital Art", "Adobe Suite", "Composition"],
      icon: <Palette className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&h=600&fit=crop&q=80",
      matchScore: 85,
    },
    {
      id: "podcast",
      title: "Launch Your Own Podcast",
      category: "Creative",
      difficulty: "Beginner",
      duration: "3-5 weeks",
      description: "Share your voice and ideas by creating your own podcast show",
      skills: ["Audio Production", "Content Creation", "Public Speaking"],
      icon: <Music className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop&q=80",
      matchScore: 89,
    },
    {
      id: "business-plan",
      title: "Develop a Business Plan",
      category: "Business",
      difficulty: "Intermediate",
      duration: "4-6 weeks",
      description: "Turn your entrepreneurial ideas into a comprehensive business plan",
      skills: ["Business Strategy", "Financial Planning", "Market Research"],
      icon: <TrendingUp className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
      matchScore: 91,
    },
  ];

  const categories = [
    { name: "All", icon: Sparkles },
    { name: "Technology", icon: Code },
    { name: "Creative", icon: Palette },
    { name: "Academic", icon: BookOpen },
    { name: "Business", icon: Briefcase },
    { name: "Leadership", icon: Users },
  ];

  const stats = [
    { label: "Project Ideas", value: projects.length.toString(), icon: Lightbulb },
    { label: "Saved Projects", value: savedProjects.length.toString(), icon: Heart },
    { label: "Avg Completion", value: "4-6 weeks", icon: Clock },
  ];

  const toggleSave = (id: string) => {
    setSavedProjects(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-50 text-green-700 border-green-200";
      case "Intermediate": return "bg-[#C8A860]/10 text-[#C8A860] border-[#C8A860]/30";
      case "Advanced": return "bg-[#2B3674]/10 text-[#2B3674] border-[#2B3674]/30";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" ||
      project.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-xl flex items-center justify-center shadow-lg">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                Project Ideas
              </h1>
              <p className="text-gray-600">
                Build your skills and create an impressive portfolio
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 border border-[#2B3674]/10 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#2B3674]">{stat.value}</p>
                </div>
                <div className="w-14 h-14 bg-[#2B3674]/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-[#2B3674]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-[#2B3674]/10 shadow-sm">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#2B3674]/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#3EBFB0]/5 border-2 border-[#2B3674]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3EBFB0] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name.toLowerCase())}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.name.toLowerCase()
                    ? "bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] text-white shadow-md"
                    : "bg-[#2B3674]/5 text-[#2B3674] hover:bg-[#3EBFB0]/10"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-[#2B3674]">{filteredProjects.length}</span> project ideas
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#2B3674]/10 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3674]/90 via-[#2B3674]/50 to-transparent"></div>

                {/* Match Score & Save */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-gradient-to-r from-[#C8A860] to-[#3EBFB0] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    {project.matchScore}% Match
                  </div>
                  <button
                    onClick={() => toggleSave(project.id)}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        savedProjects.includes(project.id)
                          ? "fill-red-500 text-red-500"
                          : "text-[#2B3674]"
                      }`}
                    />
                  </button>
                </div>

                {/* Icon */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg text-[#2B3674]">
                    {project.icon}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-[#3EBFB0]/10 text-[#3EBFB0] rounded-lg text-xs font-bold border border-[#3EBFB0]/30">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2B3674] mb-2 group-hover:text-[#3EBFB0] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
                </div>

                {/* Duration */}
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-[#3EBFB0]" />
                  <span>{project.duration}</span>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#2B3674] mb-2">Skills You'll Build</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-[#2B3674]/10 to-[#3EBFB0]/10 text-[#2B3674] rounded-full text-xs font-medium border border-[#3EBFB0]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] hover:from-[#3EBFB0] hover:to-[#2B3674] shadow-md"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Project
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectIdeas;