import React, { useState } from "react";
import {
  Play,
  Clock,
  Star,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Heart,
  Search,
  Filter,
  Sparkles,
  CheckCircle,
  Video,
  FileText,
  Target,
  Zap,
  ExternalLink,
  ChevronRight,
  Calendar,
  BarChart3,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const OnlineCourses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedCourses, setSavedCourses] = useState<string[]>([]);

  const courses = [
    {
      id: "cs101",
      title: "Introduction to Computer Science",
      provider: "Khan Academy",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      reviews: 12543,
      duration: "12 weeks",
      students: "45,000+",
      level: "Beginner",
      category: "Technology",
      description: "Master programming fundamentals and computational thinking with hands-on projects",
      topics: [
        "Programming Basics",
        "Algorithms",
        "Data Structures",
        "Problem Solving",
        "Python",
        "Web Development",
      ],
      price: "Free",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80",
      skills: ["Python", "Problem Solving", "Logic", "Debugging"],
      certificate: true,
      selfPaced: true,
      videos: 45,
      assignments: 12,
      matchScore: 95,
      completionRate: "87%",
      difficulty: "Beginner",
    },
    {
      id: "bio-ap",
      title: "AP Biology Prep Course",
      provider: "Coursera",
      instructor: "Prof. Michael Chen",
      rating: 4.6,
      reviews: 8932,
      duration: "16 weeks",
      students: "23,000+",
      level: "Advanced",
      category: "Science",
      description: "Comprehensive preparation for the AP Biology exam with practice tests and detailed explanations",
      topics: ["Cell Biology", "Genetics", "Ecology", "Evolution", "Molecular Biology", "Biochemistry"],
      price: "$39/month",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop&q=80",
      skills: ["Scientific Method", "Data Analysis", "Critical Thinking", "Lab Skills"],
      certificate: true,
      selfPaced: false,
      videos: 68,
      assignments: 24,
      matchScore: 88,
      completionRate: "79%",
      difficulty: "Advanced",
    },
    {
      id: "finance",
      title: "Financial Literacy for Teens",
      provider: "edX",
      instructor: "Emily Rodriguez, CFA",
      rating: 4.7,
      reviews: 6721,
      duration: "6 weeks",
      students: "18,000+",
      level: "Beginner",
      category: "Business",
      description: "Build essential financial skills for a secure future - budgeting, investing, and smart money management",
      topics: ["Budgeting", "Saving", "Investing", "Credit", "Taxes", "Retirement Planning"],
      price: "Free",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop&q=80",
      skills: ["Budgeting", "Financial Planning", "Investment", "Money Management"],
      certificate: true,
      selfPaced: true,
      videos: 32,
      assignments: 8,
      matchScore: 82,
      completionRate: "92%",
      difficulty: "Beginner",
    },
    {
      id: "writing",
      title: "Creative Writing Workshop",
      provider: "MasterClass",
      instructor: "Margaret Atwood",
      rating: 4.9,
      reviews: 15234,
      duration: "8 weeks",
      students: "12,000+",
      level: "Intermediate",
      category: "Arts",
      description: "Develop your storytelling craft with one of literature's greatest voices",
      topics: [
        "Narrative Structure",
        "Character Development",
        "Dialogue",
        "Editing",
        "Publishing",
        "World Building",
      ],
      price: "$15/month",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&q=80",
      skills: ["Creative Writing", "Storytelling", "Editing", "Literary Analysis"],
      certificate: true,
      selfPaced: true,
      videos: 28,
      assignments: 15,
      matchScore: 90,
      completionRate: "85%",
      difficulty: "Intermediate",
    },
    {
      id: "data-science",
      title: "Data Science Fundamentals",
      provider: "Udacity",
      instructor: "Dr. Andrew Ng",
      rating: 4.8,
      reviews: 21043,
      duration: "10 weeks",
      students: "67,000+",
      level: "Intermediate",
      category: "Technology",
      description: "Learn data analysis, machine learning, and visualization with Python",
      topics: ["Python", "Machine Learning", "Data Visualization", "Statistics", "SQL", "Pandas"],
      price: "$49/month",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      skills: ["Python", "Statistics", "Machine Learning", "Data Analysis"],
      certificate: true,
      selfPaced: true,
      videos: 52,
      assignments: 18,
      matchScore: 93,
      completionRate: "81%",
      difficulty: "Intermediate",
    },
    {
      id: "web-dev",
      title: "Full-Stack Web Development",
      provider: "The Odin Project",
      instructor: "Community Driven",
      rating: 4.7,
      reviews: 18765,
      duration: "20 weeks",
      students: "89,000+",
      level: "Beginner",
      category: "Technology",
      description: "Build modern web applications from scratch using HTML, CSS, JavaScript, and React",
      topics: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
      price: "Free",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js"],
      certificate: false,
      selfPaced: true,
      videos: 120,
      assignments: 35,
      matchScore: 91,
      completionRate: "73%",
      difficulty: "Beginner",
    },
  ];

  const categories = [
    { name: "All", icon: Sparkles, count: courses.length },
    { name: "Technology", icon: Zap, count: courses.filter(c => c.category === "Technology").length },
    { name: "Science", icon: Target, count: courses.filter(c => c.category === "Science").length },
    { name: "Business", icon: TrendingUp, count: courses.filter(c => c.category === "Business").length },
    { name: "Arts", icon: BookOpen, count: courses.filter(c => c.category === "Arts").length },
  ];

  const stats = [
    {
      label: "Available Courses",
      value: courses.length.toString(),
      icon: BookOpen,
      color: "from-[#2B3674] to-[#3d4d9e]",
      bgColor: "bg-[#2B3674]/10",
    },
    {
      label: "Saved Courses",
      value: savedCourses.length.toString(),
      icon: Heart,
      color: "from-[#3EBFB0] to-[#5ed4c7]",
      bgColor: "bg-[#3EBFB0]/10",
    },
    {
      label: "Total Students",
      value: "254K+",
      icon: Users,
      color: "from-[#C8A860] to-[#d4b870]",
      bgColor: "bg-[#C8A860]/10",
    },
  ];

  const toggleSave = (id: string) => {
    setSavedCourses(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-50 text-green-700 border-green-200";
      case "Intermediate": return "bg-[#C8A860]/10 text-[#C8A860] border-[#C8A860]/30";
      case "Advanced": return "bg-[#2B3674]/10 text-[#2B3674] border-[#2B3674]/30";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      course.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-xl flex items-center justify-center shadow-lg">
              <Play className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                Online Courses
              </h1>
              <p className="text-gray-600">
                Discover high-quality courses to accelerate your learning journey
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

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-[#2B3674]/10 shadow-sm">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#2B3674]/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by course name, topic, or provider..."
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
            Found <span className="font-bold text-[#2B3674]">{filteredCourses.length}</span> courses
          </p>
          <select className="px-4 py-2 border-2 border-[#2B3674]/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3EBFB0]">
            <option>Sort by Match Score</option>
            <option>Sort by Rating</option>
            <option>Sort by Students</option>
            <option>Sort by Duration</option>
          </select>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#2B3674]/10 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3674]/90 via-[#2B3674]/50 to-transparent"></div>

                {/* Match Score & Save */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-gradient-to-r from-[#C8A860] to-[#3EBFB0] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    {course.matchScore}% Match
                  </div>
                  <button
                    onClick={() => toggleSave(course.id)}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        savedCourses.includes(course.id)
                          ? "fill-red-500 text-red-500"
                          : "text-[#2B3674]"
                      }`}
                    />
                  </button>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4">
                  <div className={`px-4 py-2 rounded-lg shadow-lg font-bold text-lg ${
                    course.price === "Free" 
                      ? "bg-green-500 text-white" 
                      : "bg-white/95 backdrop-blur-sm text-[#2B3674]"
                  }`}>
                    {course.price}
                  </div>
                </div>

                {/* Certificate Badge */}
                {course.certificate && (
                  <div className="absolute bottom-4 right-4 bg-[#C8A860]/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Award className="w-3 h-3" />
                    Certificate
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="px-3 py-1 bg-[#3EBFB0]/10 text-[#3EBFB0] rounded-lg text-xs font-bold border border-[#3EBFB0]/30">
                      {course.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3674] mb-2 group-hover:text-[#3EBFB0] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by <span className="font-semibold text-[#2B3674]">{course.instructor}</span> • {course.provider}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                    <span className="text-xs text-gray-500">({course.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-[#3EBFB0]" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-[#3EBFB0]" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Video className="w-4 h-4 text-[#3EBFB0]" />
                    {course.videos} videos
                  </div>
                </div>

                {/* Course Content */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-[#2B3674]/5 rounded-lg border border-[#2B3674]/10">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-[#2B3674]" />
                      <span className="text-xs text-gray-600">Assignments</span>
                    </div>
                    <p className="text-lg font-bold text-[#2B3674]">{course.assignments}</p>
                  </div>
                  <div className="p-3 bg-[#3EBFB0]/5 rounded-lg border border-[#3EBFB0]/20">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-4 h-4 text-[#3EBFB0]" />
                      <span className="text-xs text-gray-600">Completion</span>
                    </div>
                    <p className="text-lg font-bold text-[#3EBFB0]">{course.completionRate}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#2B3674] mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#3EBFB0]" />
                    Skills You'll Gain
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-[#2B3674]/10 to-[#3EBFB0]/10 text-[#2B3674] rounded-full text-xs font-medium border border-[#3EBFB0]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#2B3674] mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#3EBFB0]" />
                    Course Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.slice(0, 4).map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#3EBFB0]/10 text-[#3EBFB0] rounded-lg text-xs font-medium border border-[#3EBFB0]/30"
                      >
                        {topic}
                      </span>
                    ))}
                    {course.topics.length > 4 && (
                      <span className="px-3 py-1 bg-[#C8A860]/10 text-[#C8A860] rounded-lg text-xs font-medium">
                        +{course.topics.length - 4} more
                      </span>
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
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-[#2B3674]/20 hover:border-[#3EBFB0] hover:bg-[#3EBFB0]/5"
                  >
                    <ExternalLink className="w-4 h-4" />
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

export default OnlineCourses;