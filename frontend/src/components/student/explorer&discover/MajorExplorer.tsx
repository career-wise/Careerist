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
  Monitor,
  PieChart,
  Settings,
  Activity
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import RecommendationsBanner from "../../shared/RecommendationsBanner";
import { FEATURES } from "../../../lib/constants";
import { Recommendation } from "../../../services/recommendationService";

import { useAppContext } from "../../../contexts/AppContext";

const MajorExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeRecs, setActiveRecs] = useState<Recommendation[]>([]);
  const { state, toggleShortlistedMajor } = useAppContext();
  const savedMajors = state.shortlistedMajors.map(m => m.name);

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
      ],
      requiredCourses: ["Calculus", "Physics", "Statistics", "Programming", "Data Structures"],
      icon: <Monitor className="w-8 h-8 text-brand-neon" />,
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
      ],
      requiredCourses: ["Statistics", "Linear Algebra", "Machine Learning", "Python", "SQL"],
      icon: <PieChart className="w-8 h-8 text-brand-darkgreen" />,
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
      ],
      requiredCourses: ["Accounting", "Economics", "Marketing", "Finance", "Strategy"],
      icon: <Briefcase className="w-8 h-8 text-brand-ink" />,
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
        "Therapist",
      ],
      requiredCourses: [
        "Statistics",
        "Biology",
        "Research Methods",
        "Social Psychology",
        "Cognitive Psychology",
      ],
      icon: <Brain className="w-8 h-8 text-brand-neon" />,
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
        "Manufacturing Engineer",
        "Design Engineer",
      ],
      requiredCourses: ["Calculus", "Physics", "Thermodynamics", "Materials Science", "Fluid Mechanics"],
      icon: <Settings className="w-8 h-8 text-brand-darkgreen" />,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80",
      matchScore: 82,
      demandLevel: "High",
      topSkills: ["Mathematics", "Physics", "CAD", "Problem Solving"],
      workLifeBalance: "Moderate",
      remoteOpportunities: "Low",
    },
    {
      name: "Nursing",
      category: "Healthcare",
      description: "Provide essential patient care and promote health and wellness in clinical settings",
      averageSalary: "$77,000",
      entryLevelSalary: "$60,000",
      jobGrowth: "+9%",
      difficulty: "High",
      timeToComplete: "4 years",
      careers: [
        "Registered Nurse",
        "Nurse Practitioner",
        "Clinical Nurse Specialist",
        "Nurse Educator",
        "Health Administrator",
      ],
      requiredCourses: ["Anatomy", "Physiology", "Microbiology", "Pharmacology", "Nutrition"],
      icon: <Activity className="w-8 h-8 text-brand-ink" />,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80",
      matchScore: 78,
      demandLevel: "Very High",
      topSkills: ["Empathy", "Communication", "Critical Thinking", "Clinical Skills"],
      workLifeBalance: "Challenging",
      remoteOpportunities: "Very Low",
    },
  ];

  const categories = ["All", "STEM", "Business", "Social Sciences", "Engineering", "Healthcare", "Arts", "Humanities"];

  const filteredMajors = majors.filter(
    (major) =>
      (selectedCategory === "all" || major.category.toLowerCase() === selectedCategory.toLowerCase()) &&
      (major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        major.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const recKeywords = activeRecs
    .map(r => (r.payload?.keyword || r.payload?.title || r.payload?.major || r.payload?.subject || '').toLowerCase())
    .filter(Boolean);

  const getBoost = (major: any) => {
    return recKeywords.some(kw => major.name.toLowerCase().includes(kw) || major.category.toLowerCase().includes(kw)) ? 100 : 0;
  };

  const sortedMajors = [...filteredMajors].sort((a, b) => {
    const boostA = getBoost(a);
    const boostB = getBoost(b);
    if (boostA !== boostB) return boostB - boostA;
    return b.matchScore - a.matchScore;
  });

  const toggleSaveMajor = (major: any) => {
    toggleShortlistedMajor(major);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-mist via-white to-brand-mist/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-ink to-brand-darkgreen rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-neon opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                  <GraduationCap className="h-6 w-6 text-brand-neon" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Major Explorer</h1>
              </div>
              <p className="text-brand-mist/80 text-lg max-w-2xl">
                Discover degree programs that align with your passions, skills, and career goals.
                Explore coursework, salary potential, and job market trends.
              </p>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-white/10">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-brand-neon" />
                  <span className="text-sm font-medium text-brand-mist">Your Top Match</span>
                </div>
                <span className="text-lg font-bold ml-4">Computer Science</span>
              </div>
              <Button className="w-full bg-brand-neon text-brand-ink hover:bg-brand-mist hover:text-brand-ink transition-colors font-semibold border-none">
                Take Assessment
              </Button>
            </div>
          </div>
        </div>

        <RecommendationsBanner targetFeature={FEATURES.EXPLORER} onRecommendationsLoaded={setActiveRecs} />

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-slate/50 h-5 w-5" />
            <input
              type="text"
              placeholder="Search majors, careers, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-brand-slate/10 rounded-xl focus:ring-2 focus:ring-brand-neon/50 focus:border-brand-neon transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center space-x-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                  selectedCategory === category.toLowerCase()
                    ? "bg-brand-ink text-white shadow-md"
                    : "bg-white text-brand-slate hover:bg-brand-mist border border-brand-slate/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-8">
          {sortedMajors.map((major) => (
            <Card key={major.name} className="overflow-hidden border border-brand-slate/10 hover:shadow-xl transition-all duration-300 bg-white group flex flex-col h-full">
              <div className="h-48 relative overflow-hidden">
                <img
                  src={major.image}
                  alt={major.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent"></div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="bg-brand-neon/90 text-brand-ink text-xs font-bold px-2 py-1 rounded-md flex items-center shadow-lg backdrop-blur-sm">
                    <Zap className="h-3 w-3 mr-1" /> {major.matchScore}% Match
                  </div>
                  <button
                    onClick={() => toggleSaveMajor(major)}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        savedMajors.includes(major.name) ? "text-yellow-400 fill-current" : "text-white"
                      }`}
                    />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md border border-white/20">
                        {major.category}
                      </span>
                      <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md border border-white/20">
                        {major.demandLevel} Demand
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{major.name}</h2>
                  </div>
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                    {major.icon}
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <p className="text-brand-slate mb-6 line-clamp-2">{major.description}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-brand-mist rounded-xl p-3 border border-brand-slate/5">
                    <div className="flex items-center text-brand-slate mb-1">
                      <DollarSign className="h-4 w-4 mr-1 text-brand-darkgreen" />
                      <span className="text-xs font-medium">Avg Salary</span>
                    </div>
                    <div className="text-lg font-bold text-brand-ink">{major.averageSalary}</div>
                    <div className="text-xs text-brand-slate/80 mt-1">Entry: {major.entryLevelSalary}</div>
                  </div>
                  <div className="bg-brand-mist rounded-xl p-3 border border-brand-slate/5">
                    <div className="flex items-center text-brand-slate mb-1">
                      <TrendingUp className="h-4 w-4 mr-1 text-brand-neon" />
                      <span className="text-xs font-medium">Job Growth</span>
                    </div>
                    <div className="text-lg font-bold text-brand-ink">{major.jobGrowth}</div>
                    <div className="text-xs text-brand-slate/80 mt-1">10-year projection</div>
                  </div>
                </div>

                {/* Top Careers */}
                <div className="mb-6 flex-grow">
                  <h3 className="text-sm font-semibold text-brand-ink mb-3 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-brand-slate" /> Top Careers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {major.careers.slice(0, 3).map((career, idx) => (
                      <span
                        key={idx}
                        className="bg-brand-mist text-brand-slate text-xs px-3 py-1.5 rounded-lg border border-brand-slate/10"
                      >
                        {career}
                      </span>
                    ))}
                    {major.careers.length > 3 && (
                      <span className="bg-brand-mist text-brand-slate text-xs px-2 py-1.5 rounded-lg border border-brand-slate/10">
                        +{major.careers.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-auto pt-4 border-t border-brand-slate/10">
                  <Button className="w-full bg-white text-brand-ink border-2 border-brand-slate/10 hover:border-brand-neon hover:bg-brand-mist transition-all justify-center group-hover:shadow-md">
                    Explore Details
                    <ChevronRight className="h-4 w-4 ml-2 text-brand-slate group-hover:text-brand-neon transition-colors" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {sortedMajors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-brand-slate/10 shadow-sm">
            <GraduationCap className="h-16 w-16 text-brand-slate/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-ink mb-2">No majors found</h3>
            <p className="text-brand-slate max-w-md mx-auto">
              We couldn't find any majors matching your current search. Try adjusting your filters or search terms.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-6 border-brand-slate/20 hover:bg-brand-mist"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MajorExplorer;