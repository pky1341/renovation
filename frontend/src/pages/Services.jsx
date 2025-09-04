import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Truck, Wrench, PaintBucket, ArrowRight, Users, Layout, CheckCircle } from 'lucide-react';
import { services, serviceProcess } from '../mock';

const iconMap = {
  DollarSign,
  Truck,
  Wrench,
  PaintBucket,
  Users,
  Layout,
  CheckCircle
};

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-hero bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container text-center">
          <h1 className="heading-1 mb-6">Our Comprehensive Services</h1>
          <p className="body-large max-w-3xl mx-auto mb-8">
            From initial assessment to final installation, we provide complete office transformation 
            solutions tailored to your business needs and budget.
          </p>
          <Link to="/contact" className="btn-primary text-lg px-8 py-4">
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div key={service.id} className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Service Images */}
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <img 
                        src={service.images[0]} 
                        alt={`${service.title} - Image 1`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <img 
                        src={service.images[1]} 
                        alt={`${service.title} - Image 2`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <IconComponent size={24} className="text-green-600" />
                      </div>
                      <h2 className="heading-2">{service.title}</h2>
                    </div>
                    
                    <p className="body-large mb-6">{service.fullDescription}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="text-green-600 mt-1 mr-2 flex-shrink-0" size={16} />
                            <span className="body-small">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link 
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center btn-primary"
                    >
                      Learn More <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Proven Process</h2>
            <p className="body-large max-w-2xl mx-auto">
              We follow a systematic approach to ensure your office transformation 
              is completed on time, within budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {Object.entries(serviceProcess).map(([key, step], index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={key} className="text-center">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={24} />
                  </div>
                  <div className="text-sm font-semibold text-green-600 mb-2">
                    STEP {index + 1}
                  </div>
                  <h3 className="heading-3 mb-2">{step.title}</h3>
                  <p className="body-small text-gray-600 mb-2">{step.description}</p>
                  <div className="text-xs text-gray-500 font-medium">
                    Duration: {step.duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Combinations */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Popular Service Combinations</h2>
            <p className="body-large max-w-2xl mx-auto">
              Many clients choose multiple services for complete office transformations. 
              Here are our most popular combinations:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card">
              <h3 className="service-title mb-3">Complete Transformation</h3>
              <p className="body-small text-gray-600 mb-4">
                Buyback + Removal + Redesign + Installation
              </p>
              <div className="text-2xl font-bold text-green-600 mb-4">Most Popular</div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  Full service package
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  Maximum cost savings
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  Single project manager
                </li>
              </ul>
              <Link to="/contact" className="btn-primary w-full">
                Get Quote
              </Link>
            </div>

            <div className="service-card">
              <h3 className="service-title mb-3">Refresh & Upgrade</h3>
              <p className="body-small text-gray-600 mb-4">
                Removal + Installation + Light Redesign
              </p>
              <div className="text-2xl font-bold text-green-600 mb-4">Budget Friendly</div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  Moderate investment
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  Quick turnaround
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  Immediate impact
                </li>
              </ul>
              <Link to="/contact" className="btn-secondary w-full">
                Get Quote
              </Link>
            </div>

            <div className="service-card">
              <h3 className="service-title mb-3">Strategic Buyback</h3>
              <p className="body-small text-gray-600 mb-4">
                Assessment + Buyback + Consultation
              </p>
              <div className="text-2xl font-bold text-green-600 mb-4">Cash Back</div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  Immediate cash value
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  Future planning advice
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  No commitment required
                </li>
              </ul>
              <Link to="/contact" className="btn-secondary w-full">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-green-600 text-white">
        <div className="container text-center">
          <h2 className="heading-2 text-white mb-4">Ready to Get Started?</h2>
          <p className="body-large mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and personalized quote. 
            Let's discuss how we can transform your office space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Schedule Consultation
            </Link>
            <Link to="/gallery" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;