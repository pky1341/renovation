import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationLinks } from '../mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="flex items-center justify-between w-full px-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            OfficeTransform
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navigationLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="nav-link"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-primary"
          >
            Get Free Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-4">
          <nav className="flex flex-col space-y-2 px-4">
            {navigationLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="nav-link text-left"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary mt-4"
            >
              Get Free Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;