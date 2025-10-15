import React from "react";
import { Sparkles, BookOpen, Target, Shield, Zap, Brain, Users, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered Insights",
      description: "Get personalized career recommendations based on your unique profile and skills",
      iconColor: "text-[#2B3674]",
      iconBg: "bg-[#2B3674]/10",
      gradient: "from-[#2B3674] to-[#3EBFB0]",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Smart Matching",
      description: "Find programs and opportunities that perfectly align with your goals",
      iconColor: "text-[#3EBFB0]",
      iconBg: "bg-[#3EBFB0]/10",
      gradient: "from-[#3EBFB0] to-[#C8A860]",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Profile Optimization",
      description: "Enhance your resume with AI-driven suggestions and insights",
      iconColor: "text-[#C8A860]",
      iconBg: "bg-[#C8A860]/10",
      gradient: "from-[#C8A860] to-[#2B3674]",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trusted Guidance",
      description: "Receive ethical, research-backed career advice from our AI",
      iconColor: "text-[#2B3674]",
      iconBg: "bg-[#2B3674]/10",
      gradient: "from-[#2B3674] to-[#3EBFB0]",
    },
  ];

  const additionalFeatures = [
    { icon: <Brain className="h-6 w-6" />, title: "Skill Assessment", description: "Identify strengths and gaps" },
    { icon: <Users className="h-6 w-6" />, title: "Peer Network", description: "Connect with professionals" },
    { icon: <TrendingUp className="h-6 w-6" />, title: "Market Trends", description: "Stay ahead of changes" },
    { icon: <Zap className="h-6 w-6" />, title: "Quick Actions", description: "Fast-track your moves" },
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 mr-2 text-[#3EBFB0]" />
            Powerful Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
              Accelerate Your Career
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI with proven career strategies
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#2B3674]/10 hover:border-[#3EBFB0]/30"
            >
              <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 hover:scale-110 transition-transform shadow-md`}>
                <span className={feature.iconColor}>{feature.icon}</span>
              </div>

              <h3 className="text-2xl font-bold text-[#2B3674] mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-[#2B3674]/10 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#2B3674] mb-4">Plus Much More</h3>
            <p className="text-lg text-gray-600">Additional tools to support your journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-[#3EBFB0]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-[#2B3674] group-hover:to-[#3EBFB0] transition-all duration-300 group-hover:scale-110">
                  <div className="text-[#3EBFB0] group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-[#3EBFB0] transition-colors">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analysis Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#3EBFB0]/10 border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6">
                <Brain className="h-4 w-4 mr-2 text-[#3EBFB0]" />
                AI-Powered Intelligence
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Smarter Career Decisions with{" "}
                <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                  Advanced AI
                </span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Our platform analyzes thousands of career patterns and market trends to provide personalized recommendations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Personalized Career Mapping", desc: "Customized paths based on your unique skills and interests", color: "from-[#2B3674] to-[#3EBFB0]" },
                { title: "Real-Time Market Insights", desc: "Up-to-date industry trends and job market analysis", color: "from-[#3EBFB0] to-[#C8A860]" },
                { title: "Continuous Learning", desc: "Discover skills to develop for maximum career impact", color: "from-[#C8A860] to-[#2B3674]" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 mt-1`}>
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-full">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Professional analyzing data"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#2B3674]/85 via-[#3EBFB0]/75 to-[#C8A860]/85"></div>

                {/* Analysis Card */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-[#2B3674] mb-1">AI Career Analysis</h4>
                      <p className="text-sm text-gray-600">Real-time insights</p>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-4">
                      {[
                        { label: "Career Match", value: 94, color: "from-[#2B3674] to-[#3EBFB0]" },
                        { label: "Skill Alignment", value: 87, color: "from-[#3EBFB0] to-[#C8A860]" },
                        { label: "Market Demand", value: 91, color: "from-[#C8A860] to-[#2B3674]" },
                      ].map((metric, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                            <span className={`text-sm font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                              {metric.value}%
                            </span>
                          </div>
                          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000`}
                              style={{ width: `${metric.value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
                      View Full Report
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Platform Section */}
        <div className="bg-gradient-to-br from-[#2B3674]/5 via-[#3EBFB0]/5 to-[#C8A860]/5 rounded-3xl overflow-hidden shadow-xl border-2 border-[#3EBFB0]/20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-80 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Students collaborating"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2B3674]/70 to-transparent"></div>

              {/* Stats */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                {[
                  { value: "500+", label: "Courses", color: "from-[#2B3674] to-[#3EBFB0]" },
                  { value: "50K+", label: "Learners", color: "from-[#3EBFB0] to-[#C8A860]" },
                  { value: "4.8★", label: "Rating", color: "from-[#C8A860] to-[#2B3674]" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex-1 bg-white rounded-xl p-4 shadow-lg">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6">
                  <BookOpen className="h-4 w-4 mr-2 text-[#3EBFB0]" />
                  Learning Platform
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Continuous Learning,{" "}
                  <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                    Continuous Growth
                  </span>
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Access curated learning paths and personalized course recommendations to stay competitive.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Personalized learning recommendations",
                    "Track progress and earn certificates",
                    "Connect with industry experts",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        idx === 0 ? "bg-[#2B3674]/10" : idx === 1 ? "bg-[#3EBFB0]/10" : "bg-[#C8A860]/10"
                      }`}>
                        <CheckCircle className={`h-4 w-4 ${
                          idx === 0 ? "text-[#2B3674]" : idx === 1 ? "text-[#3EBFB0]" : "text-[#C8A860]"
                        }`} />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Explore Courses
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

export default Features;