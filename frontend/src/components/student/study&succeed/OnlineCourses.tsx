import React, { useState, useEffect } from "react";
import {
  Play,
  Clock,
  Star,
  Users,
  BookOpen,
  Award,
  Search,
  Filter,
  Sparkles,
  ExternalLink,
  Target,
  AlertCircle
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import { authService } from "../../../lib/auth";
import { profileService } from "../../../services/profileService";

// INDIA-SCOPED CURATED REFERENCE TABLE
const COURSE_DB = [
  {
    id: "c1",
    title: "NPTEL: Programming, Data Structures and Algorithms using Python",
    provider: "SWAYAM / IIT Madras",
    instructor: "Prof. Madhavan Mukund",
    rating: 4.8,
    duration: "8 weeks",
    level: "Beginner",
    category: "Software Engineering",
    description: "A foundational course from IIT Madras covering basic algorithms and data structures in Python.",
    price: "Free (Optional Exam Fee ₹1000)",
    link: "https://onlinecourses.nptel.ac.in/",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "c2",
    title: "Machine Learning Specialization",
    provider: "Coursera",
    instructor: "Andrew Ng",
    rating: 4.9,
    duration: "3 months",
    level: "Intermediate",
    category: "Data Science",
    description: "The definitive machine learning curriculum adapted for modern AI techniques.",
    price: "Free to audit",
    link: "https://www.coursera.org/",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "c3",
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    provider: "Udemy",
    instructor: "Dr. Angela Yu",
    rating: 4.7,
    duration: "Self-paced",
    level: "All Levels",
    category: "Software Engineering",
    description: "Master Python by building 100 projects in 100 days. Very popular among Indian students.",
    price: "Paid",
    link: "https://www.udemy.com/",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "c4",
    title: "NPTEL: Data Science for Engineers",
    provider: "SWAYAM / IIT Madras",
    instructor: "Prof. Raghunathan Rengaswamy",
    rating: 4.6,
    duration: "8 weeks",
    level: "Intermediate",
    category: "Data Science",
    description: "Learn mathematical foundations of Data Science from IIT professors.",
    price: "Free (Optional Exam Fee ₹1000)",
    link: "https://onlinecourses.nptel.ac.in/",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "c5",
    title: "Financial Modeling and Valuation",
    provider: "Udemy",
    instructor: "365 Careers",
    rating: 4.6,
    duration: "Self-paced",
    level: "Intermediate",
    category: "Finance",
    description: "Complete guide to financial modeling in Excel.",
    price: "Paid",
    link: "https://www.udemy.com/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
  }
];

const OnlineCourses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userGoal, setUserGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserGoal = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          const profile = await profileService.getProfile('');
          if (profile?.onboarding_answers) {
            setUserGoal(profile.onboarding_answers.career_goal || profile.onboarding_answers.target_role || null);
          }
        }
      } catch (err) {
        console.error("Failed to load goal", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserGoal();
  }, []);

  // Simple keyword matching for the curated list
  const getRelevantCourses = () => {
    let filtered = COURSE_DB;
    if (userGoal) {
      const goalLower = userGoal.toLowerCase();
      // Broad matching
      if (goalLower.includes("software") || goalLower.includes("engineer") || goalLower.includes("developer")) {
        filtered = COURSE_DB.filter(c => c.category === "Software Engineering");
      } else if (goalLower.includes("data") || goalLower.includes("ai") || goalLower.includes("machine learning")) {
        filtered = COURSE_DB.filter(c => c.category === "Data Science");
      } else if (goalLower.includes("finance") || goalLower.includes("business")) {
        filtered = COURSE_DB.filter(c => c.category === "Finance");
      }
    }
    
    if (searchQuery) {
      filtered = filtered.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.provider.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return filtered;
  };

  const courses = getRelevantCourses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-mist/30 via-white to-brand-mist/30 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-ink text-white p-8 md:p-12 shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-brand-neon" />
              Online Courses
            </h1>
            <p className="text-lg text-brand-mist/90 mb-8 max-w-2xl">
              Upskill and reach your career goals with our curated selection of high-quality courses available in India.
            </p>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> This is a curated list of reference courses from platforms highly accessible in India (like SWAYAM/NPTEL, Coursera, Udemy). It is meant as a starting point, not an exhaustive or live catalog.
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-slate" />
              <input
                type="text"
                placeholder="Search for courses, providers, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-brand-slate/20 focus:border-brand-neon focus:ring-0 text-brand-ink transition-colors"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-brand-slate">Loading tailored recommendations...</div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-ink flex items-center gap-2">
                <Target className="w-6 h-6 text-brand-neon" />
                {userGoal ? `Recommended for your goal: ${userGoal}` : "Curated Courses"}
              </h2>
            </div>
            
            {courses.length === 0 ? (
              <div className="text-center py-12 text-brand-slate bg-white rounded-xl shadow-sm">No courses found matching your criteria.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <Card key={course.id} className="group overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-brand-neon/50">
                    <div className="relative h-48 overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-brand-ink flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#C8A860] fill-current" />
                        {course.rating}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-brand-mist text-brand-ink text-xs font-bold rounded-full">
                          {course.category}
                        </span>
                        <span className="px-3 py-1 bg-brand-slate/10 text-brand-ink text-xs font-bold rounded-full">
                          {course.level}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-brand-ink mb-2 line-clamp-2 group-hover:text-brand-darkgreen transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-brand-slate text-sm mb-4">By {course.instructor} • {course.provider}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-brand-slate">
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#3EBFB0]" />{course.duration}</div>
                        <div className="flex items-center gap-2"><Award className="w-4 h-4 text-[#C8A860]" />{course.price}</div>
                      </div>

                      <div className="mt-auto">
                        <Button className="w-full bg-brand-ink text-white hover:bg-brand-darkgreen flex items-center justify-center gap-2" onClick={() => window.open(course.link, '_blank')}>
                          View Course
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineCourses;