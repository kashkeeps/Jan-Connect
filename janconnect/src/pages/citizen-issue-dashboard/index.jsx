import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import DesktopNavigation from '../../components/ui/DesktopNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusCard from './components/StatusCard';
import IssueCard from './components/IssueCard';
import FilterBar from './components/FilterBar';
import ActivityFeed from './components/ActivityFeed';
import QuickStats from './components/QuickStats';
import FloatingActionButton from './components/FloatingActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CitizenIssueDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for issues
  const mockIssues = [
    {
      id: 'WS-2024-001',
      title: 'Water Supply Disruption in Sector 15',
      description: 'No water supply for the past 3 days in our residential area. Multiple families are affected and we need immediate attention.',
      category: 'Water Supply',
      status: 'In-Progress',
      priority: 'High',
      location: 'Sector 15, Block A, Gurgaon',
      submittedDate: '2024-07-15T10:30:00Z',
      assignedTo: 'Rajesh Kumar (Municipal Engineer)',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasNewResponse: true
    },
    {
      id: 'RR-2024-015',
      title: 'Pothole on Main Road Causing Accidents',
      description: 'Large pothole on the main road near the market area. Several vehicles have been damaged and it poses a safety risk.',
      category: 'Road Repair',
      status: 'Under-Review',
      priority: 'High',
      location: 'Main Market Road, Gurgaon',
      submittedDate: '2024-07-14T14:20:00Z',
      assignedTo: 'Priya Sharma (PWD Officer)',
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasNewResponse: false
    },
    {
      id: 'SL-2024-008',
      title: 'Street Light Not Working',
      description: 'Street light has been non-functional for over a week, making the area unsafe during night hours.',
      category: 'Street Light',
      status: 'Pending',
      priority: 'Medium',
      location: 'Park Street, Sector 12, Gurgaon',
      submittedDate: '2024-07-13T09:15:00Z',
      assignedTo: 'Vikram Yadav (Electrical Department)',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasNewResponse: false
    },
    {
      id: 'GC-2024-003',
      title: 'Irregular Garbage Collection',
      description: 'Garbage has not been collected for 4 days in our locality. The area is becoming unhygienic.',
      category: 'Garbage Collection',
      status: 'Resolved',
      priority: 'Medium',
      location: 'Residential Colony, Sector 8, Gurgaon',
      submittedDate: '2024-07-10T16:45:00Z',
      assignedTo: 'Sunita Devi (Sanitation Officer)',
      image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasNewResponse: false
    },
    {
      id: 'DR-2024-012',
      title: 'Drainage Blockage Causing Waterlogging',
      description: 'Blocked drainage system causing water accumulation during rains. Immediate cleaning required.',
      category: 'Drainage',
      status: 'In-Progress',
      priority: 'High',
      location: 'Low-lying Area, Sector 20, Gurgaon',
      submittedDate: '2024-07-12T11:30:00Z',
      assignedTo: 'Amit Singh (Municipal Engineer)',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasNewResponse: true
    },
    {
      id: 'EL-2024-007',
      title: 'Frequent Power Cuts in Residential Area',
      description: 'Daily power cuts lasting 3-4 hours affecting work from home and daily activities.',
      category: 'Electricity',
      status: 'Pending',
      priority: 'Medium',
      location: 'Residential Complex, Sector 18, Gurgaon',
      submittedDate: '2024-07-11T08:20:00Z',
      assignedTo: null,
      image: 'https://images.pexels.com/photos/442120/pexels-photo-442120.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasNewResponse: false
    }
  ];

  // Mock statistics data
  const statsData = [
    {
      title: 'Active Issues',
      value: '4',
      icon: 'AlertCircle',
      color: 'red',
      trend: 'down',
      trendValue: '12%',
      description: 'Issues currently being processed'
    },
    {
      title: 'Resolved Issues',
      value: '18',
      icon: 'CheckCircle',
      color: 'green',
      trend: 'up',
      trendValue: '23%',
      description: 'Successfully resolved this month'
    },
    {
      title: 'Avg Response Time',
      value: '2.3 days',
      icon: 'Clock',
      color: 'blue',
      trend: 'down',
      trendValue: '15%',
      description: 'Average time to first response'
    },
    {
      title: 'Satisfaction Score',
      value: '4.6/5',
      icon: 'Star',
      color: 'yellow',
      trend: 'up',
      trendValue: '8%',
      description: 'Based on resolved issue ratings'
    }
  ];

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIssues(mockIssues);
      setFilteredIssues(mockIssues);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    
    let filtered = [...mockIssues];
    
    if (newFilters.status) {
      filtered = filtered.filter(issue => 
        issue.status.toLowerCase().replace(/[^a-z]/g, '-') === newFilters.status
      );
    }
    
    if (newFilters.category) {
      filtered = filtered.filter(issue => 
        issue.category.toLowerCase().replace(/[^a-z]/g, '-') === newFilters.category
      );
    }
    
    if (newFilters.priority) {
      filtered = filtered.filter(issue => 
        issue.priority.toLowerCase() === newFilters.priority
      );
    }
    
    if (newFilters.assignedTo) {
      filtered = filtered.filter(issue => 
        issue.assignedTo && issue.assignedTo.toLowerCase().includes(newFilters.assignedTo.replace('-', ' '))
      );
    }
    
    setFilteredIssues(filtered);
  };

  // Handle pull to refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-muted"></div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-muted rounded"></div>
          <div className="w-20 h-4 bg-muted rounded"></div>
        </div>
        <div className="w-3/4 h-5 bg-muted rounded mb-2"></div>
        <div className="w-full h-4 bg-muted rounded mb-1"></div>
        <div className="w-2/3 h-4 bg-muted rounded mb-3"></div>
        <div className="flex justify-between items-center">
          <div className="w-16 h-4 bg-muted rounded"></div>
          <div className="w-20 h-8 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between py-6">
            <DesktopNavigation />
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                iconName={isRefreshing ? "Loader2" : "RefreshCw"}
                iconPosition="left"
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Link to="/issue-reporting-form">
                <Button iconName="Plus" iconPosition="left">
                  Report Issue
                </Button>
              </Link>
            </div>
          </div>

          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                  Welcome back, Rajesh Kumar
                </h1>
                <p className="text-text-secondary">
                  Track your civic issues and stay updated on government responses
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Last updated</p>
                  <p className="font-medium text-text-primary">
                    {new Date().toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <StatusCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                trend={stat.trend}
                trendValue={stat.trendValue}
                description={stat.description}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filter Bar */}
              <FilterBar onFiltersChange={handleFiltersChange} activeFilters={filters} />

              {/* Issues Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Your Issues ({filteredIssues.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" iconName="Grid3X3">
                      Grid
                    </Button>
                    <Button variant="ghost" size="sm" iconName="List">
                      List
                    </Button>
                  </div>
                </div>

                {/* Issues Grid */}
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                ) : filteredIssues.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredIssues.map((issue) => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card border border-border rounded-lg">
                    <Icon name="FileX" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-text-primary mb-2">
                      No Issues Found
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {Object.values(filters).some(f => f) 
                        ? 'Try adjusting your filters to see more results' :'You haven\'t reported any issues yet'
                      }
                    </p>
                    <Link to="/issue-reporting-form">
                      <Button iconName="Plus" iconPosition="left">
                        Report Your First Issue
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <ActivityFeed />
              <QuickStats />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default CitizenIssueDashboard;