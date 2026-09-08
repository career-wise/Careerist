import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle, Circle, ArrowRight, Target, Briefcase, GraduationCap, Trophy, Map } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import { authService } from "../../../lib/auth";
import { profileService } from "../../../services/profileService";
import { useAppContext } from "../../../contexts/AppContext";

const CareerPathPlanner: React.FC = () => {
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [persona, setPersona] = useState<string>("student");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          const profile = await profileService.getProfile(session.user.id);
          setPersona(profile?.persona || "student");
          if (profile?.onboarding_answers?.career_roadmap) {
            setRoadmap(profile.onboarding_answers.career_roadmap);
          }
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      const rm = await profileService.generateCareerRoadmap();
      setRoadmap(rm);
    } catch (e) {
      console.error(e);
      alert("Failed to generate roadmap.");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-brand-mist/30 flex items-center justify-center">Loading planner...</div>;
  }

  // No more fallback dummy data. We will show an empty state if no roadmap exists.
  const hasRoadmap = !!roadmap;
  
  // Adapter for the AI generated roadmap structure
  let steps: any[] = [];
  if (hasRoadmap && roadmap.branches) {
    steps = [
      { id: 1, title: "Foundation", desc: roadmap.branches.level1Branches?.map((b:any)=>b.label).join(", ") || "Build basics", status: "completed", icon: <Target className="w-6 h-6"/> },
      { id: 2, title: "Exploration", desc: roadmap.branches.level2Branches?.map((b:any)=>b.label).join(", ") || "Explore skills", status: "in-progress", icon: <Sparkles className="w-6 h-6"/> },
      { id: 3, title: "Specialization", desc: roadmap.branches.level3Branches?.map((b:any)=>b.label).join(", ") || "Deep dive", status: "available", icon: <GraduationCap className="w-6 h-6"/> },
      { id: 4, title: "Application", desc: roadmap.branches.level4Branches?.map((b:any)=>b.label).join(", ") || "Apply", status: "locked", icon: <Briefcase className="w-6 h-6"/> },
      { id: 5, title: "Success", desc: roadmap.branches.level5Branches?.map((b:any)=>b.label).join(", ") || "Land role", status: "locked", icon: <Trophy className="w-6 h-6"/> },
    ];
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-mist/30 via-white to-brand-mist/30 py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="bg-brand-ink rounded-[2rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
              {hasRoadmap ? roadmap.title : "Career Path Planner"}
            </h1>
            <p className="text-brand-mist/90 text-lg font-medium">
              {hasRoadmap 
                ? "Your personalized roadmap is ready. Follow these steps to reach your goal." 
                : "Generate a personalized, step-by-step roadmap tailored to your specific career goals and current skills."}
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-brand-neon text-brand-ink hover:bg-white hover:text-brand-ink border-none shadow-lg font-bold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" /> Generating...
                </span>
              ) : (
                hasRoadmap ? "Regenerate Plan" : "Generate Plan"
              )}
            </Button>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-neon/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#3EBFB0]/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content Area */}
        {!hasRoadmap ? (
          <div className="bg-white rounded-[2rem] p-12 text-center border border-brand-slate/20 shadow-sm flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-brand-mist flex items-center justify-center mb-6">
              <Map className="w-10 h-10 text-brand-slate/40" />
            </div>
            <h2 className="text-2xl font-bold text-brand-ink mb-3">No Roadmap Generated Yet</h2>
            <p className="text-brand-slate max-w-md mx-auto mb-8">
              Click the "Generate Plan" button above to use AI to build a personalized step-by-step journey based on your profile and goals.
            </p>
          </div>
        ) : (
          <div className="relative py-12">
            {/* Central Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-brand-slate/10 -translate-x-1/2 rounded-full"></div>

            <div className="space-y-12">
              {steps.map((step: any, idx: number) => {
                const isEven = idx % 2 === 0;
                const isCompleted = step.status === "completed";
                const isInProgress = step.status === "in-progress";
                const isLocked = step.status === "locked";

                return (
                  <div key={idx} className={`relative flex items-center md:justify-between w-full ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                    
                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-md bg-white transition-transform duration-300 hover:scale-110">
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-brand-neon fill-brand-neon/20" />
                      ) : isInProgress ? (
                        <div className="w-5 h-5 rounded-full bg-brand-neon animate-pulse shadow-[0_0_15px_rgba(21,193,150,0.6)]"></div>
                      ) : (
                        <Circle className="w-6 h-6 text-brand-slate/20" />
                      )}
                    </div>

                    {/* Spacer for empty side */}
                    <div className="hidden md:block w-5/12"></div>

                    {/* Card Content */}
                    <div className={`w-full md:w-5/12 pl-24 md:pl-0 ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                      <div className={`p-6 md:p-8 rounded-[2rem] transition-all duration-300 hover:shadow-xl ${
                        isCompleted ? "bg-white border-2 border-brand-neon/50 shadow-sm" :
                        isInProgress ? "bg-brand-ink border-2 border-brand-neon shadow-lg scale-105 text-white" :
                        "bg-white border border-brand-slate/10 opacity-75 hover:opacity-100"
                      }`}>
                        <div className={`flex items-center gap-4 mb-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                            isCompleted ? "bg-brand-neon/10 text-brand-neon" :
                            isInProgress ? "bg-brand-neon/20 text-brand-neon" :
                            "bg-brand-slate/5 text-brand-slate"
                          }`}>
                            {step.icon || <Target className="w-6 h-6"/>}
                          </div>
                          <h3 className={`text-xl md:text-2xl font-bold ${
                            isInProgress ? "text-white" : isLocked ? "text-brand-slate" : "text-brand-ink"
                          }`}>{step.title}</h3>
                        </div>
                        <p className={`text-base leading-relaxed ${
                          isInProgress ? "text-brand-mist/90" : isLocked ? "text-brand-slate/70" : "text-brand-slate"
                        }`}>
                          {step.desc}
                        </p>
                        
                        {isInProgress && (
                          <div className={`mt-6 flex ${isEven ? "md:justify-end" : "justify-start"}`}>
                            <span className="px-4 py-1.5 bg-brand-neon/20 text-brand-neon text-sm font-bold rounded-full flex items-center gap-2 border border-brand-neon/30">
                              <Sparkles className="w-4 h-4" /> Current Focus
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPathPlanner;