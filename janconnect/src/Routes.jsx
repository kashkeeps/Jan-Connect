import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistrationLogin from "pages/user-registration-login";
import CitizenIssueDashboard from "pages/citizen-issue-dashboard";
import IssueReportingForm from "pages/issue-reporting-form";
import IssueDetailCommunicationThread from "pages/issue-detail-communication-thread";
import AiGrievanceLetterGenerator from "pages/ai-grievance-letter-generator";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CitizenIssueDashboard />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/citizen-issue-dashboard" element={<CitizenIssueDashboard />} />
        <Route path="/issue-reporting-form" element={<IssueReportingForm />} />
        <Route path="/issue-detail-communication-thread" element={<IssueDetailCommunicationThread />} />
        <Route path="/ai-grievance-letter-generator" element={<AiGrievanceLetterGenerator />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;