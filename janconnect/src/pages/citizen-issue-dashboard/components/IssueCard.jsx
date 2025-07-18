import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IssueCard = ({ issue }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'under-review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'water supply':
        return 'Droplets';
      case 'road repair':
        return 'Construction';
      case 'street light':
        return 'Lightbulb';
      case 'garbage collection':
        return 'Trash2';
      case 'drainage':
        return 'Waves';
      case 'electricity':
        return 'Zap';
      default:
        return 'AlertCircle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 group">
      {/* Issue Image */}
      {issue.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={issue.image}
            alt={issue.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}>
              {issue.status}
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-muted rounded-md">
              <Icon name={getCategoryIcon(issue.category)} size={16} className="text-text-secondary" />
            </div>
            <span className="text-xs font-caption text-text-secondary bg-muted px-2 py-1 rounded-full">
              {issue.category}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Flag" size={14} className={getPriorityColor(issue.priority)} />
            <span className={`text-xs font-medium ${getPriorityColor(issue.priority)}`}>
              {issue.priority}
            </span>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {issue.title}
        </h3>
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {issue.description}
        </p>

        {/* Issue Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-text-secondary">
            <Icon name="MapPin" size={14} className="mr-1" />
            <span className="truncate">{issue.location}</span>
          </div>
          <div className="flex items-center text-xs text-text-secondary">
            <Icon name="Calendar" size={14} className="mr-1" />
            <span>Submitted: {formatDate(issue.submittedDate)}</span>
          </div>
          {issue.assignedTo && (
            <div className="flex items-center text-xs text-text-secondary">
              <Icon name="User" size={14} className="mr-1" />
              <span className="truncate">Assigned to: {issue.assignedTo}</span>
            </div>
          )}
        </div>

        {/* Issue ID and Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-text-secondary bg-muted px-2 py-1 rounded">
              #{issue.id}
            </span>
            {issue.hasNewResponse && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-primary font-medium">New Response</span>
              </div>
            )}
          </div>
          <Link to="/issue-detail-communication-thread">
            <Button variant="outline" size="sm">
              <Icon name="Eye" size={14} className="mr-1" />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;