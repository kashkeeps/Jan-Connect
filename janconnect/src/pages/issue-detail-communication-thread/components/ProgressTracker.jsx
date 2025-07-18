import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ currentStatus, statusHistory }) => {
  const statusSteps = [
    { key: 'submitted', label: 'Submitted', icon: 'FileText' },
    { key: 'acknowledged', label: 'Acknowledged', icon: 'Eye' },
    { key: 'in_progress', label: 'In Progress', icon: 'Clock' },
    { key: 'resolved', label: 'Resolved', icon: 'CheckCircle' }
  ];

  const getStepStatus = (stepKey) => {
    const stepIndex = statusSteps.findIndex(step => step.key === stepKey);
    const currentIndex = statusSteps.findIndex(step => step.key === currentStatus.toLowerCase().replace(' ', '_'));
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const getStepDate = (stepKey) => {
    const historyItem = statusHistory.find(item => 
      item.status.toLowerCase().replace(' ', '_') === stepKey
    );
    return historyItem ? historyItem.date : null;
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-green-600 text-white border-green-600',
          line: 'bg-green-600',
          text: 'text-green-600'
        };
      case 'current':
        return {
          circle: 'bg-primary text-primary-foreground border-primary',
          line: 'bg-border',
          text: 'text-primary'
        };
      case 'pending':
        return {
          circle: 'bg-surface text-text-secondary border-border',
          line: 'bg-border',
          text: 'text-text-secondary'
        };
      default:
        return {
          circle: 'bg-surface text-text-secondary border-border',
          line: 'bg-border',
          text: 'text-text-secondary'
        };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        Progress Tracker
      </h3>

      <div className="relative">
        {statusSteps.map((step, index) => {
          const status = getStepStatus(step.key);
          const stepDate = getStepDate(step.key);
          const classes = getStepClasses(status);
          const isLast = index === statusSteps.length - 1;

          return (
            <div key={step.key} className="relative flex items-center">
              {/* Step Circle */}
              <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${classes.circle}`}>
                <Icon name={step.icon} size={18} />
              </div>

              {/* Step Content */}
              <div className="ml-4 flex-1 pb-8">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${classes.text}`}>
                    {step.label}
                  </h4>
                  {stepDate && (
                    <span className="text-sm text-text-secondary">
                      {stepDate}
                    </span>
                  )}
                </div>
                
                {status === 'current' && (
                  <p className="text-sm text-text-secondary mt-1">
                    Currently in progress
                  </p>
                )}
                
                {status === 'completed' && (
                  <p className="text-sm text-green-600 mt-1">
                    Completed
                  </p>
                )}
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className={`absolute left-5 top-10 w-0.5 h-8 ${classes.line}`}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Percentage */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Overall Progress</span>
          <span className="text-sm font-medium text-primary">
            {Math.round(((statusSteps.findIndex(step => step.key === currentStatus.toLowerCase().replace(' ', '_')) + 1) / statusSteps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((statusSteps.findIndex(step => step.key === currentStatus.toLowerCase().replace(' ', '_')) + 1) / statusSteps.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;