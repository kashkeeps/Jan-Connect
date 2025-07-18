import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IssueDescriptionStep = ({ data, onUpdate, onNext }) => {
  const [isListening, setIsListening] = useState(false);
  const [description, setDescription] = useState(data.description || '');
  const [category, setCategory] = useState(data.category || '');
  const [location, setLocation] = useState(data.location || '');
  const textareaRef = useRef(null);

  const categories = [
    "Water Supply Issues",
    "Road & Infrastructure",
    "Electricity Problems",
    "Waste Management",
    "Public Transportation",
    "Healthcare Services",
    "Education Facilities",
    "Police & Security",
    "Municipal Services",
    "Environmental Issues",
    "Other"
  ];

  const categoryOptions = categories.map(cat => ({
    value: cat,
    label: cat
  }));

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setDescription(prev => prev + ' ' + transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  const handleNext = () => {
    const stepData = {
      description: description.trim(),
      category,
      location: location.trim()
    };
    
    onUpdate(stepData);
    onNext();
  };

  const isValid = description.trim().length >= 50 && category && location.trim();
  const characterCount = description.length;
  const maxCharacters = 2000;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Describe Your Issue
        </h2>
        <p className="text-text-secondary font-body">
          Tell us about the problem you're facing. Be as detailed as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Select
            label="Issue Category"
            options={categoryOptions}
            value={category}
            onChange={(value) => setCategory(value)}
            placeholder="Select a category"
            required
            className="mb-4"
          />

          <Input
            label="Location"
            type="text"
            placeholder="e.g., Sector 15, Noida, Uttar Pradesh"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            description="Provide specific location details for better assistance"
          />
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Issue Description *
            </label>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue in detail. For example: 'The water supply in our area has been irregular for the past two weeks. We only get water for 2 hours in the morning and evening. Many residents are facing difficulties...'"
                className="w-full h-40 p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                maxLength={maxCharacters}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className={`absolute top-2 right-2 ${isListening ? 'text-destructive' : 'text-text-secondary'}`}
                title={isListening ? 'Stop recording' : 'Start voice input'}
              >
                <Icon name={isListening ? 'MicOff' : 'Mic'} size={16} />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-text-secondary">
                Minimum 50 characters required
              </p>
              <p className={`text-xs ${characterCount > maxCharacters * 0.9 ? 'text-warning' : 'text-text-secondary'}`}>
                {characterCount}/{maxCharacters}
              </p>
            </div>
          </div>

          {isListening && (
            <div className="flex items-center space-x-2 text-destructive">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <span className="text-sm font-body">Listening...</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">Writing Tips</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Include specific dates, times, and locations</li>
              <li>• Mention how the issue affects you and your community</li>
              <li>• Describe any previous attempts to resolve the issue</li>
              <li>• Use simple, clear language - our AI will make it formal</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <div></div>
        <Button
          onClick={handleNext}
          disabled={!isValid}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Next: Select Recipient
        </Button>
      </div>
    </div>
  );
};

export default IssueDescriptionStep;