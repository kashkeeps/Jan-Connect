import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Initialize Gemini AI client
 */
class GeminiService {
  constructor() {
    this.genAI = null;
    this.isInitialized = false;
    this.initialize();
  }

  /**
   * Initialize the Gemini client with API key
   */
  initialize() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
      this.isInitialized = false;
    }
  }

  /**
   * Generate a professional grievance letter using Gemini AI
   * @param {Object} formData - Form data containing letter details
   * @returns {Promise<string>} Generated letter content
   */
  async generateGrievanceLetter(formData) {
    if (!this.isInitialized) {
      throw new Error('Gemini AI service is not initialized. Please check your API key.');
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = this.createLetterPrompt(formData);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return response.text();
    } catch (error) {
      console.error('Error generating letter with Gemini AI:', error);
      throw new Error('Failed to generate letter. Please try again.');
    }
  }

  /**
   * Stream generate a professional grievance letter using Gemini AI
   * @param {Object} formData - Form data containing letter details
   * @param {Function} onChunk - Callback for each streamed chunk
   */
  async streamGenerateGrievanceLetter(formData, onChunk) {
    if (!this.isInitialized) {
      throw new Error('Gemini AI service is not initialized. Please check your API key.');
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = this.createLetterPrompt(formData);
      const result = await model.generateContentStream(prompt);

      let fullText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          fullText += chunkText;
          onChunk(chunkText);
        }
      }
      
      return fullText;
    } catch (error) {
      console.error('Error streaming letter generation with Gemini AI:', error);
      throw new Error('Failed to generate letter. Please try again.');
    }
  }

  /**
   * Create a detailed prompt for letter generation
   * @param {Object} formData - Form data containing letter details
   * @returns {string} Formatted prompt for Gemini AI
   */
  createLetterPrompt(formData) {
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return `Generate a professional grievance letter with the following specifications:

**Letter Details:**
- Date: ${currentDate}
- Recipient: ${formData.recipient?.name || 'Government Official'}
- Recipient Designation: ${formData.recipient?.designation || 'Official'}
- Recipient Department: ${formData.recipient?.department || 'Government Department'}
- Recipient Address: ${formData.recipient?.address || 'Government Office'}
- Issue Category: ${formData.category || 'General Issue'}
- Location: ${formData.location || 'Not specified'}
- Urgency Level: ${formData.urgency || 'normal'}
- Tone: ${formData.tone || 'formal'}
- Template Type: ${formData.template || 'complaint'}
- Request Type: ${formData.requestType || 'resolution'}

**Issue Description:**
${formData.description || 'Please provide a detailed description of the issue.'}

**Additional Details:**
${formData.additionalDetails || 'No additional details provided.'}

**Instructions:**
1. Create a professional, well-structured grievance letter following Indian government correspondence standards
2. Include proper date, recipient details, and subject line
3. Use formal language appropriate for government communication
4. Structure the letter with clear paragraphs: opening, issue description, impact, request for action, and closing
5. Ensure the tone matches the specified preference (${formData.tone || 'formal'})
6. Make the urgency level (${formData.urgency || 'normal'}) apparent in the language used
7. Include appropriate salutation and closing based on the recipient's designation
8. Format for official correspondence with proper spacing and structure
9. Include placeholders for sender's details at the end: [Your Name], [Your Address], [Your Phone Number], [Your Email]
10. Ensure the letter is professional, respectful, and persuasive

**Subject Line Requirements:**
- For complaint: "Complaint regarding [category] in [location]"
- For RTI: "Application for Information under Right to Information Act, 2005" - For suggestion:"Suggestion for Improvement - [category]" - Add"URGENT:" prefix if urgency is critical

Generate only the letter content without any additional explanations or markdown formatting.`;
  }

  /**
   * Check if the service is properly initialized
   * @returns {boolean} Initialization status
   */
  isReady() {
    return this.isInitialized;
  }

  /**
   * Get service status and configuration
   * @returns {Object} Service status information
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasApiKey: !!import.meta.env.VITE_GEMINI_API_KEY,
      apiKeyLength: import.meta.env.VITE_GEMINI_API_KEY?.length || 0
    };
  }
}

// Create and export a singleton instance
const geminiService = new GeminiService();
export default geminiService;