import React from "react";
import { Star } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Arjun M.",
      role: "Recent Graduate, B.Tech CS",
      text: "The AI interview practice is incredible. I was terrified of technical interviews, but practicing with Careerist's AI helped me spot my verbal tics and structure my answers. I cracked a role at a top product company last week!",
    },
    {
      name: "Priya S.",
      role: "3rd Year B.Com Student",
      text: "I had no idea what to do after graduation. The AI career planner analyzed my strengths and mapped out a concrete 6-month plan. I'm now completing a financial modeling course I found through the platform.",
    },
    {
      name: "Rohan D.",
      role: "Career Pivoter",
      text: "The AI Resume Wizard is magic. I just dumped my messy project notes into the text box, and it rewrote them into perfect, professional bullet points. My callback rate has literally tripled.",
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-ink mb-4">
            Don't just take our word for it.
          </h2>
          <p className="text-brand-slate text-xl">Hear from students and graduates accelerating their careers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-brand-mist/50 p-8 rounded-3xl border border-brand-slate/10 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#C8A860] fill-current" />
                ))}
              </div>
              <p className="text-brand-ink text-lg italic mb-6">"{t.text}"</p>
              <div>
                <h4 className="font-bold text-brand-ink">{t.name}</h4>
                <p className="text-brand-slate text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;