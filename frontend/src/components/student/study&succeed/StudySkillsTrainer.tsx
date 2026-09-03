import React, { useState } from "react";
import {
 Brain,
 Clock,
 BookOpen,
 CheckCircle,
 Play,
 Pause,
 RotateCcw,
 Target,
 TrendingUp,
 Award,
 Calendar,
 Star,
 Lightbulb,
 Timer,
 Coffee,
 Focus,
 Book,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import RecommendationsBanner from "../../shared/RecommendationsBanner";

const StudySkillsTrainer: React.FC = () => {
 const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
 const [isRunning, setIsRunning] = useState(false);
 const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

 const studyTechniques = [
 {
 id: "pomodoro",
 name: "Pomodoro Technique",
 description: "Study for 25 minutes, then take a 5-minute break",
 duration: "25 min",
 icon: Timer,
 difficulty: "Beginner",
 effectiveness: 90,
 steps: [
 "Set timer for 25 minutes",
 "Focus on one task completely",
 "Take a 5-minute break",
 "Repeat 3-4 times, then longer break"
 ]
 },
 {
 id: "active-recall",
 name: "Active Recall",
 description: "Test yourself on material without looking at notes",
 duration: "Variable",
 icon: Brain,
 difficulty: "Intermediate",
 effectiveness: 95,
 steps: [
 "Read material once",
 "Close your notes",
 "Write down everything you remember",
 "Check and fill gaps"
 ]
 },
 {
 id: "spaced-repetition",
 name: "Spaced Repetition",
 description: "Review material at increasing intervals",
 duration: "Ongoing",
 icon: Calendar,
 difficulty: "Advanced",
 effectiveness: 88,
 steps: [
 "Review material today",
 "Review again in 3 days",
 "Review again in 1 week",
 "Review again in 2 weeks"
 ]
 },
 {
 id: "cornell-notes",
 name: "Cornell Notes",
 description: "Structured note-taking system with cues and summary",
 duration: "During class",
 icon: Book,
 difficulty: "Beginner",
 effectiveness: 85,
 steps: [
 "Divide page into 3 sections",
 "Take notes in main area",
 "Add cues in left margin",
 "Summarize at bottom"
 ]
 },
 ];

 const studyHabits = [
 { habit: "Set specific study goals", completed: true },
 { habit: "Create a dedicated study space", completed: true },
 { habit: "Use active learning techniques", completed: false },
 { habit: "Take regular breaks", completed: true },
 { habit: "Review material regularly", completed: false },
 { habit: "Get adequate sleep", completed: true },
 ];

 const weeklyStats = [
 { label: "Study Sessions", value: 18, target: 20, icon: Target },
 { label: "Total Hours", value: 12, target: 15, icon: Clock },
 { label: "Techniques Used", value: 3, target: 4, icon: Brain },
 { label: "Goal Achievement", value: 85, target: 90, icon: TrendingUp },
 ];

 const formatTime = (seconds: number) => {
 const mins = Math.floor(seconds / 60);
 const secs = seconds % 60;
 return `${mins.toString().padStart(2, "0")}:${secs
 .toString()
 .padStart(2, "0")}`;
 };

 const startTimer = () => {
 setIsRunning(true);
 // In a real app, you'd implement the actual timer logic here
 };

 const pauseTimer = () => {
 setIsRunning(false);
 };

 const resetTimer = () => {
 setIsRunning(false);
 setTimeLeft(25 * 60);
 };

 const selectTechnique = (techniqueId: string) => {
 setSelectedTechnique(selectedTechnique === techniqueId ? null : techniqueId);
 };

 return (
 <div className="min-h-screen bg-brand-mist/30 p-6">
 <div className="max-w-7xl mx-auto space-y-8">
 
 {/* Header */}
 <div className="bg-gradient-to-r from-brand-ink to-brand-darkgreen rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
 <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-neon opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
 
 <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
 <Brain className="w-8 h-8 text-brand-neon" />
 </div>
 <div>
 <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
 Study Skills Trainer
 </h1>
 <p className="text-brand-mist/90 text-lg">
 Master effective study techniques and build better habits
 </p>
 </div>
 </div>
 </div>
 </div>

 <RecommendationsBanner targetFeature="study_succeed" />

 {/* Weekly Progress */}
 <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-6 4xl:grid-cols-8 gap-6">
 {weeklyStats.map((stat, index) => (
 <Card key={index} className="text-center p-6 border-brand-slate/10 hover:shadow-xl transition-all duration-300">
 <div className="w-14 h-14 bg-brand-mist rounded-2xl flex items-center justify-center mx-auto mb-4">
 <stat.icon className="h-7 w-7 text-brand-ink" />
 </div>
 <div className="text-3xl font-bold text-brand-ink mb-1">
 {stat.value}{typeof stat.value === 'number' && stat.label === 'Goal Achievement' ? '%' : ''}
 </div>
 <div className="text-sm font-medium text-brand-slate mb-4">{stat.label}</div>
 
 <div className="w-full rounded-full h-2 bg-brand-mist border border-brand-slate/5 overflow-hidden">
 <div
 className="bg-brand-neon h-full rounded-full transition-all duration-1000"
 style={{ width: `${(stat.value / stat.target) * 100}%` }}
 ></div>
 </div>
 <div className="text-xs font-bold text-brand-slate mt-2">
 Target: {stat.target}{typeof stat.target === 'number' && stat.label === 'Goal Achievement' ? '%' : ''}
 </div>
 </Card>
 ))}
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <div className="lg:col-span-2 space-y-8">
 {/* Pomodoro Timer */}
 <Card className="p-8 border-brand-slate/10 shadow-sm relative overflow-hidden">
 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
 
 <h2 className="text-2xl font-bold text-brand-ink mb-8 flex items-center relative z-10">
 <Timer className="h-6 w-6 text-brand-neon mr-3" />
 Pomodoro Timer
 </h2>
 <div className="text-center relative z-10">
 <div className="relative inline-block mb-8">
 <div className="w-56 h-56 bg-brand-ink rounded-full flex items-center justify-center mx-auto shadow-2xl relative z-10 border border-brand-ink">
 <div className="text-6xl font-bold text-white tracking-wider">
 {formatTime(timeLeft)}
 </div>
 </div>
 {isRunning && (
 <div className="absolute inset-0 border-4 border-brand-neon rounded-full animate-ping opacity-20"></div>
 )}
 {isRunning && (
 <div className="absolute inset-0 border-2 border-brand-neon rounded-full animate-pulse"></div>
 )}
 </div>
 
 <div className="flex justify-center space-x-4 mb-8">
 <Button 
 onClick={startTimer} 
 disabled={isRunning}
 className="bg-brand-neon hover:bg-brand-darkgreen text-brand-ink hover:text-white font-bold px-8 shadow-md"
 >
 <Play className="h-4 w-4 mr-2" />
 Start
 </Button>
 <Button 
 variant="outline" 
 onClick={pauseTimer} 
 disabled={!isRunning}
 className="border-brand-slate/20 text-brand-ink hover:bg-brand-mist px-8"
 >
 <Pause className="h-4 w-4 mr-2" />
 Pause
 </Button>
 <Button 
 variant="outline" 
 onClick={resetTimer}
 className="border-brand-slate/20 text-brand-ink hover:bg-brand-mist px-8"
 >
 <RotateCcw className="h-4 w-4 mr-2" />
 Reset
 </Button>
 </div>

 <div className="bg-brand-mist p-5 rounded-2xl border border-brand-slate/10 text-left">
 <h4 className="font-bold text-brand-ink mb-3 flex items-center gap-2">
 <Lightbulb className="w-5 h-5 text-brand-neon" />
 How it works
 </h4>
 <div className="text-sm font-medium text-brand-slate space-y-2 pl-7">
 <div className="relative"><span className="absolute -left-5 top-1.5 w-1.5 h-1.5 rounded-full bg-brand-neon"></span>Work for 25 minutes with full focus</div>
 <div className="relative"><span className="absolute -left-5 top-1.5 w-1.5 h-1.5 rounded-full bg-brand-neon"></span>Take a 5-minute break</div>
 <div className="relative"><span className="absolute -left-5 top-1.5 w-1.5 h-1.5 rounded-full bg-brand-neon"></span>After 4 cycles, take a 15-30 minute break</div>
 </div>
 </div>
 </div>
 </Card>

 {/* Study Techniques */}
 <Card className="p-8 border-brand-slate/10 shadow-sm">
 <h2 className="text-2xl font-bold text-brand-ink mb-6 flex items-center">
 <Brain className="h-6 w-6 text-brand-neon mr-3" />
 Study Techniques
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-6">
 {studyTechniques.map((technique, index) => (
 <div 
 key={index} 
 className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
 selectedTechnique === technique.id 
 ? 'bg-brand-mist border-brand-neon shadow-md' 
 : 'bg-white border-brand-slate/10 hover:border-brand-neon/50 hover:shadow-md'
 }`}
 onClick={() => selectTechnique(technique.id)}
 >
 <div className="flex items-start justify-between mb-4">
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
 selectedTechnique === technique.id ? 'bg-brand-neon/20' : 'bg-brand-mist'
 } transition-colors`}>
 <technique.icon className={`w-6 h-6 ${
 selectedTechnique === technique.id ? 'text-brand-darkgreen' : 'text-brand-ink'
 } transition-colors`} />
 </div>
 <div className="flex flex-col items-end gap-2">
 <span className="text-xs font-bold px-2.5 py-1 bg-brand-mist border border-brand-slate/10 rounded-lg text-brand-slate uppercase tracking-wide">
 {technique.difficulty}
 </span>
 <div className="flex items-center bg-brand-mist border border-brand-slate/10 px-2.5 py-1 rounded-lg">
 <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
 <span className="text-xs font-bold text-brand-ink ml-1.5">
 {technique.effectiveness}%
 </span>
 </div>
 </div>
 </div>
 
 <h3 className="font-bold text-lg text-brand-ink mb-2">
 {technique.name}
 </h3>
 <p className="text-sm font-medium text-brand-slate mb-4">
 {technique.description}
 </p>
 
 <div className="flex items-center gap-2 text-sm font-semibold text-brand-slate bg-white px-3 py-1.5 rounded-lg border border-brand-slate/10 inline-flex">
 <Clock className="w-4 h-4 text-brand-darkgreen" />
 {technique.duration}
 </div>

 {selectedTechnique === technique.id && (
 <div className="mt-5 pt-5 border-t border-brand-slate/10 animate-in fade-in slide-in-from-top-2 duration-300">
 <h4 className="font-bold text-brand-ink mb-3">Steps:</h4>
 <ol className="text-sm font-medium text-brand-slate space-y-2.5">
 {technique.steps.map((step, stepIndex) => (
 <li key={stepIndex} className="flex items-start gap-3">
 <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-neon/20 text-brand-darkgreen flex items-center justify-center text-xs font-bold mt-0.5">
 {stepIndex + 1}
 </span>
 <span>{step}</span>
 </li>
 ))}
 </ol>
 </div>
 )}
 </div>
 ))}
 </div>
 </Card>

 {/* Study Tips */}
 <Card className="p-8 border-brand-slate/10 shadow-sm">
 <h2 className="text-2xl font-bold text-brand-ink mb-6 flex items-center">
 <Lightbulb className="h-6 w-6 text-brand-neon mr-3" />
 Daily Study Tips
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-6">
 {[
 {
 title: "Use the Feynman Technique",
 desc: "Explain concepts in simple terms as if teaching someone else. This reveals gaps in understanding.",
 icon: Brain,
 },
 {
 title: "Eliminate Distractions",
 desc: "Put your phone in another room and use website blockers during study time.",
 icon: Focus,
 },
 {
 title: "Take Strategic Breaks",
 desc: "Short breaks every 25-30 minutes help maintain focus and prevent burnout.",
 icon: Coffee,
 },
 {
 title: "Review Regularly",
 desc: "Review material within 24 hours, then again in 3 days, then weekly.",
 icon: Calendar,
 }
 ].map((tip, idx) => (
 <div key={idx} className="bg-brand-mist p-6 rounded-2xl border border-brand-slate/10 hover:shadow-md transition-shadow group">
 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-neon/10 transition-colors shadow-sm">
 <tip.icon className="h-6 w-6 text-brand-ink group-hover:text-brand-darkgreen transition-colors" />
 </div>
 <h3 className="font-bold text-brand-ink mb-2">
 {tip.title}
 </h3>
 <p className="text-sm font-medium text-brand-slate leading-relaxed">
 {tip.desc}
 </p>
 </div>
 ))}
 </div>
 </Card>
 </div>

 <div className="space-y-8">
 {/* Study Habits Checklist */}
 <Card className="p-6 border-brand-slate/10 shadow-sm">
 <h2 className="text-xl font-bold text-brand-ink mb-5 flex items-center">
 <CheckCircle className="h-6 w-6 text-brand-neon mr-3" />
 Study Habits
 </h2>
 <div className="space-y-2">
 {studyHabits.map((item, index) => (
 <div key={index} className="flex items-center space-x-3 p-3 hover:bg-brand-mist rounded-xl transition-colors cursor-pointer group">
 <CheckCircle
 className={`h-5 w-5 transition-colors ${
 item.completed ? "text-brand-neon" : "text-brand-slate/30 group-hover:text-brand-slate/60"
 }`}
 />
 <span
 className={`text-sm font-semibold transition-colors ${
 item.completed ? "text-brand-ink" : "text-brand-slate"
 }`}
 >
 {item.habit}
 </span>
 </div>
 ))}
 </div>
 <Button variant="outline" className="w-full mt-6 border-brand-slate/20 text-brand-ink hover:bg-brand-mist font-bold">
 Update Habits
 </Button>
 </Card>

 {/* Progress This Week */}
 <Card className="p-6 border-brand-slate/10 shadow-sm bg-brand-ink text-white relative overflow-hidden">
 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
 
 <h2 className="text-xl font-bold text-white mb-6 flex items-center relative z-10">
 <TrendingUp className="h-6 w-6 text-brand-neon mr-3" />
 This Week's Progress
 </h2>
 <div className="space-y-6 relative z-10">
 <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
 <div className="text-sm font-medium text-brand-mist/90">Study Sessions</div>
 <div className="text-xl font-bold text-brand-neon">18</div>
 </div>
 <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
 <div className="text-sm font-medium text-brand-mist/90">Total Time</div>
 <div className="text-xl font-bold text-brand-neon">12h</div>
 </div>
 <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
 <div className="text-sm font-medium text-brand-mist/90">Goal Achievement</div>
 <div className="text-xl font-bold text-brand-neon">85%</div>
 </div>
 </div>
 
 <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
 <div className="flex items-center justify-between text-sm mb-3">
 <span className="font-medium text-brand-mist/90">Weekly Goal Progress</span>
 <span className="font-bold text-white">85%</span>
 </div>
 <div className="w-full rounded-full h-2.5 bg-black/20 overflow-hidden">
 <div className="bg-brand-neon h-full rounded-full" style={{ width: '85%' }}></div>
 </div>
 </div>
 </Card>

 {/* Quick Actions */}
 <Card className="p-6 border-brand-slate/10 shadow-sm">
 <h2 className="text-xl font-bold text-brand-ink mb-5">Quick Actions</h2>
 <div className="space-y-3">
 <Button className="w-full justify-start border-brand-slate/20 hover:bg-brand-mist font-semibold text-brand-ink py-4" variant="outline">
 <BookOpen className="h-5 w-5 mr-3 text-brand-darkgreen" />
 Create Study Plan
 </Button>
 <Button className="w-full justify-start border-brand-slate/20 hover:bg-brand-mist font-semibold text-brand-ink py-4" variant="outline">
 <Award className="h-5 w-5 mr-3 text-brand-darkgreen" />
 Track Study Goals
 </Button>
 <Button className="w-full justify-start border-brand-slate/20 hover:bg-brand-mist font-semibold text-brand-ink py-4" variant="outline">
 <Calendar className="h-5 w-5 mr-3 text-brand-darkgreen" />
 Schedule Study Time
 </Button>
 <Button className="w-full justify-start border-brand-slate/20 hover:bg-brand-mist font-semibold text-brand-ink py-4" variant="outline">
 <Brain className="h-5 w-5 mr-3 text-brand-darkgreen" />
 Take Focus Quiz
 </Button>
 </div>
 </Card>
 </div>
 </div>
 </div>
 </div>
 );
};

export default StudySkillsTrainer;