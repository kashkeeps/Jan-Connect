import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import DesktopNavigation from '../../components/ui/DesktopNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import step components
import IssueDescriptionStep from './components/IssueDescriptionStep';
import RecipientSelectionStep from './components/RecipientSelectionStep';
import LetterCustomizationStep from './components/LetterCustomizationStep';
import LetterPreviewStep from './components/LetterPreviewStep';
import SubmissionStep from './components/SubmissionStep';
import TemplateLibrary from './components/TemplateLibrary';
import StepIndicator from './components/StepIndicator';

const AIGrievanceLetterGenerator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    location: '',
    recipient: null,
    tone: 'formal',
    urgency: 'normal',
    template: 'complaint',
    additionalDetails: '',
    requestType: 'resolution',
    generatedLetter: '',
    submissionMethod: 'platform',
    trackingId: '',
    submittedAt: null
  });

  const totalSteps = 5;

  const handleStepUpdate = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    navigate('/citizen-issue-dashboard');
  };

  const handleTemplateSelect = (templateData) => {
    setFormData(prev => ({ ...prev, ...templateData }));
    setCurrentStep(2); // Move to recipient selection after template selection
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <IssueDescriptionStep
            data={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <RecipientSelectionStep
            data={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <LetterCustomizationStep
            data={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <LetterPreviewStep
            data={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <SubmissionStep
            data={formData}
            onUpdate={handleStepUpdate}
            onBack={handleBack}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-center mb-8">
            <DesktopNavigation />
          </div>

          {/* Breadcrumb */}
          <Breadcrumb customItems={[
            { label: 'Dashboard', path: '/citizen-issue-dashboard', isActive: false },
            { label: 'Tools', path: '/ai-grievance-letter-generator', isActive: false },
            { label: 'Letter Generator', path: '/ai-grievance-letter-generator', isActive: true }
          ]} />

          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="FileText" size={32} className="text-primary" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
              AI Grievance Letter Generator
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Transform your concerns into professionally formatted letters for official submission. 
              Our AI helps you communicate effectively with government officials.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => setShowTemplateLibrary(true)}
                iconName="BookOpen"
                iconPosition="left"
                size="sm"
              >
                Browse Templates
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/issue-detail-communication-thread')}
                iconName="MessageSquare"
                iconPosition="left"
                size="sm"
              >
                Track Letters
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/citizen-issue-dashboard')}
                iconName="BarChart3"
                iconPosition="left"
                size="sm"
              >
                View Analytics
              </Button>
            </div>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Main Content */}
          <div className="bg-surface rounded-lg shadow-card border border-border">
            <div className="p-6 lg:p-8">
              {renderCurrentStep()}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-muted rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-text-primary mb-2">
                  Need Help?
                </h3>
                <p className="text-text-secondary mb-4">
                  Our AI Letter Generator helps you create professional grievance letters. 
                  Follow the step-by-step process to ensure your concerns are communicated effectively.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span>Professional formatting</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span>Official language</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span>Delivery tracking</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span>Response monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Library Modal */}
      {showTemplateLibrary && (
        <TemplateLibrary
          onSelectTemplate={handleTemplateSelect}
          onClose={() => setShowTemplateLibrary(false)}
        />
      )}

      <BottomNavigation />
    </div>
  );
};

export default AIGrievanceLetterGenerator;