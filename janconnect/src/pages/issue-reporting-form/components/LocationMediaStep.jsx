import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LocationMediaStep = ({ formData, updateFormData, errors }) => {
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef(null);

  const handleLocationDetection = () => {
    setIsDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateFormData({
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
            address: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
          });
          setIsDetectingLocation(false);
        },
        (error) => {
          console.error('Location detection failed:', error);
          setIsDetectingLocation(false);
        }
      );
    } else {
      setIsDetectingLocation(false);
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    
    // Simulate image processing and upload
    setTimeout(() => {
      const newImages = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
        type: file.type
      }));

      const existingImages = formData.images || [];
      updateFormData({
        images: [...existingImages, ...newImages].slice(0, 5) // Max 5 images
      });
      setUploadingImages(false);
    }, 1500);
  };

  const removeImage = (imageId) => {
    const updatedImages = (formData.images || []).filter(img => img.id !== imageId);
    updateFormData({ images: updatedImages });
  };

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Location Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Location Details
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="text"
              placeholder="Auto-detected or manual entry"
              value={formData.latitude || ''}
              onChange={(e) => handleInputChange('latitude', e.target.value)}
              error={errors.latitude}
            />
            
            <Input
              label="Longitude"
              type="text"
              placeholder="Auto-detected or manual entry"
              value={formData.longitude || ''}
              onChange={(e) => handleInputChange('longitude', e.target.value)}
              error={errors.longitude}
            />
          </div>

          <Input
            label="Address/Landmark"
            type="text"
            placeholder="Nearby landmark or complete address"
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            error={errors.address}
            required
          />

          <Button
            variant="outline"
            onClick={handleLocationDetection}
            loading={isDetectingLocation}
            iconName="MapPin"
            iconPosition="left"
            className="w-full md:w-auto"
          >
            {isDetectingLocation ? 'Detecting Location...' : 'Detect Current Location'}
          </Button>

          {/* Map Preview */}
          <div className="bg-muted rounded-lg overflow-hidden" style={{ height: '300px' }}>
            {formData.latitude && formData.longitude ? (
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Issue Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}&z=16&output=embed`}
                className="border-0"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Icon name="MapPin" size={48} className="text-text-secondary mx-auto mb-2" />
                  <p className="text-text-secondary">Location will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Media Upload Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Upload Images
        </h3>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <Icon name="Upload" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-primary font-medium mb-2">
              Upload photos of the issue
            </p>
            <p className="text-text-secondary text-sm mb-4">
              PNG, JPG up to 5MB each. Maximum 5 images.
            </p>
            
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              loading={uploadingImages}
              iconName="Camera"
              iconPosition="left"
            >
              {uploadingImages ? 'Processing...' : 'Choose Images'}
            </Button>
          </div>

          {/* Image Previews */}
          {formData.images && formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {formData.images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={image.url}
                      alt={`Issue image ${image.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                  <p className="text-xs text-text-secondary mt-1 truncate">
                    {image.name}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-muted rounded-lg p-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">Photo Guidelines</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Take clear, well-lit photos showing the issue</li>
              <li>• Include wider shots for context</li>
              <li>• Avoid including personal information in photos</li>
              <li>• Multiple angles help officials understand better</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMediaStep;