import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import TrustSignals from './components/TrustSignals';
import LanguageSelector from './components/LanguageSelector';

const UserRegistrationLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('janconnect_user');
    if (user) {
      navigate('/citizen-issue-dashboard');
    }
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="relative z-10 bg-surface/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">JanConnect</h1>
                <p className="text-xs text-text-secondary">Citizen Services Platform</p>
              </div>
            </Link>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* Auth Card */}
            <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
              {/* Welcome Section */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {activeTab === 'login' ? 'Welcome Back' : 'Join JanConnect'}
                </h2>
                <p className="text-text-secondary">
                  {activeTab === 'login' ?'Sign in to access your civic engagement dashboard' :'Create your account to start reporting and tracking civic issues'
                  }
                </p>
              </div>

              {/* Auth Tabs */}
              <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

              {/* Auth Forms */}
              <div className="mb-6">
                {activeTab === 'login' ? (
                  <LoginForm />
                ) : (
                  <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
                )}
              </div>

              {/* Social Authentication */}
              {activeTab === 'login' && (
                <div className="mb-6">
                  <SocialAuth />
                </div>
              )}

              {/* Help Links */}
              <div className="text-center space-y-2 mb-6">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <Link 
                    to="/help" 
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Help & Support
                  </Link>
                  <span className="text-border">•</span>
                  <Link 
                    to="/privacy" 
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-8">
              <TrustSignals />
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-text-secondary">
              <p>© {new Date().getFullYear()} JanConnect. All rights reserved.</p>
              <p className="mt-1">
                A Digital India initiative for transparent governance
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistrationLogin;