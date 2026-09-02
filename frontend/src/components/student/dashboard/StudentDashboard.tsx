import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import StudentSidebar from "./StudentSidebar";
import StudentDashboardHome from "./StudentDashboardHome";

// Components that exist
import CollegeExplorer from "../explorer&discover/CollegeExplorer";
import MajorExplorer from "../explorer&discover/MajorExplorer";
import BasicTechSkills from "../learn&develop/BasicTechSkills";
import SoftSkills from "../learn&develop/SoftSkills";
import CreativeSkills from "../learn&develop/CreativeSkills";
import OnlineCourses from "../learn&develop/OnlineCourses";
import ProjectIdeas from "../learn&develop/ProjectIdeas";
import InterviewPreparation from "../prepareforfuture/InterviewPreparation";
import CareerPathPlanner from "../prepareforfuture/CareerPathPlanner";
import { GoalSetting } from "../study&succeed/GoalSetting";
import StudyResources from "../study&succeed/StudyResources";
import DocumentManager from "../resources/DocumentManager";
import SubjectExplorer from "../study&succeed/SubjectExplorer";
import StudySkillsTrainer from "../study&succeed/StudySkillsTrainer";
import TestPrepStrategies from "../study&succeed/TestPrepStrategies";
import AcademicGoalTracker from "../study&succeed/AcademicGoalTracker";
import ResumeBuilder from "../../graduate/resources/ResumeBuilder";

const StudentDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-brand-ink flex justify-center">
      <div className="flex w-full h-screen bg-brand-mist overflow-hidden relative shadow-2xl">
        
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className={`fixed lg:relative z-50 h-full transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <StudentSidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-brand-mist">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-brand-slate/10 z-30 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="p-2 bg-brand-mist rounded-xl text-brand-ink hover:bg-brand-slate/10 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <span className="font-display font-bold text-lg text-brand-ink">Careerist</span>
            </div>
            {/* Optional: Add a small user avatar or notification icon here on mobile */}
          </div>

          <div className="flex-1 overflow-auto relative">
          <Routes>
          <Route path="/" element={<StudentDashboardHome />} />

          {/* Academic Routes */}
          <Route path="/academics/study-skills" element={<StudySkillsTrainer />} />
          <Route path="/academics/test-prep" element={<TestPrepStrategies />} />
          <Route path="/resources/study" element={<StudyResources />} />
          <Route path="/academics/study-resources" element={<StudyResources />} />
          <Route path="/academics/goal-tracker" element={<AcademicGoalTracker />} />
          <Route path="/academics/subject-explorer" element={<SubjectExplorer />} />

          {/* College Routes */}
          <Route path="/college/explorer" element={<CollegeExplorer />} />
          <Route path="/college/majors" element={<MajorExplorer />} />

          {/* Skills Routes */}
          <Route path="/skills/tech" element={<BasicTechSkills />} />
          <Route path="/skills/soft" element={<SoftSkills />} />
          <Route path="/skills/creative" element={<CreativeSkills />} />

          {/* Learning Routes */}
          <Route path="/learning/courses" element={<OnlineCourses />} />
          <Route path="/learning/projects" element={<ProjectIdeas />} />
          <Route path="/learning/interview-prep" element={<InterviewPreparation />} />

          {/* Planning Routes */}
          <Route path="/planning/career-path" element={<CareerPathPlanner />} />
          <Route path="/planning/goals" element={<GoalSetting />} />
          <Route path="/planning/resume-builder" element={<ResumeBuilder />} />
          
          {/* Resources Routes */}
          <Route path="/resources/document-manager" element={<DocumentManager />} />
        </Routes>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentDashboard;
