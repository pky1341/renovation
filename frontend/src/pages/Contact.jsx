import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { contactInfo, services } from '../mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    officeSize: '',
    message: '',
    urgency: 'standard',
    budget: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceType: '',
        officeSize: '',
        message: '',
        urgency: 'standard',
        budget: '',
        preferredContact: 'email'
      });
      
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-hero bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container text-center">
          <h1 className="heading-1 mb-6">Get Your Free Quote Today</h1>
          <p className="body-large max-w-3xl mx-auto mb-8">
            Ready to transform your office space? Contact us for a free consultation 
            and personalized quote tailored to your specific needs and budget.
          </p>
          <div className="flex justify-center items-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">24hr</div>
              <div className="body-small text-gray-600">Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">Free</div>
              <div className="body-small text-gray-600">Consultation</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">No</div>
              <div className="body-small text-gray-600">Obligation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes 2/3 width */}
            <div className="lg:col-span-2">
              <div className="contact-form">
                <h2 className="heading-2 mb-6">Request Your Free Quote</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                    <CheckCircle className="mr-2" size={20} />
                    Thank you! We've received your request and will contact you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="heading-3 mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div>
                    <h3 className="heading-3 mb-4">Company Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Your company"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="heading-3 mb-4">Project Details</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="serviceType" className="block text-sm font-medium mb-2">
                          Service Needed *
                        </label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.slug}>
                              {service.title}
                            </option>
                          ))}
                          <option value="complete">Complete Transformation</option>
                          <option value="consultation">Consultation Only</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="officeSize" className="block text-sm font-medium mb-2">
                          Office Size (sq ft)
                        </label>
                        <input
                          type="text"
                          id="officeSize"
                          name="officeSize"
                          value={formData.officeSize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g. 2,000 sq ft"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="urgency" className="block text-sm font-medium mb-2">
                          Project Timeline
                        </label>
                        <select
                          id="urgency"
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="flexible">Flexible (4+ weeks)</option>
                          <option value="standard">Standard (2-4 weeks)</option>
                          <option value="urgent">Urgent (1-2 weeks)</option>
                          <option value="emergency">Emergency (48-72 hours)</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-10k">Under $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="over-100k">Over $100,000</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="heading-3 mb-4">Additional Information</h3>
                    <div className="mb-4">
                      <label htmlFor="preferredContact" className="block text-sm font-medium mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Email
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === 'phone'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Phone
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="both"
                            checked={formData.preferredContact === 'both'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Either
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Project Description
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Tell us about your specific needs, current office setup, vision for the new space, or any special requirements..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Get My Free Quote
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-8">
              {/* Contact Info Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-md">
                <h3 className="heading-3 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <MapPin size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Office Address</h4>
                      <p className="body-small text-gray-600">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Phone size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone Numbers</h4>
                      <p className="body-small text-gray-600">{contactInfo.phone}</p>
                      <p className="body-small text-red-600 font-medium">{contactInfo.emergencyPhone} (Emergency)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Mail size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="body-small text-gray-600">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Clock size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <p className="body-small text-gray-600">{contactInfo.hours}</p>
                      <p className="body-small text-gray-500 mt-1">Emergency services available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time Promise */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="heading-3 text-green-800 mb-3">Our Promise</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-green-700">
                    <CheckCircle className="mr-2" size={16} />
                    24-hour response guarantee
                  </li>
                  <li className="flex items-center text-sm text-green-700">
                    <CheckCircle className="mr-2" size={16} />
                    Free consultation included
                  </li>
                  <li className="flex items-center text-sm text-green-700">
                    <CheckCircle className="mr-2" size={16} />
                    No obligation quotes
                  </li>
                  <li className="flex items-center text-sm text-green-700">
                    <CheckCircle className="mr-2" size={16} />
                    Competitive pricing
                  </li>
                </ul>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-400">Metropolitan Business District</p>
                  <p className="text-sm text-gray-400">Easy parking available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
            <p className="body-large max-w-2xl mx-auto">
              Get quick answers to common questions about our services and process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold mb-2">How quickly can you start?</h4>
              <p className="body-small text-gray-600">
                We typically begin projects within 1-2 weeks of approval. Emergency services 
                are available within 48-72 hours.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Do you provide free estimates?</h4>
              <p className="body-small text-gray-600">
                Yes, all consultations and estimates are completely free with no obligation 
                to proceed with the project.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold mb-2">What's included in the buyback service?</h4>
              <p className="body-small text-gray-600">
                Professional assessment, fair market pricing, pickup, and eco-friendly 
                disposal of items we don't purchase.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Do you work with small businesses?</h4>
              <p className="body-small text-gray-600">
                Absolutely! We work with businesses of all sizes, from small startups 
                to large corporations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;