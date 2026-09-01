import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Briefcase,
  ArrowLeft,
  AlertCircle,
  Zap,
  Mail,
  Lock,
  User,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { authService } from "../../../lib/auth";
import { useToast } from "../../../hooks/useToast";

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bypassMode, setBypassMode] = useState(false);
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp) {
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Bypass authentication function
  const handleBypassAuth = () => {
    setLoading(true);

    setTimeout(() => {
      const mockUser = {
        id: "demo-user-123",
        email: formData.email || "demo@example.com",
        full_name: formData.fullName || "Demo User",
        created_at: new Date().toISOString(),
        is_demo: true,
        onboarding_completed: false,
      };

      localStorage.setItem("careerwise_token", "demo-token-" + Date.now());
      localStorage.setItem("careerwise_user", JSON.stringify(mockUser));
      localStorage.setItem("careerwise_needs_onboarding", "true");
      localStorage.removeItem("careerwise_onboarding_completed");
      localStorage.removeItem("careerist_onboarding_answers");
      localStorage.removeItem("careerwise_user_profile");

      success("Demo Access Granted!", "You are now signed in with demo mode");
      setLoading(false);
      navigate("/onboarding");
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (isSignUp) {
        const response = await authService.signUp(
          formData.email,
          formData.password,
          formData.fullName
        );
        success("Account created successfully!", "Welcome to CareerWise");

        const needsOnboarding = !response.user.onboarding_completed;

        if (needsOnboarding) {
          localStorage.setItem("careerwise_needs_onboarding", "true");
          navigate("/onboarding");
        } else {
          navigate("/student-dashboard");
        }
      } else {
        const response = await authService.signIn(
          formData.email,
          formData.password
        );
        success("Welcome back!", "You have been signed in successfully");

        const needsOnboarding = !response.user.onboarding_completed;

        if (needsOnboarding) {
          localStorage.setItem("careerwise_needs_onboarding", "true");
          navigate("/onboarding");
        } else {
          navigate("/student-dashboard");
        }
      }
    } catch (err) {
      console.error("❌ Auth error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Authentication failed";
      showError("Authentication Error", errorMessage);
      setBypassMode(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: "",
      password: "",
      fullName: "",
      confirmPassword: "",
    });
    setErrors({});
    setBypassMode(false);
  };

  return (
    <div className="min-h-screen bg-brand-mist flex">
      {/* Left side - Slanted Image Panel (Hidden on mobile) */}
      <div 
        className="hidden lg:block lg:w-1/2 relative bg-gray-900"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
          backgroundImage: 'url("/auth-bg-custom.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-brand-ink/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 to-transparent"></div>
        
        <div className="absolute top-8 left-12 z-10">
          <Link to="/" className="text-3xl font-display font-bold tracking-wide text-brand-mist">
            careerist
          </Link>
        </div>
        
        <div className="absolute bottom-16 left-12 z-10 text-brand-mist max-w-md pr-12">
          <h2 className="text-4xl font-display font-bold mb-4">Your career journey starts here.</h2>
          <p className="text-lg opacity-90">Join thousands of students and professionals who have found their perfect career path using our AI-powered guidance.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center mb-12">
          <Link to="/" className="text-2xl font-display font-bold tracking-wide text-brand-ink">
            careerist
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-display font-bold text-brand-ink mb-3 tracking-tight">
              {isSignUp ? "Join Careerist" : "Welcome back"}
            </h1>
            <p className="text-brand-slate font-medium">
              {isSignUp
                ? "Start your AI-powered career journey today"
                : "Continue your career development journey"}
            </p>
          </div>

          {/* Bypass Mode Alert */}
          {bypassMode && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-orange-800">
                    Demo Mode Available
                  </h3>
                  <p className="mt-1 text-sm text-orange-700">
                    Try Careerist instantly with our demo mode - no registration required.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Full Name"
                error={errors.fullName}
                required
              />
            )}

            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email"
              error={errors.email}
              required
            />

            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Password"
              error={errors.password}
              required
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-brand-ink transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              }
            />

            {isSignUp && (
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm Password"
                error={errors.confirmPassword}
                required
              />
            )}

            {!isSignUp && (
              <div className="flex justify-end pt-1">
                <a
                  href="#"
                  className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  Forgot password ?
                </a>
              </div>
            )}

            <div className="space-y-4 pt-4">
              <Button type="submit" loading={loading} className="w-full" size="lg">
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleBypassAuth} 
                loading={loading} 
                className="w-full"
                size="lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                Try Demo Mode
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-ink/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-brand-mist text-brand-slate font-bold uppercase text-xs tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-brand-ink/10 rounded-full bg-white text-sm font-bold text-brand-ink hover:border-brand-ink transition-colors group"
                onClick={() => showError("Coming Soon", "Google sign-in will be available soon")}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-brand-ink/10 rounded-full bg-white text-sm font-bold text-brand-ink hover:border-brand-ink transition-colors group"
                onClick={() => showError("Coming Soon", "GitHub sign-in will be available soon")}
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-brand-slate">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-bold text-brand-ink hover:text-brand-neon transition-colors ml-1"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs font-medium text-brand-slate">
              By continuing, you agree to our{" "}
              <a href="#" className="font-bold text-brand-ink hover:text-brand-neon transition-colors">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="font-bold text-brand-ink hover:text-brand-neon transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
