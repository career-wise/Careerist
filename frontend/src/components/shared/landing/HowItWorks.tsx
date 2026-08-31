import React from "react";
import { UserPlus, Target, Bot } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: <UserPlus className="w-8 h-8 text-brand-ink" />,
      title: "Build your profile.",
      description: "Tell us where you are in your journey. Select your current career stage, interests, and future goals to personalize your experience.",
    },
    {
      number: "02",
      icon: <Target className="w-8 h-8 text-brand-neon" />,
      title: "Explore paths & set goals.",
      description: "Take targeted career assessments on your dashboard. Discover matching roles, track your progress, and build your milestone roadmap.",
    },
    {
      number: "03",
      icon: <Bot className="w-8 h-8 text-brand-ink" />,
      title: "Practice & chat with AI.",
      description: "Get 24/7 personalized advice from your AI Career Chat, and run realistic AI mock interviews to build confidence before the real thing.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-brand-mist relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-ink mb-4">
            How it works
          </h2>
          <p className="text-xl text-brand-slate max-w-2xl mx-auto">
            Three simple steps to unlock your personalized career roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Decorative connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[2px] bg-gray-200 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center">
              
              {/* Icon / Number Badge */}
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-8 border border-gray-100 relative group">
                <div className="absolute inset-0 rounded-full border-2 border-brand-neon opacity-0 group-hover:opacity-100 transform scale-110 transition-all duration-300"></div>
                {step.icon}
                <div className="absolute -top-2 -right-2 bg-brand-ink text-brand-mist font-mono text-xs font-bold px-2 py-1 rounded-full">
                  {step.number}
                </div>
              </div>
              
              {/* Card Content */}
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center h-full w-full max-w-sm border border-gray-100/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
                <h3 className="text-2xl font-display font-bold text-brand-ink mb-4">
                  {step.title}
                </h3>
                <p className="text-brand-slate leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;