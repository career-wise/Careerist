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
      iconColor: "text-[#3EBFB0]",
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
      iconColor: "text-[#C8A860]",
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
      iconColor: "text-[#2B3674]",
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
      iconColor: "text-[#3EBFB0]",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                Interview Preparation
              </h1>
              <p className="text-gray-600">
                Master your interview skills with AI-powered practice
              </p>
            </div>
          </div>
        </div>

        {/* Featured AI Practice Section */}
        <Card className="mb-8 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] border-0 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                  <Video className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    AI Interview Practice
                  </h2>
                  <p className="text-white/90">
                    Real-time coaching with instant feedback
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <Eye className="h-5 w-5 text-white" />
                  <span className="text-sm">Body Language Analysis</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <Volume2 className="h-5 w-5 text-white" />
                  <span className="text-sm">Voice Coaching</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <MessageSquare className="h-5 w-5 text-white" />
                  <span className="text-sm">Content Feedback</span>
                </div>
              </div>
            </div>

            <div className="lg:ml-6">
            </div>
          </div>
        </Card>

        {/* Preparation Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {steps.map((step) => {
            const isExpanded = expandedStep === step.id;
            const progress = getStepProgress(step);
            const isCompleted = isStepCompleted(step);

            return (
              <Card
                key={step.id}
                className={`hover:shadow-lg transition-all duration-300 border-2 ${
                  isCompleted
                    ? "border-green-500 bg-green-50/50"
                    : "border-[#2B3674]/10"
                }`}
              >
                {/* Step Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-[#2B3674]/10"
                    } transition-all`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-8 w-8 text-white" />
                    ) : (
                      <span className={step.iconColor}>{step.icon}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#2B3674]">
                        {step.title}
                      </h3>
                      <button
                        onClick={() => toggleStepExpansion(step.id)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {step.description}
                    </p>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-600 font-medium">
                          Progress
                        </span>
                        <span className="font-bold text-[#2B3674]">
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            progress === 100
                              ? "bg-green-500"
                              : "bg-gradient-to-r from-[#2B3674] to-[#3EBFB0]"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="space-y-6 pt-4 border-t border-gray-200 animate-fade-in">
                    {/* Tasks */}
                    <div>
                      <h4 className="font-semibold text-[#2B3674] mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#3EBFB0]" />
                        Action Items
                      </h4>
                      <div className="space-y-2">
                        {step.tasks.map((taskItem, taskIndex) => (
                          <button
                            key={taskIndex}
                            onClick={() =>
                              toggleTaskCompletion(step.id, taskIndex)
                            }
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                              taskItem.completed
                                ? "bg-green-50 hover:bg-green-100"
                                : "bg-gray-50 hover:bg-gray-100"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                taskItem.completed
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {taskItem.completed && (
                                <CheckCircle className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <span
                              className={`text-sm flex-1 text-left ${
                                taskItem.completed
                                  ? "text-gray-500 line-through"
                                  : "text-gray-700"
                              }`}
                            >
                              {taskItem.task}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="font-semibold text-[#2B3674] mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#C8A860]" />
                        Helpful Resources
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {step.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="flex items-center gap-2 text-sm text-[#3EBFB0] hover:text-[#2B3674] transition-colors p-2 rounded-lg hover:bg-[#3EBFB0]/10"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>{resource}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-4">
                  {step.isInteractive ? (
                    <Button
                      onClick={() => setShowPracticeModal(true)}
                      className="w-full bg-gradient-to-r from-[#2B3674] to-[#3EBFB0]"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Practice Session
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => toggleStepExpansion(step.id)}
                      className="w-full"
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                    </Button>
                  )}
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