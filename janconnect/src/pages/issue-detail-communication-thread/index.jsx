import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import DesktopNavigation from '../../components/ui/DesktopNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import IssueHeader from './components/IssueHeader';
import ImageGallery from './components/ImageGallery';
import StatusTimeline from './components/StatusTimeline';
import CommunicationThread from './components/CommunicationThread';
import ProgressTracker from './components/ProgressTracker';
import RelatedIssues from './components/RelatedIssues';
import ActionButtons from './components/ActionButtons';

const IssueDetailCommunicationThread = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const issueId = searchParams.get('id') || 'ISS-2024-001';

  // Mock current user
  const currentUser = {
    id: 'user-123',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com'
  };

  // Mock issue data
  const [issue] = useState({
    id: 'ISS-2024-001',
    title: 'Broken Street Light on MG Road',
    description: `The street light near the bus stop on MG Road has been non-functional for the past two weeks. This is causing safety concerns for pedestrians, especially during evening hours. The light pole appears to be damaged and needs immediate attention.`,
    status: 'In Progress',
    priority: 'High',
    category: 'Infrastructure',
    submittedDate: '15 Jan 2025',
    assignedOfficial: 'Shri Rajesh Sharma',
    location: 'MG Road, Near Bus Stop, Sector 17, Chandigarh',
    constituency: 'Chandigarh'
  });

  // Mock images
  const [images] = useState([
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      caption: 'Broken street light pole',
      uploadDate: '15 Jan 2025'
    },
    {
      url: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=400',
      caption: 'Dark area at night',
      uploadDate: '15 Jan 2025'
    },
    {
      url: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=400',
      caption: 'Location overview',
      uploadDate: '15 Jan 2025'
    }
  ]);

  // Mock timeline data
  const [timeline] = useState([
    {
      type: 'submitted',
      title: 'Issue Submitted',
      description: 'Issue reported by citizen',
      actor: { name: 'Rajesh Kumar', type: 'citizen' },
      timestamp: '15 Jan 2025, 10:30 AM',
      message: 'Submitted issue regarding broken street light on MG Road.',
      attachments: [
        { name: 'street_light_photo.jpg' }
      ]
    },
    {
      type: 'acknowledged',
      title: 'Issue Acknowledged',
      description: 'Issue received and assigned to department',
      actor: { name: 'Municipal Office', type: 'system' },
      timestamp: '15 Jan 2025, 2:15 PM',
      message: 'Your issue has been acknowledged and assigned to the Infrastructure Department.',
      readReceipt: { readBy: 'Rajesh Kumar', readAt: '15 Jan 2025, 2:20 PM' }
    },
    {
      type: 'message',
      title: 'Official Response',
      description: 'Response from assigned official',
      actor: { name: 'Shri Rajesh Sharma', type: 'official' },
      timestamp: '16 Jan 2025, 9:45 AM',
      message: `Thank you for reporting this issue. Our team has inspected the location and confirmed the problem. We have ordered replacement parts and expect to complete the repair within 3-5 working days.`,
      readReceipt: { readBy: 'Rajesh Kumar', readAt: '16 Jan 2025, 10:00 AM' }
    },
    {
      type: 'in progress',
      title: 'Work Started',
      description: 'Repair work has begun',
      actor: { name: 'Infrastructure Team', type: 'official' },
      timestamp: '17 Jan 2025, 11:00 AM',
      message: 'Our technical team has started the repair work. Expected completion by 19 Jan 2025.',
      attachments: [
        { name: 'work_order.pdf' }
      ]
    }
  ]);

  // Mock status history
  const [statusHistory] = useState([
    { status: 'submitted', date: '15 Jan 2025' },
    { status: 'acknowledged', date: '15 Jan 2025' },
    { status: 'in_progress', date: '17 Jan 2025' }
  ]);

  // Mock messages for communication thread
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: { id: 'user-123', name: 'Rajesh Kumar', type: 'citizen' },
      text: 'Hello, I wanted to check on the status of my street light repair request.',
      timestamp: '16 Jan 2025, 9:30 AM',
      attachments: []
    },
    {
      id: 2,
      sender: { id: 'official-456', name: 'Shri Rajesh Sharma', type: 'official' },
      text: `Hello Mr. Kumar, thank you for following up. Our team has inspected the location and we've ordered the replacement parts. The repair should be completed within 3-5 working days.`,timestamp: '16 Jan 2025, 9:45 AM',
      attachments: [],
      readReceipt: true
    },
    {
      id: 3,
      sender: { id: 'user-123', name: 'Rajesh Kumar', type: 'citizen' },
      text: 'Thank you for the update. Will there be any temporary lighting arrangement in the meantime?',timestamp: '16 Jan 2025, 10:00 AM',
      attachments: []
    },
    {
      id: 4,
      sender: { id: 'official-456', name: 'Shri Rajesh Sharma', type: 'official' },
      text: 'We will arrange for temporary lighting today evening. Our team will install a portable light until the permanent repair is completed.',timestamp: '16 Jan 2025, 2:30 PM',
      attachments: [],
      readReceipt: true
    }
  ]);

  // Mock related issues
  const [relatedIssues] = useState([
    {
      id: 'ISS-2024-002',
      title: 'Pothole on MG Road Extension',
      status: 'Acknowledged',
      priority: 'Medium',
      category: 'Roads',
      location: 'MG Road Extension, Sector 18',
      submittedDate: '14 Jan 2025'
    },
    {
      id: 'ISS-2024-003',
      title: 'Garbage Collection Delay',
      status: 'Resolved',
      priority: 'Low',
      category: 'Sanitation',
      location: 'Sector 17 Market',
      submittedDate: '12 Jan 2025'
    },
    {
      id: 'ISS-2024-004',
      title: 'Water Supply Interruption',
      status: 'In Progress',
      priority: 'High',
      category: 'Water Supply',
      location: 'Sector 17-A',
      submittedDate: '13 Jan 2025'
    }
  ]);

  const handleBack = () => {
    navigate('/citizen-issue-dashboard');
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: messages.length + 1,
      sender: currentUser,
      text: messageData.text,
      timestamp: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      attachments: messageData.attachments || []
    };
    setMessages([...messages, newMessage]);
  };

  const handleRateResolution = (ratingData) => {
    console.log('Rating submitted:', ratingData);
    // Handle rating submission
  };

  const handleRequestEscalation = (escalationData) => {
    console.log('Escalation requested:', escalationData);
    // Handle escalation request
  };

  const handleMarkSatisfied = (issueId) => {
    console.log('Issue marked as satisfied:', issueId);
    // Handle satisfaction marking
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center py-4 bg-surface border-b border-border">
          <DesktopNavigation />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Issue Header */}
          <IssueHeader issue={issue} onBack={handleBack} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <ImageGallery images={images} />

              {/* Status Timeline */}
              <StatusTimeline timeline={timeline} />

              {/* Communication Thread */}
              <CommunicationThread
                messages={messages}
                onSendMessage={handleSendMessage}
                currentUser={currentUser}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Progress Tracker */}
              <ProgressTracker
                currentStatus={issue.status}
                statusHistory={statusHistory}
              />

              {/* Action Buttons */}
              <ActionButtons
                issue={issue}
                onRateResolution={handleRateResolution}
                onRequestEscalation={handleRequestEscalation}
                onMarkSatisfied={handleMarkSatisfied}
              />

              {/* Related Issues */}
              <RelatedIssues
                issues={relatedIssues}
                constituency={issue.constituency}
              />
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default IssueDetailCommunicationThread;