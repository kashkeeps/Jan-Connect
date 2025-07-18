import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import geminiService from '../../../services/geminiService';

const LetterPreviewStep = ({ data, onUpdate, onNext, onBack }) => {
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLetter, setEditedLetter] = useState('');
  const [error, setError] = useState(null);
  const [generationProgress, setGenerationProgress] = useState('');

  useEffect(() => {
    generateLetter();
  }, []);

  const generateLetter = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationProgress('Initializing AI...');

    try {
      // Check if Gemini service is ready
      if (!geminiService.isReady()) {
        setGenerationProgress('Service not available...');
        // Fallback to mock generation
        setTimeout(() => {
          const mockLetter = createMockLetter();
          setGeneratedLetter(mockLetter);
          setEditedLetter(mockLetter);
          setIsGenerating(false);
          setGenerationProgress('');
        }, 2000);
        return;
      }

      setGenerationProgress('Generating with AI...');
      
      // Use Gemini AI to generate the letter
      const aiGeneratedLetter = await geminiService.generateGrievanceLetter(data);
      
      setGeneratedLetter(aiGeneratedLetter);
      setEditedLetter(aiGeneratedLetter);
      setIsGenerating(false);
      setGenerationProgress('');
      
    } catch (error) {
      console.error('Error generating letter:', error);
      setError('Failed to generate letter with AI. Using fallback method.');
      setGenerationProgress('Using fallback method...');
      
      // Fallback to mock generation
      setTimeout(() => {
        const mockLetter = createMockLetter();
        setGeneratedLetter(mockLetter);
        setEditedLetter(mockLetter);
        setIsGenerating(false);
        setError(null);
        setGenerationProgress('');
      }, 1500);
    }
  };

  const generateLetterStream = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationProgress('Initializing streaming...');
    setGeneratedLetter('');
    setEditedLetter('');

    try {
      if (!geminiService.isReady()) {
        throw new Error('Gemini service not ready');
      }

      setGenerationProgress('Streaming AI response...');
      
      let fullLetter = '';
      await geminiService.streamGenerateGrievanceLetter(data, (chunk) => {
        fullLetter += chunk;
        setGeneratedLetter(fullLetter);
        setEditedLetter(fullLetter);
      });
      
      setIsGenerating(false);
      setGenerationProgress('');
      
    } catch (error) {
      console.error('Error streaming letter generation:', error);
      setError('Failed to stream letter generation. Falling back to standard generation.');
      generateLetter();
    }
  };

  const createMockLetter = () => {
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const subject = getSubjectLine();
    const salutation = getSalutation();
    const body = getLetterBody();
    const closing = getClosing();

    return `Date: ${currentDate}

To,
${data.recipient?.name || 'Government Official'}
${data.recipient?.designation || 'Official'}
${data.recipient?.department || 'Government Department'}
${data.recipient?.address || 'Government Office'}

Subject: ${subject}

${salutation},

${body}

${closing}

Yours sincerely,

[Your Name]
[Your Address]
[Your Phone Number]
[Your Email]`;
  };

  const getSubjectLine = () => {
    const category = data.category || 'General Issue';
    const urgency = data.urgency || 'normal';
    const requestType = data.requestType || 'resolution';

    let subject = '';
    
    if (data.template === 'rti') {
      subject = `Application for Information under Right to Information Act, 2005 - ${category}`;
    } else if (data.template === 'complaint') {
      subject = `${urgency === 'critical' ? 'URGENT: ' : ''}Complaint regarding ${category} in ${data.location || 'specified area'}`;
    } else if (data.template === 'suggestion') {
      subject = `Suggestion for Improvement - ${category}`;
    } else {
      subject = `Follow-up on ${category} Issue`;
    }

    return subject;
  };

  const getSalutation = () => {
    const designation = data.recipient?.designation?.toLowerCase() || '';
    if (designation.includes('mla') || designation.includes('mp')) {
      return 'Respected Sir/Madam';
    } else if (designation.includes('commissioner') || designation.includes('magistrate')) {
      return 'Dear Sir/Madam';
    } else {
      return 'Respected Sir/Madam';
    }
  };

  const getLetterBody = () => {
    let body = '';
    
    // Opening paragraph
    body += `I am writing to bring to your attention a matter of ${data.urgency === 'critical' ? 'urgent ' : ''}concern regarding ${data.category?.toLowerCase() || 'general issue'} in ${data.location || 'the specified area'}.\n\n`;
    
    // Issue description (AI-enhanced)
    const enhancedDescription = enhanceDescription(data.description || 'Issue description not provided');
    body += `${enhancedDescription}\n\n`;
    
    // Additional details if provided
    if (data.additionalDetails) {
      body += `Additional Information:\n${data.additionalDetails}\n\n`;
    }
    
    // Request based on type
    body += getRequestParagraph();
    
    // Closing paragraph
    body += `\n\nI would be grateful for your prompt attention to this matter and look forward to a positive response. Please feel free to contact me if you require any additional information.\n\nThank you for your time and consideration.`;
    
    return body;
  };

  const enhanceDescription = (description) => {
    // Simulate AI enhancement - make it more formal
    let enhanced = description;
    
    // Add formal language patterns
    enhanced = enhanced.replace(/I think/g, 'It appears that');
    enhanced = enhanced.replace(/really bad/g, 'severely inadequate');
    enhanced = enhanced.replace(/a lot of/g, 'numerous');
    enhanced = enhanced.replace(/very/g, 'extremely');
    
    // Ensure proper paragraph structure
    const sentences = enhanced.split('. ');
    const paragraphs = [];
    let currentParagraph = '';
    
    sentences.forEach((sentence, index) => {
      currentParagraph += sentence + (index < sentences.length - 1 ? '. ' : '');
      if ((index + 1) % 3 === 0 || index === sentences.length - 1) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
      }
    });
    
    return paragraphs.join('\n\n');
  };

  const getRequestParagraph = () => {
    switch (data.requestType) {
      case 'resolution':
        return `I kindly request your immediate intervention to resolve this issue. The situation is causing significant inconvenience to the residents and requires urgent attention from the concerned authorities.`;
      case 'information':
        return `I would appreciate if you could provide information regarding the current status of this matter and the steps being taken to address it.`;
      case 'meeting':
        return `I would be grateful if you could arrange a meeting to discuss this matter in detail and explore possible solutions.`;
      case 'inspection':
        return `I request you to kindly arrange for an official inspection of the site to assess the situation and take appropriate action.`;
      default:
        return `I kindly request your immediate attention and appropriate action to resolve this matter at the earliest.`;
    }
  };

  const getClosing = () => {
    if (data.urgency === 'critical') {
      return 'Given the urgent nature of this matter, I hope for your immediate attention and swift action.';
    } else if (data.tone === 'diplomatic') {
      return 'I am confident that with your support and guidance, this matter can be resolved amicably for the benefit of all concerned.';
    } else {
      return 'I trust that you will give this matter your due consideration and take appropriate action.';
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setGeneratedLetter(editedLetter);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedLetter(generatedLetter);
    setIsEditing(false);
  };

  const handleNext = () => {
    onUpdate({ generatedLetter: isEditing ? editedLetter : generatedLetter });
    onNext();
  };

  const handleRegenerate = () => {
    generateLetter();
  };

  const handleStreamGenerate = () => {
    generateLetterStream();
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Generating Your Letter
        </h2>
        <p className="text-text-secondary text-center max-w-md mb-4">
          {geminiService.isReady() 
            ? 'Our AI is crafting a professional letter based on your inputs. This may take a few moments...'
            : 'Generating your letter using our template system...'
          }
        </p>
        {generationProgress && (
          <p className="text-sm text-primary mb-4">{generationProgress}</p>
        )}
        {error && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
            <p className="text-sm text-warning">{error}</p>
          </div>
        )}
        <div className="mt-6 space-y-2 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Analyzing your issue description</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Applying formal language patterns</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Formatting for official correspondence</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Review Your Letter
        </h2>
        <p className="text-text-secondary font-body">
          {geminiService.isReady() 
            ? 'AI-generated letter ready for review and customization'
            : 'Template-based letter ready for review and customization'
          }
        </p>
      </div>

      {/* AI Status Indicator */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${geminiService.isReady() ? 'bg-success' : 'bg-warning'}`}></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">
              {geminiService.isReady() ? 'AI-Powered Generation Active' : 'Template-Based Generation'}
            </p>
            <p className="text-xs text-text-secondary">
              {geminiService.isReady() 
                ? 'Using Google Gemini AI for enhanced letter generation'
                : 'AI service unavailable. Using template-based generation with smart formatting.'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-primary" />
            <span className="font-medium text-text-primary">Generated Letter</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              iconName="RefreshCw"
              iconPosition="left"
              disabled={isGenerating}
            >
              Regenerate
            </Button>
            {geminiService.isReady() && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleStreamGenerate}
                iconName="Zap"
                iconPosition="left"
                disabled={isGenerating}
              >
                Stream
              </Button>
            )}
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  iconName="Check"
                  iconPosition="left"
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <textarea
              value={editedLetter}
              onChange={(e) => setEditedLetter(e.target.value)}
              className="w-full h-96 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Edit your letter here..."
            />
          ) : (
            <div className="bg-white p-6 rounded-lg border border-border">
              <pre className="whitespace-pre-wrap font-body text-sm text-text-primary leading-relaxed">
                {generatedLetter || 'No letter generated yet.'}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="font-medium text-text-primary text-sm">Recipient</span>
          </div>
          <p className="text-sm text-text-secondary">{data.recipient?.name || 'Not specified'}</p>
          <p className="text-xs text-text-secondary">{data.recipient?.designation || 'Not specified'}</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Tag" size={16} className="text-primary" />
            <span className="font-medium text-text-primary text-sm">Category</span>
          </div>
          <p className="text-sm text-text-secondary">{data.category || 'Not specified'}</p>
          <p className="text-xs text-text-secondary">Priority: {data.urgency || 'normal'}</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileType" size={16} className="text-primary" />
            <span className="font-medium text-text-primary text-sm">Template</span>
          </div>
          <p className="text-sm text-text-secondary">{data.template || 'complaint'}</p>
          <p className="text-xs text-text-secondary">Tone: {data.tone || 'formal'}</p>
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
          iconName="ArrowRight"
          iconPosition="right"
        >
          Submit Letter
        </Button>
      </div>
    </div>
  );
};

export default LetterPreviewStep;