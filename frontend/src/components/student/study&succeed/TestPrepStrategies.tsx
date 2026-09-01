import React, { useState } from "react";
import {
  FileText,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Star,
  Brain,
  GraduationCap,
  Lightbulb,
  Calendar
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const TestPrepStrategies: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState("SAT");

  const testTypes = [
    {
      name: "SAT",
      description: "College admission test",
      duration: "3 hours",
      sections: 4,
    },
    {
      name: "ACT",
      description: "Alternative college admission test",
      duration: "2h 55m",
      sections: 4,
    },
    {
      name: "AP Exams",
      description: "Advanced Placement tests",
      duration: "3 hours",
      sections: 2,
    },
    {
      name: "PSAT",
      description: "Practice SAT",
      duration: "2h 45m",
      sections: 3,
    },
  ];

  const strategies = [
    {
      title: "Know the Format",
      description: "Familiarize yourself with test structure and timing",
      icon: <FileText className="h-6 w-6 text-brand-darkgreen" />,
      tips: [
        "Review section breakdown and time limits",
        "Understand question types and formats",
        "Practice with official test materials",
      ],
    },
    {
      title: "Time Management",
      description: "Develop effective pacing strategies",
      icon: <Clock className="h-6 w-6 text-brand-darkgreen" />,
      tips: [
        "Practice with timed sections",
        "Learn when to skip difficult questions",
        "Allocate time for review at the end",
      ],
    },
    {
      title: "Content Review",
      description: "Master the subject matter",
      icon: <BookOpen className="h-6 w-6 text-brand-darkgreen" />,
      tips: [
        "Identify knowledge gaps early",
        "Use multiple study resources",
        "Focus on high-yield topics",
      ],
    },
    {
      title: "Practice Tests",
      description: "Simulate real testing conditions",
      icon: <Target className="h-6 w-6 text-brand-darkgreen" />,
      tips: [
        "Take full-length practice tests",
        "Analyze mistakes and patterns",
        "Track improvement over time",
      ],
    },
  ];

  const satSections = [
    {
      section: "Reading",
      duration: "65 minutes",
      questions: 52,
      description: "Reading comprehension passages",
      tips: [
        "Read passages actively",
        "Look for main ideas",
        "Use process of elimination",
      ],
      score: 720,
    },
    {
      section: "Writing & Language",
      duration: "35 minutes",
      questions: 44,
      description: "Grammar and editing skills",
      tips: [
        "Know common grammar rules",
        "Read for context",
        "Check for clarity",
      ],
      score: 680,
    },
    {
      section: "Math (No Calculator)",
      duration: "25 minutes",
      questions: 20,
      description: "Basic math concepts",
      tips: ["Memorize key formulas", "Practice mental math", "Show all work"],
      score: 650,
    },
    {
      section: "Math (Calculator)",
      duration: "55 minutes",
      questions: 38,
      description: "Advanced math problems",
      tips: [
        "Use calculator efficiently",
        "Check reasonableness",
        "Graph when helpful",
      ],
      score: 700,
    },
  ];

  const studyPlan = [
    {
      week: "Week 1-2",
      focus: "Diagnostic & Planning",
      tasks: [
        "Take practice test",
        "Identify weak areas",
        "Create study schedule",
      ],
    },
    {
      week: "Week 3-6",
      focus: "Content Review",
      tasks: [
        "Review math concepts",
        "Practice reading strategies",
        "Grammar rules study",
      ],
    },
    {
      week: "Week 7-10",
      focus: "Practice & Strategy",
      tasks: [
        "Timed section practice",
        "Full practice tests",
        "Strategy refinement",
      ],
    },
    {
      week: "Week 11-12",
      focus: "Final Prep",
      tasks: ["Review mistakes", "Light practice", "Test day preparation"],
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 700) return "text-brand-darkgreen bg-brand-neon/20 px-2 py-0.5 rounded";
    if (score >= 600) return "text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded";
    return "text-red-700 bg-red-100 px-2 py-0.5 rounded";
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
                <Target className="w-8 h-8 text-brand-neon" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Test Prep Strategies
                </h1>
                <p className="text-brand-mist/90 text-lg">
                  Master standardized tests with proven preparation techniques
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Selection */}
        <div className="flex flex-wrap gap-3">
          {testTypes.map((test) => (
            <Button
              key={test.name}
              variant={selectedTest === test.name ? "primary" : "outline"}
              className={selectedTest === test.name 
                ? "bg-brand-ink text-white font-bold hover:bg-brand-darkgreen shadow-md px-6 py-2 border-transparent"
                : "bg-white text-brand-slate font-semibold hover:bg-brand-mist hover:text-brand-ink border-brand-slate/20 px-6 py-2"
              }
              onClick={() => setSelectedTest(test.name)}
            >
              {test.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Test Overview */}
            <Card className="p-8 border-brand-slate/10 shadow-sm">
              <h2 className="text-2xl font-bold text-brand-ink mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-brand-neon" />
                {selectedTest} Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-6">
                <div className="text-center p-6 bg-brand-mist rounded-2xl border border-brand-slate/5 hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-neon/10 transition-colors shadow-sm">
                    <Clock className="h-6 w-6 text-brand-ink group-hover:text-brand-darkgreen transition-colors" />
                  </div>
                  <div className="font-bold text-brand-ink mb-1">Duration</div>
                  <div className="text-sm font-medium text-brand-slate">3 hours</div>
                </div>
                
                <div className="text-center p-6 bg-brand-mist rounded-2xl border border-brand-slate/5 hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-neon/10 transition-colors shadow-sm">
                    <FileText className="h-6 w-6 text-brand-ink group-hover:text-brand-darkgreen transition-colors" />
                  </div>
                  <div className="font-bold text-brand-ink mb-1">Sections</div>
                  <div className="text-sm font-medium text-brand-slate">4 sections</div>
                </div>
                
                <div className="text-center p-6 bg-brand-mist rounded-2xl border border-brand-slate/5 hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-neon/10 transition-colors shadow-sm">
                    <Star className="h-6 w-6 text-brand-ink group-hover:text-brand-darkgreen transition-colors" />
                  </div>
                  <div className="font-bold text-brand-ink mb-1">Max Score</div>
                  <div className="text-sm font-medium text-brand-slate">1600</div>
                </div>
              </div>
            </Card>

            {/* Section Breakdown */}
            {selectedTest === "SAT" && (
              <Card className="p-8 border-brand-slate/10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <h2 className="text-2xl font-bold text-brand-ink mb-6 flex items-center relative z-10">
                  <Brain className="w-6 h-6 mr-3 text-brand-neon" />
                  Section Breakdown
                </h2>
                <div className="space-y-6 relative z-10">
                  {satSections.map((section, index) => (
                    <div key={index} className="p-6 bg-white border border-brand-slate/10 rounded-2xl shadow-sm hover:border-brand-neon/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-brand-slate/10 gap-3">
                        <h3 className="text-lg font-bold text-brand-ink flex items-center">
                          <span className="w-6 h-6 rounded bg-brand-mist text-brand-ink text-xs flex items-center justify-center mr-3 font-bold border border-brand-slate/10">
                            {index + 1}
                          </span>
                          {section.section}
                        </h3>
                        <span className={`text-sm font-bold flex items-center gap-2 ${getScoreColor(section.score)}`}>
                          <TrendingUp className="w-4 h-4" />
                          Current: {section.score}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-4 mb-6">
                        <div className="bg-brand-mist p-3 rounded-xl border border-brand-slate/5">
                          <span className="text-brand-slate text-xs font-bold uppercase tracking-wider block mb-1">Time</span>
                          <span className="font-bold text-brand-ink">{section.duration}</span>
                        </div>
                        <div className="bg-brand-mist p-3 rounded-xl border border-brand-slate/5">
                          <span className="text-brand-slate text-xs font-bold uppercase tracking-wider block mb-1">Questions</span>
                          <span className="font-bold text-brand-ink">{section.questions}</span>
                        </div>
                        <div className="bg-brand-mist p-3 rounded-xl border border-brand-slate/5">
                          <span className="text-brand-slate text-xs font-bold uppercase tracking-wider block mb-1">Type</span>
                          <span className="font-bold text-brand-ink">{section.description}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-bold text-brand-ink mb-3 uppercase tracking-wide opacity-80">
                          Key Tips
                        </h4>
                        <ul className="text-sm font-medium text-brand-slate space-y-2">
                          {section.tips.map((tip, tipIndex) => (
                            <li
                              key={tipIndex}
                              className="flex items-start space-x-3 bg-brand-mist/50 p-2.5 rounded-lg border border-transparent hover:border-brand-slate/10 transition-colors"
                            >
                              <CheckCircle className="h-4 w-4 text-brand-darkgreen mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Study Strategies */}
            <Card className="p-8 border-brand-slate/10 shadow-sm">
              <h2 className="text-2xl font-bold text-brand-ink mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-brand-neon" />
                Study Strategies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-6">
                {strategies.map((strategy, index) => (
                  <div key={index} className="p-6 bg-brand-mist rounded-2xl border border-brand-slate/10 hover:shadow-md transition-shadow group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-brand-neon/10 transition-colors">
                        {strategy.icon}
                      </div>
                      <h3 className="font-bold text-brand-ink text-lg">
                        {strategy.title}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-brand-slate mb-5 pl-2 border-l-2 border-brand-slate/20">
                      {strategy.description}
                    </p>
                    <ul className="text-sm font-medium text-brand-slate space-y-2.5">
                      {strategy.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-brand-neon rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            {/* 12-Week Study Plan */}
            <Card className="p-8 border-brand-slate/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ink opacity-5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <h2 className="text-2xl font-bold text-brand-ink mb-6 flex items-center relative z-10">
                <Calendar className="w-6 h-6 mr-3 text-brand-neon" />
                12-Week Study Plan
              </h2>
              <div className="space-y-4 relative z-10">
                {studyPlan.map((phase, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-white border border-brand-slate/10 rounded-2xl hover:border-brand-neon/50 transition-colors shadow-sm group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-mist text-brand-ink border border-brand-slate/10 rounded-xl flex items-center justify-center text-lg font-bold group-hover:bg-brand-ink group-hover:text-white transition-colors">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                         <h3 className="font-bold text-brand-ink text-lg">
                           {phase.week}
                         </h3>
                         <span className="hidden sm:inline-block text-brand-slate/30">|</span>
                         <h4 className="text-brand-darkgreen font-bold bg-brand-neon/20 px-2.5 py-1 rounded-md text-sm inline-block self-start sm:self-auto">
                           {phase.focus}
                         </h4>
                      </div>
                      <ul className="text-sm font-medium text-brand-slate grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className="flex items-center space-x-2 bg-brand-mist px-3 py-2 rounded-lg border border-brand-slate/5"
                          >
                            <CheckCircle className="h-3.5 w-3.5 text-brand-darkgreen flex-shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Progress Tracker */}
            <Card className="p-6 border-brand-slate/10 shadow-sm bg-brand-ink text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <h2 className="text-xl font-bold text-white mb-6 flex items-center relative z-10">
                <TrendingUp className="h-6 w-6 text-brand-neon mr-3" />
                Progress Tracker
              </h2>
              <div className="space-y-6 relative z-10">
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-brand-mist/90">Practice Tests Taken</span>
                    <span className="font-bold text-white">6/10</span>
                  </div>
                  <div className="w-full rounded-full h-2.5 bg-black/20 overflow-hidden">
                    <div
                      className="bg-brand-neon h-full rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-brand-mist/90">Study Hours</span>
                    <span className="font-bold text-white">45/60</span>
                  </div>
                  <div className="w-full rounded-full h-2.5 bg-black/20 overflow-hidden">
                    <div
                      className="bg-green-400 h-full rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-brand-mist/90">Target Score Progress</span>
                    <span className="font-bold text-white">1420/1500</span>
                  </div>
                  <div className="w-full rounded-full h-2.5 bg-black/20 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border-brand-slate/10 shadow-sm">
              <h2 className="text-xl font-bold text-brand-ink mb-5">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Button className="w-full py-4 bg-brand-ink hover:bg-brand-darkgreen text-white font-bold shadow-md">
                  Take Practice Test
                </Button>
                <Button variant="outline" className="w-full py-4 border-brand-slate/20 hover:bg-brand-mist font-semibold text-brand-ink">
                  Review Mistakes
                </Button>
                <Button variant="outline" className="w-full py-4 border-brand-slate/20 hover:bg-brand-mist font-semibold text-brand-ink">
                  Study Flashcards
                </Button>
                <Button variant="outline" className="w-full py-4 border-brand-slate/20 hover:bg-brand-mist font-semibold text-brand-ink">
                  Time Management Tips
                </Button>
              </div>
            </Card>

            {/* Test Day Tips */}
            <Card className="p-6 border-brand-slate/10 shadow-sm bg-brand-mist/50">
              <h2 className="text-xl font-bold text-brand-ink mb-5">
                Test Day Tips
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white p-4 rounded-xl border border-brand-slate/5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-ink mb-1">Night Before</h3>
                    <p className="text-sm font-medium text-brand-slate">
                      Get plenty of sleep and prepare materials
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 bg-white p-4 rounded-xl border border-brand-slate/5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                     <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-ink mb-1">Arrive Early</h3>
                    <p className="text-sm font-medium text-brand-slate">
                      Get to the test center 30 minutes early
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 bg-white p-4 rounded-xl border border-brand-slate/5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-ink mb-1">Stay Calm</h3>
                    <p className="text-sm font-medium text-brand-slate">
                      Use breathing techniques to manage anxiety
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPrepStrategies;
