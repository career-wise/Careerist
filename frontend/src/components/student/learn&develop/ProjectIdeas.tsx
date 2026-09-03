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
 FolderOpen
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

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
 icon: Code,
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
 icon: Camera,
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
 icon: BookOpen,
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
 icon: Rocket,
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
 icon: Heart,
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
 icon: Palette,
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
 icon: Music,
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
 icon: TrendingUp,
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
 case "Beginner": return "text-green-600 bg-green-100 border-green-200";
 case "Intermediate": return "text-yellow-600 bg-yellow-100 border-yellow-200";
 case "Advanced": return "text-red-600 bg-red-100 border-red-200";
 default: return "text-brand-slate bg-brand-mist border-brand-slate/10";
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
 <div className="min-h-screen bg-brand-mist/30 p-6">
 <div className="max-w-7xl mx-auto space-y-8">
 
 {/* Header */}
 <div className="bg-gradient-to-r from-brand-ink to-brand-darkgreen rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
 <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-neon opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
 
 <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
 <Lightbulb className="w-8 h-8 text-brand-neon" />
 </div>
 <div>
 <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
 Project Ideas
 </h1>
 <p className="text-brand-mist/90 text-lg">
 Hands-on projects to build your portfolio and real-world skills
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Stats */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {stats.map((stat, index) => (
 <div
 key={index}
 className="bg-white rounded-2xl p-5 border border-brand-slate/10 hover:shadow-lg transition-all group flex items-center justify-between"
 >
 <div>
 <p className="text-sm font-bold text-brand-slate uppercase tracking-wide mb-1">{stat.label}</p>
 <p className="text-2xl font-bold text-brand-ink">{stat.value}</p>
 </div>
 <div className="w-14 h-14 bg-brand-mist rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-neon/10 transition-all border border-brand-slate/5">
 <stat.icon className="w-7 h-7 text-brand-ink group-hover:text-brand-darkgreen transition-colors" />
 </div>
 </div>
 ))}
 </div>

 {/* Search and Filters */}
 <Card className="p-6 border-brand-slate/10 shadow-sm flex flex-col md:flex-row gap-4 items-center">
 <div className="flex-1 relative w-full">
 <Input
 placeholder="Search by project name, skill, or topic..."
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
 </button>
 ))}
 </div>
 </div>
 </Card>

 {/* Results Header */}
 <div className="flex items-center justify-between mb-2">
 <p className="text-brand-slate font-medium">
 Found <span className="font-bold text-brand-ink">{filteredProjects.length}</span> projects
 </p>
 <select className="bg-transparent text-brand-ink font-bold text-sm outline-none cursor-pointer hover:text-brand-darkgreen transition-colors">
 <option>Sort by Match Score</option>
 <option>Sort by Duration</option>
 <option>Sort by Difficulty</option>
 </select>
 </div>

 {/* Projects Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-6">
 {filteredProjects.map((project) => (
 <Card
 key={project.id}
 className="group overflow-hidden flex flex-col h-full bg-white border-brand-slate/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-0"
 >
 {/* Project Image Header */}
 <div className="relative h-48 overflow-hidden shrink-0">
 <img
 src={project.image}
 alt={project.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

 <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
 <div className="bg-brand-neon text-brand-ink px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 uppercase tracking-wide">
 <Sparkles className="w-3.5 h-3.5" />
 {project.matchScore}% Match
 </div>
 <button
 onClick={(e) => { e.preventDefault(); toggleSave(project.id); }}
 className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg border border-white/20"
 >
 <Heart
 className={`w-5 h-5 transition-colors ${
 savedProjects.includes(project.id)
 ? "fill-brand-neon text-brand-neon"
 : "text-white"
 }`}
 />
 </button>
 </div>
 </div>

 {/* Project Info Body */}
 <div className="p-6 flex-grow flex flex-col">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-12 h-12 bg-brand-mist rounded-xl flex items-center justify-center border border-brand-slate/5 group-hover:bg-brand-neon/10 transition-colors">
 <project.icon className="w-6 h-6 text-brand-ink group-hover:text-brand-darkgreen" />
 </div>
 <div>
 <h3 className="text-xl font-bold text-brand-ink group-hover:text-brand-darkgreen transition-colors line-clamp-1">
 {project.title}
 </h3>
 <div className="flex items-center gap-2 mt-1">
 <span className="px-2.5 py-0.5 bg-brand-mist text-brand-slate rounded-md text-xs font-bold border border-brand-slate/10 uppercase tracking-wider">
 {project.category}
 </span>
 </div>
 </div>
 </div>

 <p className="text-sm text-brand-slate leading-relaxed mb-5 flex-grow">
 {project.description}
 </p>

 <div className="flex items-center justify-between mb-5 bg-brand-mist p-3 rounded-xl border border-brand-slate/5">
 <div className="flex items-center gap-2">
 <Clock className="w-4 h-4 text-brand-slate" />
 <div>
 <p className="text-xs font-bold text-brand-slate uppercase tracking-wide">Duration</p>
 <p className="text-sm font-bold text-brand-ink">{project.duration}</p>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <Target className="w-4 h-4 text-brand-slate" />
 <div>
 <p className="text-xs font-bold text-brand-slate uppercase tracking-wide">Difficulty</p>
 <span className={`text-sm font-bold ${
 project.difficulty === 'Beginner' ? 'text-green-600' :
 project.difficulty === 'Intermediate' ? 'text-yellow-600' :
 'text-red-600'
 }`}>
 {project.difficulty}
 </span>
 </div>
 </div>
 </div>

 {/* Skills Tags */}
 <div className="mb-6">
 <h4 className="text-xs font-bold text-brand-ink uppercase tracking-wide mb-2 opacity-70">
 Skills Developed
 </h4>
 <div className="flex flex-wrap gap-2">
 {project.skills.map((skill, idx) => (
 <span
 key={idx}
 className="px-2.5 py-1 bg-white border border-brand-slate/10 text-brand-ink rounded-md text-xs font-bold shadow-sm"
 >
 {skill}
 </span>
 ))}
 </div>
 </div>

 {/* Action Buttons */}
 <Button
 variant="primary"
 className="w-full bg-brand-ink hover:bg-brand-darkgreen text-white shadow-md font-bold"
 >
 View Project Details
 </Button>
 </div>
 </Card>
 ))}
 </div>

 {/* No Results state */}
 {filteredProjects.length === 0 && (
 <div className="text-center py-16 bg-white rounded-3xl border border-brand-slate/10 shadow-sm">
 <FolderOpen className="h-16 w-16 text-brand-slate opacity-20 mx-auto mb-4" />
 <h3 className="text-xl font-bold text-brand-ink mb-2">
 No projects found
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

export default ProjectIdeas;