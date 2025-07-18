import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ issue, onRateResolution, onRequestEscalation, onMarkSatisfied }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');

  const handleRatingSubmit = () => {
    if (rating > 0) {
      onRateResolution({
        rating,
        feedback,
        issueId: issue.id
      });
      setShowRatingModal(false);
      setRating(0);
      setFeedback('');
    }
  };

  const handleEscalationSubmit = () => {
    if (escalationReason.trim()) {
      onRequestEscalation({
        reason: escalationReason,
        issueId: issue.id
      });
      setShowEscalationModal(false);
      setEscalationReason('');
    }
  };

  const isResolved = issue.status.toLowerCase() === 'resolved';
  const isClosed = issue.status.toLowerCase() === 'closed';
  const canEscalate = !isResolved && !isClosed;

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Actions
        </h3>

        <div className="space-y-3">
          {/* Rate Resolution - Only show if resolved */}
          {isResolved && (
            <Button
              variant="default"
              fullWidth
              iconName="Star"
              iconPosition="left"
              onClick={() => setShowRatingModal(true)}
            >
              Rate Resolution
            </Button>
          )}

          {/* Mark as Satisfied - Only show if resolved */}
          {isResolved && (
            <Button
              variant="success"
              fullWidth
              iconName="CheckCircle"
              iconPosition="left"
              onClick={() => onMarkSatisfied(issue.id)}
            >
              Mark as Satisfied
            </Button>
          )}

          {/* Request Escalation - Only show if not resolved/closed */}
          {canEscalate && (
            <Button
              variant="warning"
              fullWidth
              iconName="AlertTriangle"
              iconPosition="left"
              onClick={() => setShowEscalationModal(true)}
            >
              Request Escalation
            </Button>
          )}

          {/* Export PDF */}
          <Button
            variant="outline"
            fullWidth
            iconName="Download"
            iconPosition="left"
          >
            Export PDF Report
          </Button>

          {/* Share Issue */}
          <Button
            variant="outline"
            fullWidth
            iconName="Share2"
            iconPosition="left"
          >
            Share Issue
          </Button>

          {/* Follow Similar Issues */}
          <Button
            variant="outline"
            fullWidth
            iconName="Bell"
            iconPosition="left"
          >
            Follow Similar Issues
          </Button>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Rate Resolution
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowRatingModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  How satisfied are you with the resolution?
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-colors ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Additional Feedback (Optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowRatingModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleRatingSubmit}
                  disabled={rating === 0}
                >
                  Submit Rating
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalation Modal */}
      {showEscalationModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Request Escalation
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEscalationModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Reason for Escalation *
                </label>
                <textarea
                  value={escalationReason}
                  onChange={(e) => setEscalationReason(e.target.value)}
                  placeholder="Please explain why you need to escalate this issue..."
                  className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  required
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Note:</p>
                    <p>Escalation will forward your issue to higher authorities. This action cannot be undone.</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowEscalationModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="warning"
                  fullWidth
                  onClick={handleEscalationSubmit}
                  disabled={!escalationReason.trim()}
                >
                  Submit Escalation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionButtons;