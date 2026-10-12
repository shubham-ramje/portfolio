import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, Shield } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo, navigationLinks } from '../data/portfolioData';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: '0.75rem' }}>
              <div className="logo-icon-box">
                <span>SR</span>
              </div>
              <span>
                Shubham <span style={{ color: 'var(--text-highlight)' }}>Ramje</span>
              </span>
            </div>
            <p>
              MERN Full Stack Developer dedicated to building responsive, scalable, and secure web applications with modern architectures.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={personalInfo.social.email}
                className="social-icon-btn"
                aria-label="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <div className="footer-links">
              {navigationLinks.slice(0, 5).map((item) => (
                <a key={item.name} href={item.href} className="footer-link">
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* More Links */}
          <div className="footer-col">
            <h4>Explore</h4>
            <div className="footer-links">
              {navigationLinks.slice(5).map((item) => (
                <a key={item.name} href={item.href} className="footer-link">
                  {item.name}
                </a>
              ))}
              <Link to="/admin/login" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Shield size={14} /> Admin Portal
              </Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <div className="footer-links">
              <span className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="#3b82f6" /> {personalInfo.location}
              </span>
              <a href={personalInfo.social.email} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="#3b82f6" /> {personalInfo.email}
              </a>
              <a href={personalInfo.social.phone} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="#3b82f6" /> {personalInfo.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2026 Shubham Ramje. All Rights Reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>Built with MERN Stack (React, Node, Express, MongoDB)</span>
            <button
              onClick={scrollToTop}
              className="social-icon-btn"
              style={{ width: '36px', height: '36px' }}
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
