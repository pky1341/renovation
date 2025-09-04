import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials, statistics } from '../mock';

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-hero bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container text-center">
          <h1 className="heading-1 mb-6">Client Success Stories</h1>
          <p className="body-large max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Hear from satisfied clients who have experienced 
            the OfficeTransform difference and seen measurable improvements in their workplace.
          </p>
          <div className="flex justify-center items-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="body-small text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="body-small text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">5★</div>
              <div className="body-small text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="testimonial-card text-center mb-8 bg-gradient-to-br from-green-50 to-blue-50 border-0">
              <div className="flex justify-center mb-6">
                <Quote className="text-green-600" size={48} />
              </div>
              
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <blockquote className="body-large italic mb-6 max-w-3xl mx-auto text-xl leading-relaxed">
                "{testimonials[currentTestimonial].testimonial}"
              </blockquote>
              
              <div className="flex items-center justify-center mb-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mr-6 object-cover"
                />
                <div className="text-left">
                  <div className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="body-medium text-gray-600">
                    {testimonials[currentTestimonial].position}
                  </div>
                  <div className="body-medium text-gray-600">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
                <div className="body-small text-gray-600 mb-1">Project:</div>
                <div className="font-medium">{testimonials[currentTestimonial].project}</div>
                <div className="body-small text-gray-600 mt-2 mb-1">Service:</div>
                <div className="font-medium text-green-600">{testimonials[currentTestimonial].service}</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full border border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all"
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
                className="p-3 rounded-full border border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">All Client Reviews</h2>
            <p className="body-large max-w-2xl mx-auto">
              Read through all of our client testimonials to see the consistent quality 
              and satisfaction across different industries and project types.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card cursor-pointer transition-all ${
                  index === currentTestimonial
                    ? 'ring-2 ring-green-500 shadow-lg scale-105'
                    : 'hover:shadow-lg hover:scale-102'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="body-small text-gray-600">{testimonial.position}</p>
                    <p className="body-small text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex justify-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="body-small italic text-center mb-4 line-clamp-4">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="border-t pt-3">
                  <div className="body-small text-gray-600 text-center">
                    <div className="font-medium text-green-600">{testimonial.service}</div>
                    <div className="mt-1">{testimonial.project}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Proven Results</h2>
            <p className="body-large max-w-2xl mx-auto">
              Our client testimonials are backed by measurable results and concrete improvements 
              in workplace productivity and employee satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
              <div className="font-semibold mb-2">Productivity Increase</div>
              <p className="body-small text-gray-600">
                Average productivity improvement reported by clients after office transformation
              </p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
              <div className="font-semibold mb-2">Employee Satisfaction</div>
              <p className="body-small text-gray-600">
                Employees report higher job satisfaction in newly transformed office spaces
              </p>
            </div>
            
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="text-4xl font-bold text-yellow-600 mb-2">78%</div>
              <div className="font-semibold mb-2">Return Clients</div>
              <p className="body-small text-gray-600">
                Clients who return for additional projects or recommend us to other businesses
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Testimonials */}
      <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Trusted Across Industries</h2>
            <p className="body-large max-w-2xl mx-auto">
              From tech startups to established law firms, we've successfully transformed 
              workspaces across diverse industries.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-2xl font-bold text-gray-400 mb-2">TECH</div>
              <div className="body-small text-gray-600">Technology Companies</div>
              <div className="text-green-600 font-semibold mt-2">150+ Projects</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-2xl font-bold text-gray-400 mb-2">LEGAL</div>
              <div className="body-small text-gray-600">Law Firms</div>
              <div className="text-green-600 font-semibold mt-2">80+ Projects</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-2xl font-bold text-gray-400 mb-2">FINANCE</div>
              <div className="body-small text-gray-600">Financial Services</div>
              <div className="text-green-600 font-semibold mt-2">120+ Projects</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-2xl font-bold text-gray-400 mb-2">CREATIVE</div>
              <div className="body-small text-gray-600">Creative Agencies</div>
              <div className="text-green-600 font-semibold mt-2">90+ Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-green-600 text-white">
        <div className="container text-center">
          <h2 className="heading-2 text-white mb-4">Join Our Success Stories</h2>
          <p className="body-large mb-8 max-w-2xl mx-auto">
            Ready to become our next success story? Let's discuss how we can transform 
            your office space and create a testimonial-worthy experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </Link>
            <Link to="/gallery" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;