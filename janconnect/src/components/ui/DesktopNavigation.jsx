import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const DesktopNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/citizen-issue-dashboard',
      icon: 'Home',
      badge: null,
      description: 'Overview of your issues and activities'
    },
    {
      label: 'Report Issue',
      path: '/issue-reporting-form',
      icon: 'Plus',
      badge: null,
      description: 'Submit a new civic issue or complaint'
    },
    {
      label: 'My Issues',
      path: '/issue-detail-communication-thread',
      icon: 'MessageSquare',
      badge: 3,
      description: 'Track and communicate about your issues'
    },
    {
      label: 'Tools',
      path: '/ai-grievance-letter-generator',
      icon: 'FileText',
      badge: null,
      description: 'AI-powered letter generation and utilities'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="hidden lg:flex items-center space-x-1 bg-surface border border-border rounded-lg p-1">
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 group ${
            isActive(item.path)
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-secondary hover:text-text-primary hover:bg-muted'
          }`}
          title={item.description}
        >
          <div className="relative">
            <Icon 
              name={item.icon} 
              size={18} 
              className="transition-colors duration-200"
            />
            {item.badge && (
              <span className={`absolute -top-2 -right-2 text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium ${
                isActive(item.path)
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-destructive text-destructive-foreground'
              }`}>
                {item.badge}
              </span>
            )}
          </div>
          <span className="font-body font-medium text-sm">
            {item.label}
          </span>
          
          {/* Active indicator */}
          {isActive(item.path) && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-1 h-1 bg-primary-foreground rounded-full"></div>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;