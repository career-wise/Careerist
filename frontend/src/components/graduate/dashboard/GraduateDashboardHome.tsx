import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Target, 
  Zap, 
  Briefcase, 
  Calendar,
  CheckCircle,
  PlayCircle,
  TrendingUp,
  Search,
  ArrowRight
} from "lucide-react";
import Button from "../../shared/ui/Button";

const GraduateDashboardHome: React.FC = () => {
  const quickActions = [
    { title: "Resume Builder", icon: FileText, link: "/graduate-dashboard/resources", color: "bg-brand-neon/20", textColor: "text-brand-neon" },
    { title: "AI Interview", icon: Zap, link: "/graduate-dashboard/prepare/interview-setup", color: "bg-brand-teal/20", textColor: "text-brand-teal" },
    { title: "Job Board", icon: Search, link: "/graduate-dashboard/jobs", color: "bg-gray-200", textColor: "text-gray-700" },
    { title: "Career Path", icon: Target, link: "/graduate-dashboard/career-path", color: "bg-brand-mist", textColor: "text-brand-ink" },
  ];

  const recentActivity = [
    { title: "Completed: Mock Interview (Google)", time: "2 hours ago", icon: CheckCircle, type: "success" },
    { title: "Started: Resume V2 Draft", time: "Yesterday", icon: PlayCircle, type: "info" },
    { title: "Applied: Frontend Developer at Stripe", time: "2 days ago", icon: Briefcase, type: "neutral" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-ink mb-2">Welcome back, Alex.</h1>
            <p className="text-gray-600 text-lg font-medium">You are on track for your <strong>Software Engineer</strong> job hunt.</p>
          </div>
          
          {/* High-level User Profile Snippet */}
          <div className="bg-white rounded-[1.5rem] p-4 flex items-center gap-4 border border-gray-200 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" 
              alt="Profile" 
              className="w-12 h-12 rounded-[1rem] object-cover border border-gray-100"
            />
            <div>
              <p className="text-sm font-bold text-brand-ink">Interview Readiness</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-teal w-[75%] rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-brand-teal">75%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, i) => (
            <Link key={i} to={action.link}>
              <div className="p-6 rounded-[1.5rem] border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white group flex flex-col justify-between h-full min-h-[140px]">
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-6 h-6 ${action.textColor}`} />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-brand-ink text-lg">{action.title}</h3>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-ink transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Current Goal / Next Milestone */}
            <div className="bg-brand-ink rounded-[2rem] p-8 relative overflow-hidden shadow-md border border-brand-ink/10">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-neon/20 flex items-center justify-center">
                    <Target className="w-4 h-4 text-brand-neon" />
                  </div>
                  <span className="text-brand-neon font-bold text-sm tracking-widest uppercase">Next Milestone</span>
                </div>
                
                <h2 className="text-3xl font-display font-bold text-white mb-4">Finalize Tech Resume</h2>
                <p className="text-gray-300 mb-6 max-w-lg font-medium leading-relaxed">Your resume is currently missing a project portfolio section. A strong portfolio increases interview callbacks by 40%.</p>
                
                <div className="bg-white/10 rounded-[1.25rem] p-4 border border-white/10 mb-6 max-w-md backdrop-blur-sm">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-white text-sm font-semibold">Progress</span>
                     <span className="text-brand-neon text-sm font-bold">85%</span>
                   </div>
                   <div className="w-full h-2.5 bg-brand-ink/50 rounded-full overflow-hidden">
                     <div className="h-full bg-brand-neon w-[85%] rounded-full shadow-[0_0_10px_rgba(200,168,96,0.5)]"></div>
                   </div>
                </div>

                <Button variant="primary" className="bg-white text-brand-ink hover:bg-gray-100 font-semibold px-6">
                  Continue Editing <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-teal/20 rounded-full blur-3xl"></div>
              <div className="absolute top-10 right-10 opacity-10">
                 <FileText className="w-32 h-32 text-white" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-gray-200 shadow-sm">
               <h3 className="text-2xl font-bold text-brand-ink mb-6 flex items-center gap-2">
                 <TrendingUp className="w-6 h-6 text-brand-teal" />
                 Recent Activity
               </h3>
               
               <div className="flex flex-col gap-4">
                 {recentActivity.map((activity, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                       activity.type === 'success' ? 'bg-brand-ink text-white' : 
                       activity.type === 'info' ? 'bg-white text-brand-ink border border-gray-200 shadow-sm' : 
                       'bg-gray-200 text-gray-600'
                     }`}>
                       <activity.icon className="w-5 h-5" />
                     </div>
                     <div className="flex-1">
                       <p className="font-bold text-brand-ink">{activity.title}</p>
                       <p className="text-sm font-medium text-gray-500 mt-0.5">{activity.time}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* Right Column (1/3) */}
          <div className="flex flex-col gap-6">
            
            {/* Stats Widget */}
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-brand-ink mb-4">Job Hunt Snapshot</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-[1.25rem] bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
                   <p className="text-3xl font-display font-bold text-brand-ink">15</p>
                   <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">Applications</p>
                </div>
                <div className="p-4 rounded-[1.25rem] bg-brand-neon/10 border border-brand-neon/20 flex flex-col items-center justify-center text-center">
                   <p className="text-3xl font-display font-bold text-brand-ink">2</p>
                   <p className="text-xs text-brand-ink/70 font-semibold mt-1 uppercase tracking-wider">Interviews</p>
                </div>
                <div className="p-4 rounded-[1.25rem] bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center col-span-2">
                   <p className="text-3xl font-display font-bold text-brand-ink">85/100</p>
                   <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">Average Interview Score</p>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200 shadow-sm flex-1">
               <h3 className="font-bold text-brand-ink mb-5 flex items-center gap-2">
                 <Calendar className="w-5 h-5 text-brand-ink" />
                 Upcoming
               </h3>
               
               <div className="flex flex-col gap-3">
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-1 relative overflow-hidden">
                   <div className="absolute left-0 top-3 bottom-3 w-1 bg-brand-neon rounded-r-full"></div>
                   <p className="font-bold text-brand-ink pl-3">Meta Phone Screen</p>
                   <p className="text-xs font-medium text-gray-500 pl-3 mt-1">Tomorrow, 2:00 PM</p>
                 </div>
                 
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-1 relative overflow-hidden">
                   <div className="absolute left-0 top-3 bottom-3 w-1 bg-brand-ink rounded-r-full"></div>
                   <p className="font-bold text-brand-ink pl-3">Stripe Assignment Due</p>
                   <p className="text-xs font-medium text-gray-500 pl-3 mt-1">Friday, 11:59 PM</p>
                 </div>
               </div>
               
               <Button variant="outline" className="w-full mt-6 bg-white border-gray-200 hover:bg-gray-50 text-brand-ink font-semibold rounded-xl py-3">
                 View Calendar
               </Button>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default GraduateDashboardHome;
