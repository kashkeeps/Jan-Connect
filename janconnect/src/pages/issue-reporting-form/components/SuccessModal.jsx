import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, trackingId, estimatedResponse }) => {
  if (!isOpen) return null;

  const handleCopyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    // You could add a toast notification here
  };

  const handleShareIssue = () => {
    const shareText = `I've reported a civic issue via JanConnect. Tracking ID: ${trackingId}. You can track progress at janconnect.gov.in`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Issue Reported - JanConnect',
        text: shareText,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface rounded-lg shadow-modal max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Issue Reported Successfully!
          </h3>
          
          <p className="text-text-secondary mb-6">
            Your civic issue has been submitted and relevant officials have been notified.
          </p>

          {/* Tracking Information */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-text-primary">Tracking ID</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyTrackingId}
                iconName="Copy"
                iconPosition="left"
              >
                Copy
              </Button>
            </div>
            <p className="text-lg font-mono font-semibold text-primary bg-surface px-3 py-2 rounded border">
              {trackingId}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <Icon name="Clock" size={20} className="text-text-secondary mx-auto mb-1" />
              <p className="text-xs text-text-secondary">Expected Response</p>
              <p className="text-sm font-medium text-text-primary">{estimatedResponse}</p>
            </div>
            <div className="text-center">
              <Icon name="Bell" size={20} className="text-text-secondary mx-auto mb-1" />
              <p className="text-xs text-text-secondary">Notifications</p>
              <p className="text-sm font-medium text-text-primary">Email & SMS</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="primary"
              onClick={onClose}
              className="w-full"
              iconName="Home"
              iconPosition="left"
            >
              Go to Dashboard
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleShareIssue}
                className="flex-1"
                iconName="Share"
                iconPosition="left"
              >
                Share
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = '/issue-detail-communication-thread'}
                className="flex-1"
                iconName="MessageSquare"
                iconPosition="left"
              >
                Track Issue
              </Button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-start space-x-2 text-left">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="mb-1">
                  <strong>Next Steps:</strong>
                </p>
                <ul className="space-y-1">
                  <li>• Officials will review your issue within 24 hours</li>
                  <li>• You'll receive status updates via notifications</li>
                  <li>• Use the tracking ID to monitor progress</li>
                  <li>• Contact support if no response in 72 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;