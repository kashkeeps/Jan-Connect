import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/citizen-issue-dashboard',
      icon: 'Home',
      badge: null
    },
    {
      label: 'Report Issue',
      path: '/issue-reporting-form',
      icon: 'Plus',
      badge: null
    },
    {
      label: 'My Issues',
      path: '/issue-detail-communication-thread',
      icon: 'MessageSquare',
      badge: 3
    },
    {
      label: 'Tools',
      path: '/ai-grievance-letter-generator',
      icon: 'FileText',
      badge: null
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-all duration-200 ${
              isActive(item.path)
                ? 'text-primary' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="relative">
              <div className={`p-1 rounded-lg transition-all duration-200 ${
                isActive(item.path) ? 'bg-primary/10' : ''
              }`}>
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`transition-colors duration-200 ${
                    isActive(item.path) ? 'text-primary' : 'text-current'
                  }`}
                />
              </div>
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-xs font-caption mt-1 transition-colors duration-200 ${
              isActive(item.path) ? 'text-primary font-medium' : 'text-current'
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;