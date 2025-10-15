import React, { useState } from "react";
import {
  BookOpen,
  TrendingUp,
  DollarSign,
  Clock,
  Search,
  Filter,
  Sparkles,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Target,
  BarChart3,
  Brain,
  Heart,
  ChevronRight,
  Star,
  Zap,
  TrendingDown,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const MajorExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedMajors, setSavedMajors] = useState<string[]>([]);

  const majors = [
    {
      name: "Computer Science",
      category: "STEM",
      description: "Study algorithms, programming, and computational systems to build the future of technology",
      averageSalary: "$125,000",
      entryLevelSalary: "$85,000",
      jobGrowth: "+22%",
      difficulty: "High",
      timeToComplete: "4 years",
      careers: [
        "Software Engineer",
        "Data Scientist",
        "Product Manager",
        "ML Engineer",
        "Cloud Architect",
        "Security Analyst",
      ],
      requiredCourses: ["Calculus", "Physics", "Statistics", "Programming", "Data Structures", "Algorithms"],
      icon: "💻",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80",
      matchScore: 95,
      demandLevel: "Very High",
      topSkills: ["Python", "Java", "Problem Solving", "Algorithms"],
      workLifeBalance: "Good",
      remoteOpportunities: "Excellent",
    },
    {
      name: "Data Science & Analytics",
      category: "STEM",
      description: "Transform data into actionable insights using statistics, machine learning, and visualization",
      averageSalary: "$115,000",
      entryLevelSalary: "$75,000",
      jobGrowth: "+36%",
      difficulty: "High",
      timeToComplete: "4 years",
      careers: [
        "Data Scientist",
        "Data Analyst",
        "ML Engineer",
        "Business Analyst",
        "Research Scientist",
        "AI Specialist",
      ],
      requiredCourses: ["Statistics", "Linear Algebra", "Machine Learning", "Python", "SQL", "Data Visualization"],
      icon: "📊",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      matchScore: 92,
      demandLevel: "Very High",
      topSkills: ["Python", "SQL", "Machine Learning", "Statistics"],
      workLifeBalance: "Good",
      remoteOpportunities: "Excellent",
    },
    {
      name: "Business Administration",
      category: "Business",
      description: "Master management, finance, and organizational leadership to drive business success",
      averageSalary: "$95,000",
      entryLevelSalary: "$55,000",
      jobGrowth: "+8%",
      difficulty: "Medium",
      timeToComplete: "4 years",
      careers: [
        "Business Manager",
        "Management Consultant",
        "Financial Analyst",
        "Entrepreneur",
        "Operations Manager",
        "Marketing Director",
      ],
      requiredCourses: ["Accounting", "Economics", "Marketing", "Finance", "Strategy", "Leadership"],
      icon: "💼",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
      matchScore: 88,
      demandLevel: "High",
      topSkills: ["Leadership", "Analytics", "Communication", "Strategy"],
      workLifeBalance: "Moderate",
      remoteOpportunities: "Good",
    },
    {
      name: "Psychology",
      category: "Social Sciences",
      description: "Understand human behavior, mental processes, and emotional wellness to help others thrive",
      averageSalary: "$82,000",
      entryLevelSalary: "$48,000",
      jobGrowth: "+6%",
      difficulty: "Medium",
      timeToComplete: "4 years",
      careers: [
        "Clinical Psychologist",
        "Counselor",
        "HR Specialist",
        "UX Researcher",
        "Organizational Psychologist",
        "Therapist",
      ],
      requiredCourses: [
        "Statistics",
        "Biology",
        "Research Methods",
        "Social Psychology",
        "Cognitive Psychology",
        "Abnormal Psychology",
      ],
      icon: "🧠",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80",
      matchScore: 85,
      demandLevel: "Moderate",
      topSkills: ["Empathy", "Research", "Communication", "Analysis"],
      workLifeBalance: "Good",
      remoteOpportunities: "Moderate",
    },
    {
      name: "Mechanical Engineering",
      category: "Engineering",
      description: "Design, analyze, and manufacture mechanical systems from robotics to renewable energy",
      averageSalary: "$95,000",
      entryLevelSalary: "$68,000",
      jobGrowth: "+4%",
      difficulty: "High",
      timeToComplete: "4 years",
      careers: [
        "Mechanical Engineer",
        "Aerospace Engineer",
        "Robotics Engineer",
        "Product Designer",
        "Manufacturing Engineer",
        "R&D Engineer",
      ],
      requiredCourses: ["Calculus", "Physics", "Thermodynamics", "Mechanics", "CAD", "Materials Science"],
      icon: "⚙️",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&q=80",
      matchScore: 87,
      demandLevel: "High",
      topSkills: ["CAD", "Problem Solving", "Physics", "Innovation"],
      workLifeBalance: "Good",
      remoteOpportunities: "Limited",
    },
    {
      name: "Nursing",
      category: "Healthcare",
      description: "Provide compassionate healthcare and medical support to improve patient outcomes",
      averageSalary: "$80,000",
      entryLevelSalary: "$60,000",
      jobGrowth: "+9%",
      difficulty: "High",
      timeToComplete: "4 years",
      careers: [
        "Registered Nurse",
        "Nurse Practitioner",
        "Clinical Nurse",
        "Nurse Educator",
        "Healthcare Administrator",
        "Travel Nurse",
      ],
      requiredCourses: ["Anatomy", "Pharmacology", "Physiology", "Clinical Practice", "Patient Care", "Medical Ethics"],
      icon: "⚕️",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=80",
      matchScore: 90,
      demandLevel: "Very High",
      topSkills: ["Patient Care", "Communication", "Critical Thinking", "Empathy"],
      workLifeBalance: "Moderate",
      remoteOpportunities: "Limited",
    },
  ];

  const categories = [
    { name: "All", icon: Sparkles, count: majors.length },
    { name: "STEM", icon: Brain, count: majors.filter(m => m.category === "STEM").length },
    { name: "Business", icon: Briefcase, count: majors.filter(m => m.category === "Business").length },
    { name: "Engineering", icon: Target, count: majors.filter(m => m.category === "Engineering").length },
    { name: "Healthcare", icon: Heart, count: majors.filter(m => m.category === "Healthcare").length },
    { name: "Social Sciences", icon: Users, count: majors.filter(m => m.category === "Social Sciences").length },
  ];

  const stats = [
    {
      label: "Total Majors",
      value: majors.length.toString(),
      icon: BookOpen,
      color: "from-[#2B3674] to-[#3d4d9e]",
      bgColor: "bg-[#2B3674]/10",
    },
    {
      label: "Saved Majors",
      value: savedMajors.length.toString(),
      icon: Heart,
      color: "from-[#3EBFB0] to-[#5ed4c7]",
      bgColor: "bg-[#3EBFB0]/10",
    },
    {
      label: "Avg Match Score",
      value: "89%",
      icon: Target,
      color: "from-[#C8A860] to-[#d4b870]",
      bgColor: "bg-[#C8A860]/10",
    },
  ];

  const toggleSave = (name: string) => {
    setSavedMajors(prev =>
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "High": return "text-red-600 bg-red-50 border-red-200";
      case "Medium": return "text-[#C8A860] bg-[#C8A860]/10 border-[#C8A860]/30";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "Very High": return "text-green-600 bg-green-50 border-green-200";
      case "High": return "text-[#3EBFB0] bg-[#3EBFB0]/10 border-[#3EBFB0]/30";
      case "Moderate": return "text-[#C8A860] bg-[#C8A860]/10 border-[#C8A860]/30";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const filteredMajors = majors.filter(major => {
    const matchesSearch = major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      major.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      major.careers.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
      major.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                Major Explorer
              </h1>
              <p className="text-gray-600">
                Discover academic majors aligned with your career goals and interests
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 border border-[#2B3674]/10 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#2B3674]">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-[#2B3674]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Categories */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-[#2B3674]/10 shadow-sm">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#2B3674]/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by major, career, or keyword..."
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
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedCategory === category.name.toLowerCase()
                    ? "bg-white/20"
                    : "bg-[#2B3674]/10"
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-[#2B3674]">{filteredMajors.length}</span> majors
          </p>
          <select className="px-4 py-2 border-2 border-[#2B3674]/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3EBFB0]">
            <option>Sort by Match Score</option>
            <option>Sort by Salary</option>
            <option>Sort by Job Growth</option>
            <option>Sort by Difficulty</option>
          </select>
        </div>

        {/* Major Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMajors.map((major, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-[#2B3674]/10 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Major Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={major.image}
                  alt={major.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3674]/90 via-[#2B3674]/50 to-transparent"></div>

                {/* Match Score */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#C8A860] to-[#3EBFB0] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  {major.matchScore}% Match
                </div>

                {/* Save Button */}
                <button
                  onClick={() => toggleSave(major.name)}
                  className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      savedMajors.includes(major.name)
                        ? "fill-red-500 text-red-500"
                        : "text-[#2B3674]"
                    }`}
                  />
                </button>

                {/* Icon and Category */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="text-4xl">{major.icon}</div>
                  <div>
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#2B3674] rounded-lg text-xs font-bold shadow-lg">
                      {major.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Major Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2B3674] mb-3 group-hover:text-[#3EBFB0] transition-colors">
                  {major.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{major.description}</p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-600">Avg Salary</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">{major.averageSalary}</p>
                    <p className="text-xs text-gray-500">Entry: {major.entryLevelSalary}</p>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-[#3EBFB0]/10 to-[#3EBFB0]/5 rounded-lg border border-[#3EBFB0]/30">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-[#3EBFB0]" />
                      <span className="text-xs text-gray-600">Job Growth</span>
                    </div>
                    <p className="text-lg font-bold text-[#3EBFB0]">{major.jobGrowth}</p>
                    <p className="text-xs text-gray-500">Next 10 years</p>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-[#2B3674]/5 to-[#2B3674]/10 rounded-lg border border-[#2B3674]/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-[#2B3674]" />
                      <span className="text-xs text-gray-600">Duration</span>
                    </div>
                    <p className="text-lg font-bold text-[#2B3674]">{major.timeToComplete}</p>
                  </div>

                  <div className={`p-3 rounded-lg border ${getDifficultyColor(major.difficulty)}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-xs">Difficulty</span>
                    </div>
                    <p className="text-lg font-bold">{major.difficulty}</p>
                  </div>
                </div>

                {/* Demand and Remote */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`p-2 rounded-lg border text-center ${getDemandColor(major.demandLevel)}`}>
                    <p className="text-xs font-medium mb-1">Market Demand</p>
                    <p className="text-sm font-bold">{major.demandLevel}</p>
                  </div>
                  <div className="p-2 bg-[#C8A860]/10 rounded-lg border border-[#C8A860]/30 text-center">
                    <p className="text-xs text-gray-600 font-medium mb-1">Remote Work</p>
                    <p className="text-sm font-bold text-[#C8A860]">{major.remoteOpportunities}</p>
                  </div>
                </div>

                {/* Top Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#2B3674] mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#3EBFB0]" />
                    Top Skills Required
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {major.topSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-[#2B3674]/10 to-[#3EBFB0]/10 text-[#2B3674] rounded-full text-xs font-medium border border-[#3EBFB0]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Options */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#2B3674] mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#3EBFB0]" />
                    Career Paths
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {major.careers.slice(0, 4).map((career, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#3EBFB0]/10 text-[#3EBFB0] rounded-lg text-xs font-medium border border-[#3EBFB0]/30"
                      >
                        {career}
                      </span>
                    ))}
                    {major.careers.length > 4 && (
                      <span className="px-3 py-1 bg-[#C8A860]/10 text-[#C8A860] rounded-lg text-xs font-medium">
                        +{major.careers.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Required Courses */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" />
                    Core Courses ({major.requiredCourses.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {major.requiredCourses.slice(0, 4).map((course, idx) => (
                      <span key={idx} className="text-xs text-gray-600">
                        {course}{idx < 3 && idx < major.requiredCourses.length - 1 ? " •" : ""}
                      </span>
                    ))}
                    {major.requiredCourses.length > 4 && (
                      <span className="text-xs text-gray-500">+{major.requiredCourses.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] hover:from-[#3EBFB0] hover:to-[#2B3674] shadow-md"
                  >
                    Explore Major
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-[#2B3674]/20 hover:border-[#3EBFB0] hover:bg-[#3EBFB0]/5"
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MajorExplorer;