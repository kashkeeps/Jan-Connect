import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IssueHeader = ({ issue, onBack }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in progress':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-6 lg:px-6">
        {/* Back Navigation */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="lg:hidden"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div className="hidden lg:flex items-center space-x-2 text-sm text-text-secondary">
            <Link to="/citizen-issue-dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/issue-detail-communication-thread" className="hover:text-primary">
              My Issues
            </Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-text-primary font-medium">{issue.title}</span>
          </div>
        </div>

        {/* Issue Summary Card */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-xl lg:text-2xl font-heading font-semibold text-text-primary pr-4">
                  {issue.title}
                </h1>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                    {issue.priority} Priority
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary font-medium">Issue ID:</span>
                  <p className="text-text-primary font-mono">{issue.id}</p>
                </div>
                <div>
                  <span className="text-text-secondary font-medium">Submitted:</span>
                  <p className="text-text-primary">{issue.submittedDate}</p>
                </div>
                <div>
                  <span className="text-text-secondary font-medium">Assigned to:</span>
                  <p className="text-text-primary">{issue.assignedOfficial}</p>
                </div>
                <div>
                  <span className="text-text-secondary font-medium">Category:</span>
                  <p className="text-text-primary">{issue.category}</p>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-text-secondary font-medium text-sm">Description:</span>
                <p className="text-text-primary mt-1">{issue.description}</p>
              </div>

              <div className="mt-4">
                <span className="text-text-secondary font-medium text-sm">Location:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Icon name="MapPin" size={16} className="text-text-secondary" />
                  <p className="text-text-primary">{issue.location}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 lg:ml-6">
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                Export PDF
              </Button>
              <Button variant="outline" size="sm" iconName="Share2" iconPosition="left">
                Share Issue
              </Button>
              {issue.status.toLowerCase() === 'resolved' && (
                <Button variant="default" size="sm" iconName="Star" iconPosition="left">
                  Rate Resolution
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueHeader;