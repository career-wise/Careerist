import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const UserTypes: React.FC = () => {
  const audiences = [
    {
      title: "12th-Pass & High School",
      description: "Don't guess your college major. Get a data-backed roadmap to the right degree based on your true strengths.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop&q=80",
    },
    {
      title: "College Students",
      description: "Bridge the gap between campus and career. Master interviews and land the job before you even graduate.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&q=80",
    }
  ];

  return (
    <section id="audiences" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-ink mb-4">
            Built for your stage.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {audiences.map((audience, index) => (
            <div key={index} className="group relative rounded-[3rem] overflow-hidden bg-brand-mist border-2 border-transparent hover:border-brand-ink transition-all duration-500">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={audience.image} 
                  alt={audience.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
              </div>
              <div className="p-8 lg:p-10 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/60 to-transparent pt-32">
                <h3 className="text-3xl font-display font-bold text-brand-mist mb-3">
                  {audience.title}
                </h3>
                <p className="text-brand-mist/90 text-lg mb-6 max-w-md">
                  {audience.description}
                </p>
                <Link to="/auth" className="inline-flex items-center text-brand-neon font-bold hover:text-white transition-colors">
                  Explore paths <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UserTypes;