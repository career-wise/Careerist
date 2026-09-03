import React, { useState } from "react";
import { UserPlus, Target, Bot, CheckCircle, ArrowRight, Compass, Milestone, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Build your personalized profile",
      shortTitle: "Build Profile",
      description: "Start by telling us where you are in your journey. Select your current career stage, interests, and long-term goals. Our AI uses this to tailor everything specifically to you.",
      icon: <UserPlus className="w-6 h-6" />,
      features: ["Skill assessment", "Interest matching", "Goal definition"],
      imageBg: "bg-brand-ink",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-neon/20 to-brand-ink/5 rounded-[2rem]"></div>
          <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-slate/10 transform transition-transform hover:scale-105 duration-500">
            <div className="bg-brand-mist px-6 py-4 border-b border-brand-slate/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-neon/20 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-brand-neon" />
              </div>
              <div>
                <h4 className="font-bold text-brand-ink text-sm">Profile Setup</h4>
                <div className="w-24 h-1.5 bg-brand-neon/30 rounded-full mt-1">
                  <div className="w-3/4 h-full bg-brand-neon rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-neon/20 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-brand-neon" />
                  </div>
                  <div className="h-2 bg-brand-slate/10 rounded-full flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Explore paths & set milestones",
      shortTitle: "Explore Paths",
      description: "Take targeted assessments to uncover career paths that align with your natural strengths. Generate dynamic, interactive roadmaps with step-by-step milestones.",
      icon: <Target className="w-6 h-6" />,
      features: ["Interactive roadmaps", "Major comparison", "Deadline tracking"],
      imageBg: "bg-[#0F4743]",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-slate/20 to-brand-ink/5 rounded-[2rem]"></div>
          <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-brand-slate/10 p-6 transform transition-transform hover:scale-105 duration-500">
            <h4 className="font-bold text-brand-ink text-lg mb-6 flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-neon" />
              Career Roadmap
            </h4>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand-slate/20 before:to-transparent">
              {[
                { status: 'completed', label: 'High School' },
                { status: 'current', label: 'Computer Science' },
                { status: 'upcoming', label: 'Software Engineer' }
              ].map((item, i) => (
                <div key={i} className="relative flex items-center gap-4 md:justify-center">
                  <div className={`w-10 h-10 rounded-full border-[3px] flex items-center justify-center z-10 bg-white shadow-sm
                    ${item.status === 'completed' ? 'border-brand-neon text-brand-neon' : 
                      item.status === 'current' ? 'border-brand-ink text-brand-ink' : 
                      'border-brand-slate/20 text-brand-slate/30'}`}>
                    <Milestone className="w-5 h-5" />
                  </div>
                  <div className={`absolute left-14 md:left-auto md:right-14 text-sm font-bold ${item.status === 'current' ? 'text-brand-ink' : 'text-brand-slate'}`}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Practice & chat with AI",
      shortTitle: "Practice AI",
      description: "Get 24/7 personalized advice from your AI Career Chat. Run realistic, role-specific mock interviews and receive instant audio and text feedback to build confidence.",
      icon: <Bot className="w-6 h-6" />,
      features: ["Voice-enabled mocks", "Instant feedback", "24/7 career chat"],
      imageBg: "bg-brand-mist",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-neon/30 to-white/50 rounded-[2rem]"></div>
          <div className="relative z-10 w-full max-w-sm bg-brand-ink rounded-2xl shadow-2xl border border-gray-800 p-6 transform transition-transform hover:scale-105 duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-brand-neon/20 border border-brand-neon/50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-neon" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Careerist AI</h4>
                <p className="text-brand-slate text-xs font-medium">Interview Session</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-2xl rounded-tl-none p-4 w-5/6 border border-gray-700/50">
                <div className="h-2 w-3/4 bg-brand-slate/30 rounded-full mb-2"></div>
                <div className="h-2 w-1/2 bg-brand-slate/30 rounded-full"></div>
              </div>
              <div className="bg-brand-neon/10 rounded-2xl rounded-tr-none p-4 w-5/6 ml-auto border border-brand-neon/20">
                <div className="flex items-center gap-1 justify-center h-4">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <motion.div 
                      key={bar}
                      animate={{ height: ['40%', '100%', '40%'] }}
                      transition={{ duration: 1, repeat: Infinity, delay: bar * 0.1 }}
                      className="w-1 bg-brand-neon rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-mist blur-3xl opacity-50"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-neon/5 blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-6 tracking-tight">
            How Careerist works
          </h2>
          <p className="text-xl text-brand-slate max-w-2xl mx-auto font-medium">
            Three simple steps to unlock your personalized career roadmap and accelerate your journey.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Interactive Steps */}
          <div className="w-full lg:w-1/2 space-y-6">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`group relative p-6 md:p-8 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 overflow-hidden
                  ${activeStep === index 
                    ? 'bg-brand-mist border-brand-neon shadow-lg' 
                    : 'bg-white border-transparent hover:border-brand-slate/10 hover:bg-brand-mist/50'
                  }`}
              >
                {/* Active Indicator Line */}
                {activeStep === index && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-2 bg-brand-neon"
                  />
                )}

                <div className="flex items-start gap-4 md:gap-6 relative z-10">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300
                    ${activeStep === index ? 'bg-brand-neon text-brand-ink shadow-md' : 'bg-brand-ink text-brand-mist group-hover:bg-brand-ink/90'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300
                        ${activeStep === index ? 'text-brand-neon' : 'text-brand-slate'}`}>
                        Step 0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-ink mb-3">
                      {step.title}
                    </h3>
                    
                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-brand-slate text-lg leading-relaxed mb-6">
                            {step.description}
                          </p>
                          <ul className="space-y-3">
                            {step.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-3 text-brand-ink font-semibold">
                                <CheckCircle className="w-5 h-5 text-brand-neon" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-8">
                            <Link to="/auth" className="inline-flex items-center font-bold text-brand-ink hover:text-brand-neon transition-colors group/link">
                              Get started now <ArrowRight className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Visual Representation */}
          <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`absolute inset-0 w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border border-brand-slate/10 ${steps[activeStep].imageBg}`}
              >
                {steps[activeStep].visual}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;