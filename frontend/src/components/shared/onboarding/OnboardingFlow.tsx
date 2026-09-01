import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export interface OnboardingAnswers {
  persona: 'high-school' | 'graduate' | '';
  // high-school fields
  grade?: string;
  subjects?: string[];
  clarityLevel?: string;
  fieldsOfInterest?: string[];
  goal?: string;
  // graduate fields
  status?: string;
  fieldOfStudy?: string;
  lookingFor?: string[];
  resumeStatus?: string;
  interviewConfidence?: string;
  urgency?: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingAnswers) => void;
  onSkip: () => void;
}

const SUBJECTS = [
  'Math', 'Physics', 'Biology', 'Chemistry', 'Computer Science',
  'Economics/Commerce', 'Languages & Literature', 'History/Social Studies',
  'Art & Design', 'Sports/Physical Ed'
];

const CLARITY_LEVELS = [
  'No idea what I want to do',
  'I know the general field, not the specifics',
  'I know the field, torn on college/major',
  'Deciding between 2-3 very different paths'
];

const FIELDS_OF_INTEREST = [
  'Engineering & Tech', 'Medicine & Healthcare', 'Business & Commerce',
  'Law', 'Arts, Design & Media', 'Pure Sciences & Research', 'Humanities & Social Sciences'
];

const HS_GOALS = [
  'Help me explore options broadly',
  'Help me choose the right degree/major',
  'Help me shortlist the right colleges',
  'Help me start building relevant skills early'
];

const GRAD_STATUS = [
  'Final year — about to graduate',
  'Graduated, actively job hunting',
  'Graduated, employed but looking to switch',
  'Graduated, taking time before deciding next steps'
];

const GRAD_LOOKING_FOR = [
  'First full-time job', 'Internship', 'Switching fields entirely',
  'Freelance/contract work', 'Still deciding'
];

const GRAD_URGENCY = [
  'ASAP — actively applying now',
  'Within the next 1-3 months',
  'No fixed timeline, just preparing'
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onSkip }) => {
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    persona: '',
    subjects: [],
    fieldsOfInterest: [],
    lookingFor: []
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const getActiveSteps = () => {
    if (answers.persona === 'high-school') {
      if (answers.clarityLevel === 'No idea what I want to do') {
        return ['grade', 'subjects', 'clarityLevel', 'goal'];
      }
      return ['grade', 'subjects', 'clarityLevel', 'fieldsOfInterest', 'goal'];
    }
    if (answers.persona === 'graduate') {
      return ['status', 'fieldOfStudy', 'lookingFor', 'readiness', 'urgency'];
    }
    return [];
  };

  const activeSteps = getActiveSteps();
  const totalSteps = answers.persona ? activeSteps.length + 1 : 6;

  const handleSkip = () => {
    // defaults to high-school with empty answers if skipped on step 0
    if (!answers.persona) {
      onComplete({ ...answers, persona: 'high-school' });
    } else {
      onComplete(answers);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < activeSteps.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsGenerating(true);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        onComplete(answers);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, answers, onComplete]);

  const canProceed = () => {
    if (currentStepIndex === 0) return answers.persona !== '';
    
    const stepId = activeSteps[currentStepIndex - 1];
    switch (stepId) {
      // High School
      case 'grade': return !!answers.grade;
      case 'subjects': return answers.subjects && answers.subjects.length > 0;
      case 'clarityLevel': return !!answers.clarityLevel;
      case 'fieldsOfInterest': return answers.fieldsOfInterest && answers.fieldsOfInterest.length > 0;
      case 'goal': return !!answers.goal;
      // Graduate
      case 'status': return !!answers.status;
      case 'fieldOfStudy': return !!answers.fieldOfStudy;
      case 'lookingFor': return answers.lookingFor && answers.lookingFor.length > 0;
      case 'readiness': return !!answers.resumeStatus && !!answers.interviewConfidence;
      case 'urgency': return !!answers.urgency;
      default: return false;
    }
  };

  const toggleArrayItem = (field: 'subjects' | 'fieldsOfInterest' | 'lookingFor', val: string) => {
    setAnswers(prev => {
      const current = prev[field] || [];
      return {
        ...prev,
        [field]: current.includes(val) ? current.filter(i => i !== val) : [...current, val]
      };
    });
  };

  const renderOptionCard = (
    label: string, 
    isSelected: boolean, 
    onClick: () => void, 
    className = "p-6"
  ) => (
    <button
      onClick={onClick}
      className={`text-left ${className} rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
        isSelected
          ? 'bg-blue-50 border-blue-500 text-blue-900' 
          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
      }`}
    >
      <div className={`w-4 h-4 rounded-full border-2 mb-4 transition-colors ${
        isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
      }`}></div>
      <h3 className="text-xl font-bold">{label}</h3>
    </button>
  );

  const renderMultiChip = (
    label: string,
    isSelected: boolean,
    onClick: () => void
  ) => (
    <button
      onClick={onClick}
      className={`px-6 py-4 rounded-xl border-2 text-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md ${
        isSelected
          ? 'bg-blue-500 border-blue-500 text-white'
          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );

  if (isGenerating) {
    const isHS = answers.persona === 'high-school';
    const generatingTitle = isHS ? "Building your exploration map..." : "Building your job search plan...";
    const generatingSub = isHS 
      ? "Matching your interests to real degree paths and colleges." 
      : "Prioritizing what to fix first based on where you actually are.";

    return (
      <div className="min-h-screen bg-brand-mist flex items-center justify-center p-6">
        <div className="text-center max-w-md w-full">
          <div className="relative w-32 h-32 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-blue-300 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-blue-500 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-display font-bold text-brand-ink mb-4">{generatingTitle}</h2>
          <p className="text-brand-slate text-lg mb-8">{generatingSub}</p>
          <div className="w-full h-2 bg-brand-slate/10 rounded-full overflow-hidden">
            <div className="h-full bg-brand-ink rounded-full animate-pulse" style={{ width: '100%', animationDuration: '3s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepId = currentStepIndex === 0 ? 'persona' : activeSteps[currentStepIndex - 1];

  return (
    <div className="min-h-screen bg-brand-mist flex flex-col items-center pt-10 pb-20 px-6">
      {/* Floating Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-16">
        <div className="bg-brand-ink text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-xl">
          {currentStepIndex > 0 ? (
            <button onClick={handleBack} className="p-1 hover:bg-white/10 rounded-full transition-colors group">
              <ArrowLeft className="h-5 w-5 text-brand-neon group-hover:text-white transition-colors" />
            </button>
          ) : (
            <div className="w-7"></div>
          )}
          <span className="font-bold tracking-wide">STEP {currentStepIndex + 1} OF {totalSteps}</span>
          <div className="w-7"></div>
        </div>
        <button onClick={handleSkip} className="text-brand-slate font-semibold hover:text-brand-ink transition-colors px-4 py-2">
          Skip for now
        </button>
      </div>

      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
        
        {currentStepId === 'persona' && (
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              Where are you right now?
            </h1>
            <p className="text-xl text-brand-slate mb-12 text-center">
              This changes everything you see next — pick what's actually true today.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div 
                className={`group relative rounded-2xl overflow-hidden bg-white border-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${answers.persona === 'high-school' ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setAnswers({...answers, persona: 'high-school'})}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop&q=80" 
                    alt="High School" 
                    className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                  />
                </div>
                <div className="p-8 lg:p-10 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent pt-32">
                  <h3 className="text-3xl font-display font-bold text-white mb-3">
                    I'm in 11th or 12th grade
                  </h3>
                  <p className="text-gray-200 text-lg">
                    Figuring out what to study and where.
                  </p>
                </div>
              </div>
              <div 
                className={`group relative rounded-2xl overflow-hidden bg-white border-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${answers.persona === 'graduate' ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setAnswers({...answers, persona: 'graduate'})}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&q=80" 
                    alt="Graduate" 
                    className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                  />
                </div>
                <div className="p-8 lg:p-10 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent pt-32">
                  <h3 className="text-3xl font-display font-bold text-white mb-3">
                    I've graduated
                  </h3>
                  <p className="text-gray-200 text-lg">
                    Looking for a job, internship, or what's next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* High School Track */}
        {currentStepId === 'grade' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              Which year are you in?
            </h1>
            <p className="text-xl text-brand-slate mb-12 text-center">
              12th graders get more urgent, decision-focused guidance. 11th graders get more room to explore.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {renderOptionCard('11th Grade', answers.grade === '11', () => setAnswers({...answers, grade: '11'}), 'p-8')}
              {renderOptionCard('12th Grade', answers.grade === '12', () => setAnswers({...answers, grade: '12'}), 'p-8')}
            </div>
          </div>
        )}

        {currentStepId === 'subjects' && (
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              What do you actually enjoy studying?
            </h1>
            <p className="text-xl text-brand-slate mb-12 text-center">
              Not what you're best at on paper. What doesn't feel like a chore.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {SUBJECTS.map(subj => renderMultiChip(subj, (answers.subjects || []).includes(subj), () => toggleArrayItem('subjects', subj)))}
            </div>
          </div>
        )}

        {currentStepId === 'clarityLevel' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              How clear is your path right now?
            </h1>
            <p className="text-xl text-brand-slate mb-12 text-center">
              Be honest — this decides how much hand-holding you get.
            </p>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {CLARITY_LEVELS.map(level => renderOptionCard(level, answers.clarityLevel === level, () => setAnswers({...answers, clarityLevel: level})))}
            </div>
          </div>
        )}

        {currentStepId === 'fieldsOfInterest' && (
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              Which fields are you drawn to?
            </h1>
            <div className="flex flex-wrap gap-4 justify-center mt-12">
              {FIELDS_OF_INTEREST.map(field => renderMultiChip(field, (answers.fieldsOfInterest || []).includes(field), () => toggleArrayItem('fieldsOfInterest', field)))}
            </div>
          </div>
        )}

        {currentStepId === 'goal' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              What would actually help you most right now?
            </h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-12">
              {HS_GOALS.map(goal => renderOptionCard(goal, answers.goal === goal, () => setAnswers({...answers, goal})))}
            </div>
          </div>
        )}

        {/* Graduate Track */}
        {currentStepId === 'status' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              What's your current situation?
            </h1>
            <p className="text-xl text-brand-slate mb-12 text-center">
              This sets your urgency level — no judgment either way.
            </p>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {GRAD_STATUS.map(status => renderOptionCard(status, answers.status === status, () => setAnswers({...answers, status})))}
            </div>
          </div>
        )}

        {currentStepId === 'fieldOfStudy' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              What did you study?
            </h1>
            <div className="mt-12 space-y-4">
              {['Computer Science/IT', 'Engineering (non-CS)', 'Commerce/Business/Finance', 'Arts/Humanities', 'Sciences', 'Design'].map(field => 
                renderOptionCard(field, answers.fieldOfStudy === field, () => setAnswers({...answers, fieldOfStudy: field}))
              )}
              <div className={`p-6 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${answers.fieldOfStudy && !['Computer Science/IT', 'Engineering (non-CS)', 'Commerce/Business/Finance', 'Arts/Humanities', 'Sciences', 'Design'].includes(answers.fieldOfStudy) ? 'bg-blue-50 border-blue-500 text-blue-900' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <div className={`w-4 h-4 rounded-full border-2 mb-4 transition-colors inline-block mr-3 align-middle ${answers.fieldOfStudy && !['Computer Science/IT', 'Engineering (non-CS)', 'Commerce/Business/Finance', 'Arts/Humanities', 'Sciences', 'Design'].includes(answers.fieldOfStudy) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}></div>
                <input 
                  type="text" 
                  placeholder="Other (please specify)" 
                  className={`w-[80%] bg-transparent outline-none text-xl font-bold align-middle ${answers.fieldOfStudy && !['Computer Science/IT', 'Engineering (non-CS)', 'Commerce/Business/Finance', 'Arts/Humanities', 'Sciences', 'Design'].includes(answers.fieldOfStudy) ? 'text-blue-900 placeholder-blue-300' : 'text-gray-800 placeholder-gray-400'}`}
                  onChange={(e) => setAnswers({...answers, fieldOfStudy: e.target.value})}
                  onClick={() => {
                    if (['Computer Science/IT', 'Engineering (non-CS)', 'Commerce/Business/Finance', 'Arts/Humanities', 'Sciences', 'Design'].includes(answers.fieldOfStudy || '')) {
                      setAnswers({...answers, fieldOfStudy: ''});
                    }
                  }}
                  value={(!['Computer Science/IT', 'Engineering (non-CS)', 'Commerce/Business/Finance', 'Arts/Humanities', 'Sciences', 'Design'].includes(answers.fieldOfStudy || '')) ? answers.fieldOfStudy || '' : ''}
                />
              </div>
            </div>
          </div>
        )}

        {currentStepId === 'lookingFor' && (
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              What are you actually looking for?
            </h1>
            <p className="text-xl text-brand-slate mb-12 text-center">
              Pick all that apply.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {GRAD_LOOKING_FOR.map(item => renderMultiChip(item, (answers.lookingFor || []).includes(item), () => toggleArrayItem('lookingFor', item)))}
            </div>
          </div>
        )}

        {currentStepId === 'readiness' && (
          <div className="animate-fade-in max-w-4xl mx-auto space-y-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-brand-ink mb-6 text-center">Do you have a resume ready?</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {['Ready to go', 'Have one, needs work', "Don't have one yet"].map(status => 
                  renderOptionCard(status, answers.resumeStatus === status, () => setAnswers({...answers, resumeStatus: status}))
                )}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-brand-ink mb-6 text-center">How do you feel about interviews?</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {['Confident', 'Some experience', 'Never really done one'].map(conf => 
                  renderOptionCard(conf, answers.interviewConfidence === conf, () => setAnswers({...answers, interviewConfidence: conf}))
                )}
              </div>
            </div>
          </div>
        )}

        {currentStepId === 'urgency' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
              How soon do you need this to work?
            </h1>
            <div className="grid gap-4 grid-cols-1 mt-12">
              {GRAD_URGENCY.map(urgency => renderOptionCard(urgency, answers.urgency === urgency, () => setAnswers({...answers, urgency})))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-3xl mt-16 flex justify-center">
        <Button 
          size="lg" 
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full md:w-auto min-w-[240px] flex items-center justify-center group"
        >
          {currentStepIndex > 0 && currentStepIndex >= activeSteps.length ? "Complete Setup" : "Continue"}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingFlow;