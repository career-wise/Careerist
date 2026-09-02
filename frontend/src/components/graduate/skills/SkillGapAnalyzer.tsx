import React, { useState, useEffect } from "react";
import { AlertCircle, Target, CheckCircle2, ChevronRight, XCircle, Search } from "lucide-react";
import { authService } from "../../../lib/auth";
import { profileService } from "../../../services/profileService";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

// Static reference table for role skills
const ROLE_SKILLS_DB: Record<string, string[]> = {
  "Software Engineering (Full Stack)": [
    "JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "AWS", "REST APIs", "Docker", "HTML/CSS"
  ],
  "Data Science / Analytics": [
    "Python", "R", "SQL", "Pandas", "Machine Learning", "Tableau", "Data Visualization", "Statistics", "Jupyter"
  ],
  "Product Management": [
    "Agile", "Jira", "Strategy", "User Research", "Wireframing", "Data Analysis", "Roadmapping", "A/B Testing"
  ],
  "Marketing & Growth": [
    "SEO", "Content Strategy", "Google Analytics", "Social Media", "CRM", "Copywriting", "Email Marketing", "A/B Testing"
  ],
  "Sales & Business Development": [
    "CRM", "Salesforce", "Cold Calling", "Negotiation", "Lead Generation", "Account Management", "B2B Sales"
  ],
  "HR / Recruiting": [
    "ATS", "Sourcing", "Employee Relations", "Onboarding", "Interviewing", "Conflict Resolution", "HRIS"
  ],
  "UX/UI Design": [
    "Figma", "User Research", "Wireframing", "Prototyping", "UI Design", "Adobe Creative Suite", "Usability Testing"
  ]
};

const SkillGapAnalyzer: React.FC = () => {
  const [targetRole, setTargetRole] = useState<string>("");
  const [currentSkillsInput, setCurrentSkillsInput] = useState<string>("");
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileSkills = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          const profile = await profileService.getProfile(session.user.id);
          const savedSkills = profile?.onboarding_answers?.resumeData?.skills;
          if (savedSkills) {
            setCurrentSkillsInput(savedSkills);
          }
        }
      } catch (err) {
        console.error("Failed to load profile skills", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfileSkills();
  }, []);

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

  const currentSkillsArray = currentSkillsInput
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);

  const requiredSkills = targetRole ? ROLE_SKILLS_DB[targetRole] : [];
  
  const matchedSkills = requiredSkills.filter((reqSkill) =>
    currentSkillsArray.some((curSkill) => curSkill.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(curSkill))
  );

  const gapSkills = requiredSkills.filter((reqSkill) => !matchedSkills.includes(reqSkill));

  // Determine an overall readiness score (just a visual estimation based on matching)
  const matchPercentage = requiredSkills.length > 0 
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100) 
    : 0;

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1200px] mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center text-brand-slate text-sm font-medium mb-2">
          <span>Skills & Learning</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-brand-ink">Skill Gap Analyzer</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-brand-ink">Skill Gap Analyzer</h1>
        <p className="text-brand-slate mt-1">Compare your current skills against common requirements for your target role.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-brand-ink mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" /> 1. Select Target Role
            </h2>
            <select
              value={targetRole}
              onChange={(e) => {
                setTargetRole(e.target.value);
                setAnalyzed(false);
              }}
              className="w-full px-4 py-3 bg-brand-mist border-none rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-brand-ink"
            >
              <option value="" disabled>Choose a role category...</option>
              {Object.keys(ROLE_SKILLS_DB).map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-brand-ink mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" /> 2. Your Current Skills
            </h2>
            <p className="text-xs text-brand-slate mb-3">
              We've pre-filled this from your Resume Builder if available. Feel free to edit.
            </p>
            <textarea
              value={currentSkillsInput}
              onChange={(e) => {
                setCurrentSkillsInput(e.target.value);
                setAnalyzed(false);
              }}
              className="w-full px-4 py-3 bg-brand-mist border-none rounded-xl focus:ring-2 focus:ring-brand-primary outline-none h-32 resize-none text-brand-ink"
              placeholder="e.g. JavaScript, React, Python, Data Analysis..."
            />
          </Card>

          <Button 
            variant="primary" 
            className="w-full py-4 text-lg"
            onClick={handleAnalyze}
            disabled={!targetRole}
          >
            <Search className="w-5 h-5 mr-2" />
            Analyze My Gaps
          </Button>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2">
          {!analyzed ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-brand-slate/20 rounded-2xl bg-white/50">
              <Target className="w-16 h-16 text-brand-slate/30 mb-4" />
              <h3 className="text-xl font-bold text-brand-slate mb-2">Ready for Analysis</h3>
              <p className="text-brand-slate max-w-sm">
                Select your target role and confirm your current skills on the left to see what you're missing.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Disclaimer Alert */}
              <div className="flex items-start p-4 bg-blue-50 text-blue-800 rounded-xl">
                <AlertCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm">
                  <strong>Disclaimer:</strong> This is a starting-point estimate based on a static industry reference. 
                  It is not an exhaustive list of live market requirements. Every job description is unique.
                </p>
              </div>

              {/* Match Score */}
              <Card className="p-6 bg-gradient-to-br from-brand-ink to-gray-800 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium opacity-80 mb-1">Estimated Readiness</h3>
                    <p className="text-2xl font-bold">{targetRole}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center justify-center w-24 h-24 rounded-full border-4 border-brand-primary bg-white/10">
                    <span className="text-3xl font-bold text-brand-primary">{matchPercentage}%</span>
                  </div>
                </div>
              </Card>

              {/* Match & Gap Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-t-4 border-green-500">
                  <h3 className="text-lg font-bold text-brand-ink mb-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" /> 
                    Matched Skills ({matchedSkills.length})
                  </h3>
                  {matchedSkills.length > 0 ? (
                    <ul className="space-y-3">
                      {matchedSkills.map((skill) => (
                        <li key={skill} className="flex items-center text-sm font-medium text-brand-slate">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-brand-slate italic">No matching skills found.</p>
                  )}
                </Card>

                <Card className="p-6 border-t-4 border-red-400">
                  <h3 className="text-lg font-bold text-brand-ink mb-4 flex items-center">
                    <XCircle className="w-5 h-5 mr-2 text-red-400" /> 
                    Skill Gaps ({gapSkills.length})
                  </h3>
                  {gapSkills.length > 0 ? (
                    <ul className="space-y-3">
                      {gapSkills.map((skill) => (
                        <li key={skill} className="flex items-center text-sm font-medium text-brand-slate">
                          <AlertCircle className="w-4 h-4 mr-2 text-red-400" /> {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-brand-slate italic">You have all the core skills!</p>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
