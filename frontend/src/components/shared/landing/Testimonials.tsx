import React from "react";
import { MessageSquareDashed } from "lucide-react";

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-ink mb-4">
            Don't just take our word for it.
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-brand-slate/10 rounded-[3rem] bg-brand-slate/10">
           <MessageSquareDashed className="w-16 h-16 text-brand-slate/10 mb-6" />
           <h3 className="text-2xl font-display font-bold text-brand-ink mb-2">
             Real stories coming soon.
           </h3>
           <p className="text-brand-slate text-center max-w-md">
             We're currently gathering success stories from our early users. 
             We believe in real results, not fabricated numbers. Check back soon.
           </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;