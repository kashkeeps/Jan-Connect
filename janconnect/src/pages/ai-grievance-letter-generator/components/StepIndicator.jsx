import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Describe Issue', icon: 'FileText' },
    { id: 2, title: 'Select Recipient', icon: 'Users' },
    { id: 3, title: 'Customize Letter', icon: 'Settings' },
    { id: 4, title: 'Review & Edit', icon: 'Eye' },
    { id: 5, title: 'Submit', icon: 'Send' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  step.id < currentStep
                    ? 'bg-success text-success-foreground'
                    : step.id === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                }`}
              >
                {step.id < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <span
                className={`text-xs font-caption mt-2 text-center max-w-20 ${
                  step.id <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                }`}
              >
                {step.title}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-200 ${
                  step.id < currentStep ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-text-secondary">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;