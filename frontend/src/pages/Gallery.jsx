import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Eye } from 'lucide-react';
import { galleryImages } from '../mock';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBefore, setShowBefore] = useState(true);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'complete-transformation', label: 'Complete Transformations' },
    { value: 'conference-room', label: 'Conference Rooms' },
    { value: 'executive-office', label: 'Executive Offices' },
    { value: 'open-workspace', label: 'Open Workspaces' },
    { value: 'creative-space', label: 'Creative Spaces' },
    { value: 'professional-office', label: 'Professional Offices' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-hero bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container text-center">
          <h1 className="heading-1 mb-6">Project Gallery</h1>
          <p className="body-large max-w-3xl mx-auto">
            Explore our portfolio of successful office transformations. See how we've helped 
            businesses create inspiring, productive workspaces across various industries.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section bg-white border-b">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <div key={image.id} className="group cursor-pointer" onClick={() => openModal(image)}>
                <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Before/After Toggle for Grid Items */}
                  <div className="relative">
                    <img
                      src={showBefore ? image.beforeImage : image.afterImage}
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {showBefore ? 'Before' : 'After'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="heading-3 mb-2">{image.title}</h3>
                    <p className="body-small text-gray-600 mb-3">{image.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{image.client}</span>
                      <span>{image.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <Filter className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="heading-3 text-gray-600 mb-2">No projects found</h3>
              <p className="body-medium text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Global Before/After Toggle */}
      <section className="section bg-gray-50">
        <div className="container text-center">
          <h2 className="heading-2 mb-8">Toggle Between Before & After Views</h2>
          <div className="flex justify-center mb-8">
            <div className="bg-white border border-gray-200 rounded-full p-1 flex">
              <button
                onClick={() => setShowBefore(true)}
                className={`px-8 py-3 rounded-full transition-all font-medium ${
                  showBefore
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Show Before
              </button>
              <button
                onClick={() => setShowBefore(false)}
                className={`px-8 py-3 rounded-full transition-all font-medium ${
                  !showBefore
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Show After
              </button>
            </div>
          </div>
          <p className="body-medium text-gray-600">
            Use the toggle above to see all projects in their {showBefore ? 'original' : 'transformed'} state
          </p>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full max-h-full overflow-auto bg-white rounded-lg">
            {/* Modal Header */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="heading-3">{selectedImage.title}</h2>
                  <p className="body-small text-gray-600">{selectedImage.client} • {selectedImage.size}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Before/After Toggle for Modal */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-full p-1 flex">
                  <button
                    onClick={() => setShowBefore(true)}
                    className={`px-6 py-2 rounded-full transition-all ${
                      showBefore
                        ? 'bg-green-600 text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setShowBefore(false)}
                    className={`px-6 py-2 rounded-full transition-all ${
                      !showBefore
                        ? 'bg-green-600 text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>

              {/* Large Image */}
              <div className="relative mb-6">
                <img
                  src={showBefore ? selectedImage.beforeImage : selectedImage.afterImage}
                  alt={selectedImage.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="heading-3 mb-3">Project Details</h3>
                  <p className="body-medium mb-4">{selectedImage.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Client:</span>
                      <span>{selectedImage.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>{selectedImage.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Size:</span>
                      <span>{selectedImage.size}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="heading-3 mb-3">Transformation Highlights</h3>
                  <ul className="space-y-2 body-medium">
                    <li>• Complete furniture replacement</li>
                    <li>• Modern lighting installation</li>
                    <li>• Improved space utilization</li>
                    <li>• Enhanced collaborative areas</li>
                    <li>• Professional design consultation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;