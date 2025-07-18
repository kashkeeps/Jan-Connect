import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = () => {
  const stats = [
    {
      label: 'Response Rate',
      value: '94%',
      description: 'Issues get response within 24hrs',
      icon: 'Clock',
      color: 'green'
    },
    {
      label: 'Avg Resolution',
      value: '5.2 days',
      description: 'Average time to resolve issues',
      icon: 'Calendar',
      color: 'blue'
    },
    {
      label: 'Satisfaction',
      value: '4.6/5',
      description: 'Citizen satisfaction rating',
      icon: 'Star',
      color: 'yellow'
    },
    {
      label: 'Active Officials',
      value: '12',
      description: 'Officials handling your area',
      icon: 'Users',
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'green':
        return 'text-green-600 bg-green-50';
      case 'blue':
        return 'text-blue-600 bg-blue-50';
      case 'yellow':
        return 'text-yellow-600 bg-yellow-50';
      case 'purple':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-text-primary">Quick Stats</h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                <Icon name={stat.icon} size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-caption text-text-secondary">
                    {stat.label}
                  </span>
                  <span className="font-heading font-bold text-text-primary">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;