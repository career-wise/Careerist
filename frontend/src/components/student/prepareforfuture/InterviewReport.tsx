import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { authService } from "../../../lib/auth";
import { profileService } from "../../../services/profileService";
import {
  Trophy,
  TrendingUp,
  Eye,
  Volume2,
  MessageSquare,
  Sparkles,
  Download,
  Home,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Target,
  Award,
  Clock,
  Star,
} from "lucide-react";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";

const InterviewReport: React.FC = () => {
  const { type } = useParams<{ type: "college" | "job" }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [returnPath, setReturnPath] = React.useState("/student-dashboard");

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          const profile = await profileService.getProfile(session.user.id);
          if (profile?.onboarding_answers?.persona === 'graduate') {
            setReturnPath("/graduate-dashboard");
          }
        }
      } catch (err) {
        console.error("Failed to load profile for navigation", err);
      }
    };
    fetchProfile();
  }, []);
  
  // Get metrics from session or use defaults
  const finalMetrics = location.state?.finalMetrics || {
    eyeContact: 82,
    voiceClarity: 88,
    pace: 75,
    confidence: 85,
    fillerWords: 7,
  };

  const totalTime = location.state?.totalTime || 847; // seconds

  // Calculate overall score
  const overallScore = Math.round(
    (finalMetrics.eyeContact + finalMetrics.voiceClarity + finalMetrics.pace + finalMetrics.confidence) / 4
  );

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "text-green-600", bg: "bg-green-100" };
    if (score >= 85) return { grade: "A", color: "text-green-600", bg: "bg-green-100" };
    if (score >= 80) return { grade: "B+", color: "text-blue-600", bg: "bg-blue-100" };
    if (score >= 75) return { grade: "B", color: "text-blue-600", bg: "bg-blue-100" };
    if (score >= 70) return { grade: "C+", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-100" };
  };

  const scoreGrade = getScoreGrade(overallScore);

  const strengths = [
    {
      title: "Voice Clarity",
      score: finalMetrics.voiceClarity,
      description: "Your voice was clear and easy to understand throughout the interview.",
    },
    {
      title: "Confidence",
      score: finalMetrics.confidence,
      description: "You demonstrated strong confidence in your responses.",
    },
    {
      title: "Eye Contact",
      score: finalMetrics.eyeContact,
      description: "Good eye contact maintained with the interviewer.",
    },
  ].sort((a, b) => b.score - a.score).slice(0, 2);

  const improvements = [
    {
      title: "Speaking Pace",
      current: finalMetrics.pace,
      target: 85,
      tip: "Try to maintain a more consistent speaking pace. Practice with a metronome or recording yourself.",
    },
    {
      title: "Filler Words",
      current: 100 - (finalMetrics.fillerWords * 5),
      target: 95,
      tip: "Reduce usage of filler words like 'um' and 'like'. Pause instead of using fillers.",
    },
  ];

  const aiFeedback = finalMetrics.feedback || "Great job completing the interview! Keep practicing to improve your pacing and eye contact.";

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-mist/30 via-white to-brand-mist/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-ink to-brand-darkgreen rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-ink to-brand-darkgreen bg-clip-text text-transparent mb-2">
            Interview Complete!
          </h1>
          <p className="text-brand-slate text-lg">
            Here's your detailed performance analysis
          </p>
        </div>

        {/* Overall Score */}
        <Card className="mb-8 border-2 border-brand-slate/10 text-center">
          <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-6">
            <div>
              <p className="text-brand-slate mb-2">Overall Score</p>
              <div className={`text-7xl font-bold ${scoreGrade.color} mb-2`}>
                {overallScore}
              </div>
              <div className={`inline-block px-4 py-2 rounded-full ${scoreGrade.bg} ${scoreGrade.color} font-bold text-lg`}>
                Grade: {scoreGrade.grade}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-neon/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-8 h-8 text-brand-darkgreen" />
                </div>
                <p className="text-2xl font-bold text-brand-ink">{formatTime(totalTime)}</p>
                <p className="text-sm text-brand-slate">Duration</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-mist rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Star className="w-8 h-8 text-[#C8A860]" />
                </div>
                <p className="text-2xl font-bold text-brand-ink">5/5</p>
                <p className="text-sm text-brand-slate">Questions</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-6 mb-8">
          {/* Strengths */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-brand-ink">Key Strengths</h2>
            </div>
            <div className="space-y-4">
              {strengths.map((strength, idx) => (
                <div key={idx} className="p-4 bg-white rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-brand-ink">{strength.title}</h3>
                    <span className="text-green-600 font-bold">{Math.round(strength.score)}%</span>
                  </div>
                  <p className="text-sm text-brand-slate">{strength.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Areas for Improvement */}
          <Card className="border-2 border-yellow-200 bg-yellow-50/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-brand-ink">Areas to Improve</h2>
            </div>
            <div className="space-y-4">
              {improvements.map((improvement, idx) => (
                <div key={idx} className="p-4 bg-white rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-brand-ink">{improvement.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-brand-slate">{Math.round(improvement.current)}%</span>
                      <TrendingUp className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-bold text-yellow-600">{improvement.target}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-brand-slate">{improvement.tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Card className="mb-8 border-2 border-brand-slate/10">
          <h2 className="text-xl font-bold text-brand-ink mb-6">Performance Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-6">
            {/* Eye Contact */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-brand-darkgreen" />
                  <span className="font-medium text-brand-ink">Eye Contact</span>
                </div>
                <span className="text-xl font-bold text-brand-ink">
                  {Math.round(finalMetrics.eyeContact)}%
                </span>
              </div>
              <div className="w-full rounded-full h-3 mb-2 bg-brand-slate/10">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-brand-ink to-brand-darkgreen"
                  style={{ width: `${finalMetrics.eyeContact}%` }}
                ></div>
              </div>
              <p className="text-sm text-brand-slate">
                {finalMetrics.eyeContact >= 80 ? "Excellent" : "Good"} eye contact maintained throughout.
              </p>
            </div>

            {/* Voice Clarity */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-brand-darkgreen" />
                  <span className="font-medium text-brand-ink">Voice Clarity</span>
                </div>
                <span className="text-xl font-bold text-brand-ink">
                  {Math.round(finalMetrics.voiceClarity)}%
                </span>
              </div>
              <div className="w-full rounded-full h-3 mb-2 bg-brand-slate/10">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-brand-ink to-brand-darkgreen"
                  style={{ width: `${finalMetrics.voiceClarity}%` }}
                ></div>
              </div>
              <p className="text-sm text-brand-slate">
                Clear and articulate speech patterns.
              </p>
            </div>

            {/* Speaking Pace */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-darkgreen" />
                  <span className="font-medium text-brand-ink">Speaking Pace</span>
                </div>
                <span className="text-xl font-bold text-brand-ink">
                  {Math.round(finalMetrics.pace)}%
                </span>
              </div>
              <div className="w-full rounded-full h-3 mb-2 bg-brand-slate/10">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-brand-ink to-brand-darkgreen"
                  style={{ width: `${finalMetrics.pace}%` }}
                ></div>
              </div>
              <p className="text-sm text-brand-slate">
                {finalMetrics.pace >= 80 ? "Well-paced delivery" : "Consider practicing pace control"}.
              </p>
            </div>

            {/* Confidence */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-darkgreen" />
                  <span className="font-medium text-brand-ink">Confidence</span>
                </div>
                <span className="text-xl font-bold text-brand-ink">
                  {Math.round(finalMetrics.confidence)}%
                </span>
              </div>
              <div className="w-full rounded-full h-3 mb-2 bg-brand-slate/10">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-brand-ink to-brand-darkgreen"
                  style={{ width: `${finalMetrics.confidence}%` }}
                ></div>
              </div>
              <p className="text-sm text-brand-slate">
                Strong confident presence demonstrated.
              </p>
            </div>
          </div>
        </Card>

        {/* Detailed Feedback */}
        <Card className="mb-8 border-2 border-brand-neon/20">
          <h2 className="text-xl font-bold text-brand-ink mb-6">AI Feedback</h2>
          <div className="p-6 bg-brand-mist rounded-lg border border-brand-neon/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3EBFB0] to-[#2A8278] rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-brand-ink text-lg">Interview Coach Notes</h3>
            </div>
            <p className="text-brand-slate text-lg leading-relaxed">{aiFeedback}</p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(returnPath)}
            className="min-w-[180px]"
            >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
            </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="min-w-[180px]"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button
            onClick={() => navigate(`/interview-practice/${type}/setup`)}
            className="min-w-[180px] bg-gradient-to-r from-brand-ink to-brand-darkgreen"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Practice Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewReport;