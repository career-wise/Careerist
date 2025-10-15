import React from "react";
import { GraduationCap, Users, Briefcase, Lightbulb, ArrowRight, Star, TrendingUp, Award, Target } from "lucide-react";

const UserTypes: React.FC = () => {
  const userTypes = [
    {
      icon: <GraduationCap className="h-10 w-10" />,
      title: "High School Students",
      description: "Discover your potential and plan your educational journey",
      features: ["Career exploration", "College planning", "Skill development"],
      gradient: "from-[#2B3674] to-[#3EBFB0]",
      iconBg: "bg-[#2B3674]/10",
      iconColor: "text-[#2B3674]",
      userCount: "25K+",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "College Students",
      description: "Navigate your transition from education to career",
      features: ["Job search prep", "Interview training", "Network building"],
      gradient: "from-[#3EBFB0] to-[#C8A860]",
      iconBg: "bg-[#3EBFB0]/10",
      iconColor: "text-[#3EBFB0]",
      userCount: "18K+",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: <Briefcase className="h-10 w-10" />,
      title: "Working Professionals",
      description: "Advance your career and unlock new opportunities",
      features: ["Career advancement", "Skill upgrading", "Leadership development"],
      gradient: "from-[#2B3674] to-[#C8A860]",
      iconBg: "bg-[#C8A860]/10",
      iconColor: "text-[#C8A860]",
      userCount: "15K+",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: "Aspiring Entrepreneurs",
      description: "Transform your ideas into successful ventures",
      features: ["Business planning", "Market analysis", "Funding guidance"],
      gradient: "from-[#C8A860] to-[#3EBFB0]",
      iconBg: "bg-[#3EBFB0]/10",
      iconColor: "text-[#2B3674]",
      userCount: "8K+",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80",
    },
  ];

  const stats = [
    { label: "Career Advancement", value: "94%", icon: TrendingUp, color: "from-[#2B3674] to-[#3EBFB0]" },
    { label: "Salary Increase", value: "87%", icon: Award, color: "from-[#3EBFB0] to-[#C8A860]" },
    { label: "Job Satisfaction", value: "92%", icon: Star, color: "from-[#C8A860] to-[#2B3674]" },
    { label: "Skill Growth", value: "89%", icon: Target, color: "from-[#2B3674] to-[#3EBFB0]" },
  ];

  return (
    <section id="user-types" className="py-24 bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6 shadow-sm">
            <Users className="h-4 w-4 mr-2 text-[#3EBFB0]" />
            For Every Career Stage
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Tailored Guidance for{" "}
            <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
              Every Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're starting out or making your next move, we have the tools you need
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {userTypes.map((type, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#2B3674]/10 overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${type.gradient} opacity-70`}></div>

                {/* Icon */}
                <div className="absolute top-4 left-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className={type.iconColor}>{type.icon}</span>
                  </div>
                </div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                  <div className="flex items-center text-xs text-gray-600 mb-0.5">
                    <Star className="h-3 w-3 text-[#C8A860] mr-1 fill-current" />
                    {type.rating}
                  </div>
                  <div className="text-xs text-gray-500 font-semibold">{type.userCount}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2B3674] mb-3 group-hover:text-[#3EBFB0] transition-colors">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {type.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#3EBFB0] rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="flex items-center text-[#3EBFB0] hover:text-[#2B3674] font-medium text-sm transition-colors group/btn">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-[#2B3674]/10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-[#3EBFB0]/10 border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6">
                  <Star className="h-4 w-4 mr-2 text-[#3EBFB0]" />
                  Success Stories
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Join Thousands of{" "}
                  <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                    Success Stories
                  </span>
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our community spans industries and career stages. What unites them? Growth and success with our platform.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-[#2B3674]/10 hover:border-[#3EBFB0]/30 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.value}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Community Count */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] flex items-center justify-center text-white text-xs font-bold shadow-md"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-bold text-[#2B3674]">50,000+</span> members
                  </div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative bg-gradient-to-br from-[#2B3674] via-[#3EBFB0] to-[#C8A860] p-8 md:p-12">
              <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=1000&fit=crop&q=80"
                  alt="Community of professionals"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#2B3674]/80 via-[#3EBFB0]/70 to-[#C8A860]/80"></div>

                {/* Central Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl text-center transform hover:scale-105 transition-transform">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent mb-2">
                      50K+
                    </div>
                    <div className="text-sm font-semibold text-[#2B3674] mb-1">Success Stories</div>
                    <div className="text-xs text-gray-600">Across all career stages</div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-8 left-8 bg-[#3EBFB0] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-bounce">
                  +25% Salary
                </div>
                <div className="absolute top-12 right-8 bg-[#2B3674] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-bounce" style={{ animationDelay: "1s" }}>
                  New Role
                </div>
                <div className="absolute bottom-12 left-8 bg-[#C8A860] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-bounce" style={{ animationDelay: "2s" }}>
                  Promoted
                </div>
                <div className="absolute bottom-8 right-8 bg-[#3EBFB0] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
                  Dream Job
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;