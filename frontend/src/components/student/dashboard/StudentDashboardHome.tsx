import React from "react";
import { 
  BookOpen, Target, Zap, FileText, Users,
  Settings, Award, TrendingUp, Briefcase, Activity, Calendar,
  CheckCircle, PlayCircle, BarChart2, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../shared/ui/Button";

const StudentDashboardHome: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-ink mb-2">Welcome back, Alex.</h1>
            <p className="text-gray-600 text-lg font-medium">You are on track for your <strong>Software Engineer</strong> career path.</p>
          </div>
          
          {/* High-level User Profile Snippet */}
          <div className="bg-white rounded-[1.5rem] p-4 flex items-center gap-4 border border-gray-200 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" 
              alt="Profile" 
              className="w-12 h-12 rounded-[1rem] object-cover border border-gray-100"
            />
            <div>
              <p className="text-sm font-bold text-brand-ink">Profile Score</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-teal w-[89%] rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-brand-teal">89%</span>
              </div>
            </div>
            <button className="w-8 h-8 ml-2 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Target Role", value: "Software Eng.", icon: Target, color: "text-brand-ink", bg: "bg-gray-50" },
            { label: "Applications", value: "12/15", icon: Briefcase, color: "text-brand-ink", bg: "bg-gray-50" },
            { label: "Skill Growth", value: "24%", icon: TrendingUp, color: "text-brand-teal", bg: "bg-brand-teal/10" },
            { label: "Interviews", value: "2", icon: Users, color: "text-brand-ink", bg: "bg-gray-50" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-gray-200 shadow-sm flex items-center justify-between">
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Current Focus Area */}
            <div className="bg-brand-ink rounded-[2rem] p-8 relative overflow-hidden shadow-md">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-neon/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-brand-neon" />
                  </div>
                  <span className="text-brand-neon font-bold text-sm tracking-widest uppercase">Current Focus</span>
                </div>
                
                <h2 className="text-3xl font-display font-bold text-white mb-4">Mastering React & TS</h2>
                <p className="text-gray-300 mb-6 max-w-lg font-medium leading-relaxed">You are currently taking the Advanced Frontend Architecture course. Completing this module will boost your profile match for target roles by 15%.</p>
                
                <div className="bg-white/10 rounded-[1.25rem] p-4 mb-6 max-w-md backdrop-blur-sm border border-white/10">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-white text-sm font-semibold">Module Progress</span>
                     <span className="text-brand-neon text-sm font-bold">60%</span>
                   </div>
                   <div className="w-full h-2.5 bg-brand-ink/50 rounded-full overflow-hidden">
                     <div className="h-full bg-brand-neon w-[60%] rounded-full shadow-[0_0_10px_rgba(200,168,96,0.5)]"></div>
                   </div>
                </div>

                <Button variant="primary" className="bg-white text-brand-ink hover:bg-gray-100 font-semibold px-6">
                  Continue Learning <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-teal/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 opacity-10">
                 <BookOpen className="w-32 h-32 text-white" />
              </div>
            </div>

            {/* Path & Milestones */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-gray-200 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-brand-ink flex items-center gap-2">
                   <Target className="w-5 h-5 text-brand-teal" />
                   Recent Milestones
                 </h3>
                 <Link to="/planning/goals" className="text-sm font-semibold text-brand-slate hover:text-brand-ink transition-colors">
                   View All
                 </Link>
               </div>
               
               <div className="flex flex-col gap-4">
                 {[
                   { title: "Completed: AWS Practitioner Cert", time: "2 days ago", icon: Award, active: true },
                   { title: "Applied: Frontend Role at Google", time: "1 week ago", icon: Briefcase, active: false },
                   { title: "Finished: Fullstack MERN Project", time: "2 weeks ago", icon: CheckCircle, active: false },
                 ].map((activity, i) => (
                   <div key={i} className={`flex items-center gap-4 p-4 rounded-[1.25rem] transition-colors border ${
                     activity.active ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100 hover:bg-gray-50'
                   }`}>
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                       activity.active ? 'bg-brand-ink text-white' : 'bg-gray-100 text-gray-500'
                     }`}>
                       <activity.icon className="w-5 h-5" />
                     </div>
                     <div className="flex-1">
                       <p className={`font-bold ${activity.active ? 'text-brand-ink' : 'text-gray-700'}`}>{activity.title}</p>
                       <p className="text-sm font-medium text-gray-500 mt-0.5">{activity.time}</p>
                     </div>
                     <Button variant="ghost" className="w-8 h-8 p-0 rounded-full hover:bg-gray-200 text-gray-400">
                       <ArrowRight className="w-4 h-4" />
                     </Button>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Right Column (1/3) */}
          <div className="flex flex-col gap-6">
            
            {/* Quick Actions Navigation */}
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-brand-ink mb-4">Explore</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Learning', icon: BookOpen, link: '/learning/courses' },
                  { name: 'Resumes', icon: FileText, link: '/resources/document-manager' },
                  { name: 'Projects', icon: Zap, link: '/learning/projects' },
                  { name: 'Interviews', icon: Users, link: '/learning/interview-prep' }
                ].map((tab, i) => (
                  <Link key={i} to={tab.link}>
                    <div className="bg-gray-50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all group">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                        <tab.icon className="w-5 h-5 text-brand-ink" />
                      </div>
                      <span className="text-sm font-semibold text-brand-ink">{tab.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200 shadow-sm flex-1">
               <h3 className="font-bold text-brand-ink mb-5 flex items-center gap-2">
                 <Calendar className="w-5 h-5 text-brand-ink" />
                 Schedule
               </h3>
               
               <div className="flex flex-col gap-3">
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex gap-3 relative overflow-hidden">
                   <div className="w-1 bg-brand-neon absolute left-0 top-3 bottom-3 rounded-r-full"></div>
                   <div className="flex flex-col justify-center text-center min-w-[3rem]">
                     <span className="text-xs font-bold text-gray-500 uppercase">Oct</span>
                     <span className="text-xl font-display font-bold text-brand-ink">12</span>
                   </div>
                   <div className="flex-1 border-l border-gray-200 pl-3">
                     <p className="font-bold text-brand-ink">Mock Interview</p>
                     <p className="text-xs font-medium text-gray-500 mt-1">2:00 PM - 3:00 PM</p>
                   </div>
                 </div>
                 
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex gap-3 relative overflow-hidden">
                   <div className="w-1 bg-brand-teal absolute left-0 top-3 bottom-3 rounded-r-full"></div>
                   <div className="flex flex-col justify-center text-center min-w-[3rem]">
                     <span className="text-xs font-bold text-gray-500 uppercase">Oct</span>
                     <span className="text-xl font-display font-bold text-brand-ink">15</span>
                   </div>
                   <div className="flex-1 border-l border-gray-200 pl-3">
                     <p className="font-bold text-brand-ink">Submit Application</p>
                     <p className="text-xs font-medium text-gray-500 mt-1">Due by 11:59 PM</p>
                   </div>
                 </div>
               </div>
               
               <Button variant="outline" className="w-full mt-6 bg-white border-gray-200 hover:bg-gray-50 text-brand-ink font-semibold rounded-xl py-3">
                 View Full Calendar
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;