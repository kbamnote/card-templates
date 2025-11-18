import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/auth/LoginPage';
import ForgotPasswordPage from './components/auth/password/ForgotPasswordPage';
import VerifyOTPPage from './components/auth/password/VerifyOTPPage';
import ResetPasswordPage from './components/auth/password/ResetPasswordPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
            <Route path='/verify-otp' element={<VerifyOTPPage/>}/>
            <Route path='/reset-password' element={<ResetPasswordPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;