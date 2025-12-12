import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import LandingPage from "./components/pages/LandingPage";
import StudentLandingPage from "./components/pages/StudentLandingPage";
import LoginPage from "./components/auth/LoginPage";
import ForgotPasswordPage from "./components/auth/password/ForgotPasswordPage";
import VerifyOTPPage from "./components/auth/password/VerifyOTPPage";
import ResetPasswordPage from "./components/auth/password/ResetPasswordPage";
import OnboardingPage from "./components/pages/OnboardingPage";
import StudentOnboardingPage from "./components/pages/StudentOnboardingPage";
import PublicProfileView from "./components/public/PublicProfileView";
import NotFoundPage from "./components/common/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <main>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="student" element={<StudentLandingPage />} />
              <Route path="onboarding" element={<OnboardingPage />} />
              <Route path="student-onboarding" element={<StudentOnboardingPage />} />
            </Route>
            <Route path="/view/:userId" element={<PublicProfileView />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;