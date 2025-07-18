import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusTimeline = ({ timeline }) => {
  const getStatusIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'submitted':
        return 'FileText';
      case 'acknowledged':
        return 'Eye';
      case 'in progress':
        return 'Clock';
      case 'resolved':
        return 'CheckCircle';
      case 'closed':
        return 'XCircle';
      case 'message':
        return 'MessageSquare';
      case 'update':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (type) => {
    switch (type.toLowerCase()) {
      case 'submitted':
        return 'text-blue-600 bg-blue-100';
      case 'acknowledged':
        return 'text-yellow-600 bg-yellow-100';
      case 'in progress':
        return 'text-orange-600 bg-orange-100';
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'closed':
        return 'text-gray-600 bg-gray-100';
      case 'message':
        return 'text-purple-600 bg-purple-100';
      case 'update':
        return 'text-indigo-600 bg-indigo-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActorBadge = (actor) => {
    if (actor.type === 'citizen') {
      return 'bg-blue-100 text-blue-800';
    } else if (actor.type === 'official') {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        Issue Timeline
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex items-start space-x-4">
              {/* Timeline Icon */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(item.type)}`}>
                <Icon name={getStatusIcon(item.type)} size={20} />
              </div>

              {/* Timeline Content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-base font-medium text-text-primary">
                      {item.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActorBadge(item.actor)}`}>
                      {item.actor.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Clock" size={14} />
                    <span>{item.timestamp}</span>
                  </div>
                </div>

                {item.description && (
                  <p className="text-text-secondary mb-3">{item.description}</p>
                )}

                {/* Message Content */}
                {item.message && (
                  <div className="bg-muted rounded-lg p-4 mb-3">
                    <p className="text-text-primary">{item.message}</p>
                  </div>
                )}

                {/* Attachments */}
                {item.attachments && item.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.attachments.map((attachment, attachIndex) => (
                      <div
                        key={attachIndex}
                        className="flex items-center space-x-2 bg-surface border border-border rounded-lg px-3 py-2 text-sm"
                      >
                        <Icon name="Paperclip" size={14} className="text-text-secondary" />
                        <span className="text-text-primary">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Read Receipt */}
                {item.readReceipt && (
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Check" size={12} />
                    <span>Read by {item.readReceipt.readBy} at {item.readReceipt.readAt}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusTimeline;