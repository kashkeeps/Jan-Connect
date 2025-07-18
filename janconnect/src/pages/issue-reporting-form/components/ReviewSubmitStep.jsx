import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewSubmitStep = ({ formData, onSubmit, isSubmitting }) => {
  const priorityConfig = {
    low: { label: 'Low Priority', color: 'text-success', bgColor: 'bg-success/10', icon: 'Clock' },
    medium: { label: 'Medium Priority', color: 'text-warning', bgColor: 'bg-warning/10', icon: 'AlertTriangle' },
    high: { label: 'High Priority', color: 'text-error', bgColor: 'bg-error/10', icon: 'AlertCircle' },
    urgent: { label: 'Urgent', color: 'text-destructive', bgColor: 'bg-destructive/10', icon: 'Zap' }
  };

  const categoryLabels = {
    roads: 'Roads & Transportation',
    water: 'Water Supply',
    electricity: 'Electricity',
    sanitation: 'Sanitation & Waste',
    streetlights: 'Street Lights',
    drainage: 'Drainage',
    parks: 'Parks & Recreation',
    healthcare: 'Healthcare',
    education: 'Education',
    safety: 'Public Safety',
    other: 'Other'
  };

  const departmentLabels = {
    municipal: 'Municipal Corporation',
    pwd: 'Public Works Department',
    electricity: 'Electricity Board',
    water: 'Water Supply Department',
    health: 'Health Department',
    police: 'Police Department',
    fire: 'Fire Department',
    transport: 'Transport Department'
  };

  const suggestedOfficials = [
    {
      id: 1,
      name: "Rajesh Kumar Singh",
      designation: "Ward Councillor - Ward 15",
      department: "Municipal Corporation"
    },
    {
      id: 2,
      name: "Priya Sharma",
      designation: "Assistant Engineer",
      department: "Public Works Department"
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      designation: "Health Officer",
      department: "Health Department"
    }
  ];

  const selectedOfficials = suggestedOfficials.filter(official => 
    (formData.selectedOfficials || []).includes(official.id)
  );

  const priority = priorityConfig[formData.priority] || priorityConfig.medium;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
          Review Your Issue Report
        </h3>

        {/* Issue Details */}
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h4 className="font-medium text-text-primary mb-3">Issue Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-secondary">Title</p>
                <p className="font-medium text-text-primary">{formData.title}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Category</p>
                <p className="font-medium text-text-primary">
                  {categoryLabels[formData.category] || formData.category}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-text-secondary mb-2">Description</p>
              <p className="text-text-primary bg-muted rounded-lg p-3">
                {formData.description}
              </p>
            </div>
          </div>

          {/* Location Details */}
          <div className="border-b border-border pb-4">
            <h4 className="font-medium text-text-primary mb-3">Location</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-text-secondary">Address</p>
                <p className="font-medium text-text-primary">{formData.address}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Latitude</p>
                <p className="font-medium text-text-primary">{formData.latitude}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Longitude</p>
                <p className="font-medium text-text-primary">{formData.longitude}</p>
              </div>
            </div>
            
            {formData.latitude && formData.longitude && (
              <div className="mt-4 bg-muted rounded-lg overflow-hidden" style={{ height: '200px' }}>
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Issue Location Preview"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}&z=16&output=embed`}
                  className="border-0"
                />
              </div>
            )}
          </div>

          {/* Images */}
          {formData.images && formData.images.length > 0 && (
            <div className="border-b border-border pb-4">
              <h4 className="font-medium text-text-primary mb-3">
                Uploaded Images ({formData.images.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image) => (
                  <div key={image.id} className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={image.url}
                      alt={`Issue image ${image.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Priority and Department */}
          <div className="border-b border-border pb-4">
            <h4 className="font-medium text-text-primary mb-3">Classification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-secondary mb-2">Priority Level</p>
                <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg ${priority.bgColor}`}>
                  <Icon name={priority.icon} size={16} className={priority.color} />
                  <span className={`font-medium ${priority.color}`}>
                    {priority.label}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Department</p>
                <p className="font-medium text-text-primary">
                  {departmentLabels[formData.department] || formData.department}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Officials */}
          {selectedOfficials.length > 0 && (
            <div>
              <h4 className="font-medium text-text-primary mb-3">
                Selected Officials ({selectedOfficials.length})
              </h4>
              <div className="space-y-3">
                {selectedOfficials.map((official) => (
                  <div key={official.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Icon name="User" size={16} className="text-text-secondary" />
                    <div>
                      <p className="font-medium text-text-primary">{official.name}</p>
                      <p className="text-sm text-text-secondary">{official.designation}</p>
                      <p className="text-xs text-text-secondary">{official.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submission Actions */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <h5 className="font-medium text-text-primary mb-1">
                  What happens next?
                </h5>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Your issue will be assigned a unique tracking ID</li>
                  <li>• Selected officials will be notified via email and SMS</li>
                  <li>• You'll receive updates on progress and responses</li>
                  <li>• Expected initial response within 48-72 hours</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              onClick={onSubmit}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
              className="flex-1"
            >
              {isSubmitting ? 'Submitting Issue...' : 'Submit Issue Report'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.print()}
              iconName="Download"
              iconPosition="left"
              className="sm:w-auto"
            >
              Save Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;