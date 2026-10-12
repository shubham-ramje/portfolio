import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Code, ArrowUpRight } from 'lucide-react';
import { navigationLinks } from '../data/portfolioData';
import ThemeToggle from './ThemeToggle';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Handle scroll appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section if on homepage
      if (isHomePage) {
        const sections = navigationLinks.map((item) => item.href.substring(1));
        const scrollPosition = window.scrollY + 120;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (e, href) => {
    if (isHomePage) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <a
            href="#home"
            className="nav-logo"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <div className="logo-icon-box">
              <span>SR</span>
            </div>
            <span>
              Shubham <span style={{ color: 'var(--text-highlight)' }}>Ramje</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          {isHomePage ? (
            <nav className="nav-links-desktop" aria-label="Main Navigation">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          ) : (
            <nav className="nav-links-desktop">
              <Link to="/" className="nav-link">
                &larr; Back to Portfolio
              </Link>
            </nav>
          )}

          {/* Actions: Theme Toggle, Admin Button, Hamburger */}
          <div className="nav-actions">
            <ThemeToggle />

            <Link
              to="/admin/login"
              className="theme-toggle-btn"
              title="Admin Portal Login"
              aria-label="Admin Portal"
            >
              <Shield size={18} />
            </Link>

            <button
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {isHomePage ? (
          <>
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span>{link.name}</span>
                <ArrowUpRight size={18} style={{ opacity: 0.6 }} />
              </a>
            ))}
            <Link
              to="/admin/login"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--text-highlight)' }}
            >
              <span>Admin Management</span>
              <Shield size={18} />
            </Link>
          </>
        ) : (
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>&larr; Return to Home</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
