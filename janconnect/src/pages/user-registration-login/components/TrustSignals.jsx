import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: 'Government Certified',
      description: 'Official platform recognized by Government of India'
    },
    {
      icon: 'Lock',
      title: 'SSL Secured',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Award',
      title: 'Digital India Initiative',
      description: 'Part of the Digital India mission for e-governance'
    }
  ];

  const partnerLogos = [
    { name: 'Government of India', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop&crop=center' },
    { name: 'Digital India', logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=60&fit=crop&crop=center' },
    { name: 'MyGov', logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=60&fit=crop&crop=center' }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges.map((badge, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Icon name={badge.icon} size={20} className="text-primary" />
            </div>
            <h4 className="font-medium text-text-primary text-sm mb-1">{badge.title}</h4>
            <p className="text-xs text-text-secondary leading-relaxed">{badge.description}</p>
          </div>
        ))}
      </div>

      {/* Partner Logos */}
      <div className="border-t border-border pt-6">
        <p className="text-center text-sm text-text-secondary mb-4">Trusted by Government Partners</p>
        <div className="flex items-center justify-center space-x-6 opacity-60">
          {partnerLogos.map((partner, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded overflow-hidden">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <span className="text-xs text-text-secondary font-medium hidden sm:block">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="ShieldCheck" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="font-medium text-success text-sm mb-1">Secure & Private</h4>
            <p className="text-success/80 text-xs leading-relaxed">
              Your personal information is protected under the Information Technology Act, 2000 
              and follows government data protection guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;