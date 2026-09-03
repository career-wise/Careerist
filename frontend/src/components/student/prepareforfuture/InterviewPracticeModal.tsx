import React, { useState } from "react";
import {
  X,
  Video,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/ui/Button";

interface InterviewPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterviewPracticeModal: React.FC<InterviewPracticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedType, setSelectedType] = useState<"college" | "job" | null>(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const interviewTypes = [
    {
      id: "college" as const,
      title: "College Interview",
      description: "Practice for college admissions",
      icon: GraduationCap,
      gradient: "from-[#2B3674] to-[#3EBFB0]",
      bgColor: "bg-brand-mist/50",
      borderColor: "border-[#2B3674]",
      hoverBg: "hover:bg-brand-mist",
      features: [
        "Personal motivation questions",
        "Academic interest discussions",
        "Community involvement",
      ],
    },
    {
      id: "job" as const,
      title: "Job Interview",
      description: "Practice for internships and jobs",
      icon: Briefcase,
      gradient: "from-[#3EBFB0] to-[#C8A860]",
      bgColor: "bg-brand-mist",
      borderColor: "border-[#3EBFB0]",
      hoverBg: "hover:bg-brand-neon/10",
      features: [
        "Behavioral questions",
        "Skills and experience",
        "Career goals discussion",
      ],
    },
  ];

  const handleContinue = () => {
    if (!selectedType) return;
    
    // Navigate to interview setup page
    navigate(`/interview-practice/${selectedType}/setup`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink to-brand-darkgreen opacity-10"></div>
          <div className="relative flex items-center justify-between p-6 border-b border-brand-slate/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-ink to-brand-darkgreen rounded-xl flex items-center justify-center shadow-lg">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-ink to-brand-darkgreen bg-clip-text text-transparent">
                  AI Interview Practice
                </h2>
                <p className="text-sm text-brand-slate">
                  Real-time coaching and feedback
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-brand-slate/10 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-brand-slate" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-brand-ink mb-2">
              Choose Interview Type
            </h3>
            <p className="text-brand-slate">
              Select the type of interview you'd like to practice
            </p>
          </div>

          {/* Interview Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            {interviewTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;

              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`
                    relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300
                    ${
                      isSelected
                        ? `${type.borderColor} ${type.bgColor} shadow-lg scale-105`
                        : `border-brand-slate/10 ${type.hoverBg} hover:shadow-md hover:scale-102`
                    }
                  `}
                >
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div
                        className={`w-6 h-6 bg-gradient-to-br ${type.gradient} rounded-full flex items-center justify-center`}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mb-4 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? `bg-gradient-to-br ${type.gradient}`
                        : type.bgColor
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        isSelected ? "text-white" : "text-brand-ink"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-bold text-brand-ink mb-2">
                    {type.title}
                  </h4>
                  <p className="text-sm text-brand-slate mb-4">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-brand-slate"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected
                              ? "bg-gradient-to-r " + type.gradient
                              : "bg-[#3EBFB0]"
                          }`}
                        ></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="min-w-[120px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedType}
              className={`min-w-[200px] ${
                selectedType
                  ? "bg-gradient-to-r from-brand-ink to-brand-darkgreen"
                  : "bg-brand-slate/20"
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPracticeModal;