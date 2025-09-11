-- Office Transform Database Schema

CREATE DATABASE IF NOT EXISTS office_transform;
USE office_transform;

-- Contacts table
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  space_type VARCHAR(100),
  message TEXT,
  status ENUM('new', 'contacted', 'quoted', 'completed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE,
  icon VARCHAR(100),
  full_description TEXT,
  benefits JSON,
  images JSON,
  price_range VARCHAR(100),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects/Gallery table
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  location VARCHAR(255),
  size VARCHAR(100),
  timeline VARCHAR(100),
  before_image VARCHAR(500),
  after_image VARCHAR(500),
  description TEXT,
  services_used JSON,
  before_description TEXT,
  after_description TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  company VARCHAR(255),
  testimonial TEXT NOT NULL,
  rating INT DEFAULT 5,
  avatar VARCHAR(500),
  project VARCHAR(255),
  service VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO services (title, description, slug, icon, full_description, benefits, price_range) VALUES
('Office Buyback', 'We purchase your old office furniture and equipment at competitive prices', 'office-buyback', 'DollarSign', 'Comprehensive office buyback service', '["Fair market value", "Professional assessment", "Same-day pickup", "Eco-friendly disposal"]', '₹50,000 - ₹5,00,000'),
('Furniture Removal', 'Professional removal and disposal of office furniture', 'furniture-removal', 'Truck', 'Complete furniture removal service', '["Professional team", "Eco-friendly disposal", "Insurance coverage", "Flexible scheduling"]', '₹25,000 - ₹2,00,000'),
('Space Installation', 'Complete installation of new office furniture and equipment', 'space-installation', 'Wrench', 'Professional installation service', '["Certified technicians", "Warranty included", "Optimal planning", "Quality assurance"]', '₹1,00,000 - ₹10,00,000'),
('Office Redesign', 'Full workplace makeover services including space planning', 'office-redesign', 'PaintBucket', 'Complete office redesign service', '["Custom consultation", "3D visualization", "Project management", "Brand integration"]', '₹2,00,000 - ₹20,00,000');

INSERT INTO testimonials (name, position, company, testimonial, rating, featured, approved) VALUES
('Sarah Johnson', 'Operations Director', 'TechCorp Solutions', 'The transformation exceeded all expectations. Productivity increased significantly.', 5, TRUE, TRUE),
('Michael Chen', 'CEO', 'Innovation Labs', 'Professional service from start to finish. Stunning modern workspace delivered.', 5, TRUE, TRUE),
('Priya Sharma', 'HR Manager', 'Digital Solutions Pvt Ltd', 'Amazing buyback value and quick turnaround. Highly recommended!', 5, FALSE, TRUE);