import React from "react";
import { ArrowUpRight, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";

const ProductPreview: React.FC = () => {
  return (
    <section className="py-32 bg-brand-mist relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-ink mb-4">
            See your future clearly.
          </h2>
          <p className="text-xl text-brand-slate max-w-2xl mx-auto">
            A dashboard built for action. No fluff, just the data you need to make the right move.
          </p>
        </div>

        {/* Dashboard Mockup (Cardiology UI inspired) */}
        <div className="relative mx-auto max-w-5xl rounded-[2rem] bg-white shadow-2xl border border-gray-100 p-6 md:p-10">
          
          {/* Header of mockup */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" alt="User" className="w-full h-full object-cover grayscale" />
              </div>
              <div>
                <div className="font-mono text-xs text-brand-slate mb-1">ID: CW-8492</div>
                <h3 className="text-xl font-display font-bold text-brand-ink">Alex Rivera</h3>
              </div>
            </div>

            <div className="flex gap-4">
               {/* Metrics */}
               <div className="bg-brand-mist px-4 py-2 rounded-xl border border-gray-100">
                 <div className="text-[10px] uppercase font-mono text-brand-slate mb-1">Interviews</div>
                 <div className="font-bold text-brand-ink text-lg">12 <span className="text-brand-slate text-sm font-normal">completed</span></div>
               </div>
               <div className="bg-brand-mist px-4 py-2 rounded-xl border border-gray-100">
                 <div className="text-[10px] uppercase font-mono text-brand-slate mb-1">Path Fit</div>
                 <div className="font-bold text-brand-ink text-lg">High <span className="text-brand-slate text-sm font-normal">confidence</span></div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column - Clarity Score (Signature Element) */}
            <div className="md:col-span-4 flex flex-col gap-6">
              
              <div className="bg-brand-mist rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                <div className="text-sm font-display font-bold text-brand-ink mb-6">Clarity Score</div>
                
                {/* Gauge / Radial */}
                <div className="relative w-48 h-48 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="stroke-gray-200 fill-none" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" className="stroke-brand-ink fill-none" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-display font-bold text-brand-ink">84</span>
                    <span className="text-brand-neon font-mono font-bold flex items-center text-sm mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" /> +12
                    </span>
                  </div>
                </div>
                <p className="text-sm text-brand-slate">You are highly aligned with the Software Architecture path.</p>
              </div>

              {/* Action Item */}
              <div className="bg-brand-ink rounded-2xl p-6 text-brand-mist shadow-lg relative">
                 <div className="absolute top-4 right-4 text-brand-neon">
                   <AlertCircle className="w-5 h-5" />
                 </div>
                 <h4 className="font-display font-bold mb-2">Next Step</h4>
                 <p className="text-sm text-brand-mist/80 mb-4">Complete your mock interview for System Design.</p>
                 <button className="w-full bg-brand-neon text-brand-ink font-bold rounded-full py-2 text-sm hover:bg-white transition-colors">
                   Start Interview
                 </button>
              </div>

            </div>

            {/* Right Column - Branching Timeline / Cards */}
            <div className="md:col-span-8 space-y-4 relative">
               
               {/* Decorative Timeline Line */}
               <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gray-100 -z-10 hidden sm:block"></div>

               {/* Timeline Item 1 */}
               <div className="flex gap-4 items-start">
                 <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex flex-shrink-0 items-center justify-center shadow-sm z-10 hidden sm:flex">
                   <CheckCircle2 className="w-5 h-5 text-brand-ink" />
                 </div>
                 <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm w-full flex flex-col sm:flex-row justify-between items-start sm:items-center hover:border-brand-ink transition-colors cursor-pointer group">
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="font-mono text-[10px] px-2 py-0.5 bg-gray-100 rounded text-brand-slate">TECHNICAL</span>
                       <span className="text-sm font-bold text-brand-ink">Data Structures Quiz</span>
                     </div>
                     <div className="text-xs text-brand-slate">Completed on Oct 12</div>
                   </div>
                   <div className="mt-3 sm:mt-0 flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-brand-slate uppercase font-mono">Score</div>
                        <div className="font-bold text-brand-ink">92%</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-brand-mist flex items-center justify-center group-hover:bg-brand-neon group-hover:text-brand-ink transition-colors">
                         <ArrowUpRight className="w-4 h-4" />
                      </div>
                   </div>
                 </div>
               </div>

               {/* Timeline Item 2 - Highlighted */}
               <div className="flex gap-4 items-start">
                 <div className="w-12 h-12 rounded-full bg-brand-neon border border-brand-ink flex flex-shrink-0 items-center justify-center shadow-md z-10 hidden sm:flex">
                   <div className="w-3 h-3 bg-brand-ink rounded-full animate-pulse"></div>
                 </div>
                 <div className="bg-brand-mist border border-brand-ink rounded-2xl p-5 shadow-md w-full relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-2 h-full bg-brand-neon"></div>
                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="font-mono text-[10px] px-2 py-0.5 bg-white rounded text-brand-ink border border-gray-200">INTERVIEW</span>
                         <span className="text-sm font-bold text-brand-ink">System Design Mock</span>
                       </div>
                       <div className="text-xs text-brand-slate">Scheduled for Today</div>
                     </div>
                     <div className="mt-4 sm:mt-0">
                       <button className="bg-brand-ink text-brand-mist px-4 py-2 rounded-full text-xs font-bold hover:bg-brand-neon hover:text-brand-ink transition-colors shadow-sm">
                         Join Session
                       </button>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Timeline Item 3 */}
               <div className="flex gap-4 items-start opacity-60 grayscale">
                 <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex flex-shrink-0 items-center justify-center z-10 hidden sm:flex">
                   <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                 </div>
                 <div className="bg-white border border-gray-100 rounded-2xl p-5 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center">
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="font-mono text-[10px] px-2 py-0.5 bg-gray-100 rounded text-brand-slate">REVIEW</span>
                       <span className="text-sm font-bold text-brand-ink">Behavioral Analysis</span>
                     </div>
                     <div className="text-xs text-brand-slate">Locked</div>
                   </div>
                 </div>
               </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
