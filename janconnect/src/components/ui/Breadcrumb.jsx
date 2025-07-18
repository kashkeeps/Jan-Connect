import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();

  const routeMap = {
    '/citizen-issue-dashboard': { label: 'Dashboard', parent: null },
    '/issue-reporting-form': { label: 'Report Issue', parent: '/citizen-issue-dashboard' },
    '/issue-detail-communication-thread': { label: 'My Issues', parent: '/citizen-issue-dashboard' },
    '/ai-grievance-letter-generator': { label: 'AI Letter Generator', parent: '/citizen-issue-dashboard' },
    '/user-registration-login': { label: 'Login', parent: null }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const currentRoute = routeMap[location.pathname];
    if (!currentRoute) {
      return [{ label: 'Dashboard', path: '/citizen-issue-dashboard', isActive: false }];
    }

    const breadcrumbs = [];
    let current = currentRoute;
    let currentPath = location.pathname;

    // Build breadcrumb chain
    while (current) {
      breadcrumbs.unshift({
        label: current.label,
        path: currentPath,
        isActive: currentPath === location.pathname
      });

      if (current.parent) {
        currentPath = current.parent;
        current = routeMap[current.parent];
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login page or if only one item
  if (location.pathname === '/user-registration-login' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-text-secondary" />
      
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          )}
          
          {item.isActive ? (
            <span className="text-text-primary font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="text-text-secondary hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;