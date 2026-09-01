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
  Video,
  FileText,
  Target,
  Zap,
  ExternalLink,
  BarChart3,
  Library
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

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
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop&q=80",
      skills: ["Budgeting", "Investment Basics", "Credit Management", "Financial Planning"],
      certificate: true,
      selfPaced: true,
      videos: 24,
      assignments: 6,
      matchScore: 92,
      completionRate: "94%",
      difficulty: "Beginner",
    },
    {
      id: "data-science",
      title: "Data Science Fundamentals",
      provider: "Udacity",
      instructor: "Alex Chen",
      rating: 4.5,
      reviews: 4321,
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

  const toggleSave = (id: string) => {
    setSavedCourses(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "text-green-600 bg-green-100 border-green-200";
      case "Intermediate": return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "Advanced": return "text-red-600 bg-red-100 border-red-200";
      default: return "text-brand-slate bg-brand-mist border-brand-slate/10";
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
    <div className="min-h-screen bg-brand-mist/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-ink to-brand-darkgreen rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-neon opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-brand-neon" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Online Courses
                </h1>
                <p className="text-brand-mist/90 text-lg">
                  Discover high-quality courses to accelerate your learning journey
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 border-brand-slate/10 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Input
              placeholder="Search by course name, topic, or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-5 w-5 text-brand-slate" />}
              className="w-full bg-brand-mist border-brand-slate/10 focus:border-brand-neon text-brand-ink rounded-xl pl-12 h-12"
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
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                    selectedCategory === category.name.toLowerCase()
                      ? "bg-white/20 text-white"
                      : "bg-brand-mist text-brand-slate"
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-brand-slate font-medium">
            Found <span className="font-bold text-brand-ink">{filteredCourses.length}</span> courses
          </p>
          <select className="bg-transparent text-brand-ink font-bold text-sm outline-none cursor-pointer hover:text-brand-darkgreen transition-colors">
            <option>Sort by Match Score</option>
            <option>Sort by Rating</option>
            <option>Sort by Students</option>
            <option>Sort by Duration</option>
          </select>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="group overflow-hidden flex flex-col h-full bg-white border-brand-slate/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-0"
            >
              {/* Course Image Header */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-brand-neon text-brand-ink px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    {course.matchScore}% Match
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleSave(course.id); }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg border border-white/20"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        savedCourses.includes(course.id)
                          ? "fill-brand-neon text-brand-neon"
                          : "text-white"
                      }`}
                    />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className={`px-4 py-1.5 rounded-lg shadow-lg font-bold text-sm tracking-wide ${
                    course.price === "Free" 
                      ? "bg-brand-darkgreen text-brand-neon" 
                      : "bg-white/90 backdrop-blur-md text-brand-ink"
                  }`}>
                    {course.price}
                  </div>
                </div>

                {course.certificate && (
                  <div className="absolute bottom-4 right-4 bg-brand-neon/90 backdrop-blur-md text-brand-ink px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg uppercase">
                    <Award className="w-3.5 h-3.5" />
                    Cert
                  </div>
                )}
              </div>

              {/* Course Info Body */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider border ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="px-2.5 py-0.5 bg-brand-mist text-brand-slate rounded-md text-xs font-bold border border-brand-slate/10 uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-ink mb-1 group-hover:text-brand-darkgreen transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-brand-slate font-medium mb-3">
                    by <span className="font-bold text-brand-ink">{course.instructor}</span> • {course.provider}
                  </p>
                  <p className="text-sm text-brand-slate leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 pb-5 border-b border-brand-slate/10 mt-auto">
                  <div className="flex items-center gap-1 bg-brand-mist px-2.5 py-1 rounded-md border border-brand-slate/5">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-brand-ink">{course.rating}</span>
                    <span className="text-xs font-medium text-brand-slate">({course.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-slate uppercase tracking-wide">
                    <Clock className="w-3.5 h-3.5 text-brand-ink opacity-70" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-slate uppercase tracking-wide">
                    <Users className="w-3.5 h-3.5 text-brand-ink opacity-70" />
                    {course.students}
                  </div>
                </div>

                {/* Course Content Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 bg-brand-mist rounded-xl border border-brand-slate/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-slate" />
                      <span className="text-xs font-bold text-brand-slate uppercase tracking-wide">Tasks</span>
                    </div>
                    <p className="text-sm font-bold text-brand-ink">{course.assignments}</p>
                  </div>
                  <div className="p-3 bg-brand-neon/10 rounded-xl border border-brand-neon/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-brand-darkgreen" />
                      <span className="text-xs font-bold text-brand-darkgreen uppercase tracking-wide">Done</span>
                    </div>
                    <p className="text-sm font-bold text-brand-darkgreen">{course.completionRate}</p>
                  </div>
                </div>

                {/* Topics Tags */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {course.topics.slice(0, 3).map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-brand-slate/10 hover:border-brand-neon text-brand-ink rounded-md text-xs font-bold transition-colors shadow-sm"
                      >
                        {topic}
                      </span>
                    ))}
                    {course.topics.length > 3 && (
                      <span className="px-2.5 py-1 bg-brand-mist text-brand-slate rounded-md text-xs font-bold border border-brand-slate/10">
                        +{course.topics.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto pt-2">
                  <Button
                    variant="primary"
                    className="flex-1 bg-brand-ink hover:bg-brand-darkgreen text-white shadow-md font-bold"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                  <Button
                    variant="outline"
                    className="border-brand-slate/20 hover:bg-brand-mist hover:border-brand-slate/30 text-brand-ink"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results state */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-brand-slate/10 shadow-sm">
            <Library className="h-16 w-16 text-brand-slate opacity-20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-ink mb-2">
              No courses found
            </h3>
            <p className="text-brand-slate">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineCourses;