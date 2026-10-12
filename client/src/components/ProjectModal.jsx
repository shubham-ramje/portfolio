import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Layers } from 'lucide-react';
import { Github } from './Icons';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close project modal"
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '1.25rem' }}>
          <span className="section-badge" style={{ marginBottom: '0.5rem' }}>
            <Layers size={13} /> Full Stack MERN Project
          </span>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{project.title}</h2>
          <p style={{ color: 'var(--text-highlight)', fontWeight: 600, fontSize: '1rem' }}>
            {project.subtitle}
          </p>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem', fontSize: '0.96rem' }}>
          {project.fullDescription}
        </p>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.85rem' }}>Key Architectural Features</h3>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem', marginBottom: '1.75rem' }}>
          {project.features.map((feature, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
              }}
            >
              <CheckCircle size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.85rem' }}>Technology Stack</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="tech-tag" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--text-highlight)' }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Github size={18} /> View Repository
            </a>
          ) : (
            <button className="btn btn-secondary btn-disabled" title="Repository link placeholder">
              <Github size={18} /> GitHub (Private / In Dev)
            </button>
          )}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink size={18} /> Live Demo
            </a>
          ) : (
            <button className="btn btn-primary btn-disabled" title="Deployment preview in progress">
              <ExternalLink size={18} /> Live Demo (Deploying)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
