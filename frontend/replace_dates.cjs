const fs = require('fs');

// 1. GoalSetting.tsx
const goalPath = 'c:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/study&succeed/GoalSetting.tsx';
let goalData = fs.readFileSync(goalPath, 'utf8');
if (!goalData.includes('getRelativeDate')) {
  goalData = goalData.replace('export const GoalSetting', 'const getRelativeDate = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().split(\'T\')[0]; };\n\nexport const GoalSetting');
  goalData = goalData.replace(/"2024-06-15"/g, 'getRelativeDate(30)');
  goalData = goalData.replace(/"2024-04-30"/g, 'getRelativeDate(15)');
  goalData = goalData.replace(/"2024-05-15"/g, 'getRelativeDate(20)');
  goalData = goalData.replace(/"2024-03-15"/g, 'getRelativeDate(-5)');
  fs.writeFileSync(goalPath, goalData, 'utf8');
}

// 2. AcademicGoalTracker.tsx
const acadPath = 'c:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/study&succeed/AcademicGoalTracker.tsx';
let acadData = fs.readFileSync(acadPath, 'utf8');
if (!acadData.includes('getRelativeDate')) {
  acadData = acadData.replace('export const AcademicGoalTracker', 'const getRelativeDate = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().split(\'T\')[0]; };\n\nexport const AcademicGoalTracker');
  acadData = acadData.replace(/"2024-06-15"/g, 'getRelativeDate(45)');
  acadData = acadData.replace(/"2024-05-30"/g, 'getRelativeDate(30)');
  acadData = acadData.replace(/"2024-03-15"/g, 'getRelativeDate(-10)');
  acadData = acadData.replace(/"2024-04-30"/g, 'getRelativeDate(15)');
  acadData = acadData.replace(/"2024-02-28"/g, 'getRelativeDate(-20)');
  fs.writeFileSync(acadPath, acadData, 'utf8');
}

// 3. DocumentManager.tsx
const docPath = 'c:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/resources/DocumentManager.tsx';
let docData = fs.readFileSync(docPath, 'utf8');
if (!docData.includes('getRelativeDate')) {
  docData = docData.replace('export const DocumentManager', 'const getRelativeDate = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().split(\'T\')[0]; };\n\nexport const DocumentManager');
  docData = docData.replace(/"2024-01-15"/g, 'getRelativeDate(-2)');
  docData = docData.replace(/"2024-01-10"/g, 'getRelativeDate(-7)');
  docData = docData.replace(/"2024-01-08"/g, 'getRelativeDate(-9)');
  docData = docData.replace(/"2024-01-05"/g, 'getRelativeDate(-12)');
  docData = docData.replace(/"2024-01-03"/g, 'getRelativeDate(-14)');
  docData = docData.replace(/"2024-01-02"/g, 'getRelativeDate(-15)');
  fs.writeFileSync(docPath, docData, 'utf8');
}

// 4. CollegeExplorer.tsx
const colPath = 'c:/Users/USER/Desktop/projects/Careerist/frontend/src/components/student/explorer&discover/CollegeExplorer.tsx';
let colData = fs.readFileSync(colPath, 'utf8');
if (!colData.includes('getFutureDateString')) {
  colData = colData.replace('export const CollegeExplorer', 'const getFutureDateString = (monthsAhead: number) => { const d = new Date(); d.setMonth(d.getMonth() + monthsAhead); return d.toLocaleDateString(\'en-US\', { month: \'short\', day: \'numeric\', year: \'numeric\' }); };\n\nexport const CollegeExplorer');
  colData = colData.replace(/"Jan 5, 2026"/g, 'getFutureDateString(5)');
  colData = colData.replace(/"Nov 30, 2025"/g, 'getFutureDateString(3)');
  colData = colData.replace(/"Jan 1, 2026"/g, 'getFutureDateString(4)');
  colData = colData.replace(/"Jan 3, 2026"/g, 'getFutureDateString(4)');
  colData = colData.replace(/"Feb 1, 2026"/g, 'getFutureDateString(6)');
  fs.writeFileSync(colPath, colData, 'utf8');
}
console.log('Completed replacements.');
