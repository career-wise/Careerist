import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Play, Star, Users, TrendingUp, CheckCircle } from "lucide-react";
import Button from "../ui/Button";

const Hero: React.FC = () => {
  const features = [
    {
      icon: "🎯",
      label: "AI Career Matching",
      bgColor: "bg-gradient-to-br from-[#2B3674]/10 to-[#3EBFB0]/10",
      iconColor: "text-[#2B3674]",
      description: "Smart recommendations"
    },
    {
      icon: "📊",
      label: "Skills Assessment",
      bgColor: "bg-gradient-to-br from-[#3EBFB0]/10 to-[#C8A860]/10",
      iconColor: "text-[#3EBFB0]",
      description: "Identify strengths"
    },
    {
      icon: "🎤",
      label: "Interview Prep",
      bgColor: "bg-gradient-to-br from-[#C8A860]/10 to-[#2B3674]/10",
      iconColor: "text-[#C8A860]",
      description: "Practice & improve"
    },
    {
      icon: "📚",
      label: "Learning Paths",
      bgColor: "bg-gradient-to-br from-[#3EBFB0]/10 to-[#2B3674]/10",
      iconColor: "text-[#3EBFB0]",
      description: "Skill development"
    },
  ];

  const stats = [
    { number: "50K+", label: "Students Guided", icon: Users },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "4.9/5", label: "User Rating", icon: Star },
  ];

  const trustedCompanies = [
    { name: "Google", logo: "https://img.icons8.com/color/48/google-logo.png" },
    { name: "Microsoft", logo: "https://img.icons8.com/color/48/microsoft.png" },
    { name: "Amazon", logo: "https://img.icons8.com/color/48/amazon.png" },
    { name: "Meta", logo: "https://img.icons8.com/color/48/meta.png" },
    { name: "Apple", logo: "https://img.icons8.com/color/48/apple-logo.png" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#2B3674]/10 to-[#3EBFB0]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-[#3EBFB0]/10 to-[#C8A860]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
          
          {/* Main Hero Content - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            
            {/* Left Side - Content */}
            <div className="text-left space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#3EBFB0]/10 to-[#3EBFB0]/20 border border-[#3EBFB0]/30 rounded-full text-sm font-medium text-[#2B3674]">
                <div className="w-2 h-2 bg-[#3EBFB0] rounded-full mr-2 animate-pulse"></div>
                Trusted by 50,000+ students worldwide
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                  Your AI-Powered
                  <br />
                  <span className="bg-gradient-to-r from-[#2B3674] via-[#3EBFB0] to-[#C8A860] bg-clip-text text-transparent">
                    Career Navigator
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed mb-4">
                  Transform uncertainty into clarity with personalized AI guidance.
                </p>
                <p className="text-lg text-gray-500">
                  From high school to executive level - we've got your career journey covered.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-left">
                    <div className="flex items-center mb-1">
                      <stat.icon className="h-5 w-5 text-[#3EBFB0] mr-2" />
                      <span className="text-2xl font-bold text-[#2B3674]">{stat.number}</span>
                    </div>
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link to="/auth">
                  <Button size="lg" className="w-full sm:w-auto min-w-[220px] h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-[#2B3674] to-[#3EBFB0]">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Start Your Journey
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>

                <Link to="/chat">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto min-w-[180px] h-14 text-lg font-semibold border-2 border-[#2B3674]/20 hover:bg-[#2B3674]/5 hover:border-[#3EBFB0] group"
                  >
                    <Play className="h-5 w-5 mr-2 text-[#2B3674] group-hover:text-[#3EBFB0] transition-colors" />
                    Try AI Chat
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <CheckCircle className="h-4 w-4 text-[#3EBFB0]" />
                  <span>No credit card required</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="h-4 w-4 text-[#3EBFB0]" />
                  <span>Free to start</span>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image with Real Person */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              {/* Main Image Container */}
              <div className="relative w-full h-full">
                {/* Background Gradient Blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2B3674]/20 via-[#3EBFB0]/20 to-[#C8A860]/20 rounded-[3rem] transform rotate-6 opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3EBFB0]/20 via-[#C8A860]/20 to-[#2B3674]/20 rounded-[3rem] transform -rotate-3 opacity-60"></div>
                
                {/* Main Stock Image */}
                <div className="relative h-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                    alt="Professional woman working confidently on laptop"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Gradient Overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
                </div>

                {/* Floating UI Elements */}
                {/* Career Match Card */}
                <div className="absolute top-8 -left-4 bg-white rounded-2xl shadow-2xl p-4 backdrop-blur-sm border-2 border-[#3EBFB0]/20 animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3EBFB0] to-[#2B3674] rounded-xl flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Career Match</div>
                      <div className="text-lg font-bold text-[#2B3674]">94%</div>
                    </div>
                  </div>
                </div>

                {/* Skills Progress Card */}
                <div className="absolute top-32 -right-4 bg-white rounded-2xl shadow-2xl p-4 backdrop-blur-sm border-2 border-[#2B3674]/20 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="text-xs text-gray-500 font-medium mb-2">Skills Progress</div>
                  <div className="space-y-2 w-32">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Leadership</span>
                        <span className="font-semibold text-[#2B3674]">85%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Technical</span>
                        <span className="font-semibold text-[#3EBFB0]">92%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#3EBFB0] to-[#C8A860] rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievement Notification */}
                <div className="absolute bottom-8 -left-4 bg-white rounded-2xl shadow-2xl p-4 backdrop-blur-sm border-2 border-[#C8A860]/20 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#C8A860] to-[#3EBFB0] rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-white fill-current" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#2B3674]">New Achievement!</div>
                      <div className="text-xs text-gray-500">Career Path Completed</div>
                    </div>
                  </div>
                </div>

                {/* Live Users Badge */}
                <div className="absolute bottom-32 -right-4 bg-white rounded-full shadow-2xl px-4 py-2 backdrop-blur-sm border-2 border-[#3EBFB0]/20 flex items-center space-x-2 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" alt="User" className="w-6 h-6 rounded-full border-2 border-white" />
                  </div>
                  <span className="text-xs font-medium text-[#2B3674]">2.4k online now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards - Moved Below Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-[#2B3674]/10 hover:border-[#3EBFB0]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-[#3EBFB0]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-[#3EBFB0]/20`}
                  >
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#2B3674] mb-2">
                    {feature.label}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trusted Companies Section */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-6 font-medium">Trusted by professionals at leading companies</p>
            <div className="flex items-center justify-center space-x-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
              {trustedCompanies.map((company, index) => (
                <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={company.logo} alt={company.name} className="h-8 w-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;