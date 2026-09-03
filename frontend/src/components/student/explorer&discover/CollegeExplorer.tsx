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
import RecommendationsBanner from "../../shared/RecommendationsBanner";
import { FEATURES } from "../../../lib/constants";
import { Recommendation } from "../../../services/recommendationService";

const getFutureDateString = (monthsAhead: number) => {
 const d = new Date();
 d.setMonth(d.getMonth() + monthsAhead);
 return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

import { useAppContext } from "../../../contexts/AppContext";

const CollegeExplorer: React.FC = () => {
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedFilter, setSelectedFilter] = useState("all");
 const [activeRecs, setActiveRecs] = useState<Recommendation[]>([]);
 
 const { state, toggleShortlistedCollege } = useAppContext();
 const savedColleges = state.shortlistedColleges.map(c => c.id);

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
 applicationDeadline: getFutureDateString(5),
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
 applicationDeadline: getFutureDateString(3),
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
 applicationDeadline: getFutureDateString(4),
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
 applicationDeadline: getFutureDateString(4),
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
 applicationDeadline: getFutureDateString(4),
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
 applicationDeadline: getFutureDateString(6),
 },
 ];

 const stats = [
 {
 label: "Colleges Tracked",
 value: colleges.length.toString(),
 icon: Building2,
 bgColor: "bg-brand-mist/50 border border-brand-slate/10",
 textColor: "text-brand-ink",
 iconColor: "text-brand-ink",
 },
 {
 label: "Saved Colleges",
 value: savedColleges.length.toString(),
 icon: Heart,
 bgColor: "bg-brand-neon/10 border border-brand-neon/20",
 textColor: "text-brand-ink",
 iconColor: "text-brand-neon",
 },
 {
 label: "Avg Match Score",
 value: "89%",
 icon: Target,
 bgColor: "bg-brand-darkgreen/10 border border-brand-darkgreen/20",
 textColor: "text-brand-ink",
 iconColor: "text-brand-darkgreen",
 },
 ];

 const toggleSave = (college: any) => {
 toggleShortlistedCollege(college);
 };

 const filteredColleges = colleges.filter(college =>
 college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
 college.programs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
 );

 const recKeywords = activeRecs
 .map(r => (r.payload?.keyword || r.payload?.title || r.payload?.major || r.payload?.college || '').toLowerCase())
 .filter(Boolean);

 const getBoost = (college: any) => {
 return recKeywords.some(kw => 
 college.name.toLowerCase().includes(kw) || 
 college.programs.some((p: string) => p.toLowerCase().includes(kw))
 ) ? 100 : 0;
 };

 const sortedColleges = [...filteredColleges].sort((a, b) => {
 const boostA = getBoost(a);
 const boostB = getBoost(b);
 if (boostA !== boostB) return boostB - boostA;
 return b.matchScore - a.matchScore;
 });

 return (
 <div className="min-h-screen bg-gradient-to-br from-brand-mist via-white to-brand-mist/50 p-6">
 <div className="max-w-7xl mx-auto space-y-8">
 
 {/* Header */}
 <div className="bg-gradient-to-r from-brand-ink to-brand-darkgreen rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
 <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-neon opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
 
 <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
 <GraduationCap className="w-8 h-8 text-brand-neon" />
 </div>
 <div>
 <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
 College Explorer
 </h1>
 <p className="text-brand-mist/90 text-lg">
 Discover colleges that match your academic goals and preferences
 </p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <Button className="bg-brand-neon text-brand-ink hover:bg-white hover:text-brand-ink border-none shadow-lg font-bold">
 <Target className="w-5 h-5 mr-2" />
 Find My Match
 </Button>
 </div>
 </div>
 </div>

 {/* Stats */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {stats.map((stat, index) => (
 <div
 key={index}
 className={`rounded-2xl p-6 ${stat.bgColor} hover:shadow-xl transition-all duration-300 group`}
 >
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-brand-slate mb-1">{stat.label}</p>
 <p className={`text-4xl font-bold ${stat.textColor}`}>{stat.value}</p>
 </div>
 <div className={`w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
 <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
 </div>
 </div>
 </div>
 ))}
 </div>

 <RecommendationsBanner targetFeature={FEATURES.EXPLORER} onRecommendationsLoaded={setActiveRecs} />

 {/* Search and Filters */}
 <div className="bg-white rounded-2xl p-6 border border-brand-slate/10 shadow-sm flex flex-col md:flex-row items-center gap-4">
 <div className="relative flex-1 w-full">
 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-slate/40 w-5 h-5" />
 <input
 type="text"
 placeholder="Search by college name, location, or program..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-12 pr-4 py-3 bg-brand-mist border border-brand-slate/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-neon transition-all"
 />
 </div>
 <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0">
 <Button
 variant="outline"
 className="border-brand-slate/20 text-brand-ink hover:bg-brand-mist flex-shrink-0"
 >
 <Filter className="w-4 h-4 mr-2" />
 Filters
 </Button>
 </div>
 </div>

 {/* Quick Filters & Results Count */}
 <div className="flex flex-col md:flex-row items-center justify-between gap-4">
 <div className="flex flex-wrap gap-2">
 {["All", "Private", "Public", "Top 50", "High Match"].map((filter) => (
 <button
 key={filter}
 onClick={() => setSelectedFilter(filter.toLowerCase())}
 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
 selectedFilter === filter.toLowerCase()
 ? "bg-brand-ink text-white shadow-md"
 : "bg-white border border-brand-slate/10 text-brand-slate hover:bg-brand-mist hover:text-brand-ink"
 }`}
 >
 {filter}
 </button>
 ))}
 </div>
 
 <div className="flex items-center gap-4 text-sm">
 <span className="text-brand-slate">
 Found <span className="font-bold text-brand-ink">{sortedColleges.length}</span> colleges
 </span>
 <select className="px-4 py-2 bg-white border border-brand-slate/10 rounded-lg text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-neon font-medium cursor-pointer">
 <option>Sort by Match Score</option>
 <option>Sort by Ranking</option>
 <option>Sort by Acceptance Rate</option>
 <option>Sort by Tuition</option>
 </select>
 </div>
 </div>

 {/* College Cards */}
 <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-8">
 {sortedColleges.map((college) => (
 <Card
 key={college.id}
 className="overflow-hidden border border-brand-slate/10 hover:shadow-2xl transition-all duration-300 bg-white group flex flex-col h-full"
 >
 {/* College Image */}
 <div className="relative h-56 overflow-hidden">
 <img
 src={college.image}
 alt={college.name}
 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/40 to-transparent"></div>
 
 {/* Match Score Badge */}
 <div className="absolute top-4 right-4 bg-brand-neon text-brand-ink px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2">
 <Sparkles className="w-4 h-4" />
 {college.matchScore}% Match
 </div>

 {/* Save Button */}
 <button
 onClick={() => toggleSave(college)}
 className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-colors shadow-lg"
 >
 <Heart
 className={`w-5 h-5 ${
 savedColleges.includes(college.id)
 ? "fill-white text-white"
 : "text-white"
 }`}
 />
 </button>

 {/* Ranking & Info Overlay */}
 <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
 <div>
 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-neon transition-colors">
 {college.name}
 </h3>
 <div className="flex items-center gap-3">
 <div className="flex items-center gap-1.5 text-sm text-brand-mist/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
 <MapPin className="w-4 h-4" />
 <span>{college.location}</span>
 </div>
 <div className="flex items-center gap-1.5 text-sm text-brand-mist/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
 <Award className="w-4 h-4" />
 <span>#{college.ranking} National</span>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* College Info */}
 <div className="p-6 flex flex-col flex-grow">
 {/* Quick Stats Grid */}
 <div className="grid grid-cols-3 gap-3 mb-6">
 <div className="bg-brand-mist p-3 rounded-xl border border-brand-slate/5 text-center">
 <Building2 className="w-5 h-5 text-brand-darkgreen mx-auto mb-1" />
 <p className="text-xs text-brand-slate mb-1">Type</p>
 <p className="text-sm font-bold text-brand-ink">{college.type}</p>
 </div>
 <div className="bg-brand-mist p-3 rounded-xl border border-brand-slate/5 text-center">
 <Users className="w-5 h-5 text-brand-darkgreen mx-auto mb-1" />
 <p className="text-xs text-brand-slate mb-1">Enrollment</p>
 <p className="text-sm font-bold text-brand-ink">{college.enrollment}</p>
 </div>
 <div className="bg-brand-mist p-3 rounded-xl border border-brand-slate/5 text-center">
 <DollarSign className="w-5 h-5 text-brand-darkgreen mx-auto mb-1" />
 <p className="text-xs text-brand-slate mb-1">Tuition</p>
 <p className="text-sm font-bold text-brand-ink truncate" title={college.tuition}>{college.tuition}</p>
 </div>
 </div>

 {/* Highlights */}
 <div className="mb-6">
 <div className="flex flex-wrap gap-2">
 {college.highlights.map((highlight, index) => (
 <span
 key={index}
 className="px-3 py-1.5 bg-brand-neon/10 text-brand-darkgreen rounded-lg text-xs font-semibold border border-brand-neon/20"
 >
 {highlight}
 </span>
 ))}
 </div>
 </div>

 {/* Admissions Info */}
 <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-brand-mist/50 rounded-xl border border-brand-slate/10">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-white rounded-lg border border-brand-slate/10 flex items-center justify-center">
 <Target className="w-5 h-5 text-brand-ink" />
 </div>
 <div>
 <p className="text-xs font-medium text-brand-slate mb-0.5">Acceptance</p>
 <p className="text-lg font-bold text-brand-ink">{college.acceptance}</p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-white rounded-lg border border-brand-slate/10 flex items-center justify-center">
 <BookOpen className="w-5 h-5 text-brand-ink" />
 </div>
 <div>
 <p className="text-xs font-medium text-brand-slate mb-0.5">SAT Range</p>
 <p className="text-lg font-bold text-brand-ink">{college.satRange}</p>
 </div>
 </div>
 </div>

 {/* Programs */}
 <div className="mb-6 flex-grow">
 <h4 className="text-sm font-bold text-brand-ink mb-3 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-brand-slate" />
 Popular Programs
 </h4>
 <div className="flex flex-wrap gap-2">
 {college.programs.slice(0, 4).map((program, index) => (
 <span
 key={index}
 className="px-3 py-1.5 bg-white border border-brand-slate/10 text-brand-slate rounded-lg text-xs font-medium"
 >
 {program}
 </span>
 ))}
 {college.programs.length > 4 && (
 <span className="px-3 py-1.5 bg-brand-mist text-brand-ink rounded-lg text-xs font-bold">
 +{college.programs.length - 4} more
 </span>
 )}
 </div>
 </div>

 {/* Deadline */}
 <div className="flex items-center gap-3 mb-6 p-3 bg-white border border-brand-neon/30 rounded-xl">
 <div className="p-2 bg-brand-neon/10 rounded-lg">
 <Calendar className="w-4 h-4 text-brand-darkgreen" />
 </div>
 <span className="text-sm font-medium text-brand-ink">
 Application Deadline: <span className="font-bold text-brand-darkgreen">{college.applicationDeadline}</span>
 </span>
 </div>

 {/* Action Buttons */}
 <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-brand-slate/10">
 <Button
 className="w-full bg-gradient-to-r from-brand-ink to-brand-darkgreen hover:from-brand-darkgreen hover:to-brand-ink text-white shadow-md font-medium"
 >
 <ExternalLink className="w-4 h-4 mr-2" />
 View Details
 </Button>
 <Button
 variant="outline"
 className="w-full border-brand-slate/20 text-brand-ink hover:bg-brand-mist font-medium"
 >
 <TrendingUp className="w-4 h-4 mr-2" />
 See Chances
 </Button>
 </div>
 </div>
 </Card>
 ))}
 </div>

 {/* Load More */}
 {sortedColleges.length > 6 && (
 <div className="text-center pt-8">
 <Button
 variant="outline"
 className="border-brand-slate/20 text-brand-ink hover:bg-brand-mist bg-white font-semibold px-8 py-3 rounded-xl shadow-sm"
 >
 Load More Colleges
 <ChevronDown className="w-5 h-5 ml-2" />
 </Button>
 </div>
 )}
 </div>
 </div>
 );
};

export default CollegeExplorer;