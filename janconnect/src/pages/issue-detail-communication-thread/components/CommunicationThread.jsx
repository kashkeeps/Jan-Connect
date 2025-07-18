import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CommunicationThread = ({ messages, onSendMessage, currentUser }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😊', '👍', '👎', '❤️', '😢', '😡', '🙏', '👏', '🔥', '💯'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() || attachments.length > 0) {
      onSendMessage({
        text: newMessage.trim(),
        attachments: attachments,
        timestamp: new Date().toISOString()
      });
      setNewMessage('');
      setAttachments([]);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (attachmentId) => {
    setAttachments(attachments.filter(att => att.id !== attachmentId));
  };

  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isCurrentUser = (message) => {
    return message.sender.id === currentUser.id;
  };

  return (
    <div className="bg-card border border-border rounded-lg flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Communication Thread
        </h3>
        <p className="text-sm text-text-secondary">
          Real-time chat with assigned official
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${isCurrentUser(message) ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${isCurrentUser(message) ? 'order-2' : 'order-1'}`}>
              {/* Sender Info */}
              <div className={`flex items-center space-x-2 mb-1 ${isCurrentUser(message) ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-center space-x-2 ${isCurrentUser(message) ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="User" size={12} className="text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-text-secondary">
                    {message.sender.name}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {message.timestamp}
                  </span>
                </div>
              </div>

              {/* Message Bubble */}
              <div className={`rounded-lg p-3 ${
                isCurrentUser(message)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-primary'
              }`}>
                {message.text && (
                  <p className="text-sm">{message.text}</p>
                )}

                {/* Message Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment, attIndex) => (
                      <div key={attIndex}>
                        {attachment.type?.startsWith('image/') ? (
                          <div className="rounded-lg overflow-hidden max-w-xs">
                            <Image
                              src={attachment.url}
                              alt={attachment.name}
                              className="w-full h-auto"
                            />
                          </div>
                        ) : (
                          <div className={`flex items-center space-x-2 p-2 rounded border ${
                            isCurrentUser(message)
                              ? 'border-primary-foreground/20 bg-primary-foreground/10'
                              : 'border-border bg-surface'
                          }`}>
                            <Icon name="Paperclip" size={14} />
                            <span className="text-xs">{attachment.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Read Receipt */}
              {message.readReceipt && isCurrentUser(message) && (
                <div className="flex justify-end mt-1">
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Check" size={12} />
                    <span>Read</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="p-4 border-t border-border">
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2 text-sm"
              >
                <Icon name="Paperclip" size={14} className="text-text-secondary" />
                <span className="text-text-primary">{attachment.name}</span>
                <span className="text-text-secondary">({formatFileSize(attachment.size)})</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttachment(attachment.id)}
                  className="w-4 h-4 p-0"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="mb-3 p-3 bg-muted rounded-lg">
            <div className="flex flex-wrap gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => addEmoji(emoji)}
                  className="text-lg hover:bg-surface rounded p-1 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Icon name="Smile" size={20} />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Icon name="Paperclip" size={20} />
            </Button>

            <Button
              type="submit"
              variant="default"
              size="icon"
              disabled={!newMessage.trim() && attachments.length === 0}
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </form>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
      </div>
    </div>
  );
};

export default CommunicationThread;