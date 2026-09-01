import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./components/shared/layout/Header";
import Hero from "./components/shared/landing/Hero";
import UserTypes from "./components/shared/landing/UserTypes";
import HowItWorks from "./components/shared/landing/HowItWorks";
import Features from "./components/shared/landing/Features";
import ProductPreview from "./components/shared/landing/ProductPreview";
import Testimonials from "./components/shared/landing/Testimonials";
import Footer from "./components/shared/layout/Footer";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./components/shared/auth/AuthPage";
import DashboardLayout from "./components/shared/layout/DashboardLayout";
import OnboardingFlow from "./components/shared/onboarding/OnboardingFlow";
import FloatingChatButton from "./components/shared/chat/FloatingChatButton";
import { ToastContainer } from "./components/shared/ui/Toast";
import StudentDashboard from "./components/student/dashboard/StudentDashboard";
import { useToast } from "./hooks/useToast";
import {
  useKeyboardShortcuts,
  commonShortcuts,
} from "./hooks/useKeyboardShortcuts";

// Import Interview Practice Components
import InterviewSetup from "./components/student/prepareforfuture/InterviewSetup";
import AIInterviewSession from "./components/student/prepareforfuture/AIInterviewSession";
import InterviewReport from "./components/student/prepareforfuture/InterviewReport";

// Import MediaStream Context
import { MediaStreamProvider } from "./contexts/MediaStreamContext";

import GraduateDashboard from "./components/graduate/dashboard/GraduateDashboard";

// Landing Page Component
const LandingPage: React.FC = () => {
  return (
    <div className="bg-brand-mist min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <UserTypes />
        <Features />
        <ProductPreview />
        <Testimonials />
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

// Onboarding Page Component
const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { success } = useToast();

  const handleOnboardingComplete = async (data: any) => {
    try {
      console.log("🎉 Onboarding completed with data:", data);

      localStorage.setItem("careerwise_onboarding_completed", "true");
      localStorage.removeItem("careerwise_needs_onboarding");
      localStorage.setItem("careerwise_user_profile", JSON.stringify(data));

      success(
        "Welcome to CareerWise!",
        "Your profile has been set up successfully."
      );
      if (data.persona === 'graduate') {
        navigate("/graduate-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      localStorage.setItem("careerwise_onboarding_completed", "true");
      localStorage.removeItem("careerwise_needs_onboarding");
      success("Welcome to CareerWise!", "Your profile has been set up.");
      if (data?.persona === 'graduate') {
        navigate("/graduate-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    }
  };

  const handleOnboardingSkip = () => {
    console.log("⏭️ Onboarding skipped");
    localStorage.setItem("careerwise_onboarding_completed", "true");
    localStorage.removeItem("careerwise_needs_onboarding");
    navigate("/student-dashboard");
  };

  return (
    <OnboardingFlow
      onComplete={handleOnboardingComplete}
      onSkip={handleOnboardingSkip}
    />
  );
};

function App() {
  const { toasts, removeToast } = useToast();

  // Global keyboard shortcuts
  useKeyboardShortcuts([
    {
      ...commonShortcuts.search,
      callback: () => {
        const event = new CustomEvent("openGlobalSearch");
        window.dispatchEvent(event);
      },
    },
  ]);

  return (
    <Router>
      <MediaStreamProvider>
        <div className="min-h-screen bg-white font-sans">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/student-dashboard/*" element={<StudentDashboard />} />
            <Route path="/graduate-dashboard/*" element={<GraduateDashboard />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            
            {/* Interview Practice Routes */}
            <Route path="/interview-practice/:type/setup" element={<InterviewSetup />} />
            <Route path="/interview-practice/:type/session" element={<AIInterviewSession />} />
            <Route path="/interview-practice/:type/report" element={<InterviewReport />} />
          </Routes>
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
      </MediaStreamProvider>
    </Router>
  );
}

export default App;