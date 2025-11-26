import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowRight') {
      onNext();
    } else if (e.key === 'ArrowLeft') {
      onPrev();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <button 
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
        onClick={onClose}
        aria-label="Close gallery"
      >
        <X size={24} />
      </button>
      
      <button 
        className="absolute left-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
        onClick={onPrev}
        aria-label="Previous image"
      >
        <ChevronLeft size={32} />
      </button>
      
      <button 
        className="absolute right-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
        onClick={onNext}
        aria-label="Next image"
      >
        <ChevronRight size={32} />
      </button>
      
      <div className="max-w-4xl max-h-full flex items-center justify-center">
        {images[currentIndex] && (
          <img 
            src={images[currentIndex].src || images[currentIndex]} 
            onError={(e) => {
              if (images[currentIndex].fallback) {
                e.currentTarget.src = images[currentIndex].fallback;
              }
            }}
            alt={`Gallery item ${currentIndex + 1}`}
            className="max-h-[80vh] max-w-full object-contain"
          />
        )}
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-white">
        <p>{currentIndex + 1} / {images.length}</p>
      </div>
    </div>
  );
};

export default GalleryModal;