import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, title: 'Issue #12345 Updated', message: 'Your water supply complaint has been reviewed', time: '2 min ago', unread: true },
    { id: 2, title: 'Response from Municipal Office', message: 'Road repair work scheduled for next week', time: '1 hour ago', unread: true },
    { id: 3, title: 'Issue Resolved', message: 'Street light repair completed successfully', time: '3 hours ago', unread: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  const handleNotificationClick = (notificationId) => {
    console.log('Notification clicked:', notificationId);
    setShowNotifications(false);
  };

  const handleProfileAction = (action) => {
    console.log('Profile action:', action);
    setShowProfileMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/citizen-issue-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-text-primary">JanConnect</h1>
              <p className="text-xs font-caption text-text-secondary">Citizen Services Platform</p>
            </div>
          </Link>
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <form onSubmit={handleSearch} className="relative">
            <div className={`flex items-center transition-all duration-200 ${
              isSearchExpanded ? 'bg-muted' : 'bg-background'
            } border border-border rounded-lg`}>
              <Icon 
                name="Search" 
                size={20} 
                className="ml-3 text-text-secondary" 
              />
              <input
                type="text"
                placeholder="Search issues, tracking numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setIsSearchExpanded(false)}
                className="flex-1 px-3 py-2 bg-transparent text-text-primary placeholder-text-secondary focus:outline-none"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="mr-1"
                >
                  <Icon name="X" size={16} />
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-modal z-60">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-medium text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-muted transition-colors ${
                        notification.unread ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-body font-medium text-text-primary text-sm">
                            {notification.title}
                          </p>
                          <p className="text-text-secondary text-sm mt-1">
                            {notification.message}
                          </p>
                          <p className="text-text-secondary text-xs mt-2 font-caption">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
              <span className="hidden md:block font-body text-text-primary">Rajesh Kumar</span>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </Button>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-48 bg-popover border border-border rounded-lg shadow-modal z-60">
                <div className="p-2">
                  <button
                    onClick={() => handleProfileAction('profile')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon name="User" size={16} />
                    <span className="font-body text-text-primary">My Profile</span>
                  </button>
                  <button
                    onClick={() => handleProfileAction('settings')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon name="Settings" size={16} />
                    <span className="font-body text-text-primary">Settings</span>
                  </button>
                  <button
                    onClick={() => handleProfileAction('help')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span className="font-body text-text-primary">Help & Support</span>
                  </button>
                  <hr className="my-2 border-border" />
                  <button
                    onClick={() => handleProfileAction('logout')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors text-destructive"
                  >
                    <Icon name="LogOut" size={16} />
                    <span className="font-body">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;