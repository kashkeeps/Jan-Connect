import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                index < currentStep 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : index === currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-background border-border text-text-secondary'
              }`}>
                {index < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-xs font-caption ${
                  index <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                index < currentStep ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;