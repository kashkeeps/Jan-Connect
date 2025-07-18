import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedIssues = ({ issues, constituency }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Related Issues in Constituency */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Related Issues in {constituency}
          </h3>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {issues.slice(0, 5).map((issue) => (
            <Link
              key={issue.id}
              to={`/issue-detail-communication-thread?id=${issue.id}`}
              className="block p-4 bg-surface border border-border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-text-primary text-sm line-clamp-2 pr-2">
                  {issue.title}
                </h4>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Icon 
                    name={getPriorityIcon(issue.priority)} 
                    size={14} 
                    className={`${
                      issue.priority.toLowerCase() === 'high' ? 'text-red-500' :
                      issue.priority.toLowerCase() === 'medium'? 'text-yellow-500' : 'text-green-500'
                    }`}
                  />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-4">
                  <span>#{issue.id}</span>
                  <span>{issue.category}</span>
                </div>
                <span>{issue.submittedDate}</span>
              </div>

              <div className="flex items-center space-x-2 mt-2 text-xs text-text-secondary">
                <Icon name="MapPin" size={12} />
                <span className="truncate">{issue.location}</span>
              </div>
            </Link>
          ))}
        </div>

        {issues.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No related issues found in your constituency</p>
          </div>
        )}
      </div>

      {/* Official Contact Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Official Contact Information
        </h3>

        <div className="space-y-4">
          {/* Primary Contact */}
          <div className="p-4 bg-surface border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Shri Rajesh Sharma</h4>
                <p className="text-sm text-text-secondary">Ward Officer - Infrastructure</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-text-secondary" />
                <span className="text-text-primary">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-text-secondary" />
                <span className="text-text-primary">rajesh.sharma@municipal.gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-text-secondary" />
                <span className="text-text-primary">Office Hours: 9:00 AM - 5:00 PM</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
                Call
              </Button>
              <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
                Email
              </Button>
            </div>
          </div>

          {/* Department Information */}
          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-medium text-text-primary mb-3">Department Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Building" size={14} className="text-text-secondary" />
                <span className="text-text-primary">Municipal Corporation Office</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} className="text-text-secondary" />
                <span className="text-text-primary">Sector 17, Chandigarh - 160017</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={14} className="text-text-secondary" />
                <span className="text-text-primary">www.chandigarh.gov.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>

        <div className="space-y-3">
          <Button variant="outline" fullWidth iconName="Plus" iconPosition="left">
            Report Similar Issue
          </Button>
          <Button variant="outline" fullWidth iconName="Users" iconPosition="left">
            Join Community Discussion
          </Button>
          <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
            Generate Grievance Letter
          </Button>
          <Button variant="outline" fullWidth iconName="Bell" iconPosition="left">
            Set Notification Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedIssues;