import React from 'react';
import { DollarSign, Truck, Wrench, PaintBucket } from 'lucide-react';
import { services } from '../mock';

const iconMap = {
  DollarSign,
  Truck,
  Wrench,
  PaintBucket
};

const Services = () => {
  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Comprehensive Services</h2>
          <p className="body-large max-w-2xl mx-auto">
            We provide end-to-end office transformation solutions, from purchasing your old furniture 
            to designing and installing your new workspace.
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <IconComponent size={48} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;