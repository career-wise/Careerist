import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, Users, Briefcase, Zap,
  Settings, CheckCircle, MapPin, Map,
  Target, ArrowRight, Compass, Send
} from "lucide-react";
import Button from "../../shared/ui/Button";

// Mock Data
const mockUser = {
  firstName: "Sarah",
  lastName: "Chen",
  initials: "SC"
};

const onboardingAnswers = {
  persona: "graduate",
  status: "actively applying", // 'just preparing', 'actively applying', 'interviewing'
  urgency: "high",
  resumeStatus: "don't have one yet" // "don't have one yet" or "ready"
};

const getStatusMessage = (status: string) => {
  switch(status) {
    case 'just preparing': return "Let's build your foundational skills and materials.";
    case 'actively applying': return "Let's optimize your applications and land those interviews.";
    case 'interviewing': return "Let's prep for your upcoming interviews and secure offers.";
    default: return "Let's accelerate your career journey.";
  }
};

const GraduateDashboardHome: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  const journeyNodes = [
    { id: 1, status: 'completed', label: 'Onboarding', detail: 'Profile setup complete' },
    { id: 2, status: 'completed', label: 'Resume Started', detail: 'Basic information added' },
    { id: 3, status: 'completed', label: 'First Application', detail: 'Applied to 1 role' },
    { id: 4, status: 'current', label: 'Skill Building', detail: 'Completing core modules' },
    { id: 5, status: 'upcoming', label: 'First Interview', detail: 'Prepare for interviews' }
  ];

  const needsResume = onboardingAnswers.resumeStatus === "don't have one yet";

  return (
    <div className="bg-brand-mist min-h-screen p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-ink mb-2">Welcome back, {mockUser.firstName}.</h1>
            <p className="text-brand-slate text-lg font-medium">
              {getStatusMessage(onboardingAnswers.status)}
            </p>
          </div>
          
          {/* High-level User Profile Snippet */}
          <div className="bg-white rounded-[1.5rem] p-4 flex items-center gap-4 border border-brand-slate/20 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-brand-ink flex items-center justify-center border border-brand-slate/10">
              <span className="text-white font-bold text-lg tracking-wider">{mockUser.initials}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-ink">Profile Setup</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 h-2 bg-brand-mist rounded-full overflow-hidden">
                  <div className="h-full bg-brand-neon w-[85%] rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-brand-neon">85%</span>
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
            { label: "Applications Sent", value: "12", icon: Send, color: "text-brand-ink", bg: "bg-brand-mist" },
            { label: "Interviews Scheduled", value: "1", icon: Users, color: "text-brand-ink", bg: "bg-brand-mist" },
            { label: "Resume Status", value: "Draft", icon: FileText, color: "text-brand-neon", bg: "bg-brand-neon/10" },
            { label: "Skill Match %", value: "92%", icon: Zap, color: "text-brand-ink", bg: "bg-brand-mist" }
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
            {journeyNodes.map((node) => (
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
            
            {/* Current Focus Area */}
            <div className="bg-brand-ink rounded-[2rem] p-8 relative overflow-hidden shadow-md">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-neon/20 flex items-center justify-center">
                    {needsResume ? <FileText className="w-4 h-4 text-brand-neon" /> : <Users className="w-4 h-4 text-brand-neon" />}
                  </div>
                  <span className="text-brand-neon font-bold text-sm tracking-widest uppercase">Current Focus</span>
                </div>
                
                <h2 className="text-3xl font-display font-bold text-white mb-4">
                  {needsResume ? "Finish Your Resume" : "Nail the Interview"}
                </h2>
                <p className="text-gray-300 mb-6 max-w-lg font-medium leading-relaxed">
                  {needsResume 
                    ? "Your resume is your first impression. Let's finish your draft so you can start applying with confidence." 
                    : "You've got the materials ready. Let's run through a mock interview to ensure you shine in front of employers."}
                </p>
                
                <div className="bg-white/10 rounded-[1.25rem] p-4 mb-6 max-w-md backdrop-blur-sm border border-white/10">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-white text-sm font-semibold">{needsResume ? "Resume Completion" : "Interview Prep"} Progress</span>
                     <span className="text-brand-neon text-sm font-bold">{needsResume ? "40%" : "20%"}</span>
                   </div>
                   <div className="w-full h-2.5 bg-brand-ink/50 rounded-full overflow-hidden">
                     <div className={`h-full bg-brand-neon rounded-full shadow-[0_0_10px_rgba(21,193,150,0.5)] ${needsResume ? 'w-[40%]' : 'w-[20%]'}`}></div>
                   </div>
                </div>

                <Link to={needsResume ? "/graduate-dashboard/resources" : "/graduate-dashboard/prepare/interview-setup"}>
                  <Button variant="primary" className="bg-white text-brand-ink hover:bg-brand-mist font-semibold px-6">
                    {needsResume ? "Go to Resume Builder" : "Start Mock Interview"} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-neon/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 opacity-10">
                 {needsResume ? <FileText className="w-32 h-32 text-white" /> : <Users className="w-32 h-32 text-white" />}
              </div>
            </div>
          </div>

          {/* Right Column (1/3) */}
          <div className="flex flex-col gap-6">
            
            {/* Quick Actions Navigation */}
            <div className="bg-white rounded-[2rem] p-6 border border-brand-slate/20 shadow-sm">
              <h3 className="font-bold text-brand-ink mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Resume Builder', icon: FileText, link: '/graduate-dashboard/resources' },
                  { name: 'AI Interview', icon: Users, link: '/graduate-dashboard/prepare/interview-setup' },
                  { name: 'Skills Center', icon: Zap, link: '/graduate-dashboard/skills/tech' },
                  { name: 'Career Path', icon: Briefcase, link: '/graduate-dashboard/career-path' }
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

            {/* Up Next / Recommendation */}
            <div className="bg-white rounded-[2rem] p-6 border border-brand-slate/20 shadow-sm flex-1 flex flex-col">
               <h3 className="font-bold text-brand-ink mb-5 flex items-center gap-2">
                 <Target className="w-5 h-5 text-brand-ink" />
                 Up Next
               </h3>
               
               <div className="flex-1 flex flex-col">
                 <div className="bg-brand-mist p-5 rounded-2xl border border-brand-slate/10 mb-6 relative overflow-hidden flex-1">
                   <div className="w-1 bg-brand-neon absolute left-0 top-3 bottom-3 rounded-r-full"></div>
                   <h4 className="font-bold text-brand-ink mb-2">
                     {needsResume ? "Draft Your Resume" : "Practice Makes Perfect"}
                   </h4>
                   <p className="text-sm font-medium text-brand-slate leading-relaxed">
                     {needsResume 
                       ? "A complete resume is required to apply for roles. Head over to the resources section to use our builder."
                       : "You have a solid resume! Now it's time to refine your interview skills with AI."}
                   </p>
                 </div>
                 
                 <Link to={needsResume ? "/graduate-dashboard/resources" : "/graduate-dashboard/prepare/interview-setup"} className="w-full mt-auto">
                   <Button variant="outline" className="w-full bg-white border-brand-slate/20 hover:bg-brand-mist text-brand-ink font-semibold rounded-xl py-3">
                     {needsResume ? "Open Resume Builder" : "Start Interview Prep"} <ArrowRight className="w-4 h-4 ml-2" />
                   </Button>
                 </Link>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduateDashboardHome;
