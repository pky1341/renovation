import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigationLinks } from '../mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePage = (href) => {
    return location.pathname === href;
  };

  return (
    <header className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="flex items-center justify-between w-full px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            OfficeTransform
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`nav-link ${
                isActivePage(link.href) 
                  ? 'bg-green-100 text-green-700' 
                  : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link to="/contact" className="btn-primary">
            Get Free Quote
          </Link>
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
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-4 z-50">
          <nav className="flex flex-col space-y-2 px-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMenu}
                className={`nav-link text-left ${
                  isActivePage(link.href) 
                    ? 'bg-green-100 text-green-700' 
                    : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="btn-primary mt-4 text-center"
            >
              Get Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;