import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GraduateSidebar from "./GraduateSidebar";
import GraduateDashboardHome from "./GraduateDashboardHome";

// Shared components from student
import InterviewSetup from "../../student/prepareforfuture/InterviewSetup";
import AIInterviewSession from "../../student/prepareforfuture/AIInterviewSession";
import InterviewReport from "../../student/prepareforfuture/InterviewReport";
import CareerPathPlanner from "../../student/prepareforfuture/CareerPathPlanner";

// Graduate specific components
import DocumentManager from "../resources/DocumentManager";

// Skills & Learning components
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
          <Route path="/prepare/interview-setup" element={<InterviewSetup />} />
          <Route path="/prepare/interview-session" element={<AIInterviewSession />} />
          <Route path="/prepare/interview-report" element={<InterviewReport />} />
          <Route path="/career-path" element={<CareerPathPlanner />} />
          
          {/* Resources */}
          <Route path="/resources" element={<DocumentManager />} />
          <Route path="/resources/document-manager" element={<DocumentManager />} />
          
          {/* Skills & Learning */}
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
