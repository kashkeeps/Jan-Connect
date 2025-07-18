import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = () => {
  return (
    <Link
      to="/issue-reporting-form"
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 group"
      title="Report New Issue"
    >
      <Icon 
        name="Plus" 
        size={24} 
        className="group-hover:rotate-90 transition-transform duration-200" 
      />
      
      {/* Tooltip for desktop */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden lg:block">
        Report New Issue
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
    </Link>
  );
};

export default FloatingActionButton;