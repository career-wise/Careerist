import React from "react";
import { 
  X, Search, BookOpen, Target, Zap, FileText, Users,
  Settings, Award, TrendingUp, Briefcase, Activity, Calendar,
  CheckCircle, PlayCircle, BarChart2
} from "lucide-react";

const StudentDashboardHome: React.FC = () => {
  return (
    <div className="bg-[#4a4b49] min-h-screen p-4 md:p-6 lg:p-8 font-sans overflow-hidden flex flex-col">
      {/* Header Row */}
      <div className="flex justify-between items-end max-w-[1600px] mx-auto w-full relative z-10">
        {/* Folder Tab */}
        <div className="bg-[#e6e4df] rounded-t-[2.5rem] pl-4 pr-12 py-4 flex items-center space-x-4 relative min-w-[300px]">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 shadow-sm transition-colors">
            <X className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-medium text-gray-800">Career Profile</h1>
          
          {/* Concave Corner SVG/Hack */}
          <div className="absolute -right-8 bottom-0 w-8 h-8 bg-[#e6e4df]">
            <div className="w-full h-full bg-[#4a4b49] rounded-bl-[2rem]"></div>
          </div>
        </div>
        
        {/* Top Pill Navigation */}
        <div className="hidden lg:flex space-x-3 pb-3 pr-4">
          {[
            { name: 'Learning Path', icon: BookOpen },
            { name: 'Goals', icon: Target },
            { name: 'Skills', icon: Zap },
            { name: 'Resumes', icon: FileText },
            { name: 'Interviews', icon: Users }
          ].map((tab, i) => (
            <button key={i} className="bg-[#e6e4df] text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white flex items-center space-x-2 shadow-sm transition-all hover:-translate-y-0.5">
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#e6e4df] rounded-tr-[3rem] rounded-b-[3rem] p-8 max-w-[1600px] mx-auto w-full flex-1 shadow-2xl relative flex flex-col">
        
        {/* Top Stats Section */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
          
          {/* User Profile Floating Card */}
          <div className="bg-[#f2f1ec] shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] rounded-[2rem] p-3 flex items-center space-x-4 w-72">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" 
              alt="Profile" 
              className="w-16 h-16 rounded-[1.25rem] object-cover"
            />
            <div>
              <p className="text-xs text-gray-500 font-medium">Student, 20</p>
              <p className="text-lg font-medium text-gray-800 leading-tight mt-0.5">Alex<br/>Johnson</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-x-12 gap-y-6 mb-6">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Target Role</p>
                <p className="text-2xl font-medium text-gray-800">Software Eng.</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Profile Score</p>
                <p className="text-2xl font-medium text-gray-800">89<span className="text-lg text-gray-500">%</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Applications</p>
                <p className="text-2xl font-medium text-gray-800">12<span className="text-lg text-gray-500">/15</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Skill Growth</p>
                <p className="text-2xl font-medium text-gray-800">24<span className="text-lg text-gray-500">%</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Interviews</p>
                <p className="text-2xl font-medium text-gray-800">2</p>
              </div>
            </div>

            {/* Sub-navigation Pills */}
            <div className="flex flex-wrap gap-3">
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 shadow-sm hover:bg-gray-50">
                <Settings className="w-4 h-4" />
              </button>
              {['Exploration', 'Learning', 'Projects', 'Networking', 'Offers'].map((item, i) => (
                <button key={i} className="bg-white/50 text-gray-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Divider */}
        <div className="relative h-[1px] w-full bg-gradient-to-r from-red-300 via-green-300 to-orange-300 mb-12 rounded-full"></div>

        {/* Timeline Columns */}
        <div className="flex flex-1 gap-8 px-4 pb-24">
          
          {/* Column 1: August */}
          <div className="relative flex-1">
            {/* Node Dot */}
            <div className="absolute -top-[65px] left-0 w-8 h-8 bg-[#eaff7b] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(234,255,123,0.6)] z-10">
              <BookOpen className="w-4 h-4 text-gray-800" />
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-800">Aug</h3>
              <p className="text-xs text-gray-500 font-medium">Week 1</p>
            </div>

            {/* Tree Branch & Card 1 */}
            <div className="relative pl-12 mb-8 group">
              {/* SVG Connecting Line */}
              <svg className="absolute left-4 -top-16 w-8 h-[calc(100%+4rem)] pointer-events-none" preserveAspectRatio="none">
                <path d="M 0 0 L 0 calc(100% - 16px) Q 0 100% 16 100% L 32 100%" fill="none" stroke="#a3a3a3" strokeWidth="1.5" />
              </svg>
              
              {/* Pill Card */}
              <div className="relative z-10 bg-gray-500 rounded-full pl-2 pr-4 py-2 text-white flex items-center space-x-3 w-max hover:bg-gray-600 transition-colors cursor-pointer shadow-md">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <PlayCircle className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-sm font-medium">React Basics x2</span>
              </div>
            </div>

            {/* Tree Branch & Card 2 (Large Chart Card) */}
            <div className="relative pl-12 mb-8 group">
              <svg className="absolute left-4 -top-8 w-8 h-[calc(100%+2rem)] pointer-events-none" preserveAspectRatio="none">
                <path d="M 0 0 L 0 calc(100% - 16px) Q 0 100% 16 100% L 32 100%" fill="none" stroke="#a3a3a3" strokeWidth="1.5" />
              </svg>
              
              {/* White Chart Card */}
              <div className="relative z-10 bg-white rounded-3xl p-5 shadow-lg w-72 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-gray-800 font-medium">Skill Growth</h4>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                
                {/* Mock Chart Area */}
                <div className="h-20 w-full relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent rounded-lg"></div>
                  {/* Mock Waveform */}
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,20 Q10,5 20,20 T40,20 T60,10 T80,30 T100,20" fill="none" stroke="#eaff7b" strokeWidth="3" />
                    <path d="M0,20 Q10,5 20,20 T40,20 T60,10 T80,30 T100,20 L100,40 L0,40 Z" fill="#eaff7b" opacity="0.2" />
                    <line x1="50" y1="0" x2="50" y2="40" stroke="#a3a3a3" strokeWidth="1" strokeDasharray="2,2" />
                    <rect x="35" y="15" width="30" height="10" fill="#333" rx="4" />
                    <text x="50" y="22" fill="white" fontSize="6" textAnchor="middle" fontWeight="bold">JS / TS</text>
                  </svg>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500">Average: 80/100</p>
                  </div>
                  <span className="text-sm font-bold text-red-500">+10 ^</span>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-0 w-8 h-16 bg-white rounded-full flex flex-col items-center justify-center space-y-2 shadow-md z-20 -translate-x-4">
              <button className="text-gray-400 hover:text-gray-700"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg></button>
              <button className="text-gray-400 hover:text-gray-700"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
            </div>
            <div className="mb-8 mt-12">
              <p className="text-xs text-gray-500 font-medium">Week 2</p>
            </div>
            
            {/* Small Card */}
            <div className="relative pl-12 mb-8 group">
              <svg className="absolute left-4 -top-32 w-8 h-[calc(100%+8rem)] pointer-events-none" preserveAspectRatio="none">
                <path d="M 0 0 L 0 calc(100% - 16px) Q 0 100% 16 100% L 32 100%" fill="none" stroke="#a3a3a3" strokeWidth="1.5" />
              </svg>
              
              <div className="relative z-10 bg-white rounded-3xl p-5 shadow-lg w-72">
                 <div className="flex justify-between items-start mb-4">
                  <h4 className="text-gray-800 font-medium">Career Goals</h4>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                    <Target className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1 w-max">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-700 font-medium">Land Internship</span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: September */}
          <div className="relative flex-1">
            {/* Node Dot */}
            <div className="absolute -top-[65px] left-0 w-8 h-8 bg-[#eaff7b] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(234,255,123,0.6)] z-10">
              <CheckCircle className="w-4 h-4 text-gray-800" />
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-800">Sep</h3>
              <p className="text-xs text-gray-500 font-medium">Week 1</p>
            </div>

            {/* Tree Branch with multiple pills */}
            <div className="relative pl-12 mb-8 group">
              <svg className="absolute left-4 -top-16 w-8 h-[calc(100%+4rem)] pointer-events-none" preserveAspectRatio="none">
                <path d="M 0 0 L 0 calc(100% - 16px) Q 0 100% 16 100% L 32 100%" fill="none" stroke="#a3a3a3" strokeWidth="1.5" />
              </svg>
              
              <div className="relative z-10 flex flex-col space-y-2">
                <div className="bg-gray-500 rounded-full pl-2 pr-4 py-2 text-white flex items-center space-x-3 w-max shadow-md hover:bg-gray-600 cursor-pointer">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-gray-700" />
                  </div>
                  <span className="text-sm font-medium">AWS Cert x3</span>
                </div>
                <div className="bg-gray-500 rounded-full pl-2 pr-4 py-2 text-white flex items-center space-x-3 w-max shadow-md hover:bg-gray-600 cursor-pointer">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-gray-700" />
                  </div>
                  <span className="text-sm font-medium">Apply Google x2</span>
                </div>
              </div>
            </div>

            {/* Tree Branch & Card 2 (Large Chart Card) */}
            <div className="relative pl-12 mb-8 group">
              <svg className="absolute left-4 -top-8 w-8 h-[calc(100%+2rem)] pointer-events-none" preserveAspectRatio="none">
                <path d="M 0 0 L 0 calc(100% - 16px) Q 0 100% 16 100% L 32 100%" fill="none" stroke="#a3a3a3" strokeWidth="1.5" />
              </svg>
              
              {/* White Chart Card */}
              <div className="relative z-10 bg-white rounded-3xl p-5 shadow-lg w-72 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-gray-800 font-medium">App Responses</h4>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                
                {/* Mock Chart Area */}
                <div className="h-20 w-full relative mb-4">
                  <div className="absolute inset-0 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute bottom-0 w-full h-1/2 bg-gray-200"></div>
                  </div>
                  {/* Mock Waveform */}
                  <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,30 Q20,10 40,25 T80,15 T100,20" fill="none" stroke="#333" strokeWidth="2" />
                    <line x1="70" y1="0" x2="70" y2="40" stroke="#a3a3a3" strokeWidth="1" strokeDasharray="2,2" />
                    <rect x="55" y="10" width="30" height="10" fill="#333" rx="4" />
                    <text x="70" y="17" fill="white" fontSize="6" textAnchor="middle" fontWeight="bold">2 / 10</text>
                  </svg>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500">Average: 20/100</p>
                  </div>
                  <span className="text-sm font-bold text-gray-600">-2 v</span>
                </div>
              </div>
            </div>

             {/* Tree Branch & Card 3 (ECG style Chart Card) */}
             <div className="relative pl-12 mb-8 group mt-12">
              <svg className="absolute left-4 -top-8 w-8 h-[calc(100%+2rem)] pointer-events-none" preserveAspectRatio="none">
                <path d="M 0 0 L 0 calc(100% - 16px) Q 0 100% 16 100% L 32 100%" fill="none" stroke="#a3a3a3" strokeWidth="1.5" />
              </svg>
              
              {/* White Chart Card */}
              <div className="relative z-10 bg-white rounded-3xl p-5 shadow-lg w-72 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-gray-800 font-medium">Activity Heatmap</h4>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                    <BarChart2 className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                
                {/* Mock ECG Chart Area */}
                <div className="h-20 w-full relative mb-4">
                   <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,35 L10,35 L15,20 L20,38 L25,10 L30,35 L40,35 L45,25 L50,38 L55,5 L60,35 L100,35" fill="none" stroke="#333" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M0,35 L10,35 L15,20 L20,38 L25,10 L30,35 L40,35 L45,25 L50,38 L55,5 L60,35 L100,35" fill="none" stroke="#ff4757" strokeWidth="3" strokeLinejoin="round" strokeDasharray="30 200" strokeDashoffset="-40" opacity="0.6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Timeline Navigation Pill */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center rounded-full shadow-2xl w-[90%] max-w-4xl overflow-hidden h-14 z-30">
          {/* Left White Half */}
          <div className="flex-1 bg-white/90 backdrop-blur-md h-full flex items-center px-6 justify-between border-r border-gray-200">
             <div className="flex items-center space-x-2 bg-gray-900 text-white rounded-full px-4 py-1.5 -ml-4">
               <Calendar className="w-4 h-4" />
               <span className="text-xs font-bold leading-tight">Jan<br/>2022</span>
             </div>
             {['Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                <div key={i} className="flex flex-col items-center justify-center w-8">
                  <div className="w-4 h-4 mb-1">
                     {i % 2 === 0 ? <BookOpen className="w-3 h-3 text-gray-400"/> : <Target className="w-3 h-3 text-gray-400"/>}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium uppercase">{month}</span>
                </div>
             ))}
          </div>
          
          {/* Right Dark Half */}
          <div className="flex-1 bg-[#2a2a2a] h-full flex items-center px-6 justify-between text-gray-400">
             {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                <div key={i} className="flex flex-col items-center justify-center w-8 relative">
                   {/* Notification dots on specific months */}
                   {i === 1 && <div className="absolute top-0 right-0 w-3 h-3 bg-[#eaff7b] rounded-full text-black text-[8px] flex items-center justify-center font-bold">4</div>}
                   {i === 2 && <div className="absolute top-0 right-0 w-3 h-3 bg-[#eaff7b] rounded-full text-black text-[8px] flex items-center justify-center font-bold">2</div>}
                   {i === 5 && <div className="absolute top-0 right-0 w-3 h-3 bg-[#eaff7b] rounded-full text-black text-[8px] flex items-center justify-center font-bold">6</div>}
                  <div className="w-4 h-4 mb-1">
                     {i % 2 !== 0 ? <Zap className="w-3 h-3 text-gray-500"/> : <Briefcase className="w-3 h-3 text-gray-500"/>}
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium uppercase">{month}</span>
                </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboardHome;