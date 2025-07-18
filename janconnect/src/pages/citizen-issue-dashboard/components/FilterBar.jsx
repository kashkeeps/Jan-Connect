import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterBar = ({ onFiltersChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    status: activeFilters.status || '',
    category: activeFilters.category || '',
    priority: activeFilters.priority || '',
    dateRange: activeFilters.dateRange || '',
    assignedTo: activeFilters.assignedTo || ''
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'water-supply', label: 'Water Supply' },
    { value: 'road-repair', label: 'Road Repair' },
    { value: 'street-light', label: 'Street Light' },
    { value: 'garbage-collection', label: 'Garbage Collection' },
    { value: 'drainage', label: 'Drainage' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'public-transport', label: 'Public Transport' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'This Year' }
  ];

  const assignedToOptions = [
    { value: '', label: 'All Officials' },
    { value: 'rajesh-kumar', label: 'Rajesh Kumar (Ward Officer)' },
    { value: 'priya-sharma', label: 'Priya Sharma (Municipal Engineer)' },
    { value: 'amit-singh', label: 'Amit Singh (Health Officer)' },
    { value: 'sunita-devi', label: 'Sunita Devi (Education Officer)' },
    { value: 'vikram-yadav', label: 'Vikram Yadav (PWD Officer)' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      status: '',
      category: '',
      priority: '',
      dateRange: '',
      assignedTo: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  const getFilterChips = () => {
    const chips = [];
    
    if (filters.status) {
      const statusLabel = statusOptions.find(opt => opt.value === filters.status)?.label;
      chips.push({ key: 'status', label: statusLabel, value: filters.status });
    }
    
    if (filters.category) {
      const categoryLabel = categoryOptions.find(opt => opt.value === filters.category)?.label;
      chips.push({ key: 'category', label: categoryLabel, value: filters.category });
    }
    
    if (filters.priority) {
      const priorityLabel = priorityOptions.find(opt => opt.value === filters.priority)?.label;
      chips.push({ key: 'priority', label: priorityLabel, value: filters.priority });
    }
    
    if (filters.dateRange) {
      const dateLabel = dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label;
      chips.push({ key: 'dateRange', label: dateLabel, value: filters.dateRange });
    }
    
    if (filters.assignedTo) {
      const assignedLabel = assignedToOptions.find(opt => opt.value === filters.assignedTo)?.label;
      chips.push({ key: 'assignedTo', label: assignedLabel, value: filters.assignedTo });
    }
    
    return chips;
  };

  const removeFilterChip = (key) => {
    handleFilterChange(key, '');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Filter Toggle and Quick Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            <Icon name="Filter" size={16} className="mr-2" />
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
          
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>

      {/* Active Filter Chips */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {getFilterChips().map((chip) => (
            <div
              key={chip.key}
              className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
            >
              <span>{chip.label}</span>
              <button
                onClick={() => removeFilterChip(chip.key)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Expanded Filter Options */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pt-4 border-t border-border">
          <Select
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            className="w-full"
          />
          
          <Select
            label="Category"
            options={categoryOptions}
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value)}
            searchable
            className="w-full"
          />
          
          <Select
            label="Priority"
            options={priorityOptions}
            value={filters.priority}
            onChange={(value) => handleFilterChange('priority', value)}
            className="w-full"
          />
          
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            className="w-full"
          />
          
          <Select
            label="Assigned To"
            options={assignedToOptions}
            value={filters.assignedTo}
            onChange={(value) => handleFilterChange('assignedTo', value)}
            searchable
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default FilterBar;