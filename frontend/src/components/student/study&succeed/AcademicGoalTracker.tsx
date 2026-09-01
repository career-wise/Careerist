import React, { useState } from "react";
import {
  Target,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar,
  Edit,
  Trash2,
  BookOpen,
  Award
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

const AcademicGoalTracker: React.FC = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Maintain 3.8 GPA",
      description: "Keep my cumulative GPA above 3.8 for college applications",
      category: "GPA",
      targetLabel: getRelativeTimeLabel(45),
      progress: 85,
      status: "in-progress",
      priority: "high",
    },
    {
      id: 2,
      title: "Complete AP Chemistry",
      description: "Finish AP Chemistry with a grade of A- or better",
      category: "Course",
      targetLabel: getRelativeTimeLabel(30),
      progress: 70,
      status: "in-progress",
      priority: "high",
    },
    {
      id: 3,
      title: "SAT Score 1450+",
      description: "Achieve a SAT score of 1450 or higher",
      category: "Test Prep",
      targetLabel: getRelativeTimeLabel(-10),
      progress: 100,
      status: "completed",
      priority: "high",
    },
    {
      id: 4,
      title: "Complete 40 Community Service Hours",
      description: "Volunteer at local animal shelter and food bank",
      category: "Extracurricular",
      targetLabel: getRelativeTimeLabel(15),
      progress: 60,
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 5,
      title: "Join National Honor Society",
      description: "Meet requirements and apply for NHS membership",
      category: "Achievement",
      targetLabel: getRelativeTimeLabel(-20),
      progress: 90,
      status: "in-progress",
      priority: "medium",
    },
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

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
      value: goals.filter((g) => g.status === "completed").length,
      icon: CheckCircle,
      bgColor: "bg-brand-neon/10",
      iconColor: "text-brand-darkgreen"
    },
    {
      label: "In Progress",
      value: goals.filter((g) => g.status === "in-progress").length,
      icon: Clock,
      bgColor: "bg-brand-mist border border-brand-slate/10",
      iconColor: "text-brand-ink"
    },
    {
      label: "Avg Progress",
      value: `${Math.round(
        goals.reduce((acc, g) => acc + g.progress, 0) / goals.length
      )}%`,
      icon: TrendingUp,
      bgColor: "bg-brand-darkgreen/10",
      iconColor: "text-brand-darkgreen"
    },
  ];

  const filteredGoals = goals.filter((goal) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "in-progress") return goal.status === "in-progress";
    if (activeFilter === "completed") return goal.status === "completed";
    if (activeFilter === "high-priority") return goal.priority === "high";
    return true;
  });

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
                <BookOpen className="w-8 h-8 text-brand-neon" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Academic Goal Tracker
                </h1>
                <p className="text-brand-mist/90 text-lg">
                  Track your academic progress and stay on top of your goals
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
              <div className="text-3xl font-bold text-brand-ink mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-brand-slate">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Goals Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {[
            { id: "all", label: "All Goals" },
            { id: "in-progress", label: "In Progress" },
            { id: "completed", label: "Completed" },
            { id: "high-priority", label: "High Priority" }
          ].map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "primary" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`border-brand-slate/20 rounded-xl px-5 py-2.5 font-semibold ${
                activeFilter === filter.id 
                  ? "bg-brand-ink text-white shadow-md border-transparent" 
                  : "bg-white text-brand-slate hover:bg-brand-mist hover:text-brand-ink"
              }`}
            >
              {filter.label}
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
                    <h3 className="text-xl font-bold text-brand-ink">
                      {goal.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-wide ${getStatusColor(
                        goal.status
                      )}`}
                    >
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
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full rounded-full h-2 bg-brand-mist border border-brand-slate/5 overflow-hidden">
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
                </div>

                <div className="flex items-center space-x-2 md:ml-4 w-full md:w-auto justify-end">
                  <Button variant="outline" className="border-brand-slate/20 hover:bg-brand-mist text-brand-ink">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Motivational Section */}
        <div className="mt-8 bg-brand-ink rounded-3xl p-8 border border-brand-ink shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="text-center relative z-10">
            <Award className="h-16 w-16 text-brand-neon mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Keep Going!
            </h3>
            <p className="text-brand-mist/80 mb-8 max-w-lg mx-auto font-medium">
              You're making great progress on your academic goals. Stay focused
              and keep pushing forward!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button className="bg-brand-neon text-brand-ink hover:bg-white border-none shadow-lg font-bold w-full sm:w-auto">
                <BookOpen className="h-5 w-5 mr-2" />
                View Study Tips
              </Button>
              <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-bold w-full sm:w-auto">
                <Clock className="h-5 w-5 mr-2" />
                Time Management Guide
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
                  Goal creation form will be implemented here. For now, you can explore the existing goals.
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

export default AcademicGoalTracker;
