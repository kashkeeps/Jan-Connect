import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IssueDetailsStep = ({ formData, updateFormData, errors }) => {
  const categories = [
    { value: 'roads', label: 'Roads & Transportation' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'sanitation', label: 'Sanitation & Waste' },
    { value: 'streetlights', label: 'Street Lights' },
    { value: 'drainage', label: 'Drainage' },
    { value: 'parks', label: 'Parks & Recreation' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'safety', label: 'Public Safety' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const remainingChars = 1000 - (formData.description?.length || 0);

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Issue Details
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Issue Title"
            type="text"
            placeholder="Brief summary of the issue"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={errors.title}
            required
            maxLength={100}
          />

          <Select
            label="Category"
            placeholder="Select issue category"
            options={categories}
            value={formData.category || ''}
            onChange={(value) => handleInputChange('category', value)}
            error={errors.category}
            required
            searchable
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              placeholder="Provide detailed description of the issue..."
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                errors.description ? 'border-destructive' : 'border-border'
              }`}
              rows={6}
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-2">
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
              <p className={`text-xs font-caption ml-auto ${
                remainingChars < 100 ? 'text-warning' : 'text-text-secondary'
              }`}>
                {remainingChars} characters remaining
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">Tips for Better Reports</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Be specific about the location and timing</li>
              <li>• Include any safety concerns or urgency</li>
              <li>• Mention if this is a recurring problem</li>
              <li>• Add any relevant reference numbers if available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsStep;