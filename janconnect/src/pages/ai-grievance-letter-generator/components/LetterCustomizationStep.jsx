import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const LetterCustomizationStep = ({ data, onUpdate, onNext, onBack }) => {
  const [tone, setTone] = useState(data.tone || 'formal');
  const [urgency, setUrgency] = useState(data.urgency || 'normal');
  const [template, setTemplate] = useState(data.template || 'complaint');
  const [additionalDetails, setAdditionalDetails] = useState(data.additionalDetails || '');
  const [requestType, setRequestType] = useState(data.requestType || 'resolution');

  const toneOptions = [
    { value: 'formal', label: 'Formal', description: 'Professional and respectful tone' },
    { value: 'urgent', label: 'Urgent', description: 'Emphasizes immediate attention needed' },
    { value: 'diplomatic', label: 'Diplomatic', description: 'Polite and collaborative approach' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', description: 'General concern, no immediate action required' },
    { value: 'normal', label: 'Normal Priority', description: 'Standard issue requiring attention' },
    { value: 'high', label: 'High Priority', description: 'Urgent issue affecting daily life' },
    { value: 'critical', label: 'Critical', description: 'Emergency situation requiring immediate action' }
  ];

  const templateTypes = [
    { value: 'complaint', label: 'Complaint Letter', description: 'Standard grievance format' },
    { value: 'rti', label: 'RTI Request', description: 'Right to Information application' },
    { value: 'suggestion', label: 'Suggestion Letter', description: 'Constructive improvement proposal' },
    { value: 'followup', label: 'Follow-up Letter', description: 'Following up on previous communication' }
  ];

  const requestTypes = [
    { value: 'resolution', label: 'Issue Resolution', description: 'Request to fix the problem' },
    { value: 'information', label: 'Information Request', description: 'Seeking details or clarification' },
    { value: 'meeting', label: 'Meeting Request', description: 'Request for personal discussion' },
    { value: 'inspection', label: 'Site Inspection', description: 'Request for official site visit' }
  ];

  const handleNext = () => {
    const customizationData = {
      tone,
      urgency,
      template,
      additionalDetails: additionalDetails.trim(),
      requestType
    };
    
    onUpdate(customizationData);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Customize Your Letter
        </h2>
        <p className="text-text-secondary font-body">
          Adjust the tone and format to match your needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Letter Template */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Letter Template
            </label>
            <div className="space-y-2">
              {templateTypes.map((templateOption) => (
                <div
                  key={templateOption.value}
                  onClick={() => setTemplate(templateOption.value)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    template === templateOption.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">{templateOption.label}</h4>
                      <p className="text-sm text-text-secondary">{templateOption.description}</p>
                    </div>
                    {template === templateOption.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Letter Tone
            </label>
            <div className="space-y-2">
              {toneOptions.map((toneOption) => (
                <div
                  key={toneOption.value}
                  onClick={() => setTone(toneOption.value)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    tone === toneOption.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">{toneOption.label}</h4>
                      <p className="text-sm text-text-secondary">{toneOption.description}</p>
                    </div>
                    {tone === toneOption.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Priority Level
            </label>
            <div className="space-y-2">
              {urgencyLevels.map((level) => (
                <div
                  key={level.value}
                  onClick={() => setUrgency(level.value)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    urgency === level.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">{level.label}</h4>
                      <p className="text-sm text-text-secondary">{level.description}</p>
                    </div>
                    {urgency === level.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Request Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              What are you requesting?
            </label>
            <div className="space-y-2">
              {requestTypes.map((type) => (
                <div
                  key={type.value}
                  onClick={() => setRequestType(type.value)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    requestType === type.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">{type.label}</h4>
                      <p className="text-sm text-text-secondary">{type.description}</p>
                    </div>
                    {requestType === type.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Additional Details (Optional)
        </label>
        <textarea
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          placeholder="Add any specific details, deadlines, or references that should be included in the letter..."
          className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          maxLength={500}
        />
        <p className="text-xs text-text-secondary mt-1">
          {additionalDetails.length}/500 characters
        </p>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Sparkles" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">AI Enhancement</h4>
            <p className="text-sm text-text-secondary">
              Our AI will automatically format your letter with proper government protocols, 
              legal language, and official addressing based on your selections.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Generate Letter
        </Button>
      </div>
    </div>
  );
};

export default LetterCustomizationStep;