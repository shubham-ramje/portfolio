import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { personalInfo } from '../data/portfolioData';
import { submitContact } from '../services/api';
import Toast from '../components/Toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Message must be at least 5 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear individual field error if user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await submitContact(formData);

      if (response && response.success) {
        setToast({
          show: true,
          message: 'Thank you! Your message has been sent successfully.',
          type: 'success',
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setToast({
          show: true,
          message: response.message || 'Something went wrong. Please try again.',
          type: 'error',
        });
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setToast({
        show: true,
        message: err.message || 'Something went wrong. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
      // Auto hide toast after 6 seconds
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 6000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} /> Get In Touch
          </div>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Great</span>
          </h2>
          <p className="section-subtitle">
            Whether you have a full-stack project, an internship/job inquiry, or want to discuss MERN development, my inbox is open!
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Information & Channels */}
          <div className="contact-info-card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Contact Information</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Feel free to reach out directly through any of these communication channels or use the contact form.
            </p>

            <div className="contact-method">
              <div className="contact-method-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-method-info">
                <h4>Location</h4>
                <p>{personalInfo.location}</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-method-icon">
                <Mail size={20} />
              </div>
              <div className="contact-method-info">
                <h4>Email Address</h4>
                <a href={personalInfo.social.email}>{personalInfo.email}</a>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-method-icon">
                <Phone size={20} />
              </div>
              <div className="contact-method-info">
                <h4>Phone Number</h4>
                <a href={personalInfo.social.phone}>{personalInfo.phoneDisplay}</a>
              </div>
            </div>

            {/* Social Network Links */}
            <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--card-border)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.85rem' }}>
                Professional Networks
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem' }}>Send a Message</h3>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                    required
                  />
                  {errors.name && <span className="form-error-msg">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                    required
                  />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. +91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="e.g. MERN Full Stack Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Your Message <span className="req">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project, idea, or role..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  disabled={loading}
                  required
                ></textarea>
                {errors.message && <span className="form-error-msg">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
                disabled={loading}
                style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          />
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
