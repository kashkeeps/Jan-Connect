import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SubmissionStep = ({ data, onUpdate, onBack, onComplete }) => {
  const [submissionMethod, setSubmissionMethod] = useState('platform');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [userEmail, setUserEmail] = useState('rajesh.kumar@email.com');
  const [userPhone, setUserPhone] = useState('+91-9876543210');

  const submissionMethods = [
    {
      id: 'platform',
      title: 'Send via Platform',
      description: 'Direct delivery with tracking and follow-up',
      icon: 'Send',
      features: ['Delivery confirmation', 'Response tracking', 'Automatic follow-ups', 'Read receipts']
    },
    {
      id: 'email',
      title: 'Export as Email',
      description: 'Download formatted email for manual sending',
      icon: 'Mail',
      features: ['Pre-formatted email', 'Recipient details included', 'Professional formatting', 'Attachment ready']
    },
    {
      id: 'pdf',
      title: 'Download PDF',
      description: 'Get printable PDF for offline submission',
      icon: 'Download',
      features: ['Print-ready format', 'Official letterhead', 'Digital signature space', 'Archive copy']
    }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const generatedTrackingId = `JC${Date.now().toString().slice(-6)}`;
    setTrackingId(generatedTrackingId);
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Update data with submission details
    onUpdate({
      submissionMethod,
      trackingId: generatedTrackingId,
      submittedAt: new Date().toISOString(),
      userEmail,
      userPhone
    });
  };

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    const file = new Blob([data.generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `grievance-letter-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleEmailExport = () => {
    const subject = encodeURIComponent(`Grievance Letter - ${data.category}`);
    const body = encodeURIComponent(data.generatedLetter);
    const recipient = encodeURIComponent(data.recipient.email);
    
    window.open(`mailto:${recipient}?subject=${subject}&body=${body}`);
  };

  const handleComplete = () => {
    onComplete();
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
        
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Letter Submitted Successfully!
        </h2>
        
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Your grievance letter has been sent to {data.recipient.name}. 
          You can track the progress using your tracking ID.
        </p>
        
        <div className="bg-muted rounded-lg p-6 max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-primary">Tracking ID</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(trackingId)}
              iconName="Copy"
              iconPosition="left"
            >
              Copy
            </Button>
          </div>
          <div className="text-2xl font-mono font-bold text-primary text-center py-2 bg-surface rounded border-2 border-dashed border-primary/30">
            {trackingId}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
          <div className="bg-surface border border-border rounded-lg p-4">
            <Icon name="Clock" size={20} className="text-primary mx-auto mb-2" />
            <h4 className="font-medium text-text-primary mb-1">Expected Response</h4>
            <p className="text-sm text-text-secondary">7-15 working days</p>
          </div>
          
          <div className="bg-surface border border-border rounded-lg p-4">
            <Icon name="Bell" size={20} className="text-primary mx-auto mb-2" />
            <h4 className="font-medium text-text-primary mb-1">Notifications</h4>
            <p className="text-sm text-text-secondary">Email & SMS updates</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={handleComplete}
            iconName="Home"
            iconPosition="left"
            className="w-full max-w-xs"
          >
            Go to Dashboard
          </Button>
          
          <div className="flex justify-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              iconName="Download"
              iconPosition="left"
            >
              Download Copy
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/issue-detail-communication-thread'}
              iconName="MessageSquare"
              iconPosition="left"
            >
              Track Progress
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Submitting Your Letter
        </h2>
        <p className="text-text-secondary">
          Please wait while we process your submission...
        </p>
        <div className="mt-6 space-y-2 text-sm text-text-secondary">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Validating recipient details</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Formatting for official delivery</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Sending to {data.recipient.name}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Submit Your Letter
        </h2>
        <p className="text-text-secondary font-body">
          Choose how you'd like to send your letter to {data.recipient.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {submissionMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSubmissionMethod(method.id)}
            className={`p-6 border rounded-lg cursor-pointer transition-all duration-200 ${
              submissionMethod === method.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50 hover:shadow-sm'
            }`}
          >
            <div className="text-center mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                submissionMethod === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'
              }`}>
                <Icon name={method.icon} size={24} />
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-1">
                {method.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {method.description}
              </p>
            </div>
            
            <ul className="space-y-2">
              {method.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            {submissionMethod === method.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} className="text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">Selected</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {submissionMethod === 'platform' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="font-heading font-medium text-text-primary mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              description="For delivery confirmations and updates"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              description="For SMS notifications"
            />
          </div>
        </div>
      )}

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">Submission Guidelines</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Platform submissions are tracked and provide delivery confirmation</li>
              <li>• Email exports include all recipient details and proper formatting</li>
              <li>• PDF downloads are print-ready for physical submission</li>
              <li>• All submissions create a tracking record in your dashboard</li>
            </ul>
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
        
        <div className="flex space-x-3">
          {submissionMethod === 'email' && (
            <Button
              variant="outline"
              onClick={handleEmailExport}
              iconName="Mail"
              iconPosition="left"
            >
              Open Email
            </Button>
          )}
          
          {submissionMethod === 'pdf' && (
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              iconName="Download"
              iconPosition="left"
            >
              Download PDF
            </Button>
          )}
          
          {submissionMethod === 'platform' && (
            <Button
              onClick={handleSubmit}
              iconName="Send"
              iconPosition="right"
            >
              Submit Letter
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionStep;