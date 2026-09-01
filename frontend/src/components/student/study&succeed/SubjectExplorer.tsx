import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Star,
  TrendingUp,
  Users,
  Clock,
  ExternalLink,
  Monitor,
  Microscope,
  Brain,
  Calculator,
  Book,
  LineChart,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

const SubjectExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const subjects = [
    {
      id: 1,
      name: "Computer Science",
      category: "STEM",
      description: "Learn programming, algorithms, and software development",
      difficulty: "Intermediate",
      popularity: 95,
      averageTime: "4-6 hours/week",
      careers: [
        "Software Engineer",
        "Data Scientist",
        "Web Developer",
        "AI Researcher",
      ],
      skills: ["Programming", "Problem Solving", "Logic", "Mathematics"],
      growth: "+15%",
      salary: "$75,000 - $150,000",
      icon: Monitor,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Biology",
      category: "Science",
      description: "Study living organisms and life processes",
      difficulty: "Intermediate",
      popularity: 78,
      averageTime: "5-7 hours/week",
      careers: [
        "Doctor",
        "Research Scientist",
        "Biotechnologist",
        "Environmental Scientist",
      ],
      skills: [
        "Scientific Method",
        "Analysis",
        "Research",
        "Critical Thinking",
      ],
      growth: "+8%",
      salary: "$50,000 - $120,000",
      icon: Microscope,
      rating: 4.5,
    },
    {
      id: 3,
      name: "Psychology",
      category: "Social Science",
      description: "Understand human behavior and mental processes",
      difficulty: "Beginner",
      popularity: 82,
      averageTime: "4-5 hours/week",
      careers: ["Psychologist", "Counselor", "HR Specialist", "Social Worker"],
      skills: ["Empathy", "Communication", "Analysis", "Research"],
      growth: "+3%",
      salary: "$45,000 - $90,000",
      icon: Brain,
      rating: 4.6,
    },
    {
      id: 4,
      name: "Mathematics",
      category: "STEM",
      description: "Master numbers, equations, and mathematical concepts",
      difficulty: "Advanced",
      popularity: 65,
      averageTime: "6-8 hours/week",
      careers: ["Data Analyst", "Actuary", "Engineer", "Finance Analyst"],
      skills: ["Logical Thinking", "Problem Solving", "Analysis", "Precision"],
      growth: "+5%",
      salary: "$60,000 - $130,000",
      icon: Calculator,
      rating: 4.3,
    },
    {
      id: 5,
      name: "English Literature",
      category: "Humanities",
      description: "Explore literature, writing, and communication",
      difficulty: "Intermediate",
      popularity: 70,
      averageTime: "4-6 hours/week",
      careers: ["Writer", "Teacher", "Editor", "Content Creator"],
      skills: ["Writing", "Critical Analysis", "Communication", "Creativity"],
      growth: "+2%",
      salary: "$40,000 - $75,000",
      icon: Book,
      rating: 4.4,
    },
    {
      id: 6,
      name: "Economics",
      category: "Social Science",
      description: "Study markets, finance, and economic systems",
      difficulty: "Intermediate",
      popularity: 73,
      averageTime: "5-6 hours/week",
      careers: [
        "Economist",
        "Financial Analyst",
        "Business Consultant",
        "Policy Analyst",
      ],
      skills: ["Analysis", "Mathematics", "Critical Thinking", "Research"],
      growth: "+6%",
      salary: "$55,000 - $110,000",
      icon: LineChart,
      rating: 4.2,
    },
  ];

  const categories = [
    "all",
    "STEM",
    "Science",
    "Social Science",
    "Humanities",
    "Arts",
  ];

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600 bg-green-100 border-green-200";
      case "Intermediate":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "Advanced":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-brand-slate bg-brand-mist border-brand-slate/10";
    }
  };

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
                <BookOpen className="w-8 h-8 text-brand-neon" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Subject Explorer
                </h1>
                <p className="text-brand-mist/90 text-lg">
                  Discover academic subjects and their career connections
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 border-brand-slate/10 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
             <Input
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-5 w-5 text-brand-slate" />}
                className="w-full bg-brand-mist border-brand-slate/10 focus:border-brand-neon text-brand-ink rounded-xl pl-12 h-12"
              />
          </div>
          <div className="flex items-center space-x-3 bg-brand-mist rounded-xl px-4 border border-brand-slate/10 focus-within:border-brand-neon transition-colors">
            <Filter className="h-5 w-5 text-brand-slate" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent border-none text-brand-ink focus:ring-0 text-sm font-medium py-3 outline-none cursor-pointer w-full md:w-auto"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-6">
          <Card className="text-center p-6 border-brand-slate/10 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-brand-mist rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-7 w-7 text-brand-ink" />
            </div>
            <div className="text-3xl font-bold text-brand-ink mb-1">
              {subjects.length}
            </div>
            <div className="text-sm font-medium text-brand-slate">Available Subjects</div>
          </Card>
          
          <Card className="text-center p-6 border-brand-slate/10 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-brand-mist rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-7 w-7 text-brand-ink" />
            </div>
            <div className="text-3xl font-bold text-brand-ink mb-1">200+</div>
            <div className="text-sm font-medium text-brand-slate">Career Paths</div>
          </Card>
          
          <Card className="text-center p-6 border-brand-slate/10 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-brand-mist rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-brand-ink" />
            </div>
            <div className="text-3xl font-bold text-brand-ink mb-1">15k+</div>
            <div className="text-sm font-medium text-brand-slate">Students Guided</div>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-6">
          {filteredSubjects.map((subject) => (
            <Card
              key={subject.id}
              className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-brand-slate/10 overflow-hidden flex flex-col h-full bg-white group"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-mist flex items-center justify-center group-hover:bg-brand-neon/10 transition-colors border border-brand-slate/5">
                    <subject.icon className="w-6 h-6 text-brand-ink group-hover:text-brand-darkgreen transition-colors" />
                  </div>
                  <div className="flex items-center bg-brand-mist px-2.5 py-1 rounded-lg border border-brand-slate/5">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-brand-ink ml-1.5">
                      {subject.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-brand-ink mb-2">
                  {subject.name}
                </h3>
                <p className="text-brand-slate text-sm font-medium mb-5 line-clamp-2 flex-grow">
                  {subject.description}
                </p>

                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(
                      subject.difficulty
                    )} uppercase tracking-wide`}
                  >
                    {subject.difficulty}
                  </span>
                  <span className="text-xs font-bold text-brand-slate bg-brand-mist px-3 py-1 rounded-full border border-brand-slate/5">
                    {subject.category}
                  </span>
                </div>

                <div className="space-y-3 mb-6 bg-brand-mist p-4 rounded-xl border border-brand-slate/5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-slate font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-2 opacity-70" /> Time:
                    </span>
                    <span className="font-bold text-brand-ink">{subject.averageTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-slate font-medium flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 opacity-70" /> Growth:
                    </span>
                    <span className="font-bold text-brand-darkgreen bg-brand-neon/20 px-2 py-0.5 rounded-md">
                      {subject.growth}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-slate font-medium">Avg Salary:</span>
                    <span className="font-bold text-brand-ink">{subject.salary}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="text-xs font-bold text-brand-ink uppercase tracking-wide mb-2 opacity-70">
                    Top Career Paths
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.careers.slice(0, 3).map((career, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-white border border-brand-slate/10 text-brand-ink rounded-md text-xs font-medium shadow-sm hover:border-brand-neon transition-colors"
                      >
                        {career}
                      </span>
                    ))}
                    {subject.careers.length > 3 && (
                      <span className="px-2.5 py-1 text-brand-slate rounded-md text-xs font-medium bg-brand-mist border border-brand-slate/10">
                        +{subject.careers.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <div className="flex space-x-3">
                  <Button variant="primary" className="flex-1 bg-brand-ink hover:bg-brand-darkgreen text-white font-bold shadow-md">
                    Explore Paths
                  </Button>
                  <Button variant="outline" className="border-brand-slate/20 text-brand-ink hover:bg-brand-mist">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSubjects.length === 0 && (
          <Card className="text-center p-12 border-brand-slate/10 shadow-sm bg-white">
            <div className="w-20 h-20 bg-brand-mist rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-slate/5">
               <BookOpen className="h-10 w-10 text-brand-slate/50" />
            </div>
            <h3 className="text-xl font-bold text-brand-ink mb-2">
              No subjects found
            </h3>
            <p className="text-brand-slate font-medium">
              Try adjusting your search or filter criteria
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SubjectExplorer;
