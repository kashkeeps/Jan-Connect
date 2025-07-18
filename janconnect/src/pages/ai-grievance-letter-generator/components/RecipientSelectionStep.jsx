import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecipientSelectionStep = ({ data, onUpdate, onNext, onBack }) => {
  const [selectedRecipient, setSelectedRecipient] = useState(data.recipient || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOfficials, setFilteredOfficials] = useState([]);

  const officials = [
    {
      id: 1,
      name: "Shri Rajesh Kumar Singh",
      designation: "Member of Legislative Assembly (MLA)",
      constituency: "Noida",
      department: "Legislative Assembly, Uttar Pradesh",
      email: "mla.noida@up.gov.in",
      phone: "+91-120-2345678",
      address: "MLA Office, Sector 6, Noida, Uttar Pradesh - 201301",
      relevantFor: ["Water Supply Issues", "Road & Infrastructure", "Municipal Services", "Other"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      designation: "Member of Parliament (MP)",
      constituency: "Gautam Buddha Nagar",
      department: "Lok Sabha, Parliament of India",
      email: "mp.gautambuddhanagar@sansad.nic.in",
      phone: "+91-120-2876543",
      address: "MP Office, Parliament House, New Delhi - 110001",
      relevantFor: ["Healthcare Services", "Education Facilities", "Environmental Issues", "Other"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Shri Amit Verma",
      designation: "District Magistrate",
      constituency: "Gautam Buddha Nagar",
      department: "District Administration",
      email: "dm.gbn@up.gov.in",
      phone: "+91-120-2423456",
      address: "Collectorate, Surajpur, Greater Noida, UP - 201306",
      relevantFor: ["Police & Security", "Municipal Services", "Public Transportation", "Other"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Ms. Sunita Gupta",
      designation: "Municipal Commissioner",
      constituency: "Noida",
      department: "Noida Authority",
      email: "commissioner@noidaauthority.com",
      phone: "+91-120-2531234",
      address: "Noida Authority Building, Sector 6, Noida, UP - 201301",
      relevantFor: ["Waste Management", "Water Supply Issues", "Road & Infrastructure", "Municipal Services"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Shri Vikash Pandey",
      designation: "Superintendent of Police",
      constituency: "Gautam Buddha Nagar",
      department: "Uttar Pradesh Police",
      email: "sp.gbn@up.police.gov.in",
      phone: "+91-120-2412345",
      address: "Police Lines, Knowledge Park, Greater Noida, UP - 201310",
      relevantFor: ["Police & Security", "Other"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    let filtered = officials;
    
    if (data.category) {
      filtered = officials.filter(official => 
        official.relevantFor.includes(data.category)
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(official =>
        official.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        official.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        official.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOfficials(filtered);
  }, [data.category, searchTerm]);

  const handleNext = () => {
    if (selectedRecipient) {
      onUpdate({ recipient: selectedRecipient });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Select Recipient
        </h2>
        <p className="text-text-secondary font-body">
          Choose the appropriate official to address your {data.category?.toLowerCase() || 'issue'}
        </p>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search by name, designation, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredOfficials.map((official) => (
          <div
            key={official.id}
            onClick={() => setSelectedRecipient(official)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedRecipient?.id === official.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={official.image}
                  alt={official.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-primary/10 flex items-center justify-center" style={{ display: 'none' }}>
                  <Icon name="User" size={24} className="text-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-text-primary mb-1">
                  {official.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-1">
                  {official.designation}
                </p>
                <p className="text-sm text-text-secondary mb-2">
                  {official.department}
                </p>
                <p className="text-xs text-text-secondary">
                  {official.constituency}
                </p>
              </div>
              
              {selectedRecipient?.id === official.id && (
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} className="text-primary-foreground" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Mail" size={12} />
                  <span className="truncate">{official.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Phone" size={12} />
                  <span>{official.phone}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOfficials.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
            No officials found
          </h3>
          <p className="text-text-secondary">
            Try adjusting your search terms or category selection
          </p>
        </div>
      )}

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">Selection Guide</h4>
            <p className="text-sm text-text-secondary">
              Officials are filtered based on your issue category. For complex issues affecting multiple departments, 
              consider starting with your local MLA or MP who can coordinate with relevant authorities.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedRecipient}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Next: Customize Letter
        </Button>
      </div>
    </div>
  );
};

export default RecipientSelectionStep;