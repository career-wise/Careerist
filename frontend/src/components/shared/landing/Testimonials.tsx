import React from "react";
import { Star, Quote, TrendingUp, Award, Briefcase } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Engineer at Google",
      previousRole: "High School Senior",
      rating: 5,
      content: "CareerWise helped me navigate from being lost about my future to landing my dream job at Google. The AI recommendations were spot-on.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
      outcome: "Dream Job",
      timeframe: "6 months",
      salaryIncrease: null,
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Marketing Director",
      previousRole: "Marketing Coordinator",
      rating: 5,
      content: "The career transition guidance was phenomenal. I went from coordinator to director in 18 months. The interview prep was a game-changer.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
      outcome: "Promoted",
      timeframe: "18 months",
      salaryIncrease: "+65%",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Startup Founder",
      previousRole: "Corporate Consultant",
      rating: 5,
      content: "Transitioning from corporate to entrepreneurship felt impossible until I found CareerWise. The tools helped me build a successful startup.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80",
      outcome: "Founded Startup",
      timeframe: "12 months",
      salaryIncrease: "+200%",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Data Scientist at Netflix",
      previousRole: "Recent Graduate",
      rating: 5,
      content: "As a graduate, I was overwhelmed. CareerWise's AI matched me with data science, and I landed at Netflix within 4 months.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80",
      outcome: "Hired at Netflix",
      timeframe: "4 months",
      salaryIncrease: null,
    },
  ];

  const featuredTestimonial = {
    name: "Jennifer Park",
    role: "VP of Engineering at Stripe",
    previousRole: "Senior Developer",
    content: "CareerWise helped me discover my leadership potential. The personalized development plan transformed my career. I went from senior developer to VP in 2 years.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
    outcome: "VP Promotion",
    timeframe: "2 years",
    salaryIncrease: "+180%",
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-[#C8A860] fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-[#C8A860]/20 rounded-full text-sm font-medium text-[#2B3674] mb-6 shadow-sm">
            <Star className="h-4 w-4 mr-2 text-[#C8A860]" />
            Success Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Real People,{" "}
            <span className="bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands who have transformed their careers with AI-powered guidance
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#2B3674]/10 hover:border-[#3EBFB0]/30 p-6 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="h-8 w-8 text-[#3EBFB0]" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed text-sm">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-[#3EBFB0]/20 shadow-md"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Outcome */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-[#2B3674]">{testimonial.outcome}</div>
                    <div className="text-gray-500">in {testimonial.timeframe}</div>
                  </div>
                  {testimonial.salaryIncrease && (
                    <div className="text-right">
                      <div className="font-medium text-[#3EBFB0]">{testimonial.salaryIncrease}</div>
                      <div className="text-gray-500">salary</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="relative mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2940&auto=format&fit=crop"
            alt="Professional success"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B3674]/95 via-[#3EBFB0]/85 to-[#C8A860]/90"></div>

          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-8 py-12 md:px-16">
              <div className="max-w-4xl mx-auto text-center">
                {/* Quote Icon */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <Quote className="h-8 w-8 text-white" />
                </div>

                {/* Rating */}
                <div className="flex justify-center items-center mb-8">
                  {renderStars(featuredTestimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed text-white max-w-3xl mx-auto">
                  "{featuredTestimonial.content}"
                </blockquote>

                {/* Author and Metrics */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  {/* Author */}
                  <div className="flex items-center">
                    <img
                      src={featuredTestimonial.image}
                      alt={featuredTestimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white/20 shadow-xl"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-lg text-white">
                        {featuredTestimonial.name}
                      </div>
                      <div className="text-white/80 text-sm">
                        {featuredTestimonial.role}
                      </div>
                      <div className="text-white/60 text-xs">
                        Previously: {featuredTestimonial.previousRole}
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex gap-8 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">{featuredTestimonial.salaryIncrease}</div>
                      <div className="text-white/70 text-sm">Salary Increase</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{featuredTestimonial.timeframe}</div>
                      <div className="text-white/70 text-sm">Timeline</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">VP</div>
                      <div className="text-white/70 text-sm">Level</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop&q=80", icon: TrendingUp, value: "85%", label: "Got promoted within 1 year", color: "from-[#2B3674]/90 to-[#3EBFB0]/80" },
            { img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop&q=80", icon: Award, value: "92%", label: "Achieved career goals", color: "from-[#3EBFB0]/90 to-[#C8A860]/80" },
            { img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop&q=80", icon: Briefcase, value: "78%", label: "Switched to dream career", color: "from-[#C8A860]/90 to-[#2B3674]/80" },
          ].map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="relative rounded-2xl overflow-hidden shadow-xl group">
                <img
                  src={metric.img}
                  alt={metric.label}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${metric.color} flex items-end`}>
                  <div className="p-6 w-full">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white">{metric.value}</div>
                    </div>
                    <p className="text-white text-sm">{metric.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;