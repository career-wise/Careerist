const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'student', 'prepareforfuture', 'CareerPathPlanner.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Chunk 1: State
content = content.replace(
  /const \[loading, setLoading\] = useState\(true\);/,
  `const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [customRoadmap, setCustomRoadmap] = useState<any>(null);`
);

// Chunk 2: Load Profile
content = content.replace(
  /const profile = await profileService\.getProfile\(session\.user\.id\);\n\s*setPersona\(profile\?\.persona \|\| "student"\);/,
  `const profile = await profileService.getProfile(session.user.id);
          setPersona(profile?.persona || "student");
          if (profile?.onboarding_answers?.career_roadmap) {
            setCustomRoadmap(profile.onboarding_answers.career_roadmap);
          }`
);

// Chunk 3: currentRoadmap and handleGenerate
content = content.replace(
  /const currentRoadmap = persona === "graduate" \? graduateRoadmap : studentRoadmap;/,
  `const handleGenerate = async () => {
    try {
      setGenerating(true);
      const rm = await profileService.generateCareerRoadmap();
      setCustomRoadmap(rm);
    } catch (e) {
      console.error(e);
      alert("Failed to generate roadmap.");
    } finally {
      setGenerating(false);
    }
  };

  const baseRoadmap = persona === "graduate" ? graduateRoadmap : studentRoadmap;
  const currentRoadmap = customRoadmap ? {
    ...baseRoadmap,
    title: customRoadmap.title || baseRoadmap.title,
    branches: {
      ...baseRoadmap.branches,
      level1Branches: baseRoadmap.branches.level1Branches.map((b: any, i: number) => ({ ...b, label: customRoadmap.branches?.level1Branches?.[i]?.label || b.label })),
      level2Branches: baseRoadmap.branches.level2Branches.map((b: any, i: number) => ({ ...b, label: customRoadmap.branches?.level2Branches?.[i]?.label || b.label })),
      level3Branches: baseRoadmap.branches.level3Branches.map((b: any, i: number) => ({ ...b, label: customRoadmap.branches?.level3Branches?.[i]?.label || b.label })),
      level4Branches: baseRoadmap.branches.level4Branches.map((b: any, i: number) => ({ ...b, label: customRoadmap.branches?.level4Branches?.[i]?.label || b.label })),
      level5Branches: baseRoadmap.branches.level5Branches.map((b: any, i: number) => ({ ...b, label: customRoadmap.branches?.level5Branches?.[i]?.label || b.label })),
    },
    infoBoxes: baseRoadmap.infoBoxes.map((b: any, i: number) => ({
      ...b,
      title: customRoadmap.infoBoxes?.[i]?.title || b.title,
      description: customRoadmap.infoBoxes?.[i]?.description || b.description,
    }))
  } : baseRoadmap;`
);

// Chunk 4: Button update
content = content.replace(
  /<Button className="bg-gradient-to-r from-brand-ink to-brand-darkgreen hover:from-brand-darkgreen hover:to-brand-ink border-none">\s*<Sparkles className="w-4 h-4 mr-2" \/>\s*Personalize\s*<\/Button>/,
  `<Button 
                onClick={handleGenerate}
                disabled={generating}
                className="bg-gradient-to-r from-brand-ink to-brand-darkgreen hover:from-brand-darkgreen hover:to-brand-ink border-none">
                <Sparkles className="w-4 h-4 mr-2" />
                {generating ? "Generating..." : (customRoadmap ? "Regenerate" : "Personalize")}
              </Button>`
);

// Chunk 5: Canvas wrapper
content = content.replace(
  /\{\/\* Roadmap Canvas \*\/\}\n\s*<div className="bg-white rounded-3xl shadow-xl p-12 relative overflow-hidden border border-brand-slate\/10">/,
  `{/* Roadmap Canvas */}
        {!customRoadmap && !generating ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-brand-slate/10 py-32">
             <Map className="w-16 h-16 text-brand-slate mx-auto mb-6 opacity-50" />
             <h2 className="text-2xl font-bold text-brand-ink mb-4">Your Career Roadmap Awaits</h2>
             <p className="text-brand-slate mb-8 max-w-lg mx-auto">Click below to generate a personalized career plan based on your onboarding answers and profile.</p>
             <Button onClick={handleGenerate} className="bg-brand-neon text-brand-ink px-8 py-3 rounded-full text-lg shadow-lg hover:bg-brand-neon/90 font-bold">
               <Sparkles className="w-5 h-5 mr-2 inline" />
               Generate AI Roadmap
             </Button>
          </div>
        ) : generating ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-brand-slate/10 py-32 flex flex-col items-center">
             <div className="w-16 h-16 border-4 border-brand-neon border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
             <h2 className="text-2xl font-bold text-brand-ink mb-4">Analyzing Your Profile...</h2>
             <p className="text-brand-slate max-w-lg mx-auto animate-pulse">Our AI is designing the perfect roadmap for your unique skills and goals.</p>
          </div>
        ) : (
        <div className="bg-white rounded-3xl shadow-xl p-12 relative overflow-hidden border border-brand-slate/10">`
);

// End canvas wrapper
content = content.replace(
  /<\/div>\n\s*\{\/\* Legend \*\/\}/,
  `</div>\n        )}\n\n        {/* Legend */}`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated CareerPathPlanner.tsx");
