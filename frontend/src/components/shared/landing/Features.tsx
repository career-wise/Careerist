import React from "react";
import { FileText, Target, Mic, CheckCircle, ArrowRight, Brain, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Features: React.FC = () => {
 const features = [
 {
 icon: <Target className="w-10 h-10 text-brand-ink" />,
 title: "AI College & Career Planner",
 description: "Stop guessing what to do next. Get highly personalized recommendations for colleges, majors, and career paths in India based on your unique goals.",
 bullets: ["Data-backed college picks", "Step-by-step career roadmaps", "Tailored to Indian institutions"],
 bgColor: "bg-white",
 },
 {
 icon: <FileText className="w-10 h-10 text-brand-ink" />,
 title: "AI Resume Wizard",
 description: "Write down rough notes, and our AI will rewrite them into professional, ATS-beating bullet points that showcase your true value to recruiters.",
 bullets: ["Instant bullet point generation", "ATS-optimized formatting", "Export directly to PDF"],
 bgColor: "bg-white",
 },
 {
 icon: <Mic className="w-10 h-10 text-brand-ink" />,
 title: "Dynamic AI Interviews",
 description: "Practice makes perfect. Face an AI interviewer that dynamically generates questions based on your specific target role and resume.",
 bullets: ["Role-specific dynamic questions", "Instant feedback on answers", "Confidence building"],
 bgColor: "bg-white",
 }
 ];

 return (
 <section id="features" className="py-24 bg-[#EAEAEA] relative">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 <div className="text-center mb-20">
 <h2 className="text-5xl md:text-6xl font-display font-bold text-brand-ink mb-6 uppercase tracking-tight">
 Your complete <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-ink to-gray-500">
 Career Toolkit.
 </span>
 </h2>
 <p className="text-xl text-brand-slate max-w-2xl mx-auto">
 Our platform combines cutting-edge AI with proven career strategies to help you land your dream job faster.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {features.map((feature, index) => (
 <div key={index} className={`rounded-[3rem] p-10 ${feature.bgColor} border border-gray-200/50 hover:shadow-2xl transition-all duration-500 flex flex-col h-full group hover:-translate-y-2`}>
 <div className="w-20 h-20 bg-brand-neon rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
 {feature.icon}
 </div>
 <h3 className="text-3xl font-display font-bold text-brand-ink mb-4">
 {feature.title}
 </h3>
 <p className="text-brand-slate text-lg leading-relaxed mb-8 flex-grow">
 {feature.description}
 </p>
 
 <ul className="space-y-4 mb-10">
 {feature.bullets.map((bullet, idx) => (
 <li key={idx} className="flex items-start">
 <CheckCircle className="w-6 h-6 text-brand-neon mr-3 flex-shrink-0" />
 <span className="text-brand-ink font-medium">{bullet}</span>
 </li>
 ))}
 </ul>
 
 <Link to="/auth" className="inline-flex items-center text-brand-ink font-bold hover:text-brand-slate transition-colors group/link mt-auto uppercase tracking-wide text-sm">
 Try it out <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
 </Link>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
};

export default Features;