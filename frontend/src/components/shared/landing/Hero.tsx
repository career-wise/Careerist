import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import astronautImage from "../../../assets/images/astronaut.png";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            {/* Huge Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-[6rem] font-display font-bold text-brand-ink leading-[0.9] tracking-tight mb-8">
              FIND YOUR <br />
              CAREER <br />
              CLARITY.
            </h1>
            
            <p className="text-xl sm:text-2xl text-brand-slate font-medium max-w-lg mb-10">
              The AI guide that helps you navigate from high school straight through to your dream job.
            </p>
            
            {/* Honest CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to="/auth" 
                className="group relative flex items-center justify-center bg-brand-ink text-brand-mist px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-neon hover:text-brand-ink transition-all duration-300 w-full sm:w-auto overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start your career journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right side visual elements */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center h-full min-h-[400px]">
            
            {/* Generous rounded corner card (Astronaut Image) */}
            <div className="relative w-full max-w-xl aspect-square bg-transparent rounded-[3rem] overflow-hidden scale-110 lg:scale-125">
               <img
                src={astronautImage}
                alt="Floating Astronaut"
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;