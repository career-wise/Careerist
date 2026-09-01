import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, Target, Zap, FileText, Users,
  Settings, Award, TrendingUp, Briefcase, Activity, Calendar,
  CheckCircle, PlayCircle, BarChart2, ArrowRight,
  Compass, Map, MapPin, Sparkles, Building,
  Laptop, Heart, Scale, Palette, Microscope
} from "lucide-react";
import Button from "../../shared/ui/Button";

import { useAppContext } from "../../../contexts/AppContext";

const getStatusMessage = (clarity: string) => {
  switch(clarity) {
    case 'no idea': return "Let's discover what you're passionate about.";
    case 'torn': return "Let's compare your options and find the perfect fit.";
    case 'decided': return "Let's build the skills to get you into your dream program.";
    default: return "Let's map out your future journey.";
  }
};

const StudentDashboardHome: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  const { state } = useAppContext();
  const { user, journey, shortlistedColleges, shortlistedMajors, goals } = state;

  return (
    <div className="bg-brand-mist min-h-screen p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-ink mb-2">Welcome back, {user.firstName}.</h1>
            <p className="text-brand-slate text-lg font-medium">
              {getStatusMessage(user.clarityLevel)}
            </p>
          </div>
          
          {/* High-level User Profile Snippet */}
          <div className="bg-white rounded-[1.5rem] p-4 flex items-center gap-4 border border-brand-slate/20 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-brand-ink flex items-center justify-center border border-brand-slate/10">
              <span className="text-white font-bold text-lg tracking-wider">{user.initials}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-ink">Profile Setup</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 h-2 bg-brand-mist rounded-full overflow-hidden">
                  <div className="h-full bg-brand-neon w-[75%] rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-brand-neon">75%</span>
              </div>
            </div>
            <button className="w-8 h-8 ml-2 rounded-full bg-brand-mist hover:bg-brand-slate/10 flex items-center justify-center text-brand-slate transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4 mb-8">
          {[
            { label: "Fields Explored", value: shortlistedMajors.length.toString(), icon: Compass, color: "text-brand-ink", bg: "bg-brand-mist" },
            { label: "Colleges Saved", value: shortlistedColleges.length.toString(), icon: BookOpen, color: "text-brand-ink", bg: "bg-brand-mist" },
            { label: "Goals Tracked", value: goals.length.toString(), icon: Zap, color: "text-brand-neon", bg: "bg-brand-neon/10" },
            { label: "Mock Interviews", value: "0", icon: Users, color: "text-brand-ink", bg: "bg-brand-mist" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-brand-slate/20 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-brand-slate uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight Card */}
        <div className="bg-white rounded-[2rem] p-6 lg:p-8 border-l-4 border-brand-neon border-y border-r border-brand-slate/20 shadow-sm mb-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-neon/10 text-[#0f9f7a] text-xs font-bold uppercase tracking-wide mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              AI Insight
            </div>
            <p className="text-brand-ink text-lg font-medium leading-relaxed max-w-3xl">
              Because you're exploring <strong className="text-brand-ink">Computer Science</strong> and your strongest subjects are <strong className="text-brand-ink">Math and Physics</strong>, students with a similar profile also explore Data Science and Electronics Engineering 78% of the time.
            </p>
          </div>
          <div className="flex-shrink-0 md:ml-4">
            <Link to="/student-dashboard/college/majors">
              <Button variant="primary" className="whitespace-nowrap px-6 py-3">
                Compare These Fields <ArrowRight className="w-4 h-4 ml-2 inline-block" />
              </Button>
            </Link>
          </div>
        </div>

        {/* NEW Your Journey Section */}
        <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-brand-slate/20 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-brand-ink mb-8 flex items-center gap-2">
            <Map className="w-5 h-5 text-brand-neon" />
            Your Journey
          </h3>
          
          <div className="relative flex items-center justify-between max-w-4xl mx-auto py-4 mb-8">
            {/* Background line */}
            <div className="absolute left-0 right-0 h-1 bg-brand-slate/10 top-1/2 -translate-y-1/2 z-0"></div>
            
            {/* Active background line */}
            <div className="absolute left-0 h-1 bg-brand-neon top-1/2 -translate-y-1/2 z-0 transition-all duration-1000" style={{ width: '75%' }}></div>
            
            {/* Nodes */}
            {journey.map((node, index) => (
              <div 
                key={node.id} 
                className="relative z-10 flex flex-col items-center"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white cursor-pointer transition-transform duration-300 ${
                  node.status === 'completed' ? 'border-2 border-brand-neon text-brand-neon shadow-[0_0_10px_rgba(21,193,150,0.3)]' :
                  node.status === 'current' ? 'border-[3px] border-brand-ink text-brand-ink scale-110 shadow-lg' :
                  'border-2 border-brand-slate/20 text-brand-slate/40'
                }`}>
                  {node.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : 
                   node.status === 'current' ? <MapPin className="w-5 h-5 animate-pulse" /> :
                   <span className="text-sm font-bold">{node.id}</span>}
                </div>
                
                {/* Label (always visible) */}
                <p className={`absolute top-12 text-xs font-bold text-center whitespace-nowrap transition-colors ${
                  node.status === 'current' ? 'text-brand-ink' : 
                  node.status === 'completed' ? 'text-brand-slate' : 'text-brand-slate/40'
                }`}>
                  {node.label}
                </p>

                {/* Tooltip on hover */}
                {hoveredNode === node.id && (
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-brand-ink text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-20">
                    {node.detail}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-ink rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-6">
          
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Recent Milestones */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-brand-slate/20 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-brand-ink flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-neon" />
                  Recent Milestones
                </h3>
              </div>
              
              <div className="flex flex-col gap-4">
                {goals.slice(0, 3).map((goal, idx) => (
                  <div key={goal.id} className={`flex items-start gap-4 p-4 rounded-2xl border ${goal.status === 'completed' ? 'bg-brand-mist border-brand-slate/20' : 'bg-transparent border-brand-slate/10'} transition-all`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${goal.status === 'completed' ? 'bg-brand-neon/20 text-brand-neon' : 'bg-brand-slate/10 text-brand-slate'}`}>
                       <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`font-semibold ${goal.status === 'completed' ? 'text-brand-ink' : 'text-brand-slate'}`}>{goal.title}</p>
                      <p className="text-xs font-medium text-brand-slate mt-1">{goal.status === 'completed' ? 'Completed' : goal.dueDate ? `Due: ${goal.dueDate}` : 'Pending'}</p>
                    </div>
                  </div>
                ))}
                {goals.length === 0 && (
                  <div className="p-4 text-center text-brand-slate font-medium">
                    No goals tracked yet. Start planning!
                  </div>
                )}
              </div>
            </div>

            {/* Current Focus Area */}
            <div className="bg-brand-ink rounded-[2rem] p-8 relative overflow-hidden shadow-md">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-neon/20 flex items-center justify-center">
                    <Compass className="w-4 h-4 text-brand-neon" />
                  </div>
                  <span className="text-brand-neon font-bold text-sm tracking-widest uppercase">Current Focus</span>
                </div>
                
                <h2 className="text-3xl font-display font-bold text-white mb-4">Exploring Computer Science</h2>
                <p className="text-brand-mist/80 mb-6 max-w-lg font-medium leading-relaxed">
                  You're halfway through exploring CS. Complete your field comparison to unlock personalized college recommendations and degree requirements.
                </p>
                
                <div className="bg-white/10 rounded-[1.25rem] p-4 mb-6 max-w-md backdrop-blur-sm border border-white/10">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-white text-sm font-semibold">Exploration Progress</span>
                     <span className="text-brand-neon text-sm font-bold">50%</span>
                   </div>
                   <div className="w-full h-2.5 bg-brand-ink/50 rounded-full overflow-hidden">
                     <div className="h-full bg-brand-neon w-[50%] rounded-full shadow-[0_0_10px_rgba(21,193,150,0.5)]"></div>
                   </div>
                </div>

                <Link to="/student-dashboard/college/majors">
                  <Button variant="primary" className="bg-white text-brand-ink hover:bg-brand-mist font-semibold px-6">
                    Resume Comparison <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-neon/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 opacity-10">
                 <Compass className="w-32 h-32 text-white" />
              </div>
            </div>

            {/* Field Comparison Preview */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-brand-slate/20 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-brand-ink flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-brand-neon" />
                  Field Comparison Preview
                </h3>
              </div>
              
              <div className="mb-6">
                <div className="grid grid-cols-2 text-center pb-4 border-b border-brand-slate/10 relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-slate/10 -translate-x-1/2"></div>
                  <div>
                    <span className="text-lg font-bold text-brand-ink">Computer Science</span>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-brand-ink">Data Science</span>
                  </div>
                </div>
                
                {[
                  { label: "Avg. Starting Salary", val1: "$75,000", val2: "$82,000" },
                  { label: "Top Colleges", val1: "42 matched", val2: "38 matched" },
                  { label: "Skill Overlap", val1: "85%", val2: "85%" },
                  { label: "Job Growth Outlook", val1: "High", val2: "Very High" },
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-2 text-center py-4 border-b border-brand-slate/10 last:border-0 relative hover:bg-brand-mist/50 transition-colors">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-slate/10 -translate-x-1/2"></div>
                    <div className="px-4">
                      <p className="text-xs font-semibold text-brand-slate uppercase tracking-wider mb-1">{row.label}</p>
                      <p className="font-semibold text-brand-ink">{row.val1}</p>
                    </div>
                    <div className="px-4">
                      <p className="text-xs font-semibold text-brand-slate uppercase tracking-wider mb-1 hidden md:block opacity-0 select-none">{row.label}</p>
                      <p className="font-semibold text-brand-ink mt-auto md:mt-5">{row.val2}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/student-dashboard/college/majors" className="block w-full">
                <Button variant="outline" className="w-full bg-white border-brand-slate/20 hover:bg-brand-mist text-brand-ink font-semibold rounded-xl py-3">
                  View Full Comparison <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column (1/3) */}
          <div className="flex flex-col gap-6">
            
            {/* Quick Actions Navigation */}
            <div className="bg-white rounded-[2rem] p-6 border border-brand-slate/20 shadow-sm">
              <h3 className="font-bold text-brand-ink mb-4">Explore</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Learning', icon: BookOpen, link: '/student-dashboard/learning/courses' },
                  { name: 'Resumes', icon: FileText, link: '/student-dashboard/resources/document-manager' },
                  { name: 'Projects', icon: Zap, link: '/student-dashboard/learning/projects' },
                  { name: 'Interviews', icon: Users, link: '/student-dashboard/learning/interview-prep' }
                ].map((tab, i) => (
                  <Link key={i} to={tab.link}>
                    <div className="bg-brand-mist hover:bg-brand-slate/10 border border-brand-slate/10 hover:border-brand-slate/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all group h-full">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                        <tab.icon className="w-5 h-5 text-brand-ink" />
                      </div>
                      <span className="text-sm font-semibold text-brand-ink">{tab.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended Colleges */}
            <div className="bg-white rounded-[2rem] p-6 border border-brand-slate/20 shadow-sm flex flex-col">
               <h3 className="font-bold text-brand-ink mb-5 flex items-center gap-2">
                 <Building className="w-5 h-5 text-brand-neon" />
                 Recommended Colleges
               </h3>
               
               <div className="flex flex-col gap-3 mb-4">
                 {[
                   { name: 'Stanford University', location: 'Stanford, CA', match: '96% Match' },
                   { name: 'MIT', location: 'Cambridge, MA', match: '92% Match' },
                   { name: 'Carnegie Mellon', location: 'Pittsburgh, PA', match: '88% Match' }
                 ].map((college, i) => (
                   <Link key={i} to="/student-dashboard/college/explorer" className="group p-4 rounded-[1.25rem] bg-brand-mist hover:bg-brand-slate/10 border border-brand-slate/10 transition-colors flex items-center justify-between">
                     <div>
                       <p className="font-bold text-brand-ink text-sm mb-1 group-hover:text-brand-neon transition-colors">{college.name}</p>
                       <p className="text-xs font-medium text-brand-slate">{college.location}</p>
                     </div>
                     <div className="px-2.5 py-1 rounded-full bg-brand-neon/10 text-[#0f9f7a] text-[10px] font-bold uppercase tracking-wider">
                       {college.match}
                     </div>
                   </Link>
                 ))}
               </div>
               
               <Link to="/student-dashboard/college/explorer" className="text-sm font-bold text-brand-ink hover:text-brand-neon transition-colors mt-2 self-center flex items-center">
                 View All Saved Colleges <ArrowRight className="w-3.5 h-3.5 ml-1" />
               </Link>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-[2rem] p-6 border border-brand-slate/20 shadow-sm flex flex-col">
               <h3 className="font-bold text-brand-ink mb-5 flex items-center gap-2">
                 <Calendar className="w-5 h-5 text-brand-neon" />
                 Schedule
               </h3>
               
               <div className="flex flex-col gap-4 mb-2">
                 {[
                   { title: 'College App Deadline', subtitle: 'Common App', dateLabel: 'In 3 days', color: 'bg-brand-neon' },
                   { title: 'Mock Interview', subtitle: 'Practice Session', dateLabel: 'In 6 days', color: 'bg-brand-ink' },
                 ].map((item, idx) => (
                   <div key={idx} className="flex gap-4 p-4 rounded-[1.25rem] bg-brand-mist border border-brand-slate/10 relative overflow-hidden">
                     <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.color}`}></div>
                     <div className="flex-shrink-0 bg-white rounded-xl px-3 py-2 text-center border border-brand-slate/10 flex flex-col justify-center min-w-[70px]">
                       <span className="text-[9px] font-bold text-brand-slate uppercase tracking-wider block leading-none mb-1.5">Due</span>
                       <span className="text-xs font-bold text-brand-ink leading-none">{item.dateLabel}</span>
                     </div>
                     <div className="flex flex-col justify-center">
                       <p className="font-bold text-brand-ink text-sm leading-tight mb-1">{item.title}</p>
                       <p className="text-xs font-medium text-brand-slate leading-tight">{item.subtitle}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Up Next / Recommendation */}
            <div className="bg-white rounded-[2rem] p-6 border border-brand-slate/20 shadow-sm flex-1 flex flex-col">
               <h3 className="font-bold text-brand-ink mb-5 flex items-center gap-2">
                 <Target className="w-5 h-5 text-brand-ink" />
                 Up Next
               </h3>
               
               <div className="flex-1 flex flex-col">
                 <div className="bg-brand-mist p-5 rounded-2xl border border-brand-slate/10 mb-6 relative overflow-hidden flex-1">
                   <div className="w-1 bg-brand-neon absolute left-0 top-3 bottom-3 rounded-r-full"></div>
                   <h4 className="font-bold text-brand-ink mb-2">Major Explorer</h4>
                   <p className="text-sm font-medium text-brand-slate leading-relaxed">
                     Since your goal is to <strong>{onboardingAnswers.goal}</strong>, start by comparing majors and their career outcomes.
                   </p>
                 </div>
                 
                 <Link to="/student-dashboard/college/majors" className="w-full mt-auto">
                   <Button variant="outline" className="w-full bg-white border-brand-slate/20 hover:bg-brand-mist text-brand-ink font-semibold rounded-xl py-3">
                     Open Major Explorer <ArrowRight className="w-4 h-4 ml-2" />
                   </Button>
                 </Link>
               </div>
            </div>

          </div>
        </div>

        {/* Explore More Fields */}
        <div className="mt-10 mb-4">
          <h3 className="text-xl font-bold text-brand-ink mb-5 flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-neon" />
            Explore More Fields
          </h3>
          <div className="flex flex-nowrap md:flex-wrap overflow-x-auto custom-scrollbar pb-4 gap-4">
            {[
              { name: 'Engineering & Tech', icon: Laptop, status: '2 saved', explored: true },
              { name: 'Medicine & Healthcare', icon: Heart, status: 'Not explored yet', explored: false },
              { name: 'Business & Commerce', icon: Briefcase, status: '1 saved', explored: true },
              { name: 'Law', icon: Scale, status: 'Not explored yet', explored: false },
              { name: 'Arts & Design', icon: Palette, status: 'Not explored yet', explored: false },
              { name: 'Pure Sciences', icon: Microscope, status: 'Not explored yet', explored: false }
            ].map((field, idx) => (
              <Link 
                key={idx} 
                to="/student-dashboard/college/majors" 
                className="flex items-center gap-3 bg-white border border-brand-slate/10 px-4 py-3 rounded-2xl hover:bg-brand-mist hover:border-brand-slate/20 transition-all flex-none min-w-[240px] md:flex-1 md:min-w-[200px]"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${field.explored ? 'bg-brand-neon/10' : 'bg-brand-slate/5'}`}>
                  <field.icon className={`w-5 h-5 ${field.explored ? 'text-[#0f9f7a]' : 'text-brand-slate'}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-ink whitespace-nowrap">{field.name}</p>
                  <p className="text-xs font-medium text-brand-slate mt-0.5">{field.status}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboardHome;