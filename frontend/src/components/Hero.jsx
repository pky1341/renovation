import React from 'react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
          <button 
            onClick={scrollToContact}
            className="btn-primary text-lg px-8 py-4"
          >
            Get a Free Quote
          </button>
          <button 
            onClick={() => document.querySelector('#services').scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-lg px-8 py-4"
          >
            View Our Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;