import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GraduateSidebar from "./GraduateSidebar";
import GraduateDashboardHome from "./GraduateDashboardHome";

// Shared components from student
import InterviewPreparation from "../../student/prepareforfuture/InterviewPreparation";
import CareerPathPlanner from "../../student/prepareforfuture/CareerPathPlanner";

// Graduate specific components
import DocumentManager from "../resources/DocumentManager";
import ResumeBuilder from "../resources/ResumeBuilder";

// Skills & Learning components
import SkillGapAnalyzer from "../skills/SkillGapAnalyzer";
import BasicTechSkills from "../../student/learn&develop/BasicTechSkills";
import SoftSkills from "../../student/learn&develop/SoftSkills";
import OnlineCourses from "../../student/learn&develop/OnlineCourses";
import ProjectIdeas from "../../student/learn&develop/ProjectIdeas";

const GraduateDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-brand-mist overflow-hidden">
      <GraduateSidebar />

      <div className="flex-1 overflow-auto bg-brand-mist">
        <Routes>
          <Route path="/" element={<GraduateDashboardHome />} />
          
          {/* Prepare for Future (Shared) */}
          <Route path="learning/interview-prep" element={<InterviewPreparation />} />
          <Route path="planning/career-path" element={<CareerPathPlanner />} />
          
          {/* Resources */}
          <Route path="/resources/document-manager" element={<DocumentManager />} />
          <Route path="/resources/resume-builder" element={<ResumeBuilder />} />
          
          {/* Skills & Learning */}
          <Route path="skills/gap-analyzer" element={<SkillGapAnalyzer />} />
          <Route path="skills/tech" element={<BasicTechSkills />} />
          <Route path="skills/soft" element={<SoftSkills />} />
          <Route path="learning/courses" element={<OnlineCourses />} />
          <Route path="learning/projects" element={<ProjectIdeas />} />
        </Routes>
      </div>
    </div>
  );
};

export default GraduateDashboard;
