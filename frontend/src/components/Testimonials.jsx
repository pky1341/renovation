import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../mock';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">What Our Clients Say</h2>
          <p className="body-large max-w-2xl mx-auto">
            Don't just take our word for it. Hear from satisfied clients who have 
            experienced the OfficeTransform difference.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="testimonial-card text-center mb-8">
            <div className="flex justify-center mb-4">
              {renderStars(testimonials[currentTestimonial].rating)}
            </div>
            
            <blockquote className="body-large italic mb-6 max-w-2xl mx-auto">
              "{testimonials[currentTestimonial].testimonial}"
            </blockquote>
            
            <div className="flex items-center justify-center">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div className="text-left">
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="body-small">
                  {testimonials[currentTestimonial].position}
                </div>
                <div className="body-small">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-green-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* All Testimonials Preview */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`p-6 bg-white border rounded-lg cursor-pointer transition-all ${
                  index === currentTestimonial
                    ? 'border-green-500 shadow-lg'
                    : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className="flex justify-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="body-small italic text-center mb-4 line-clamp-3">
                  "{testimonial.testimonial.substring(0, 120)}..."
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;