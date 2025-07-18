import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const PriorityCategoryStep = ({ formData, updateFormData, errors }) => {
  const priorityLevels = [
    {
      value: 'low',
      label: 'Low Priority',
      description: 'Minor issues that can be addressed in routine maintenance',
      color: 'text-success',
      bgColor: 'bg-success/10',
      icon: 'Clock'
    },
    {
      value: 'medium',
      label: 'Medium Priority',
      description: 'Issues affecting daily life but not immediately dangerous',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      icon: 'AlertTriangle'
    },
    {
      value: 'high',
      label: 'High Priority',
      description: 'Significant issues requiring prompt attention',
      color: 'text-error',
      bgColor: 'bg-error/10',
      icon: 'AlertCircle'
    },
    {
      value: 'urgent',
      label: 'Urgent',
      description: 'Critical issues posing immediate safety risks',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      icon: 'Zap'
    }
  ];

  const departments = [
    { value: 'municipal', label: 'Municipal Corporation' },
    { value: 'pwd', label: 'Public Works Department' },
    { value: 'electricity', label: 'Electricity Board' },
    { value: 'water', label: 'Water Supply Department' },
    { value: 'health', label: 'Health Department' },
    { value: 'police', label: 'Police Department' },
    { value: 'fire', label: 'Fire Department' },
    { value: 'transport', label: 'Transport Department' }
  ];

  const suggestedOfficials = [
    {
      id: 1,
      name: "Rajesh Kumar Singh",
      designation: "Ward Councillor - Ward 15",
      department: "Municipal Corporation",
      contact: "+91 98765 43210",
      email: "rajesh.ward15@municipal.gov.in",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      relevanceScore: 95
    },
    {
      id: 2,
      name: "Priya Sharma",
      designation: "Assistant Engineer",
      department: "Public Works Department",
      contact: "+91 87654 32109",
      email: "priya.sharma@pwd.gov.in",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      relevanceScore: 88
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      designation: "Health Officer",
      department: "Health Department",
      contact: "+91 76543 21098",
      email: "amit.patel@health.gov.in",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      relevanceScore: 82
    }
  ];

  const handlePrioritySelect = (priority) => {
    updateFormData({ priority });
  };

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const toggleOfficialSelection = (officialId) => {
    const selectedOfficials = formData.selectedOfficials || [];
    const isSelected = selectedOfficials.includes(officialId);
    
    if (isSelected) {
      updateFormData({
        selectedOfficials: selectedOfficials.filter(id => id !== officialId)
      });
    } else {
      updateFormData({
        selectedOfficials: [...selectedOfficials, officialId]
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Priority Selection */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Priority Level
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {priorityLevels.map((level) => (
            <div
              key={level.value}
              onClick={() => handlePrioritySelect(level.value)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                formData.priority === level.value
                  ? `border-primary ${level.bgColor}`
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${level.bgColor}`}>
                  <Icon name={level.icon} size={20} className={level.color} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${level.color}`}>
                    {level.label}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">
                    {level.description}
                  </p>
                </div>
                {formData.priority === level.value && (
                  <Icon name="Check" size={20} className="text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {errors.priority && (
          <p className="text-sm text-destructive mt-2">{errors.priority}</p>
        )}
      </div>

      {/* Department Selection */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Relevant Department
        </h3>
        
        <Select
          label="Primary Department"
          placeholder="Select the most relevant department"
          options={departments}
          value={formData.department || ''}
          onChange={(value) => handleInputChange('department', value)}
          error={errors.department}
          required
          searchable
        />
      </div>

      {/* AI Suggested Officials */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Sparkles" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            AI Suggested Officials
          </h3>
        </div>
        
        <p className="text-text-secondary text-sm mb-4">
          Based on your issue category and location, these officials are most relevant for your complaint.
        </p>

        <div className="space-y-3">
          {suggestedOfficials.map((official) => (
            <div
              key={official.id}
              onClick={() => toggleOfficialSelection(official.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                (formData.selectedOfficials || []).includes(official.id)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={official.avatar}
                    alt={official.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <span className="text-xs text-success-foreground font-medium">
                      {official.relevanceScore}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">
                    {official.name}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {official.designation}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {official.department}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Phone" size={14} />
                    <span>{official.contact}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary mt-1">
                    <Icon name="Mail" size={14} />
                    <span className="truncate max-w-32">{official.email}</span>
                  </div>
                </div>
                
                {(formData.selectedOfficials || []).includes(official.id) && (
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-4 mt-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">
            AI Recommendation Logic
          </h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Location-based official mapping</li>
            <li>• Category-specific department routing</li>
            <li>• Historical response time analysis</li>
            <li>• Current workload consideration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PriorityCategoryStep;