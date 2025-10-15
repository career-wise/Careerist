import React, { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  DollarSign,
  Star,
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  Filter,
  ChevronDown,
  ExternalLink,
  Heart,
  Sparkles,
  Building2,
  Calendar,
  Target,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

const CollegeExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [savedColleges, setSavedColleges] = useState<number[]>([]);

  const colleges = [
    {
      id: 1,
      name: "Stanford University",
      location: "Stanford, CA",
      type: "Private",
      ranking: 6,
      acceptance: "4%",
      tuition: "$56,169",
      enrollment: "17,249",
      satRange: "1470-1570",
      programs: ["Computer Science", "Engineering", "Business", "Medicine", "Data Science"],
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop&q=80",
      matchScore: 95,
      highlights: ["Top CS Program", "Silicon Valley Location", "Strong Alumni Network"],
      applicationDeadline: "Jan 5, 2026",
    },
    {
      id: 2,
      name: "University of California, Berkeley",
      location: "Berkeley, CA",
      type: "Public",
      ranking: 22,
      acceptance: "17%",
      tuition: "$14,253 (in-state)",
      enrollment: "45,057",
      satRange: "1330-1530",
      programs: ["Engineering", "Computer Science", "Business", "Liberal Arts", "Data Science"],
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop&q=80",
      matchScore: 88,
      highlights: ["Public Ivy", "Research Opportunities", "Diverse Community"],
      applicationDeadline: "Nov 30, 2025",
    },
    {
      id: 3,
      name: "Massachusetts Institute of Technology",
      location: "Cambridge, MA",
      type: "Private",
      ranking: 2,
      acceptance: "7%",
      tuition: "$53,790",
      enrollment: "11,934",
      satRange: "1510-1570",
      programs: ["Engineering", "Computer Science", "Physics", "Mathematics", "AI/ML"],
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=600&fit=crop&q=80",
      matchScore: 92,
      highlights: ["World-Class Research", "Innovation Hub", "Tech Focus"],
      applicationDeadline: "Jan 1, 2026",
    },
    {
      id: 4,
      name: "Harvard University",
      location: "Cambridge, MA",
      type: "Private",
      ranking: 3,
      acceptance: "5%",
      tuition: "$54,269",
      enrollment: "23,731",
      satRange: "1460-1580",
      programs: ["Liberal Arts", "Business", "Law", "Medicine", "Government"],
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop&q=80",
      matchScore: 90,
      highlights: ["Prestigious", "Global Network", "Financial Aid"],
      applicationDeadline: "Jan 1, 2026",
    },
    {
      id: 5,
      name: "Carnegie Mellon University",
      location: "Pittsburgh, PA",
      type: "Private",
      ranking: 28,
      acceptance: "17%",
      tuition: "$59,864",
      enrollment: "15,818",
      satRange: "1460-1560",
      programs: ["Computer Science", "Robotics", "AI", "Engineering", "Drama"],
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&q=80",
      matchScore: 87,
      highlights: ["Top CS School", "AI Research", "Interdisciplinary"],
      applicationDeadline: "Jan 3, 2026",
    },
    {
      id: 6,
      name: "University of Michigan",
      location: "Ann Arbor, MI",
      type: "Public",
      ranking: 23,
      acceptance: "23%",
      tuition: "$15,948 (in-state)",
      enrollment: "47,907",
      satRange: "1340-1530",
      programs: ["Engineering", "Business", "Medicine", "Liberal Arts", "Music"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&q=80",
      matchScore: 85,
      highlights: ["Big Ten", "Research University", "School Spirit"],
      applicationDeadline: "Feb 1, 2026",
    },
  ];

  const stats = [
    {
      label: "Colleges Tracked",
      value: colleges.length.toString(),
      icon: Building2,
      color: "from-[#2B3674] to-[#3d4d9e]",
      bgColor: "bg-[#2B3674]/10",
    },
    {
      label: "Saved Colleges",
      value: savedColleges.length.toString(),
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

  const toggleSave = (id: number) => {
    setSavedColleges(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.programs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                College Explorer
              </h1>
              <p className="text-gray-600">
                Discover colleges that match your academic goals and preferences
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#2B3674]/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by college name, location, or program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#3EBFB0]/5 border-2 border-[#2B3674]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3EBFB0] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <Button
              variant="outline"
              className="border-2 border-[#2B3674]/20 hover:border-[#3EBFB0] hover:bg-[#3EBFB0]/5"
            >
              <Filter className="w-4 h-4 mr-2 text-[#2B3674]" />
              Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["All", "Private", "Public", "Top 50", "High Match"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === filter.toLowerCase()
                    ? "bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] text-white shadow-md"
                    : "bg-[#2B3674]/5 text-[#2B3674] hover:bg-[#3EBFB0]/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-[#2B3674]">{filteredColleges.length}</span> colleges
          </p>
          <select className="px-4 py-2 border-2 border-[#2B3674]/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3EBFB0]">
            <option>Sort by Match Score</option>
            <option>Sort by Ranking</option>
            <option>Sort by Acceptance Rate</option>
            <option>Sort by Tuition</option>
          </select>
        </div>

        {/* College Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#2B3674]/10 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* College Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3674]/80 via-[#2B3674]/40 to-transparent"></div>
                
                {/* Match Score Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#C8A860] to-[#3EBFB0] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  {college.matchScore}% Match
                </div>

                {/* Save Button */}
                <button
                  onClick={() => toggleSave(college.id)}
                  className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      savedColleges.includes(college.id)
                        ? "fill-red-500 text-red-500"
                        : "text-[#2B3674]"
                    }`}
                  />
                </button>

                {/* Ranking Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                  <Award className="w-4 h-4 text-[#C8A860]" />
                  <span className="text-sm font-bold text-[#2B3674]">#{college.ranking} National</span>
                </div>
              </div>

              {/* College Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2B3674] mb-3 group-hover:text-[#3EBFB0] transition-colors">
                  {college.name}
                </h3>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[#3EBFB0]" />
                    <span className="text-gray-700">{college.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-[#3EBFB0]" />
                    <span className="text-gray-700">{college.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#3EBFB0]" />
                    <span className="text-gray-700">{college.enrollment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[#3EBFB0]" />
                    <span className="text-gray-700 truncate">{college.tuition}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {college.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-[#2B3674]/10 to-[#3EBFB0]/10 text-[#2B3674] rounded-full text-xs font-medium border border-[#3EBFB0]/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Admissions Info */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gradient-to-br from-[#2B3674]/5 to-[#3EBFB0]/5 rounded-xl border border-[#2B3674]/10">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Acceptance Rate</p>
                    <p className="text-lg font-bold text-[#2B3674]">{college.acceptance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">SAT Range</p>
                    <p className="text-lg font-bold text-[#2B3674]">{college.satRange}</p>
                  </div>
                </div>

                {/* Programs */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#2B3674] mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#3EBFB0]" />
                    Popular Programs
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {college.programs.slice(0, 4).map((program, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#3EBFB0]/10 text-[#3EBFB0] rounded-lg text-xs font-medium border border-[#3EBFB0]/30"
                      >
                        {program}
                      </span>
                    ))}
                    {college.programs.length > 4 && (
                      <span className="px-3 py-1 bg-[#C8A860]/10 text-[#C8A860] rounded-lg text-xs font-medium">
                        +{college.programs.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-800">
                    <span className="font-semibold">Application Deadline:</span> {college.applicationDeadline}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] hover:from-[#3EBFB0] hover:to-[#2B3674] shadow-md"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-[#2B3674]/20 hover:border-[#3EBFB0] hover:bg-[#3EBFB0]/5"
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredColleges.length > 6 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-2 border-[#2B3674]/20 hover:border-[#3EBFB0] hover:bg-[#3EBFB0]/5"
            >
              Load More Colleges
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeExplorer;