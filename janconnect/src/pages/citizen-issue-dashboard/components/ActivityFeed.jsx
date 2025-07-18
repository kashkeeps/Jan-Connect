import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'response',
      title: 'New Response Received',
      description: 'Municipal Engineer responded to your water supply complaint',
      issueId: 'WS-2024-001',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'MessageSquare',
      color: 'blue'
    },
    {
      id: 2,
      type: 'status_update',
      title: 'Issue Status Updated',
      description: 'Road repair issue moved to "In Progress" status',
      issueId: 'RR-2024-015',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'RefreshCw',
      color: 'yellow'
    },
    {
      id: 3,
      type: 'assignment',
      title: 'Issue Assigned',
      description: 'Street light complaint assigned to PWD Officer',
      issueId: 'SL-2024-008',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'UserCheck',
      color: 'green'
    },
    {
      id: 4,
      type: 'resolved',
      title: 'Issue Resolved',
      description: 'Garbage collection issue has been marked as resolved',
      issueId: 'GC-2024-003',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'CheckCircle',
      color: 'green'
    },
    {
      id: 5,
      type: 'escalation',
      title: 'Issue Escalated',
      description: 'Drainage problem escalated to senior municipal officer',
      issueId: 'DR-2024-012',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'AlertTriangle',
      color: 'red'
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 bg-blue-50';
      case 'green':
        return 'text-green-600 bg-green-50';
      case 'yellow':
        return 'text-yellow-600 bg-yellow-50';
      case 'red':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-text-primary">Recent Activity</h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
            View All
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex items-start space-x-3">
              {/* Timeline Line */}
              <div className="relative flex flex-col items-center">
                <div className={`p-2 rounded-full ${getIconColor(activity.color)}`}>
                  <Icon name={activity.icon} size={14} />
                </div>
                {index < activities.length - 1 && (
                  <div className="w-px h-8 bg-border mt-2"></div>
                )}
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-body font-medium text-text-primary text-sm">
                      {activity.title}
                    </p>
                    <p className="text-text-secondary text-sm mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs font-mono text-text-secondary bg-muted px-2 py-1 rounded">
                        #{activity.issueId}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {activities.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;