import React, { useState } from "react";
import { 
 Palette, 
 Video, 
 PenTool, 
 Camera, 
 Layout, 
 Search, 
 Clock, 
 Target, 
 ChevronRight, 
 Play,
 CheckCircle,
 Brush
} from "lucide-react";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";

const CreativeSkills: React.FC = () => {
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("all");

 const modules = [
 {
 id: "graphic-design",
 title: "Graphic Design Fundamentals",
 category: "Design",
 difficulty: "Beginner",
 duration: "12-16 hours",
 description: "Learn the core principles of design, color theory, and typography using modern design tools.",
 skills: ["Color Theory", "Typography", "Composition"],
 icon: <Palette className="w-8 h-8" />,
 progress: 35,
 },
 {
 id: "video-editing",
 title: "Video Editing Basics",
 category: "Media",
 difficulty: "Intermediate",
 duration: "15-20 hours",
 description: "Edit compelling video content, add effects, and master the storytelling timeline.",
 skills: ["Cutting", "Transitions", "Audio Sync"],
 icon: <Video className="w-8 h-8" />,
 progress: 0,
 },
 {
 id: "creative-writing",
 title: "Creative Writing",
 category: "Writing",
 difficulty: "Beginner",
 duration: "10-14 hours",
 description: "Develop your unique voice and craft engaging narratives, short stories, and creative essays.",
 skills: ["Storytelling", "Character", "Plot"],
 icon: <PenTool className="w-8 h-8" />,
 progress: 85,
 },
 {
 id: "photography",
 title: "Photography",
 category: "Media",
 difficulty: "Beginner",
 duration: "8-12 hours",
 description: "Understand lighting, framing, and composition to capture stunning photographs with any camera.",
 skills: ["Composition", "Lighting", "Editing"],
 icon: <Camera className="w-8 h-8" />,
 progress: 100,
 },
 {
 id: "ui-ux",
 title: "UI/UX Design Intro",
 category: "Design",
 difficulty: "Intermediate",
 duration: "18-24 hours",
 description: "Design intuitive user interfaces and craft seamless user experiences for digital products.",
 skills: ["Wireframing", "Prototyping", "User Research"],
 icon: <Layout className="w-8 h-8" />,
 progress: 15,
 },
 ];

 const categories = [
 { name: "All", icon: Brush },
 { name: "Design", icon: Palette },
 { name: "Media", icon: Video },
 { name: "Writing", icon: PenTool },
 ];

 const getDifficultyColor = (difficulty: string) => {
 switch (difficulty) {
 case "Beginner": return "bg-brand-neon/10 text-brand-darkgreen border-brand-neon/30";
 case "Intermediate": return "bg-brand-ink/10 text-brand-ink border-brand-ink/30";
 case "Advanced": return "bg-brand-darkgreen/10 text-brand-darkgreen border-brand-darkgreen/30";
 default: return "bg-brand-mist text-brand-slate border-brand-slate/10";
 }
 };

 const filteredModules = modules.filter(mod => {
 const matchesSearch =
 mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
 mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
 mod.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

 const matchesCategory = selectedCategory === "all" ||
 mod.category.toLowerCase() === selectedCategory.toLowerCase();

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
 <Palette className="w-8 h-8 text-brand-neon" />
 </div>
 <div>
 <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
 Creative Skills
 </h1>
 <p className="text-brand-mist/90 text-lg">
 Develop artistic abilities and creative expression
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Search and Filters */}
 <Card className="p-6 border-brand-slate/10 shadow-sm flex flex-col md:flex-row gap-4 items-center">
 <div className="flex-1 relative w-full">
 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-slate w-5 h-5 z-10" />
 <input
 type="text"
 placeholder="Search modules..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full bg-brand-mist border-brand-slate/10 focus:border-brand-neon text-brand-ink rounded-xl pl-12 h-12 outline-none border transition-colors"
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

 {/* Results Count */}
 <div className="mb-6">
 <p className="text-brand-slate">
 Found <span className="font-bold text-brand-ink">{filteredModules.length}</span> modules
 </p>
 </div>

 {/* Modules Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
 {filteredModules.map((mod) => (
 <div
 key={mod.id}
 className="bg-white rounded-2xl overflow-hidden border border-brand-slate/10 hover:shadow-xl transition-all duration-300 group flex flex-col"
 >
 {/* Header section with Icon */}
 <div className="p-6 bg-gradient-to-br from-brand-mist to-white border-b border-brand-slate/10 relative">
 <div className="absolute top-4 right-4">
 <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(mod.difficulty)}`}>
 {mod.difficulty}
 </div>
 </div>
 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-brand-ink mb-4 group-hover:scale-110 transition-transform duration-300">
 {mod.icon}
 </div>
 <h3 className="text-xl font-bold text-brand-ink mb-2 group-hover:text-brand-neon transition-colors">
 {mod.title}
 </h3>
 <div className="flex items-center gap-2 mb-2">
 <span className="px-2 py-1 bg-brand-neon/10 text-brand-darkgreen rounded-md text-xs font-semibold border border-brand-neon/20">
 {mod.category}
 </span>
 </div>
 </div>

 {/* Module Info */}
 <div className="p-6 flex-grow flex flex-col">
 <p className="text-sm text-brand-slate leading-relaxed mb-4 flex-grow">
 {mod.description}
 </p>

 {/* Duration */}
 <div className="mb-4 flex items-center gap-2 text-sm text-brand-slate">
 <Clock className="w-4 h-4 text-brand-neon" />
 <span>{mod.duration}</span>
 </div>

 {/* Skills */}
 <div className="mb-6">
 <h4 className="text-sm font-semibold text-brand-ink mb-2">Skills You'll Build</h4>
 <div className="flex flex-wrap gap-2">
 {mod.skills.map((skill, idx) => (
 <span
 key={idx}
 className="px-3 py-1 bg-brand-slate/5 text-brand-ink rounded-full text-xs font-medium border border-brand-slate/10"
 >
 {skill}
 </span>
 ))}
 </div>
 </div>
 
 {/* Progress Bar */}
 <div className="mb-6">
 <div className="flex justify-between text-xs font-medium mb-1">
 <span className="text-brand-slate">Progress</span>
 <span className="text-brand-ink">{mod.progress}%</span>
 </div>
 <div className="w-full bg-brand-mist rounded-full h-2">
 <div 
 className={`h-2 rounded-full ${mod.progress === 100 ? 'bg-brand-neon' : 'bg-brand-darkgreen'}`} 
 style={{ width: `${mod.progress}%` }}
 ></div>
 </div>
 </div>

 {/* Action Button */}
 <Button
 variant="primary"
 size="sm"
 className="w-full bg-gradient-to-r from-brand-ink to-brand-darkgreen hover:from-brand-darkgreen hover:to-brand-ink shadow-md"
 >
 {mod.progress > 0 ? (mod.progress === 100 ? "Review Module" : "Continue Module") : "Start Module"}
 {mod.progress === 100 ? <CheckCircle className="w-4 h-4 ml-2" /> : <Play className="w-4 h-4 ml-2" />}
 </Button>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
};

export default CreativeSkills;
