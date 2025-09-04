import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../mock';

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBefore, setShowBefore] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const currentImage = galleryImages[currentSlide];

  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Before & After Gallery</h2>
          <p className="body-large max-w-2xl mx-auto">
            Discover the remarkable transformations we've achieved for our clients. 
            See how we turn outdated offices into modern, inspiring workspaces.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Before/After Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white border border-gray-200 rounded-full p-1 flex">
              <button
                onClick={() => setShowBefore(true)}
                className={`px-6 py-2 rounded-full transition-all ${
                  showBefore
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setShowBefore(false)}
                className={`px-6 py-2 rounded-full transition-all ${
                  !showBefore
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                After
              </button>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative">
            <div className="gallery-container">
              <img
                src={showBefore ? currentImage.beforeImage : currentImage.afterImage}
                alt={currentImage.title}
                className="gallery-image"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Image Info */}
            <div className="mt-6 text-center">
              <h3 className="heading-3 mb-2">{currentImage.title}</h3>
              <p className="body-medium text-gray-600">{currentImage.description}</p>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-green-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;