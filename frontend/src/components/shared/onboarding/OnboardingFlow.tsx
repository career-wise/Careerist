import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Sparkles, 
  Code, Stethoscope, Briefcase, Palette, HardHat, Microscope 
} from 'lucide-react';
import Button from '../ui/Button';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

const STAGE_OPTIONS = [
  { id: 'high-school', label: 'High School Student', desc: 'Looking for college and career paths' },
  { id: 'college', label: 'College Student', desc: 'Seeking internships and grad roles' },
  { id: 'graduate', label: 'Recent Graduate', desc: 'Ready to start a full-time career' },
];

const INTEREST_OPTIONS = [
  { id: 'tech', label: 'Technology', icon: Code },
  { id: 'health', label: 'Healthcare', icon: Stethoscope },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'arts', label: 'Arts & Design', icon: Palette },
  { id: 'engineering', label: 'Engineering', icon: HardHat },
  { id: 'science', label: 'Science', icon: Microscope },
];

const GOAL_OPTIONS = [
  { id: 'explore', label: 'Explore Career Paths' },
  { id: 'internship', label: 'Find an Internship' },
  { id: 'skills', label: 'Build New Skills' },
  { id: 'mentor', label: 'Get Mentorship' },
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [answers, setAnswers] = useState({
    stage: '',
    interests: [] as string[],
    goal: ''
  });

  const toggleInterest = (id: string) => {
    setAnswers(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const selectStage = (id: string) => {
    setAnswers(prev => ({ ...prev, stage: id }));
  };

  const selectGoal = (id: string) => {
    setAnswers(prev => ({ ...prev, goal: id }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Start generation
      setIsGenerating(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Simulate AI generation when finished
  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        onComplete(answers);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, answers, onComplete]);

  // Validation
  const canProceed = () => {
    if (currentStep === 1) return answers.stage !== '';
    if (currentStep === 2) return answers.interests.length > 0;
    if (currentStep === 3) return answers.goal !== '';
    return false;
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-brand-mist flex items-center justify-center p-6">
        <div className="text-center max-w-md w-full">
          <div className="relative w-32 h-32 mx-auto mb-10">
            {/* Spinning gradient rings */}
            <div className="absolute inset-0 rounded-full border-[6px] border-brand-slate/10"></div>
            <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-brand-neon border-r-brand-neon animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-b-brand-ink animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-brand-ink animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-3xl font-display font-bold text-brand-ink mb-4">Building your AI profile...</h2>
          <p className="text-brand-slate text-lg mb-8">We are analyzing your inputs to tailor the perfect career dashboard for you.</p>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-brand-slate/10 rounded-full overflow-hidden">
            <div className="h-full bg-brand-ink rounded-full animate-pulse" style={{ width: '100%', animationDuration: '3s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-mist flex flex-col items-center pt-10 pb-20 px-6">
      {/* Floating Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-16">
        <div className="bg-brand-ink text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-xl">
          {currentStep > 1 ? (
            <button onClick={handleBack} className="p-1 hover:bg-white/10 rounded-full transition-colors group">
              <ArrowLeft className="h-5 w-5 text-brand-neon group-hover:text-white transition-colors" />
            </button>
          ) : (
            <div className="w-7"></div>
          )}
          <span className="font-bold tracking-wide">STEP {currentStep} OF 3</span>
          <div className="w-7"></div>
        </div>
        
        <button 
          onClick={onSkip}
          className="text-brand-slate font-semibold hover:text-brand-ink transition-colors px-4 py-2"
        >
          Skip for now
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-3xl flex-1 flex flex-col justify-center">
        
        {/* Step 1: Stage */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              Where are you in your educational journey?
            </h1>
            <p className="text-xl text-brand-slate mb-12 text-center">This helps us recommend the right internships, universities, or jobs.</p>
            
            <div className="grid gap-4 md:grid-cols-3">
              {STAGE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => selectStage(option.id)}
                  className={`text-left p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                    answers.stage === option.id 
                      ? 'bg-brand-ink border-brand-ink text-white shadow-xl shadow-brand-ink/20 transform scale-105' 
                      : 'bg-white border-transparent hover:border-brand-slate/20 hover:shadow-lg text-brand-ink'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 mb-6 transition-colors ${
                    answers.stage === option.id ? 'border-brand-neon bg-brand-neon' : 'border-brand-slate/30'
                  }`}></div>
                  <h3 className="text-2xl font-bold mb-2">{option.label}</h3>
                  <p className={`text-sm ${answers.stage === option.id ? 'text-brand-mist/80' : 'text-brand-slate'}`}>
                    {option.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              What industries catch your eye?
            </h1>
            <p className="text-xl text-brand-slate mb-12 text-center">Select all that apply. Don't worry, you can change these later.</p>
            
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
              {INTEREST_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleInterest(option.id)}
                  className={`flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300 ${
                    answers.interests.includes(option.id)
                      ? 'bg-brand-ink border-brand-ink text-white shadow-xl shadow-brand-ink/20 transform scale-105' 
                      : 'bg-white border-transparent hover:border-brand-slate/20 hover:shadow-lg text-brand-ink'
                  }`}
                >
                  <option.icon className={`h-10 w-10 mb-4 ${answers.interests.includes(option.id) ? 'text-white' : 'text-brand-ink'}`} />
                  <h3 className="text-lg font-bold text-center">{option.label}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              What brings you to Careerist?
            </h1>
            <p className="text-xl text-brand-slate mb-12 text-center">We'll tailor your dashboard to focus on your primary objective.</p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {GOAL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => selectGoal(option.id)}
                  className={`text-center p-8 rounded-[2rem] border-2 transition-all duration-300 ${
                    answers.goal === option.id 
                      ? 'bg-brand-ink border-brand-ink text-white shadow-xl shadow-brand-ink/20 transform scale-105' 
                      : 'bg-white border-transparent hover:border-brand-slate/20 hover:shadow-lg text-brand-ink'
                  }`}
                >
                  <h3 className="text-2xl font-bold">{option.label}</h3>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="w-full max-w-3xl mt-16 flex justify-center">
        <Button 
          size="lg" 
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full md:w-auto min-w-[240px] flex items-center justify-center group"
        >
          {currentStep === 3 ? "Complete Setup" : "Continue"}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingFlow;