const fs = require('fs');
const files = [
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/explorer&discover/CollegeExplorer.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/explorer&discover/MajorExplorer.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/learn&develop/BasicTechSkills.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/learn&develop/CreativeSkills.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/learn&develop/OnlineCourses.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/learn&develop/ProjectIdeas.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/learn&develop/SoftSkills.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/prepareforfuture/AIInterviewSession.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/prepareforfuture/CareerPathPlanner.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/prepareforfuture/InterviewPracticeModal.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/prepareforfuture/InterviewPreparation.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/prepareforfuture/InterviewReport.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/prepareforfuture/InterviewSetup.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/resources/DocumentManager.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/study&succeed/AcademicGoalTracker.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/study&succeed/GoalSetting.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/study&succeed/StudyResources.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/study&succeed/StudySkillsTrainer.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/study&succeed/SubjectExplorer.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/study&succeed/TestPrepStrategies.tsx',
  'C:/Users/USER/Desktop/projects/Careerist/frontend/src/components/shared/landing/Testimonials.tsx'
];

for(let file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Custom logic for bg-gray-100 and bg-gray-200
  // we do this first before other replacements just in case
  content = content.replace(/className=(?:\"([^\"]*)\"|\{([^}]*)\})/g, (match, doubleQuoted, curlyQuoted) => {
    // some className are in strings, some in `{cx(...)}`
    // this regex might be tricky if there's nested quotes, but it's fine for simple strings.
    if (doubleQuoted !== undefined) {
      let classList = doubleQuoted;
      let classes = classList.split(' ').filter(Boolean);
      let newClasses = [];
      let hasBgGray100Or200 = false;
      
      for(let c of classes) {
        if (c === 'bg-gray-100' || c === 'bg-gray-200') {
          hasBgGray100Or200 = true;
        } else {
          newClasses.push(c);
        }
      }
      
      if (hasBgGray100Or200) {
        // is it a card? heuristic: padding and rounded
        let hasPadding = classes.some(c => c.startsWith('p-') || c.startsWith('px-') || c.startsWith('py-') || c === 'p');
        let hasRounded = classes.some(c => c.startsWith('rounded'));
        let hasBorder = classes.some(c => c.startsWith('border'));
        let isCard = hasPadding && hasRounded;
        
        if (isCard) {
          newClasses.push('bg-white');
          if (!hasBorder) {
            newClasses.push('border');
            newClasses.push('border-brand-slate/10');
          }
        } else {
          newClasses.push('bg-brand-slate/10');
        }
      }
      return 'className="' + newClasses.join(' ') + '"';
    } 
    return match; // If it's a template literal or object `{cx(...)}`, we might miss it. We'll fallback to simple replace for those.
  });

  // Fallback for any missed bg-gray-100/200 inside template strings
  content = content.replace(/bg-gray-(100|200)\b/g, 'bg-brand-slate/10');

  // Simple replacements
  content = content.replace(/bg-gray-50\b/g, 'bg-brand-mist');
  content = content.replace(/text-gray-(500|600|700)\b/g, 'text-brand-slate');
  content = content.replace(/border-gray-(100|200)\b/g, 'border-brand-slate/10');
  content = content.replace(/bg-brand-teal\b/g, 'bg-brand-neon');
  content = content.replace(/text-brand-teal\b/g, 'text-brand-neon');

  fs.writeFileSync(file, content, 'utf8');
}
console.log("Done.");
