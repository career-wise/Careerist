import React from "react";
import { Users, Clock, TrendingUp, Heart, Award, Globe, Zap, Shield, CheckCircle, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

const About: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-10 w-10" />,
      number: "50,000+",
      label: "Lives Transformed",
      description: "Students and professionals guided",
      iconColor: "text-[#2B3674]",
      iconBg: "bg-[#2B3674]/10",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      number: "500+",
      label: "Career Paths",
      description: "Coverage across all industries",
      iconColor: "text-[#3EBFB0]",
      iconBg: "bg-[#3EBFB0]/10",
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      number: "94%",
      label: "Success Rate",
      description: "Goals achieved within 12 months",
      iconColor: "text-[#C8A860]",
      iconBg: "bg-[#C8A860]/10",
    },
    {
      icon: <Heart className="h-10 w-10" />,
      number: "4.9/5",
      label: "User Satisfaction",
      description: "Consistently life-changing",
      iconColor: "text-[#2B3674]",
      iconBg: "bg-[#2B3674]/10",
    },
  ];

  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Highest quality in AI algorithms and user experience",
      iconColor: "text-[#C8A860]",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Accessibility",
      description: "Career guidance available to everyone",
      iconColor: "text-[#3EBFB0]",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation",
      description: "Pushing boundaries with AI and career development",
      iconColor: "text-[#2B3674]",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust",
      description: "Ethical, unbiased guidance based on research",
      iconColor: "text-[#3EBFB0]",
    },
  ];

  const achievements = [
    "Featured in Forbes, TechCrunch, and WSJ",
    "Partnered with 200+ universities globally",
    "AI trained on 10M+ career paths",
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6 shadow-sm">
            <TrendingUp className="h-4 w-4 mr-2 text-[#3EBFB0]" />
            Our Impact
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Transforming Careers{" "}
            <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
              Around the World
            </span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#2B3674]/10 hover:border-[#3EBFB0]/30"
            >
              <div className={`w-16 h-16 ${stat.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform shadow-md`}>
                <span className={stat.iconColor}>{stat.icon}</span>
              </div>
              <div className="text-3xl font-bold text-[#2B3674] mb-2 text-center">
                {stat.number}
              </div>
              <div className="font-semibold text-gray-900 mb-2 text-center">{stat.label}</div>
              <div className="text-sm text-gray-600 text-center">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Main About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#3EBFB0]/10 border-2 border-[#3EBFB0]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6">
                <Heart className="h-4 w-4 mr-2 text-[#3EBFB0]" />
                Our Mission
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Democratizing Career Success with{" "}
                <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                  AI Innovation
                </span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                We believe everyone deserves access to world-class career guidance. Our mission is to make personalized career development accessible to all.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Founded by career counselors, data scientists, and industry professionals, CareerWise combines decades of expertise with cutting-edge AI.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Our platform analyzes millions of career paths and market trends to provide insights previously only available to those with expensive career coaches.
              </p>

              {/* Achievements */}
              <div className="space-y-3 pt-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#3EBFB0] flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" size="lg" className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] group">
                Learn About Our Team
                <Users className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                Our Methodology
                <Zap className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-full">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Diverse team collaboration"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#2B3674]/80 via-[#3EBFB0]/70 to-[#C8A860]/80"></div>

                {/* Team Card */}
                <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-[#2B3674] mb-2">Our Expert Team</h4>
                      <p className="text-gray-600 text-sm">Multidisciplinary professionals</p>
                    </div>

                    {/* Team Stats */}
                    <div className="space-y-3">
                      {[
                        { label: "Career Counselors", count: "15+ experts", percentage: "23%", color: "from-[#2B3674] to-[#3EBFB0]", icon: Heart },
                        { label: "AI Researchers", count: "12+ PhDs", percentage: "31%", color: "from-[#3EBFB0] to-[#C8A860]", icon: Zap },
                        { label: "Industry Veterans", count: "20+ leaders", percentage: "46%", color: "from-[#C8A860] to-[#2B3674]", icon: Award },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-md`}>
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                                <div className="text-xs text-gray-600">{item.count}</div>
                              </div>
                            </div>
                            <div className={`font-bold text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                              {item.percentage}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                      <div className="text-2xl font-bold text-[#2B3674] mb-1">47</div>
                      <div className="text-sm text-gray-600">Team members across 12 countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-[#2B3674]/10 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#2B3674] mb-4">Our Core Values</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border-2 border-[#2B3674]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:border-[#3EBFB0]/30">
                  <span className={value.iconColor}>{value.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-[#2B3674] mb-3 group-hover:text-[#3EBFB0] transition-colors">
                  {value.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Team Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Team celebrating success"
            className="w-full h-80 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B3674]/90 via-[#3EBFB0]/80 to-transparent flex items-center">
            <div className="px-8 sm:px-12 md:px-16 max-w-2xl">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium text-white mb-4">
                <Globe className="h-4 w-4 mr-2" />
                Join Our Team
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Help Us Shape the Future of Careers
              </h3>
              <p className="text-lg text-white/90 mb-6 leading-relaxed">
                We're looking for passionate individuals who want to make a real impact on people's lives.
              </p>
              <Button variant="primary" size="lg" className="bg-white text-[#2B3674] hover:bg-gray-100">
                View Open Positions
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;