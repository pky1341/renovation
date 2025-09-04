import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { services, statistics, testimonials } from '../mock';

const Home = () => {
  const featuredServices = services.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            We Buy, Remove, and Redesign Your Office Space
          </h1>
          <p className="hero-subtitle">
            From old furniture buyback to new setup, we make office transformation simple. 
            Transform your workspace into a modern, productive environment with our comprehensive services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">
              Get a Free Quote
            </Link>
            <Link to="/services" className="btn-secondary text-lg px-8 py-4">
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat) => (
              <div key={stat.id}>
                <div className="stat-number text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="body-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Core Services</h2>
            <p className="body-large max-w-2xl mx-auto">
              Comprehensive office transformation solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service) => (
              <div key={service.id} className="service-card group">
                <div className="mb-6">
                  <img 
                    src={service.images[0]} 
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
                <h3 className="service-title mb-3">{service.title}</h3>
                <p className="service-description mb-4">{service.description}</p>
                <Link 
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  Learn More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Brief */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Why Choose OfficeTransform?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Complete Service Package</h4>
                    <p className="body-small text-gray-600">From buyback to installation, we handle every aspect of your office transformation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">15+ Years Experience</h4>
                    <p className="body-small text-gray-600">Proven expertise with 500+ successful office transformations.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">98% Client Satisfaction</h4>
                    <p className="body-small text-gray-600">Consistently high ratings and repeat business from satisfied clients.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/about" className="btn-secondary">
                  Learn More About Us
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd" 
                alt="Modern office transformation"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1631193816258-28b44b21e78b" 
                alt="Professional office design"
                className="w-full h-48 object-cover rounded-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">What Our Clients Say</h2>
            <p className="body-large max-w-2xl mx-auto">
              Real feedback from businesses we've helped transform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
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
                <p className="body-medium italic mb-4">"{testimonial.testimonial}"</p>
                <div className="flex text-yellow-400">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/testimonials" className="btn-secondary">
              Read All Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-green-600 text-white">
        <div className="container text-center">
          <h2 className="heading-2 text-white mb-4">Ready to Transform Your Office?</h2>
          <p className="body-large mb-8 max-w-2xl mx-auto">
            Get a free consultation and quote for your office transformation project. 
            Let us help you create a workspace that inspires productivity and success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Get Free Quote
            </Link>
            <Link to="/gallery" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;