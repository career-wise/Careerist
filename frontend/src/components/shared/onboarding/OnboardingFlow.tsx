import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export interface OnboardingAnswers {
  [key: string]: any;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingAnswers) => void;
  onSkip: () => void;
}

type QuestionType = 'single' | 'multi' | 'custom_persona';

interface QuestionNode {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  allowOther?: boolean;
  options?: {
    id: string;
    label: string;
    next?: string | ((answers: Record<string, any>) => string | null);
    image?: string;
    description?: string;
  }[];
}

const QUESTION_GRAPH: Record<string, QuestionNode> = {
  persona: {
    id: 'persona',
    type: 'custom_persona',
    title: 'Where are you right now?',
    subtitle: 'This changes everything you see next — pick what\'s actually true today.',
    options: [
      {
        id: 'high-school',
        label: 'I\'m in 11th or 12th grade',
        description: 'Figuring out what to study and where.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop&q=80',
        next: 'grade'
      },
      {
        id: 'graduate',
        label: 'I\'ve graduated',
        description: 'Looking for a job, internship, or what\'s next.',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&q=80',
        next: 'status'
      }
    ]
  },
  // HIGH SCHOOL TRACK
  grade: {
    id: 'grade',
    type: 'single',
    title: 'Which year are you in?',
    subtitle: '12th graders get more urgent, decision-focused guidance. 11th graders get more room to explore.',
    options: [
      { id: '11', label: '11th Grade', next: 'subjects' },
      { id: '12', label: '12th Grade', next: 'entrance_exams' } // Branch differently based on grade!
    ]
  },
  subjects: {
    id: 'subjects',
    type: 'multi',
    title: 'What do you actually enjoy studying?',
    subtitle: 'Not what you\'re best at on paper. What doesn\'t feel like a chore.',
    options: [
      { id: 'Math', label: 'Math' },
      { id: 'Physics', label: 'Physics' },
      { id: 'Biology', label: 'Biology' },
      { id: 'Chemistry', label: 'Chemistry' },
      { id: 'Computer Science', label: 'Computer Science' },
      { id: 'Economics/Commerce', label: 'Economics/Commerce' },
      { id: 'Languages & Literature', label: 'Languages & Literature' },
      { id: 'History/Social Studies', label: 'History/Social Studies' },
      { id: 'Art & Design', label: 'Art & Design' },
      { id: 'Sports/Physical Ed', label: 'Sports/Physical Ed' }
    ].map(o => ({ ...o, next: 'clarityLevel' }))
  },
  entrance_exams: {
    id: 'entrance_exams',
    type: 'multi',
    title: 'Are you preparing for any entrance exams?',
    subtitle: 'Select all that apply.',
    options: [
      { id: 'JEE', label: 'JEE (Main/Advanced)' },
      { id: 'NEET', label: 'NEET' },
      { id: 'CUET', label: 'CUET' },
      { id: 'CLAT', label: 'CLAT' },
      { id: 'IPMAT', label: 'IPMAT / BBA entrances' },
      { id: 'None', label: 'None / Undecided' }
    ].map(o => ({ ...o, next: 'clarityLevel' }))
  },
  clarityLevel: {
    id: 'clarityLevel',
    type: 'single',
    title: 'How clear is your path right now?',
    subtitle: 'Be honest — this decides how much hand-holding you get.',
    options: [
      { id: 'No idea what I want to do', label: 'No idea what I want to do', next: 'goal' },
      { id: 'I know the general field, not the specifics', label: 'I know the general field, not the specifics', next: 'fieldsOfInterest' },
      { id: 'I know the field, torn on college/major', label: 'I know the field, torn on college/major', next: 'fieldsOfInterest' },
      { id: 'Deciding between 2-3 very different paths', label: 'Deciding between 2-3 very different paths', next: 'fieldsOfInterest' }
    ]
  },
  fieldsOfInterest: {
    id: 'fieldsOfInterest',
    type: 'multi',
    title: 'Which fields are you drawn to?',
    options: [
      { id: 'Engineering & Tech', label: 'Engineering & Tech' },
      { id: 'Medicine & Healthcare', label: 'Medicine & Healthcare' },
      { id: 'Business & Commerce', label: 'Business & Commerce' },
      { id: 'Law', label: 'Law' },
      { id: 'Arts, Design & Media', label: 'Arts, Design & Media' },
      { id: 'Pure Sciences & Research', label: 'Pure Sciences & Research' },
      { id: 'Humanities & Social Sciences', label: 'Humanities & Social Sciences' }
    ].map(o => ({ ...o, next: 'goal' }))
  },
  goal: {
    id: 'goal',
    type: 'single',
    title: 'What would actually help you most right now?',
    options: [
      { id: 'Help me explore options broadly', label: 'Help me explore options broadly' },
      { id: 'Help me choose the right degree/major', label: 'Help me choose the right degree/major' },
      { id: 'Help me shortlist the right colleges', label: 'Help me shortlist the right colleges' },
      { id: 'Help me start building relevant skills early', label: 'Help me start building relevant skills early' }
    ]
  },

  // GRADUATE TRACK
  status: {
    id: 'status',
    type: 'single',
    title: 'What\'s your current situation?',
    subtitle: 'This sets your urgency level — no judgment either way.',
    options: [
      { id: 'Final year — about to graduate', label: 'Final year — about to graduate', next: 'fieldOfStudy' },
      { id: 'Graduated, actively job hunting', label: 'Graduated, actively job hunting', next: 'fieldOfStudy' },
      { id: 'Graduated, employed but looking to switch', label: 'Graduated, employed but looking to switch', next: 'fieldOfStudy' },
      { id: 'Graduated, taking time before deciding next steps', label: 'Graduated, taking time before deciding next steps', next: 'fieldOfStudy' }
    ]
  },
  fieldOfStudy: {
    id: 'fieldOfStudy',
    type: 'single',
    title: 'What did you study?',
    allowOther: true,
    options: [
      { id: 'Computer Science/IT', label: 'Computer Science/IT' },
      { id: 'Engineering (non-CS)', label: 'Engineering (non-CS)' },
      { id: 'Commerce/Business/Finance', label: 'Commerce/Business/Finance' },
      { id: 'Arts/Humanities', label: 'Arts/Humanities' },
      { id: 'Sciences', label: 'Sciences' },
      { id: 'Design', label: 'Design' }
    ].map(o => ({ ...o, next: 'lookingFor' }))
  },
  lookingFor: {
    id: 'lookingFor',
    type: 'multi',
    title: 'What are you actually looking for?',
    subtitle: 'Pick all that apply.',
    options: [
      { id: 'First full-time job', label: 'First full-time job' },
      { id: 'Internship', label: 'Internship' },
      { id: 'Switching fields entirely', label: 'Switching fields entirely' },
      { id: 'Freelance/contract work', label: 'Freelance/contract work' },
      { id: 'Still deciding', label: 'Still deciding' }
    ].map(o => ({ ...o, next: 'resumeStatus' }))
  },
  resumeStatus: {
    id: 'resumeStatus',
    type: 'single',
    title: 'Do you have a resume ready?',
    options: [
      { id: 'Ready to go', label: 'Ready to go', next: 'interviewConfidence' },
      { id: 'Have one, needs work', label: 'Have one, needs work', next: 'interviewConfidence' },
      { id: 'Don\'t have one yet', label: 'Don\'t have one yet', next: 'interviewConfidence' }
    ]
  },
  interviewConfidence: {
    id: 'interviewConfidence',
    type: 'single',
    title: 'How do you feel about interviews?',
    options: [
      { id: 'Confident', label: 'Confident', next: 'urgency' },
      { id: 'Some experience', label: 'Some experience', next: 'urgency' },
      { id: 'Never really done one', label: 'Never really done one', next: 'urgency' }
    ]
  },
  urgency: {
    id: 'urgency',
    type: 'single',
    title: 'How soon do you need this to work?',
    options: [
      { id: 'ASAP — actively applying now', label: 'ASAP — actively applying now' },
      { id: 'Within the next 1-3 months', label: 'Within the next 1-3 months' },
      { id: 'No fixed timeline, just preparing', label: 'No fixed timeline, just preparing' }
    ]
  }
};

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onSkip }) => {
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [history, setHistory] = useState<string[]>(['persona']);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentStepId = history[history.length - 1];
  const currentNode = QUESTION_GRAPH[currentStepId];

  const handleSkip = () => {
    // defaults to high-school if completely skipped
    if (!answers.persona) {
      onComplete({ ...answers, persona: 'high-school' });
    } else {
      onComplete(answers);
    }
  };

  const resolveNextStep = (nodeId: string, currentAnswers: OnboardingAnswers): string | null => {
    const node = QUESTION_GRAPH[nodeId];
    if (!node || !node.options) return null;
    
    // For single choice, we use the selected option's 'next' field
    if (node.type === 'single' || node.type === 'custom_persona') {
      const selectedId = currentAnswers[nodeId];
      const opt = node.options.find(o => o.id === selectedId);
      if (opt && typeof opt.next === 'string') return opt.next;
      if (opt && typeof opt.next === 'function') return opt.next(currentAnswers);
      // Fallback for custom text inputs ('allowOther')
      if (node.allowOther && selectedId && !opt) {
          // just grab the first option's next as fallback
          const fallbackOpt = node.options[0];
          if (typeof fallbackOpt.next === 'string') return fallbackOpt.next;
      }
    }
    
    // For multi choice, we just look at the first option's next field
    // (Assuming all options in a multi-choice lead to the same next step)
    if (node.type === 'multi') {
        const fallbackOpt = node.options[0];
        if (typeof fallbackOpt.next === 'string') return fallbackOpt.next;
    }
    
    return null;
  };

  const handleNext = () => {
    const nextStep = resolveNextStep(currentStepId, answers);
    if (nextStep && QUESTION_GRAPH[nextStep]) {
      setHistory(prev => [...prev, nextStep]);
    } else {
      setIsGenerating(true);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
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
    const val = answers[currentStepId];
    if (currentNode.type === 'multi') {
      return Array.isArray(val) && val.length > 0;
    }
    return !!val; // works for single strings, numbers, etc.
  };

  const setAnswer = (val: any) => {
    setAnswers(prev => ({ ...prev, [currentStepId]: val }));
  };

  const toggleMultiAnswer = (val: string) => {
    setAnswers(prev => {
      const current = Array.isArray(prev[currentStepId]) ? prev[currentStepId] : [];
      return {
        ...prev,
        [currentStepId]: current.includes(val) ? current.filter((i: string) => i !== val) : [...current, val]
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

  return (
    <div className="min-h-screen bg-brand-mist flex flex-col items-center pt-10 pb-20 px-6">
      {/* Floating Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-16">
        <div className="bg-brand-ink text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-xl">
          {history.length > 1 ? (
            <button onClick={handleBack} className="p-1 hover:bg-white/10 rounded-full transition-colors group">
              <ArrowLeft className="h-5 w-5 text-brand-neon group-hover:text-white transition-colors" />
            </button>
          ) : (
            <div className="w-7"></div>
          )}
          <span className="font-bold tracking-wide">STEP {history.length}</span>
          <div className="w-7"></div>
        </div>
        <button onClick={handleSkip} className="text-brand-slate font-semibold hover:text-brand-ink transition-colors px-4 py-2">
          Skip for now
        </button>
      </div>

      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center animate-fade-in">
        
        <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-4 leading-tight tracking-tight text-center">
          {currentNode.title}
        </h1>
        {currentNode.subtitle && (
          <p className="text-xl text-brand-slate mb-12 text-center">
            {currentNode.subtitle}
          </p>
        )}

        {currentNode.type === 'custom_persona' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8">
            {currentNode.options?.map(opt => (
              <div 
                key={opt.id}
                className={`group relative rounded-2xl overflow-hidden bg-white border-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${answers[currentStepId] === opt.id ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setAnswer(opt.id)}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={opt.image} 
                    alt={opt.label} 
                    className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                  />
                </div>
                <div className="p-8 lg:p-10 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent pt-32">
                  <h3 className="text-3xl font-display font-bold text-white mb-3">
                    {opt.label}
                  </h3>
                  <p className="text-gray-200 text-lg">
                    {opt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentNode.type === 'single' && (
          <div className={`mt-8 ${currentNode.options?.length && currentNode.options.length > 4 ? 'grid gap-4 md:grid-cols-2' : 'grid gap-4 md:grid-cols-2 max-w-3xl mx-auto w-full'}`}>
            {currentNode.options?.map(opt => (
              <React.Fragment key={opt.id}>
                {renderOptionCard(opt.label, answers[currentStepId] === opt.id, () => setAnswer(opt.id))}
              </React.Fragment>
            ))}
            
            {currentNode.allowOther && (
              <div className={`p-6 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${answers[currentStepId] && !currentNode.options?.map(o => o.id).includes(answers[currentStepId]) ? 'bg-blue-50 border-blue-500 text-blue-900' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <div className={`w-4 h-4 rounded-full border-2 mb-4 transition-colors inline-block mr-3 align-middle ${answers[currentStepId] && !currentNode.options?.map(o => o.id).includes(answers[currentStepId]) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}></div>
                <input 
                  type="text" 
                  placeholder="Other (please specify)" 
                  className={`w-[80%] bg-transparent outline-none text-xl font-bold align-middle ${answers[currentStepId] && !currentNode.options?.map(o => o.id).includes(answers[currentStepId]) ? 'text-blue-900 placeholder-blue-300' : 'text-gray-800 placeholder-gray-400'}`}
                  onChange={(e) => setAnswer(e.target.value)}
                  onClick={() => {
                    if (currentNode.options?.map(o => o.id).includes(answers[currentStepId] || '')) {
                      setAnswer('');
                    }
                  }}
                  value={(!currentNode.options?.map(o => o.id).includes(answers[currentStepId] || '')) ? answers[currentStepId] || '' : ''}
                />
              </div>
            )}
          </div>
        )}

        {currentNode.type === 'multi' && (
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            {currentNode.options?.map(opt => (
              <React.Fragment key={opt.id}>
                {renderMultiChip(opt.label, (answers[currentStepId] || []).includes(opt.id), () => toggleMultiAnswer(opt.id))}
              </React.Fragment>
            ))}
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
          {!resolveNextStep(currentStepId, answers) ? "Complete Setup" : "Continue"}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingFlow;