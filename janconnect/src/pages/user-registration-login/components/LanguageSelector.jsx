import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = [
    { value: 'en', label: 'English', nativeName: 'English' },
    { value: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
    { value: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
    { value: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
    { value: 'mr', label: 'Marathi', nativeName: 'मराठी' },
    { value: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
    { value: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
    { value: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { value: 'ml', label: 'Malayalam', nativeName: 'മലയാളം' },
    { value: 'pa', label: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('janconnect_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('janconnect_language', languageCode);
    
    // In a real app, this would trigger language change across the app
    console.log('Language changed to:', languageCode);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.value === currentLanguage) || languages[0];
  };

  return (
    <div className="flex items-center space-x-2">
      <Icon name="Globe" size={16} className="text-text-secondary" />
      <Select
        options={languages.map(lang => ({
          value: lang.value,
          label: `${lang.label} (${lang.nativeName})`
        }))}
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="min-w-[140px]"
      />
    </div>
  );
};

export default LanguageSelector;