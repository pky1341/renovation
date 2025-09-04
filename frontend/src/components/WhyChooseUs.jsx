import React from 'react';
import { Building, Calendar, Star, Clock } from 'lucide-react';
import { statistics } from '../mock';

const iconMap = {
  Building,
  Calendar,
  Star,
  Clock
};

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Why Choose OfficeTransform</h2>
          <p className="body-large max-w-2xl mx-auto">
            With years of experience and hundreds of successful transformations, 
            we're the trusted choice for office renovation and furniture services.
          </p>
        </div>

        {/* Statistics Grid */}
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
                <div className="stat-number">{stat.number}</div>
                <div className="body-medium text-gray-600 mt-2">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16">
          <h3 className="heading-3 text-center mb-8">Trusted by Industry Leaders</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-400 mb-2">TECH</div>
              <div className="text-sm text-gray-500">Fortune 500</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-400 mb-2">CORP</div>
              <div className="text-sm text-gray-500">Global Enterprise</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-400 mb-2">INNOV</div>
              <div className="text-sm text-gray-500">Startup Hub</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-400 mb-2">BIZCO</div>
              <div className="text-sm text-gray-500">Business Center</div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-green-600" />
            </div>
            <h4 className="heading-3 mb-2">Fast Turnaround</h4>
            <p className="body-small">Complete transformations in as little as 48 hours with our efficient process.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={24} className="text-green-600" />
            </div>
            <h4 className="heading-3 mb-2">Premium Quality</h4>
            <p className="body-small">Only the highest quality furniture and materials for lasting office transformations.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building size={24} className="text-green-600" />
            </div>
            <h4 className="heading-3 mb-2">Full Service</h4>
            <p className="body-small">From initial assessment to final installation, we handle every detail of your transformation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;