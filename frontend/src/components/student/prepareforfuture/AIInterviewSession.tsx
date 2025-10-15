import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Eye,
  Volume2,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Camera,
  Mic,
  X,
  Sparkles,
} from "lucide-react";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import { useMediaStream } from "../../../contexts/MediaStreamContext";

const AIInterviewSession: React.FC = () => {
  const { type } = useParams<{ type: "college" | "job" }>();
  const navigate = useNavigate();
  const { stream, stopStream } = useMediaStream();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  // Real-time metrics (simulated)
  const [metrics, setMetrics] = useState({
    eyeContact: 75,
    voiceClarity: 82,
    pace: 70,
    confidence: 78,
    fillerWords: 5,
  });

  const questions = type === "college"
    ? [
        "Tell me about yourself and why you're interested in our college.",
        "What are your academic interests and how do you plan to pursue them here?",
        "Describe a challenge you've overcome and what you learned from it.",
        "How have you contributed to your community?",
        "What questions do you have for us about our college?",
      ]
    : [
        "Tell me about yourself and your background.",
        "Why are you interested in this position?",
        "Describe a time when you faced a challenge at work or school. How did you handle it?",
        "What are your greatest strengths and how would they benefit our team?",
        "Where do you see yourself in 5 years?",
      ];

  // Set video source from context
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Simulate real-time metric updates
  useEffect(() => {
    if (isAnswering) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          eyeContact: Math.min(95, prev.eyeContact + Math.random() * 5 - 1),
          voiceClarity: Math.min(95, prev.voiceClarity + Math.random() * 3 - 1),
          pace: Math.min(90, prev.pace + Math.random() * 4 - 1),
          confidence: Math.min(92, prev.confidence + Math.random() * 3 - 1),
          fillerWords: Math.max(0, prev.fillerWords + (Math.random() > 0.7 ? 1 : 0)),
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAnswering]);

  // Timer
  useEffect(() => {
    if (isAnswering) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAnswering]);

  const handleStartAnswer = () => {
    setIsAnswering(true);
    setTimer(0);
  };

  const handleStopAnswer = () => {
    setIsAnswering(false);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Interview complete, go to report
        navigate(`/interview-practice/${type}/report`, {
          state: { finalMetrics: metrics, totalTime: timer },
        });
        stopStream(); // Stop the stream when interview is complete
      }
    }, 1000);
  };

  const handleExit = () => {
    stopStream();
    navigate("/student-dashboard");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMetricBg = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2B3674]">
                AI Interview in Progress
              </h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowExitModal(true)}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-2" />
            Exit Interview
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Interview Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Feed */}
            <Card className="border-2 border-[#2B3674]/10">
              <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
                {/* Real video feed */}
                {stream ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-full animate-pulse"></div>
                  </div>
                )}
                
                {/* Recording indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Recording
                </div>

                {/* Timer */}
                {isAnswering && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg font-mono text-lg">
                    {formatTime(timer)}
                  </div>
                )}

                {/* Live metrics overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <div className="flex-1 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2 text-white text-xs">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">Eye Contact</span>
                      <span className={`ml-auto ${getMetricColor(metrics.eyeContact)}`}>
                        {Math.round(metrics.eyeContact)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2 text-white text-xs">
                      <Volume2 className="w-4 h-4" />
                      <span className="font-medium">Voice</span>
                      <span className={`ml-auto ${getMetricColor(metrics.voiceClarity)}`}>
                        {Math.round(metrics.voiceClarity)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Question Card */}
            <Card className="border-2 border-[#3EBFB0]/20 bg-[#3EBFB0]/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#2B3674] mb-3">
                    Question {currentQuestion + 1}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {questions[currentQuestion]}
                  </p>
                  
                  {!isAnswering ? (
                    <Button
                      onClick={handleStartAnswer}
                      className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0]"
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      Start Answering
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStopAnswer}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Stop & Next Question
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Real-time Tips */}
            {isAnswering && (
              <Card className="border-2 border-[#C8A860]/20 bg-[#C8A860]/5 animate-fade-in">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#C8A860] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#2B3674] mb-2">
                      Real-time Tip
                    </h4>
                    <p className="text-sm text-gray-700">
                      {metrics.eyeContact < 70 && "Try to maintain more eye contact with the camera."}
                      {metrics.eyeContact >= 70 && metrics.pace < 75 && "Great eye contact! Try to speak at a steady pace."}
                      {metrics.eyeContact >= 70 && metrics.pace >= 75 && "Excellent! Keep up the confident delivery."}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Metrics Sidebar */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <Card className="border-2 border-[#2B3674]/10">
              <h3 className="text-lg font-bold text-[#2B3674] mb-4">
                Live Performance Metrics
              </h3>
              <div className="space-y-4">
                {/* Eye Contact */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#3EBFB0]" />
                      <span className="text-sm font-medium">Eye Contact</span>
                    </div>
                    <span className={`text-sm font-bold ${getMetricColor(metrics.eyeContact)}`}>
                      {Math.round(metrics.eyeContact)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getMetricBg(metrics.eyeContact)}`}
                      style={{ width: `${metrics.eyeContact}%` }}
                    ></div>
                  </div>
                </div>

                {/* Voice Clarity */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-[#3EBFB0]" />
                      <span className="text-sm font-medium">Voice Clarity</span>
                    </div>
                    <span className={`text-sm font-bold ${getMetricColor(metrics.voiceClarity)}`}>
                      {Math.round(metrics.voiceClarity)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getMetricBg(metrics.voiceClarity)}`}
                      style={{ width: `${metrics.voiceClarity}%` }}
                    ></div>
                  </div>
                </div>

                {/* Pace */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#3EBFB0]" />
                      <span className="text-sm font-medium">Speaking Pace</span>
                    </div>
                    <span className={`text-sm font-bold ${getMetricColor(metrics.pace)}`}>
                      {Math.round(metrics.pace)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getMetricBg(metrics.pace)}`}
                      style={{ width: `${metrics.pace}%` }}
                    ></div>
                  </div>
                </div>

                {/* Confidence */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#3EBFB0]" />
                      <span className="text-sm font-medium">Confidence</span>
                    </div>
                    <span className={`text-sm font-bold ${getMetricColor(metrics.confidence)}`}>
                      {Math.round(metrics.confidence)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getMetricBg(metrics.confidence)}`}
                      style={{ width: `${metrics.confidence}%` }}
                    ></div>
                  </div>
                </div>

                {/* Filler Words */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium">Filler Words</span>
                    </div>
                    <span className="text-sm font-bold text-yellow-600">
                      {metrics.fillerWords}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    "um", "uh", "like", "you know"
                  </p>
                </div>
              </div>
            </Card>

            {/* Progress */}
            <Card className="border-2 border-[#C8A860]/20 bg-[#C8A860]/5">
              <h3 className="text-lg font-bold text-[#2B3674] mb-4">
                Interview Progress
              </h3>
              <div className="space-y-2">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      idx < currentQuestion
                        ? "bg-green-100 border border-green-300"
                        : idx === currentQuestion
                        ? "bg-[#3EBFB0]/20 border-2 border-[#3EBFB0]"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {idx < currentQuestion ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        idx === currentQuestion ? "border-[#3EBFB0]" : "border-gray-300"
                      }`}></div>
                    )}
                    <span className={`text-sm font-medium ${
                      idx === currentQuestion ? "text-[#2B3674]" : "text-gray-600"
                    }`}>
                      Question {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Exit Confirmation Modal */}
        {showExitModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <h3 className="text-xl font-bold text-[#2B3674] mb-3">
                Exit Interview?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to exit? Your progress will not be saved.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowExitModal(false)}
                  className="flex-1"
                >
                  Continue Interview
                </Button>
                <Button
                  onClick={handleExit}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  Exit
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInterviewSession;