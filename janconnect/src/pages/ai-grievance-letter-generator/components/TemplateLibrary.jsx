import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TemplateLibrary = ({ onSelectTemplate, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      title: "Water Supply Complaint",
      category: "Water Supply Issues",
      description: "Template for reporting irregular water supply or quality issues",
      usage: 245,
      preview: `Subject: Complaint regarding irregular water supply in [Location]

Dear Sir/Madam,

I am writing to bring to your attention the persistent issue of irregular water supply in our area. The problem has been ongoing for [duration] and is causing significant hardship to residents.

The main issues include:
- Irregular timing of water supply
- Low water pressure
- Poor water quality

I request your immediate intervention to resolve this matter.

Yours sincerely,
[Your Name]`,
      tags: ["water", "supply", "municipal", "complaint"]
    },
    {
      id: 2,
      title: "Road Repair Request",
      category: "Road & Infrastructure",
      description: "Template for requesting road maintenance and pothole repairs",
      usage: 189,
      preview: `Subject: Request for urgent road repair in [Location]

Respected Sir/Madam,

I wish to draw your attention to the deteriorating condition of roads in our locality. The poor road conditions are causing numerous problems for residents and commuters.

Issues observed:
- Multiple potholes causing vehicle damage
- Poor drainage leading to waterlogging
- Lack of proper street lighting

I kindly request immediate action to repair and maintain these roads.

Respectfully yours,
[Your Name]`,
      tags: ["road", "repair", "infrastructure", "maintenance"]
    },
    {
      id: 3,
      title: "RTI Application",
      category: "Information Request",
      description: "Standard Right to Information Act application template",
      usage: 156,
      preview: `Subject: Application under Right to Information Act, 2005

To,
The Public Information Officer

Sir/Madam,

Under the Right to Information Act, 2005, I request the following information:

1. [Specific information requested]
2. [Additional details if required]

I am willing to pay the prescribed fee for obtaining this information. Please provide the information within the stipulated time frame.

Yours faithfully,
[Your Name]`,
      tags: ["rti", "information", "transparency", "government"]
    },
    {
      id: 4,
      title: "Electricity Issue Report",
      category: "Electricity Problems",
      description: "Template for reporting power outages and electrical issues",
      usage: 134,
      preview: `Subject: Complaint regarding frequent power outages in [Location]

Dear Sir/Madam,

I am writing to report the frequent power outages in our area that have been occurring for the past [duration]. This is causing significant inconvenience to residents and affecting daily activities.

Issues faced:
- Frequent power cuts without prior notice
- Voltage fluctuations damaging appliances
- Delayed restoration of power supply

I request your immediate attention to resolve these electrical issues.

Sincerely,
[Your Name]`,
      tags: ["electricity", "power", "outage", "voltage"]
    },
    {
      id: 5,
      title: "Waste Management Complaint",
      category: "Waste Management",
      description: "Template for garbage collection and waste disposal issues",
      usage: 98,
      preview: `Subject: Complaint regarding irregular garbage collection in [Location]

Respected Sir/Madam,

I would like to bring to your notice the irregular garbage collection in our locality. The inconsistent waste management services are creating health and environmental hazards.

Problems observed:
- Irregular garbage collection schedule
- Overflowing dustbins attracting pests
- Improper waste segregation

I urge you to take immediate action to improve waste management services.

Yours truly,
[Your Name]`,
      tags: ["waste", "garbage", "collection", "sanitation"]
    },
    {
      id: 6,
      title: "Public Transport Improvement",
      category: "Public Transportation",
      description: "Template for suggesting improvements to public transport",
      usage: 76,
      preview: `Subject: Suggestion for improving public transportation services

Dear Sir/Madam,

I am writing to suggest improvements to the public transportation system in our area. Enhanced public transport would benefit the entire community and reduce traffic congestion.

Suggestions:
- Increase frequency of bus services
- Improve bus stop facilities
- Introduce new routes to underserved areas

I hope you will consider these suggestions for the betterment of public transport.

Respectfully,
[Your Name]`,
      tags: ["transport", "bus", "improvement", "suggestion"]
    }
  ];

  const categories = [
    'all',
    'Water Supply Issues',
    'Road & Infrastructure',
    'Electricity Problems',
    'Waste Management',
    'Public Transportation',
    'Information Request'
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (template) => {
    onSelectTemplate({
      description: template.preview.split('\n\n').slice(2, -2).join('\n\n'),
      category: template.category,
      template: 'complaint'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Template Library
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Choose from pre-built templates to get started quickly
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex h-96">
          <div className="w-1/3 border-r border-border overflow-y-auto">
            <div className="p-4 space-y-2">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                  onClick={() => handleSelectTemplate(template)}
                >
                  <h3 className="font-medium text-text-primary mb-1">
                    {template.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                      {template.category}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-text-secondary">
                      <Icon name="Users" size={12} />
                      <span>{template.usage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {filteredTemplates.length > 0 ? (
              <div className="text-center py-12">
                <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                  Select a Template
                </h3>
                <p className="text-text-secondary">
                  Click on any template from the left to preview it here
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                  No Templates Found
                </h3>
                <p className="text-text-secondary">
                  Try adjusting your search terms or category filter
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex justify-between items-center">
            <p className="text-sm text-text-secondary">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
            </p>
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;