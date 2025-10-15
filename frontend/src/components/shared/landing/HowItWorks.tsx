import React from "react";
import { Target, MessageCircle, Map, ArrowRight, CheckCircle, Sparkles, Clock } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "1",
      icon: <Target className="h-10 w-10" />,
      title: "Define Your Goals",
      description: "Tell us about your career aspirations and what success means to you",
      details: [
        "Complete our assessment",
        "Share your interests",
        "Set your priorities"
      ],
      iconColor: "text-[#2B3674]",
      iconBg: "bg-[#2B3674]/10",
      gradient: "from-[#2B3674] to-[#3EBFB0]",
    },
    {
      number: "2",
      icon: <MessageCircle className="h-10 w-10" />,
      title: "AI-Powered Analysis",
      description: "Our AI analyzes your profile against thousands of career paths",
      details: [
        "Skills matching",
        "Market analysis",
        "Personalized recommendations"
      ],
      iconColor: "text-[#3EBFB0]",
      iconBg: "bg-[#3EBFB0]/10",
      gradient: "from-[#3EBFB0] to-[#C8A860]",
    },
    {
      number: "3",
      icon: <Map className="h-10 w-10" />,
      title: "Get Your Roadmap",
      description: "Receive a detailed plan with steps to achieve your goals",
      details: [
        "Action plan",
        "Resources",
        "Progress tracking"
      ],
      iconColor: "text-[#C8A860]",
      iconBg: "bg-[#C8A860]/10",
      gradient: "from-[#C8A860] to-[#2B3674]",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 mr-2 text-[#3EBFB0]" />
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Your Career Journey{" "}
            <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
              Made Simple
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process transforms career confusion into clear, actionable steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative mb-20">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-[#2B3674] via-[#3EBFB0] to-[#C8A860]"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 bg-white border-4 border-[#3EBFB0] rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-lg font-bold text-[#2B3674]">{step.number}</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 pt-12 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#2B3674]/10 hover:border-[#3EBFB0]/30 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform shadow-md`}>
                    <span className={step.iconColor}>{step.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#2B3674] mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#3EBFB0] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Demo Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#2B3674]/10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="p-8 md:p-12 flex items-center order-2 lg:order-1">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-[#3EBFB0]/10 border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6">
                  <MessageCircle className="h-4 w-4 mr-2 text-[#3EBFB0]" />
                  See It In Action
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Experience the Power of{" "}
                  <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                    AI Guidance
                  </span>
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Watch how our AI transforms your career questions into personalized, actionable insights in real-time.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { text: "Instant career matching", color: "from-[#2B3674] to-[#3EBFB0]" },
                    { text: "Personalized learning paths", color: "from-[#3EBFB0] to-[#C8A860]" },
                    { text: "Market-driven recommendations", color: "from-[#C8A860] to-[#2B3674]" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>

                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Try Interactive Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative order-1 lg:order-2 min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Professional using laptop for career planning"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2B3674]/85 via-[#3EBFB0]/75 to-[#C8A860]/85"></div>

              {/* Chat Interface */}
              <div className="relative z-10 w-full h-full p-6 sm:p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <div className="bg-white rounded-2xl shadow-2xl p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-full flex items-center justify-center shadow-lg">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">AI Career Assistant</div>
                        <div className="text-xs text-[#3EBFB0] flex items-center">
                          <div className="w-2 h-2 bg-[#3EBFB0] rounded-full mr-1 animate-pulse"></div>
                          Online
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* User Message */}
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] text-white rounded-2xl rounded-tr-sm p-3 max-w-[85%] shadow-md">
                          <div className="text-sm">"I'm interested in tech but not sure which path..."</div>
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[85%] shadow-md">
                          <div className="text-sm text-gray-700 mb-2">Based on your interests, explore:</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs bg-white border border-[#2B3674]/20 text-[#2B3674] rounded-lg px-3 py-1.5 font-medium shadow-sm">
                              💻 Software Engineering
                            </span>
                            <span className="text-xs bg-white border border-[#3EBFB0]/20 text-[#3EBFB0] rounded-lg px-3 py-1.5 font-medium shadow-sm">
                              📊 Data Science
                            </span>
                            <span className="text-xs bg-white border border-[#C8A860]/20 text-[#C8A860] rounded-lg px-3 py-1.5 font-medium shadow-sm">
                              🎨 UX Design
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Typing Indicator */}
                    <div className="mt-4 flex items-center gap-2 text-gray-500 text-xs">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-[#3EBFB0] rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          ></div>
                        ))}
                      </div>
                      <span>AI is analyzing...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-gradient-to-br from-[#2B3674]/5 via-[#3EBFB0]/5 to-[#C8A860]/5 rounded-3xl overflow-hidden shadow-xl border-2 border-[#3EBFB0]/20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-80 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Team planning career roadmap"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2B3674]/80 to-transparent"></div>

              {/* Timeline Cards */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="space-y-4 w-full max-w-xs">
                  {[
                    { week: "Week 1-2", title: "Goal Setting", color: "from-[#2B3674] to-[#3EBFB0]" },
                    { week: "Week 3-6", title: "Skill Building", color: "from-[#3EBFB0] to-[#C8A860]" },
                    { week: "Week 7+", title: "Career Launch", color: "from-[#C8A860] to-[#2B3674]" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`bg-white rounded-xl p-4 shadow-lg transform ${
                        idx % 2 === 0 ? "-translate-x-4" : "translate-x-4"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-md`}>
                          <span className="text-white font-bold text-sm">{idx + 1}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{item.week}</div>
                          <div className="text-xs text-gray-600">{item.title}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6">
                  <Clock className="h-4 w-4 mr-2 text-[#3EBFB0]" />
                  Your Timeline
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  From Confusion to Clarity in{" "}
                  <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                    Just Weeks
                  </span>
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our structured approach ensures steady progress with measurable milestones every step of the way.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { title: "Fast-Track Progress", desc: "See results in 30-60 days", color: "bg-[#2B3674]/10 text-[#2B3674]" },
                    { title: "Flexible & Adaptive", desc: "Plans adjust as you grow", color: "bg-[#3EBFB0]/10 text-[#3EBFB0]" },
                    { title: "Continuous Support", desc: "24/7 AI guidance", color: "bg-[#C8A860]/10 text-[#C8A860]" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-6 h-6 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;