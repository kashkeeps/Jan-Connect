import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Login', description: 'Access your account' },
    { id: 'register', label: 'Register', description: 'Create new account' }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 text-center"
          >
            <div className="flex flex-col items-center">
              <span className="font-medium">{tab.label}</span>
              <span className="text-xs opacity-75 mt-1">{tab.description}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AuthTabs;