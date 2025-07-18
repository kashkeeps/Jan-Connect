import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusCard = ({ title, value, icon, color, trend, trendValue, description }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'green':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'red':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-caption text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-heading font-bold text-text-primary mb-2">{value}</p>
          {description && (
            <p className="text-xs text-text-secondary">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg border ${getColorClasses(color)}`}>
          <Icon name={icon} size={20} />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center mt-3 pt-3 border-t border-border">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
            size={16} 
            className={getTrendColor(trend)}
          />
          <span className={`text-sm font-medium ml-1 ${getTrendColor(trend)}`}>
            {trendValue}
          </span>
          <span className="text-sm text-text-secondary ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatusCard;