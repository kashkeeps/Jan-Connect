import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import DesktopNavigation from '../../components/ui/DesktopNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import StepIndicator from './components/StepIndicator';
import IssueDetailsStep from './components/IssueDetailsStep';
import LocationMediaStep from './components/LocationMediaStep';
import PriorityCategoryStep from './components/PriorityCategoryStep';
import ReviewSubmitStep from './components/ReviewSubmitStep';
import SuccessModal from './components/SuccessModal';

const IssueReportingForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const steps = [
    { id: 'details', title: 'Issue Details', component: IssueDetailsStep },
    { id: 'location', title: 'Location & Media', component: LocationMediaStep },
    { id: 'priority', title: 'Priority & Category', component: PriorityCategoryStep },
    { id: 'review', title: 'Review & Submit', component: ReviewSubmitStep }
  ];

  // Auto-save draft functionality
  useEffect(() => {
    const savedDraft = localStorage.getItem('issueReportDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('issueReportDraft', JSON.stringify(formData));
    }
  }, [formData]);

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    // Clear related errors when data is updated
    const updatedErrors = { ...errors };
    Object.keys(newData).forEach(key => {
      if (updatedErrors[key]) {
        delete updatedErrors[key];
      }
    });
    setErrors(updatedErrors);
  };

  const validateStep = (stepIndex) => {
    const newErrors = {};

    switch (stepIndex) {
      case 0: // Issue Details
        if (!formData.title?.trim()) {
          newErrors.title = 'Issue title is required';
        }
        if (!formData.category) {
          newErrors.category = 'Please select a category';
        }
        if (!formData.description?.trim()) {
          newErrors.description = 'Description is required';
        } else if (formData.description.length < 20) {
          newErrors.description = 'Description must be at least 20 characters';
        }
        break;

      case 1: // Location & Media
        if (!formData.address?.trim()) {
          newErrors.address = 'Address or landmark is required';
        }
        if (!formData.latitude || !formData.longitude) {
          newErrors.location = 'Please provide location coordinates';
        }
        break;

      case 2: // Priority & Category
        if (!formData.priority) {
          newErrors.priority = 'Please select a priority level';
        }
        if (!formData.department) {
          newErrors.department = 'Please select a department';
        }
        break;

      case 3: // Review & Submit
        // All validations from previous steps
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (stepIndex) => {
    // Allow navigation to previous steps or current step
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const generateTrackingId = () => {
    const prefix = 'JC';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newTrackingId = generateTrackingId();
      setTrackingId(newTrackingId);

      // Clear draft after successful submission
      localStorage.removeItem('issueReportDraft');

      // Show success modal
      setShowSuccessModal(true);
      setIsSubmitting(false);

      // Log submission for demo purposes
      console.log('Issue submitted:', {
        ...formData,
        trackingId: newTrackingId,
        submittedAt: new Date().toISOString()
      });

    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/citizen-issue-dashboard');
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-center mb-8">
            <DesktopNavigation />
          </div>

          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
              Report Civic Issue
            </h1>
            <p className="text-text-secondary">
              Submit your civic concerns with detailed information for faster resolution
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator
            currentStep={currentStep}
            totalSteps={steps.length}
            steps={steps}
            onStepClick={handleStepClick}
          />

          {/* Form Content */}
          <div className="mb-8">
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              iconName="ChevronLeft"
              iconPosition="left"
              className="sm:w-auto"
            >
              Previous
            </Button>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  localStorage.removeItem('issueReportDraft');
                  navigate('/citizen-issue-dashboard');
                }}
                className="sm:w-auto"
              >
                Save Draft & Exit
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconPosition="right"
                  className="sm:w-auto"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="left"
                  className="sm:w-auto"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Issue'}
                </Button>
              )}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-text-secondary">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="mt-2 w-full bg-border rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        trackingId={trackingId}
        estimatedResponse="48-72 hours"
      />
    </div>
  );
};

export default IssueReportingForm;