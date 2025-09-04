import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Calendar, Star, Clock, Award, Users, CheckCircle, Target, Eye } from 'lucide-react';
import { statistics, companyInfo } from '../mock';

const iconMap = {
  Building,
  Calendar,
  Star,
  Clock
};

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-hero bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-1 mb-6">About OfficeTransform</h1>
              <p className="body-large mb-8">
                For over {companyInfo.founded ? new Date().getFullYear() - parseInt(companyInfo.founded) : '15'} years, 
                we've been transforming workspaces and elevating productivity for businesses across the nation. 
                Our comprehensive approach combines expertise, innovation, and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  Work With Us
                </Link>
                <Link to="/gallery" className="btn-secondary">
                  View Our Work
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd" 
                alt="Modern office transformation"
                className="w-full h-64 object-cover rounded-lg"
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

      {/* Statistics */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Track Record</h2>
            <p className="body-large max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client satisfaction
            </p>
          </div>
          
          <div className="stats-grid">
            {statistics.map((stat) => {
              const IconComponent = iconMap[stat.icon];
              return (
                <div key={stat.id} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <IconComponent size={32} className="text-green-600" />
                    </div>
                  </div>
                  <div className="stat-number mb-2">{stat.number}</div>
                  <div className="body-medium font-semibold mb-2">{stat.label}</div>
                  <div className="body-small text-gray-600">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Our Story</h2>
              <div className="space-y-4">
                <p className="body-medium">
                  Founded in {companyInfo.founded}, OfficeTransform began with a simple mission: 
                  to help businesses create workspaces that inspire productivity and foster collaboration. 
                  What started as a small furniture removal service has evolved into a comprehensive 
                  office transformation company.
                </p>
                <p className="body-medium">
                  Today, we're proud to serve businesses of all sizes, from startups to Fortune 500 companies, 
                  with our unique combination of buyback services, professional removal, expert installation, 
                  and innovative design solutions.
                </p>
                <p className="body-medium">
                  Our headquarters in {companyInfo.headquarters} houses our team of {companyInfo.employees} 
                  dedicated professionals who share our passion for creating exceptional workspaces.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Target className="text-green-600 mb-3" size={24} />
                <h3 className="heading-3 mb-2">Our Mission</h3>
                <p className="body-small text-gray-600">
                  To transform ordinary offices into extraordinary workspaces that inspire productivity, 
                  foster collaboration, and reflect each company's unique culture and values.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Eye className="text-green-600 mb-3" size={24} />
                <h3 className="heading-3 mb-2">Our Vision</h3>
                <p className="body-small text-gray-600">
                  To be the leading office transformation company, known for exceptional service, 
                  sustainable practices, and innovative design solutions that drive business success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Core Values</h2>
            <p className="body-large max-w-2xl mx-auto">
              These principles guide everything we do and shape our relationships with clients, 
              partners, and team members.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="heading-3 mb-3">Excellence</h3>
              <p className="body-small text-gray-600">
                We strive for perfection in every project, from initial consultation to final installation, 
                ensuring exceptional results that exceed expectations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="heading-3 mb-3">Partnership</h3>
              <p className="body-small text-gray-600">
                We believe in building long-term relationships with our clients, working as trusted partners 
                to understand and fulfill their unique needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-green-600" size={32} />
              </div>
              <h3 className="heading-3 mb-3">Sustainability</h3>
              <p className="body-small text-gray-600">
                We're committed to eco-friendly practices, from responsible furniture disposal to 
                sustainable design solutions that benefit both businesses and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Certifications */}
            <div>
              <h2 className="heading-2 mb-6">Certifications</h2>
              <div className="space-y-4">
                {companyInfo.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Award className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{cert}</h4>
                      <p className="body-small text-gray-600">Certified and compliant</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h2 className="heading-2 mb-6">Recognition</h2>
              <div className="space-y-4">
                {companyInfo.awards.map((award, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Star className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{award}</h4>
                      <p className="body-small text-gray-600">Industry recognition</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Why Choose OfficeTransform?</h2>
            <p className="body-large max-w-2xl mx-auto">
              Our unique combination of services, expertise, and commitment sets us apart 
              in the office transformation industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-green-600" size={24} />
              </div>
              <h4 className="heading-3 mb-2">Fast Turnaround</h4>
              <p className="body-small text-gray-600">
                Complete transformations in as little as 48 hours with our efficient, 
                well-coordinated process and experienced team.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-green-600" size={24} />
              </div>
              <h4 className="heading-3 mb-2">Premium Quality</h4>
              <p className="body-small text-gray-600">
                Only the highest quality furniture and materials, backed by comprehensive 
                warranties and ongoing support services.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="text-green-600" size={24} />
              </div>
              <h4 className="heading-3 mb-2">Full Service</h4>
              <p className="body-small text-gray-600">
                From initial assessment to final installation, we handle every detail 
                of your transformation with professional project management.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={24} />
              </div>
              <h4 className="heading-3 mb-2">Expert Team</h4>
              <p className="body-small text-gray-600">
                Certified designers, skilled technicians, and dedicated project managers 
                working together to exceed your expectations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h4 className="heading-3 mb-2">Proven Results</h4>
              <p className="body-small text-gray-600">
                98% client satisfaction rate with measurable improvements in productivity 
                and employee satisfaction post-transformation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-green-600" size={24} />
              </div>
              <h4 className="heading-3 mb-2">Custom Solutions</h4>
              <p className="body-small text-gray-600">
                Tailored approaches that reflect your company culture, budget requirements, 
                and specific operational needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-green-600 text-white">
        <div className="container text-center">
          <h2 className="heading-2 text-white mb-4">Ready to Transform Your Workspace?</h2>
          <p className="body-large mb-8 max-w-2xl mx-auto">
            Join the hundreds of businesses that have trusted us to create inspiring, 
            productive workspaces. Let's discuss your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </Link>
            <Link to="/testimonials" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Read Success Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;