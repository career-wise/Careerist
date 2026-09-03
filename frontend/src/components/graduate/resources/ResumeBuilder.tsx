import React, { useState, useEffect } from "react";
import { Save, Printer, Plus, Trash2, ChevronRight, FileText } from "lucide-react";
import { authService } from "../../../lib/auth";
import { profileService } from "../../../services/profileService";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

interface ResumeData {
  basics: {
    name: string;
    email: string;
    phone: string;
    summary: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    year: string;
  }[];
  skills: string;
}

const defaultResume: ResumeData = {
  basics: { name: "", email: "", phone: "", summary: "" },
  experience: [],
  education: [],
  skills: "",
};

const ResumeBuilder: React.FC = () => {
  const [data, setData] = useState<ResumeData>(defaultResume);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          const profile = await profileService.getProfile(session.user.id);
          if (profile?.onboarding_answers?.resumeData) {
            setData(profile.onboarding_answers.resumeData);
          }
        }
      } catch (err) {
        console.error("Failed to load resume", err);
      } finally {
        setLoading(false);
        setIsDirty(false);
      }
    };
    loadResume();
  }, []);

  // Autosave effect
  useEffect(() => {
    if (!isDirty || loading) return;
    
    const handler = setTimeout(() => {
      handleSave(true);
    }, 1500);
    
    return () => clearTimeout(handler);
  }, [data, isDirty, loading]);

  const handleSave = async (isAutosave = false) => {
    if (!isAutosave) setSaving(true);
    try {
      const session = await authService.getSession();
      if (session?.user) {
        const profile = await profileService.getProfile(session.user.id);
        const newAnswers = {
          ...(profile.onboarding_answers || {}),
          resumeData: data,
          resumeStatus: "Have one, ready to use" // Updates dashboard priorities
        };
        await profileService.saveOnboardingData(session.user.id, {
          persona: profile.persona,
          ...newAnswers
        });
        setLastSaved(new Date());
        setIsDirty(false);
      }
    } catch (err) {
      console.error("Failed to save resume", err);
    } finally {
      if (!isAutosave) setSaving(false);
    }
  };

  const updateBasics = (field: keyof ResumeData["basics"], value: string) => {
    setIsDirty(true);
    setData((prev) => ({ ...prev, basics: { ...prev.basics, [field]: value } }));
  };

  const addExperience = () => {
    setIsDirty(true);
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" },
      ],
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setIsDirty(true);
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const removeExperience = (id: string) => {
    setIsDirty(true);
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    setIsDirty(true);
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now().toString(), institution: "", degree: "", year: "" },
      ],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setIsDirty(true);
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));
  };

  const removeEducation = (id: string) => {
    setIsDirty(true);
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  if (loading) {
    return <div className="p-8">Loading builder...</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen">
      {/* Header (hidden in print) */}
      <div className="print:hidden flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <div className="flex items-center text-brand-slate text-sm font-medium mb-2">
            <span>Resources</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-ink">Resume Builder</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-ink">Resume Builder</h1>
          <p className="text-brand-slate mt-1">Create a professional resume and export as PDF.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <div className="flex items-center gap-3">
            {lastSaved && (
              <span className="text-xs text-brand-slate font-medium hidden md:block">
                Last saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <Button variant="primary" onClick={() => handleSave(false)} disabled={saving || (!isDirty && !!lastSaved)}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Resume"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Editor (hidden in print) */}
        <div className="print:hidden flex-1 space-y-6 max-w-2xl">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-brand-ink mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2" /> Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.basics.name}
                  onChange={(e) => updateBasics("name", e.target.value)}
                  className="w-full px-4 py-2 bg-brand-mist border-none rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-shadow"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1">Email</label>
                <input
                  type="email"
                  value={data.basics.email}
                  onChange={(e) => updateBasics("email", e.target.value)}
                  className="w-full px-4 py-2 bg-brand-mist border-none rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-shadow"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1">Phone</label>
                <input
                  type="text"
                  value={data.basics.phone}
                  onChange={(e) => updateBasics("phone", e.target.value)}
                  className="w-full px-4 py-2 bg-brand-mist border-none rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-shadow"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-ink mb-1">Professional Summary</label>
                <textarea
                  value={data.basics.summary}
                  onChange={(e) => updateBasics("summary", e.target.value)}
                  className="w-full px-4 py-2 bg-brand-mist border-none rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-shadow h-24 resize-none"
                  placeholder="A brief summary of your professional background and goals..."
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-brand-ink flex items-center">
                <BriefcaseIcon className="w-5 h-5 mr-2" /> Experience
              </h2>
              <Button variant="outline" onClick={addExperience} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative p-4 border border-brand-slate/20 rounded-xl bg-brand-mist/50">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-4 right-4 text-brand-slate hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-sm font-medium text-brand-ink mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-brand-slate/10 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-ink mb-1">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-brand-slate/10 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-ink mb-1">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-brand-slate/10 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none"
                        placeholder="e.g. Jan 2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-ink mb-1">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-brand-slate/10 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none"
                        placeholder="e.g. Present"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-brand-ink mb-1">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-brand-slate/10 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none h-24 resize-none"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              {data.experience.length === 0 && (
                <p className="text-brand-slate text-sm text-center py-4">No experience added yet.</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-brand-ink flex items-center">
                <GraduationCapIcon className="w-5 h-5 mr-2" /> Education
              </h2>
              <Button variant="outline" onClick={addEducation} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="relative p-4 border border-brand-slate/20 rounded-xl bg-brand-mist/50">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-4 right-4 text-brand-slate hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-brand-ink mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-brand-slate/10 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-ink mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-brand-slate/10 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none"
                        placeholder="e.g. BS Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-ink mb-1">Year</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-brand-slate/10 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none"
                        placeholder="e.g. 2024"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {data.education.length === 0 && (
                <p className="text-brand-slate text-sm text-center py-4">No education added yet.</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-brand-ink mb-4 flex items-center">
              <ZapIcon className="w-5 h-5 mr-2" /> Skills
            </h2>
            <div>
              <textarea
                value={data.skills}
                onChange={(e) => {
                  setIsDirty(true);
                  setData((prev) => ({ ...prev, skills: e.target.value }));
                }}
                className="w-full px-4 py-2 bg-brand-mist border-none rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-shadow h-24 resize-none"
                placeholder="List your skills separated by commas (e.g. JavaScript, React, Node.js...)"
              />
            </div>
          </Card>
        </div>

        {/* Live Preview / PDF Area */}
        <div className="flex-1 lg:max-w-3xl">
          <div className="sticky top-8 bg-white p-8 lg:p-10 shadow-sm border border-brand-slate/20 min-h-[800px] print:m-0 print:border-none print:shadow-none print:w-full font-serif">
            {/* Resume Content */}
            <div className="border-b-2 border-gray-800 pb-6 mb-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                {data.basics.name || "Your Name"}
              </h1>
              <div className="text-sm text-gray-600 space-x-4">
                {data.basics.email && <span>{data.basics.email}</span>}
                {data.basics.phone && (
                  <>
                    <span>•</span>
                    <span>{data.basics.phone}</span>
                  </>
                )}
              </div>
            </div>

            {data.basics.summary && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
                  Summary
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {data.basics.summary}
                </p>
              </div>
            )}

            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
                  Experience
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <span className="text-xs font-semibold text-gray-600">
                          {exp.startDate} {exp.startDate && exp.endDate && "—"} {exp.endDate}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-2">{exp.company}</div>
                      {exp.description && (
                        <p className="text-sm text-gray-700 whitespace-pre-wrap pl-4 border-l-2 border-gray-200">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
                  Education
                </h2>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline">
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                        <div className="text-sm text-gray-700">{edu.degree}</div>
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.skills && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
                  Skills
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {data.skills}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper icons
const UserIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const BriefcaseIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const GraduationCapIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.33a2 2 0 0 0-1.66 0L2.6 7.08a2 2 0 0 0 0 3.832l8.57 3.698a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
);
const ZapIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

export default ResumeBuilder;
