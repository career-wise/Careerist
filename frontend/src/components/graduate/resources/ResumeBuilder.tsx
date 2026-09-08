import React, { useState, useEffect, useRef } from "react";
import { authService } from "../../../lib/auth";
import { resumeService, ResumeData } from "../../../services/resumeService";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import { CheckCircle, Wand2, Download, ChevronRight, ChevronLeft, Plus, Trash2 } from "lucide-react";
import html2pdf from "html2pdf.js";
import { profileService } from "../../../services/profileService";
import { apiFetch } from "../../../lib/api";

const STEPS = ["Experience", "Education", "Skills", "Projects", "AI Generate", "Preview & Export"];

const ResumeBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<ResumeData["content"]>({
    workExperience: [],
    education: [],
    skills: "",
    projects: []
  });

  const [aiDraft, setAiDraft] = useState<any>({
    workExperience: [],
    education: [],
    skills: {},
    projects: []
  });

  // Personal Info for the header (fetched from profile)
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "", phone: "", targetRole: "" });

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          // Load Profile for name/email
          const profile = await profileService.getProfile('');
          if (profile) {
            setPersonalInfo({
              name: profile.onboarding_answers?.full_name || profile.full_name || "Your Name",
              email: session.user.email || "",
              phone: profile.onboarding_answers?.phone || "",
              targetRole: profile.onboarding_answers?.target_role || "Software Engineer"
            });
          }

          const savedResume = await resumeService.getResume(session.user.id);
          if (savedResume && savedResume.content) {
            setData(savedResume.content);
            setAiDraft(savedResume.content);
            // If they already have content, skip to preview
            if (savedResume.content.workExperience?.length > 0) {
              setCurrentStep(5); // Skip to Preview
            }
          }
        }
      } catch (err) {
        console.error("Failed to load resume", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const addField = (field: "workExperience" | "education" | "projects", template: any) => {
    setData((prev) => ({ ...prev, [field]: [...prev[field], template] }));
  };

  const updateField = (field: "workExperience" | "education" | "projects", index: number, key: string, value: string) => {
    const newList = [...data[field]];
    newList[index][key] = value;
    setData((prev) => ({ ...prev, [field]: newList }));
  };

  const removeField = (field: "workExperience" | "education" | "projects", index: number) => {
    setData((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const generateAIContent = async () => {
    setIsGenerating(true);
    try {
      const session = await authService.getSession();
      const token = session?.session?.access_token;
      
      const draft = { ...aiDraft };

      // Helper to call Edge Function
      const callGroq = async (section: string, rawText: string) => {
        const response = await apiFetch('/chat/generate-resume-bullets', {
          method: "POST",
          body: JSON.stringify({ section, rawText })
        });
        return response;
      };

      // Process Experience
      if (data.workExperience.length > 0) {
        draft.workExperience = await Promise.all(data.workExperience.map(async (exp) => {
          const raw = `Role: ${exp.role} at ${exp.company}. Duration: ${exp.duration}. Notes: ${exp.notes}`;
          const bullets = await callGroq("Experience", raw);
          return { ...exp, bullets };
        }));
      }

      // Process Projects
      if (data.projects.length > 0) {
        draft.projects = await Promise.all(data.projects.map(async (proj) => {
          const raw = `Project: ${proj.name}. Tech: ${proj.tech}. Notes: ${proj.notes}`;
          const bullets = await callGroq("Projects", raw);
          return { ...proj, bullets };
        }));
      }

      // Process Education
      if (data.education.length > 0) {
        const rawEdu = data.education.map(e => `${e.degree} at ${e.institution}, ${e.duration}. ${e.notes}`).join(" | ");
        draft.education = await callGroq("Education", rawEdu);
      }

      // Process Skills
      if (data.skills) {
        draft.skills = await callGroq("Skills", data.skills);
      }

      setAiDraft(draft);
      
      // Save to DB
      await resumeService.saveResume(session!.user.id, draft);
      setCurrentStep(5); // Go to preview
    } catch (err) {
      console.error(err);
      alert("Failed to generate AI content.");
    } finally {
      setIsGenerating(false);
    }
  };

  const exportPDF = () => {
    if (!resumeRef.current) return;
    const opt = {
      margin: 10,
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(resumeRef.current).save();
  };

  if (loading) return <div className="p-8 text-center text-brand-slate">Loading your resume...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-brand-ink">AI Resume Builder</h1>
        <div className="flex gap-2">
          {STEPS.map((step, idx) => (
            <div key={idx} className={`h-2 w-12 rounded-full ${idx <= currentStep ? 'bg-brand-neon' : 'bg-brand-slate/20'}`} title={step} />
          ))}
        </div>
      </div>

      <Card className="p-8 bg-white border-2 border-brand-slate/10 shadow-xl relative min-h-[600px]">
        {currentStep === 0 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Work Experience</h2>
            <p className="text-brand-slate mb-6">Jot down your roles and what you did. Don't worry about phrasing, our AI will make it sound professional.</p>
            {data.workExperience.map((exp, idx) => (
              <div key={idx} className="mb-6 p-4 border border-brand-slate/20 rounded-lg relative">
                <button onClick={() => removeField("workExperience", idx)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-5 h-5"/></button>
                <input placeholder="Company" value={exp.company} onChange={e => updateField("workExperience", idx, "company", e.target.value)} className="block w-full mb-2 p-2 border rounded" />
                <input placeholder="Role" value={exp.role} onChange={e => updateField("workExperience", idx, "role", e.target.value)} className="block w-full mb-2 p-2 border rounded" />
                <input placeholder="Duration (e.g. 2021 - Present)" value={exp.duration} onChange={e => updateField("workExperience", idx, "duration", e.target.value)} className="block w-full mb-2 p-2 border rounded" />
                <textarea placeholder="Rough notes on what you did..." value={exp.notes} onChange={e => updateField("workExperience", idx, "notes", e.target.value)} className="block w-full p-2 border rounded h-24" />
              </div>
            ))}
            <Button onClick={() => addField("workExperience", { company: "", role: "", duration: "", notes: "" })} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Experience</Button>
          </div>
        )}

        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Education</h2>
            <p className="text-brand-slate mb-6">Add your degrees and relevant coursework or grades.</p>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mb-6 p-4 border border-brand-slate/20 rounded-lg relative">
                <button onClick={() => removeField("education", idx)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-5 h-5"/></button>
                <input placeholder="Institution" value={edu.institution} onChange={e => updateField("education", idx, "institution", e.target.value)} className="block w-full mb-2 p-2 border rounded" />
                <input placeholder="Degree" value={edu.degree} onChange={e => updateField("education", idx, "degree", e.target.value)} className="block w-full mb-2 p-2 border rounded" />
                <input placeholder="Duration" value={edu.duration} onChange={e => updateField("education", idx, "duration", e.target.value)} className="block w-full mb-2 p-2 border rounded" />
                <textarea placeholder="Coursework / Grades..." value={edu.notes} onChange={e => updateField("education", idx, "notes", e.target.value)} className="block w-full p-2 border rounded h-24" />
              </div>
            ))}
            <Button onClick={() => addField("education", { institution: "", degree: "", duration: "", notes: "" })} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Education</Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <p className="text-brand-slate mb-6">List your skills (comma separated). AI will categorize them for you.</p>
            <textarea placeholder="e.g. JavaScript, React, Python, Docker, Agile, Team Leadership" value={data.skills} onChange={e => setData(prev => ({...prev, skills: e.target.value}))} className="block w-full p-4 border rounded h-32" />
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <p className="text-brand-slate mb-6">List notable projects. Our AI will craft strong bullet points from your rough notes.</p>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="mb-6 p-4 border border-brand-slate/20 rounded-lg relative">
                <button onClick={() => removeField("projects", idx)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-5 h-5"/></button>
                <input placeholder="Project Name" value={proj.name} onChange={e => updateField("projects", idx, "name", e.target.value)} className="block w-full mb-2 p-2 border rounded" />
                <input placeholder="Tech Stack (e.g. React, Firebase)" value={proj.tech} onChange={e => updateField("projects", idx, "tech", e.target.value)} className="block w-full mb-2 p-2 border rounded" />
                <textarea placeholder="What did you build and why?" value={proj.notes} onChange={e => updateField("projects", idx, "notes", e.target.value)} className="block w-full p-2 border rounded h-24" />
              </div>
            ))}
            <Button onClick={() => addField("projects", { name: "", tech: "", notes: "" })} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="animate-fade-in text-center py-20">
            <Wand2 className="w-16 h-16 text-brand-neon mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Ready for Magic?</h2>
            <p className="text-brand-slate mb-8 max-w-md mx-auto">We'll now send your rough notes to our AI, which will rewrite everything into highly professional, ATS-friendly resume points.</p>
            <Button onClick={generateAIContent} disabled={isGenerating} className="bg-brand-neon text-brand-ink font-bold px-8 py-3 text-lg">
              {isGenerating ? "Generating..." : "Generate My Resume"}
            </Button>
          </div>
        )}

        {currentStep === 5 && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Preview & Export</h2>
              <Button onClick={exportPDF} className="bg-brand-ink text-white"><Download className="w-4 h-4 mr-2" /> Download PDF</Button>
            </div>
            
            {/* JAKE'S RESUME TEMPLATE (Single Column, Plain) */}
            <div ref={resumeRef} className="bg-white text-black p-8 mx-auto" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Arial, sans-serif' }}>
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold uppercase mb-1">{personalInfo.name}</h1>
                <p className="text-sm">{personalInfo.phone} | {personalInfo.email} | {personalInfo.targetRole}</p>
              </div>

              {aiDraft.education && aiDraft.education.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Education</h2>
                  {aiDraft.education.map((edu: any, i: number) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between font-bold">
                        <span>{edu.institution}</span>
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="italic">{edu.degree}</span>
                      </div>
                      {edu.details && <p className="text-sm mt-1">{edu.details}</p>}
                    </div>
                  ))}
                </div>
              )}

              {aiDraft.workExperience && aiDraft.workExperience.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Experience</h2>
                  {aiDraft.workExperience.map((exp: any, i: number) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between font-bold">
                        <span>{exp.company}</span>
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex justify-between italic mb-1">
                        <span>{exp.role}</span>
                      </div>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {exp.bullets && exp.bullets.map((b: string, j: number) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {aiDraft.projects && aiDraft.projects.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Projects</h2>
                  {aiDraft.projects.map((proj: any, i: number) => (
                    <div key={i} className="mb-2">
                      <div className="font-bold">
                        {proj.name} <span className="font-normal font-italic text-sm">| {proj.tech}</span>
                      </div>
                      <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                        {proj.bullets && proj.bullets.map((b: string, j: number) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {aiDraft.skills && Object.keys(aiDraft.skills).length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Technical Skills</h2>
                  <div className="text-sm">
                    {Object.entries(aiDraft.skills).map(([category, skills]: any, i) => (
                      <div key={i} className="mb-1">
                        <span className="font-bold">{category}:</span> {skills}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-between mt-6">
        <Button onClick={handlePrev} disabled={currentStep === 0} variant="outline"><ChevronLeft className="w-4 h-4 mr-2" /> Back</Button>
        {currentStep < 4 && <Button onClick={handleNext} className="bg-brand-ink text-white">Next <ChevronRight className="w-4 h-4 ml-2" /></Button>}
        {currentStep === 5 && <Button onClick={() => setCurrentStep(0)} variant="outline">Edit Raw Info</Button>}
      </div>
    </div>
  );
};

export default ResumeBuilder;
