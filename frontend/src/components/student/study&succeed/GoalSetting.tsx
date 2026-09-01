import React, { useState } from "react";
import { 
  Target, 
  Plus, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Edit, 
  Trash2,
  Star,
  Flag,
  Award,
  BookOpen,
  Users,
  Zap,
  Lightbulb,
  GraduationCap,
  HeartPulse,
  Palette
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const getRelativeTimeLabel = (daysAhead: number) => {
  if (daysAhead < 0) return "Completed";
  if (daysAhead === 0) return "Due Today";
  if (daysAhead < 7) return `In ${daysAhead} days`;
  if (daysAhead < 30) return `In ${Math.floor(daysAhead / 7)} weeks`;
  return `In ${Math.floor(daysAhead / 30)} months`;
};

import { useAppContext } from "../../../contexts/AppContext";

export const GoalSetting: React.FC = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { state, addGoal, updateGoalStatus, deleteGoal } = useAppContext();
  const goals = state.goals;

  const categories = [
    { id: "all", name: "All Goals", icon: Target },
    { id: "academic", name: "Academic", icon: BookOpen },
    { id: "skill", name: "Skills", icon: Zap },
    { id: "personal", name: "Personal", icon: Users },
    { id: "career", name: "Career", icon: Award },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-brand-darkgreen bg-brand-neon/10 border-brand-neon/20";
      case "in-progress":
        return "text-brand-ink bg-brand-mist border-brand-slate/10";
      case "overdue":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-brand-slate bg-brand-slate/5 border-brand-slate/10";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-white";
      case "medium":
        return "border-l-yellow-500 bg-white";
      case "low":
        return "border-l-brand-neon bg-white";
      default:
        return "border-l-brand-slate bg-white";
    }
  };

  const filteredGoals = selectedCategory === "all" 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);

  const stats = [
    {
      label: "Total Goals",
      value: goals.length,
      icon: Target,
      bgColor: "bg-brand-mist",
      iconColor: "text-brand-ink"
    },
    {
      label: "Completed",
      value: goals.filter(g => g.status === "completed").length,
      icon: CheckCircle,
      bgColor: "bg-brand-neon/10",
      iconColor: "text-brand-darkgreen"
    },
    {
      label: "In Progress",
      value: goals.filter(g => g.status === "in-progress").length,
      icon: Clock,
      bgColor: "bg-brand-mist border border-brand-slate/10",
      iconColor: "text-brand-ink"
    },
    {
      label: "Avg Progress",
      value: `${Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%`,
      icon: TrendingUp,
      bgColor: "bg-brand-darkgreen/10",
      iconColor: "text-brand-darkgreen"
    },
  ];

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
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Goal Setting</h1>
                <p className="text-brand-mist/90 text-lg">
                  Set, track, and achieve your academic and personal goals
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddGoal(true)}
              className="bg-brand-neon text-brand-ink hover:bg-white border-none shadow-lg font-bold"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Goal
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-6 4xl:grid-cols-8 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 border-brand-slate/10 hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`h-7 w-7 ${stat.iconColor}`} />
              </div>
              <div className="text-3xl font-bold text-brand-ink mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-brand-slate">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "primary" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 border-brand-slate/20 rounded-xl px-5 py-2.5 ${
                selectedCategory === category.id 
                  ? "bg-brand-ink text-white shadow-md border-transparent" 
                  : "bg-white text-brand-slate hover:bg-brand-mist hover:text-brand-ink"
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span className="font-semibold">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {filteredGoals.map((goal) => (
            <Card
              key={goal.id}
              className={`border-l-4 ${getPriorityColor(goal.priority)} border-y-brand-slate/10 border-r-brand-slate/10 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 p-6">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-brand-ink">{goal.title}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(goal.status)} uppercase tracking-wide`}>
                      {goal.status.replace("-", " ")}
                    </span>
                    <span className="px-3 py-1 text-brand-slate font-semibold rounded-lg text-xs uppercase tracking-wide bg-brand-mist border border-brand-slate/10">
                      {goal.category}
                    </span>
                  </div>

                  <p className="text-brand-slate mb-6 text-sm md:text-base leading-relaxed">{goal.description}</p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-brand-slate font-medium mb-6">
                    <div className="flex items-center bg-brand-mist px-3 py-1.5 rounded-lg border border-brand-slate/10">
                      <Calendar className="h-4 w-4 mr-2 text-brand-darkgreen" />
                      {goal.targetLabel}
                    </div>
                    <div className="flex items-center bg-brand-mist px-3 py-1.5 rounded-lg border border-brand-slate/10">
                      <TrendingUp className="h-4 w-4 mr-2 text-brand-darkgreen" />
                      {goal.progress}%
                    </div>
                    <div className="flex items-center bg-brand-mist px-3 py-1.5 rounded-lg border border-brand-slate/10">
                      <Flag className={`h-4 w-4 mr-2 ${
                        (goal.priority || 'medium') === 'high' ? 'text-red-500' :
                        (goal.priority || 'medium') === 'medium' ? 'text-yellow-500' : 'text-brand-neon'
                      }`} />
                      <span className="capitalize">{goal.priority || 'medium'} Priority</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full rounded-full h-2 mb-6 bg-brand-mist border border-brand-slate/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        goal.status === "completed"
                          ? "bg-brand-darkgreen"
                          : goal.progress >= 75
                          ? "bg-brand-neon"
                          : goal.progress >= 50
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>

                  {/* Milestones */}
                  <div className="bg-brand-mist/50 p-5 rounded-xl border border-brand-slate/10">
                    <h4 className="font-bold text-brand-ink mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-brand-slate" />
                      Milestones
                    </h4>
                    <div className="space-y-3">
                      {goal.milestones?.map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className={`h-5 w-5 transition-colors ${
                            milestone.completed ? 'text-brand-neon' : 'text-brand-slate/30'
                          }`} />
                          <span className={`text-sm font-medium ${
                            milestone.completed ? 'text-brand-slate line-through' : 'text-brand-ink'
                          }`}>
                            {milestone.task}
                          </span>
                        </div>
                      ))}
                      {(!goal.milestones || goal.milestones.length === 0) && (
                        <p className="text-sm text-brand-slate">No milestones set.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 md:ml-4 w-full md:w-auto justify-end">
                  <Button variant="outline" className="border-brand-slate/20 hover:bg-brand-mist text-brand-ink">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50" onClick={() => deleteGoal(goal.id as string)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* SMART Goals Framework */}
        <div className="bg-gradient-to-br from-brand-mist to-white rounded-3xl p-8 border border-brand-slate/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <h2 className="text-2xl font-bold text-brand-ink mb-8 flex items-center relative z-10">
            <Lightbulb className="h-6 w-6 text-brand-neon mr-3" />
            SMART Goals Framework
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8 relative z-10">
            {[
              { letter: 'S', title: 'Specific', desc: 'Clear and well-defined' },
              { letter: 'M', title: 'Measurable', desc: 'Track your progress' },
              { letter: 'A', title: 'Achievable', desc: 'Realistic and attainable' },
              { letter: 'R', title: 'Relevant', desc: 'Aligned with your values' },
              { letter: 'T', title: 'Time-bound', desc: 'Has a deadline' }
            ].map((item, idx) => (
              <div key={idx} className="text-center bg-white p-6 rounded-2xl border border-brand-slate/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-brand-ink text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md font-bold text-xl">
                  {item.letter}
                </div>
                <h3 className="font-bold text-brand-ink mb-1">{item.title}</h3>
                <p className="text-xs text-brand-slate font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-slate/10 shadow-sm relative z-10 flex items-start gap-4">
            <div className="mt-1">
              <CheckCircle className="w-6 h-6 text-brand-neon" />
            </div>
            <div>
              <h4 className="font-bold text-brand-ink mb-2">Example SMART Goal:</h4>
              <p className="text-sm text-brand-slate leading-relaxed">
                "I will <strong className="text-brand-ink font-bold">improve my math grade from B to A</strong> (Specific & Measurable) 
                by <strong className="text-brand-ink font-bold">studying 1 hour daily and getting tutoring</strong> (Achievable & Relevant) 
                <strong className="text-brand-ink font-bold"> by the end of this semester</strong> (Time-bound)."
              </p>
            </div>
          </div>
        </div>

        {/* Goal Templates */}
        <div className="pt-4">
          <h2 className="text-2xl font-bold text-brand-ink mb-6">Goal Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-6">
            {[
              {
                title: "Academic Excellence",
                description: "Improve GPA and academic performance",
                icon: BookOpen,
              },
              {
                title: "Skill Development",
                description: "Learn new technical or soft skills",
                icon: Zap,
              },
              {
                title: "College Preparation",
                description: "Get ready for college applications",
                icon: GraduationCap,
              },
              {
                title: "Leadership Growth",
                description: "Develop leadership and teamwork skills",
                icon: Users,
              },
              {
                title: "Health & Wellness",
                description: "Maintain physical and mental health",
                icon: HeartPulse,
              },
              {
                title: "Creative Projects",
                description: "Complete artistic or creative endeavors",
                icon: Palette,
              },
            ].map((template, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-brand-slate/10 cursor-pointer hover:shadow-xl hover:border-brand-neon/50 transition-all duration-300 group flex flex-col items-center text-center"
                onClick={() => setShowAddGoal(true)}
              >
                <div className="w-16 h-16 bg-brand-mist rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-neon/10 transition-colors">
                  <template.icon className="w-8 h-8 text-brand-ink group-hover:text-brand-darkgreen transition-colors" />
                </div>
                <h3 className="font-bold text-brand-ink mb-2 group-hover:text-brand-neon transition-colors">{template.title}</h3>
                <p className="text-sm font-medium text-brand-slate">{template.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-8 bg-brand-ink rounded-3xl p-8 border border-brand-ink shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="text-center relative z-10">
            <Award className="h-16 w-16 text-brand-neon mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">
              You're Making Great Progress!
            </h3>
            <p className="text-brand-mist/80 mb-8 max-w-lg mx-auto font-medium">
              {goals.filter(g => g.status === "completed").length} goals completed this year. 
              Keep up the excellent work! Consistent effort leads to extraordinary results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button className="bg-brand-neon text-brand-ink hover:bg-white border-none shadow-lg font-bold w-full sm:w-auto">
                <TrendingUp className="h-5 w-5 mr-2" />
                View Progress Report
              </Button>
              <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-bold w-full sm:w-auto">
                <Star className="h-5 w-5 mr-2" />
                Share Achievement
              </Button>
            </div>
          </div>
        </div>

        {/* Add Goal Modal Placeholder */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-brand-ink/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full border-none shadow-2xl bg-white overflow-hidden">
              <div className="bg-brand-mist p-6 flex items-center justify-between border-b border-brand-slate/10">
                <h3 className="text-xl font-bold text-brand-ink flex items-center gap-2">
                  <Target className="w-5 h-5 text-brand-neon" />
                  Add New Goal
                </h3>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-brand-slate hover:text-brand-ink transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <p className="text-brand-slate mb-8 font-medium">
                  Goal creation form will be implemented here. For now, you can explore the existing goals and templates.
                </p>
                <Button onClick={() => setShowAddGoal(false)} className="w-full bg-brand-ink hover:bg-brand-darkgreen text-white font-bold py-3">
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};