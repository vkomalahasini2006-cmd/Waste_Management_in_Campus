import React from 'react';
import { Leaf, Globe, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-icon-footer">
              <Leaf size={24} />
            </div>
            <h2>Campus Clean</h2>
            <p>Smart Sustainable Waste Management System designed for modern college campuses.</p>
          </div>
          
          <div className="footer-project-info">
            <h3>Project Details</h3>
            <ul>
              <li><strong>Student Name:</strong> V.Komala Hasini</li>
              <li><strong>Department:</strong> Computer Science and Engineering (CSE)</li>
              <li><strong>College:</strong> PVP Siddhartha Institute Of Technology</li>
              <li><strong>Year:</strong> 2nd Year</li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
              <li><Link to="/about" onClick={scrollToTop}>About System</Link></li>
              <li><Link to="/report" onClick={scrollToTop}>Report Issue</Link></li>
              <li><Link to="/login" onClick={scrollToTop}>Admin Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Campus Clean Project. All rights reserved.</p>
          <div className="social-icons">
            <a href="#"><Globe size={20} /></a>
            <a href="#"><MessageCircle size={20} /></a>
            <a href="#"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
