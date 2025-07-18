import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Submitted Images ({images.length})
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer rounded-lg overflow-hidden bg-muted"
              onClick={() => openLightbox(image, index)}
            >
              <div className="aspect-square">
                <Image
                  src={image.url}
                  alt={image.caption || `Issue image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <Icon 
                  name="ZoomIn" 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                />
              </div>
              
              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                  <p className="text-xs truncate">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
            >
              <Icon name="X" size={24} />
            </Button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </>
            )}

            {/* Image */}
            <div className="max-w-full max-h-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.caption || 'Issue image'}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-60 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  {selectedImage.caption && (
                    <p className="font-medium mb-1">{selectedImage.caption}</p>
                  )}
                  <p className="text-sm opacity-80">
                    Image {currentIndex + 1} of {images.length}
                  </p>
                </div>
                <div className="text-sm opacity-80">
                  {selectedImage.uploadDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;