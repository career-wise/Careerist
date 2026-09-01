import React, { useState } from "react";
import {
  Briefcase,
  FileText,
  Users,
  Target,
  Play,
  Video,
  Eye,
  Volume2,
  MessageSquare,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import InterviewPracticeModal from "./InterviewPracticeModal";

interface Task {
  task: string;
  completed: boolean;
}

interface PrepStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  tasks: Task[];
  resources: string[];
  isInteractive?: boolean;
}

const InterviewPreparation: React.FC = () => {
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const initialSteps: PrepStep[] = [
    {
      id: "research",
      title: "Research Opportunities",
      description: "Find internships and jobs that align with your goals",
      icon: <Target className="h-8 w-8" />,
      iconColor: "text-brand-neon",
      tasks: [
        { task: "Identify target companies", completed: false },
        { task: "Research application requirements", completed: false },
        { task: "Network with professionals", completed: false },
      ],
      resources: [
        "LinkedIn Job Search",
        "Company Career Pages",
        "Industry Reports",
        "Professional Networking Events",
      ],
    },
    {
      id: "materials",
      title: "Prepare Application Materials",
      description: "Create compelling resumes and cover letters",
      icon: <FileText className="h-8 w-8" />,
      iconColor: "text-brand-darkgreen",
      tasks: [
        { task: "Update your resume", completed: false },
        { task: "Write tailored cover letters", completed: false },
        { task: "Gather references", completed: false },
      ],
      resources: [
        "Resume Templates",
        "Cover Letter Examples",
        "Reference Request Templates",
        "ATS Optimization Guide",
      ],
    },
    {
      id: "interview-skills",
      title: "Practice Interview Skills",
      description: "Get ready with AI-powered practice sessions",
      icon: <Users className="h-8 w-8" />,
      iconColor: "text-brand-ink",
      tasks: [
        { task: "Practice common questions", completed: false },
        { task: "Improve body language", completed: false },
        { task: "Work on presentation skills", completed: false },
      ],
      resources: [
        "Common Interview Questions",
        "STAR Method Guide",
        "Body Language Tips",
        "Presentation Skills Training",
      ],
      isInteractive: true,
    },
    {
      id: "professional-dev",
      title: "Professional Development",
      description: "Build skills that employers value",
      icon: <Briefcase className="h-8 w-8" />,
      iconColor: "text-brand-neon",
      tasks: [
        { task: "Develop technical skills", completed: false },
        { task: "Improve communication", completed: false },
        { task: "Learn workplace etiquette", completed: false },
      ],
      resources: [
        "Online Skill Courses",
        "Communication Workshops",
        "Professional Etiquette Guide",
        "Industry Certifications",
      ],
    },
  ];

  const [steps, setSteps] = useState(initialSteps);

  const toggleStepExpansion = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const toggleTaskCompletion = (stepId: string, taskIndex: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              tasks: step.tasks.map((task, index) =>
                index === taskIndex
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : step
      )
    );
  };

  const getStepProgress = (step: PrepStep) => {
    const completedTasks = step.tasks.filter((task) => task.completed).length;
    return Math.round((completedTasks / step.tasks.length) * 100);
  };

  const isStepCompleted = (step: PrepStep) => {
    return step.tasks.every((task) => task.completed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-mist via-white to-brand-mist/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-ink to-brand-darkgreen rounded-2xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-ink to-brand-darkgreen bg-clip-text text-transparent mb-2">
                Interview Preparation
              </h1>
              <p className="text-brand-slate text-lg">
                Master your interview skills with structured planning and AI-powered practice.
              </p>
            </div>
          </div>
        </div>

        {/* Featured AI Practice Section */}
        <div className="bg-gradient-to-r from-brand-ink via-brand-darkgreen to-brand-ink rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-neon opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mr-5 border border-white/20">
                  <Video className="h-7 w-7 text-brand-neon" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1 flex items-center">
                    AI Interview Practice
                    <span className="ml-3 bg-brand-neon text-brand-ink text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide shadow-sm">Featured</span>
                  </h2>
                  <p className="text-brand-mist/90 text-lg">
                    Simulate real interviews and receive instant, personalized feedback.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-4">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <Eye className="h-5 w-5 text-brand-neon" />
                  <span className="text-sm font-medium text-brand-mist">Body Language</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <Volume2 className="h-5 w-5 text-brand-neon" />
                  <span className="text-sm font-medium text-brand-mist">Voice Coaching</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <MessageSquare className="h-5 w-5 text-brand-neon" />
                  <span className="text-sm font-medium text-brand-mist">Content Feedback</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto">
               <Button 
                onClick={() => setShowPracticeModal(true)}
                className="w-full lg:w-auto bg-brand-neon text-brand-ink hover:bg-white hover:text-brand-ink transition-all font-bold text-lg px-8 py-4 border-none shadow-xl flex items-center justify-center group"
              >
                <Play className="h-5 w-5 mr-3 fill-current" />
                Start AI Session
              </Button>
            </div>
          </div>
        </div>

        {/* Preparation Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-8">
          {steps.map((step) => {
            const isExpanded = expandedStep === step.id;
            const progress = getStepProgress(step);
            const isCompleted = isStepCompleted(step);

            return (
              <Card
                key={step.id}
                className={`overflow-hidden border-2 hover:shadow-xl transition-all duration-300 bg-white ${
                  isCompleted
                    ? "border-brand-neon/50 bg-gradient-to-br from-white to-brand-neon/5"
                    : "border-brand-slate/10"
                }`}
              >
                <div className="p-6">
                  {/* Step Header */}
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                        isCompleted
                          ? "bg-brand-neon text-brand-ink shadow-md"
                          : "bg-brand-mist text-brand-ink border border-brand-slate/10"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-7 w-7" />
                      ) : (
                        <span className={step.iconColor}>{step.icon}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-brand-ink">
                          {step.title}
                        </h3>
                        <button
                          onClick={() => toggleStepExpansion(step.id)}
                          className="p-2 hover:bg-brand-mist rounded-xl transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-brand-slate" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-brand-slate" />
                          )}
                        </button>
                      </div>
                      <p className="text-brand-slate mb-5">
                        {step.description}
                      </p>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-brand-slate font-medium">
                            Progress
                          </span>
                          <span className="font-bold text-brand-ink">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full rounded-full h-2 overflow-hidden bg-brand-slate/10">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              progress === 100
                                ? "bg-brand-neon"
                                : "bg-gradient-to-r from-brand-ink to-brand-darkgreen"
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="space-y-6 pt-6 border-t border-brand-slate/10 animate-in fade-in slide-in-from-top-4 duration-300">
                      {/* Tasks */}
                      <div>
                        <h4 className="font-semibold text-brand-ink mb-4 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-brand-neon" />
                          Action Items
                        </h4>
                        <div className="space-y-3">
                          {step.tasks.map((taskItem, taskIndex) => (
                            <button
                              key={taskIndex}
                              onClick={() =>
                                toggleTaskCompletion(step.id, taskIndex)
                              }
                              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all border ${
                                taskItem.completed
                                  ? "bg-brand-neon/5 border-brand-neon/20"
                                  : "bg-white border-brand-slate/10 hover:border-brand-slate/30 hover:bg-brand-mist/50"
                              }`}
                            >
                              <div
                                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                                  taskItem.completed
                                    ? "bg-brand-neon border-brand-neon"
                                    : "border-brand-slate/30"
                                }`}
                              >
                                {taskItem.completed && (
                                  <CheckCircle className="h-4 w-4 text-white" />
                                )}
                              </div>
                              <span
                                className={`text-base flex-1 text-left ${
                                  taskItem.completed
                                    ? "text-brand-slate line-through"
                                    : "text-brand-ink font-medium"
                                }`}
                              >
                                {taskItem.task}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Resources */}
                      <div className="bg-brand-mist/50 rounded-xl p-5 border border-brand-slate/5">
                        <h4 className="font-semibold text-brand-ink mb-3 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-brand-darkgreen" />
                          Helpful Resources
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {step.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href="#"
                              className="flex items-center gap-3 text-sm font-medium text-brand-ink hover:text-brand-neon transition-colors p-3 rounded-lg hover:bg-white border border-transparent hover:border-brand-slate/10"
                            >
                              <ExternalLink className="h-4 w-4 text-brand-slate" />
                              <span>{resource}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-6">
                    {step.isInteractive ? (
                      <Button
                        onClick={() => setShowPracticeModal(true)}
                        className="w-full bg-gradient-to-r from-brand-ink to-brand-darkgreen hover:from-brand-darkgreen hover:to-brand-ink text-white font-medium py-3"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        Start Practice Session
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => toggleStepExpansion(step.id)}
                        className="w-full border-brand-slate/20 text-brand-ink hover:bg-brand-mist py-3"
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Practice Modal */}
      <InterviewPracticeModal
        isOpen={showPracticeModal}
        onClose={() => setShowPracticeModal(false)}
      />
    </div>
  );
};

export default InterviewPreparation;