import React, { useEffect } from 'react';
import { X, Award, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';

const CertificateModal = ({ certificate, onClose }) => {
  const [copied, setCopied] = React.useState(false);

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

  if (!certificate) return null;

  const handleCopyId = () => {
    if (certificate.credentialId) {
      navigator.clipboard.writeText(certificate.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close certificate modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'var(--badge-bg)',
              border: '1px solid var(--badge-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
            }}
          >
            <Award size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
              {certificate.type}
            </span>
            <h2 style={{ fontSize: '1.45rem', marginTop: '2px' }}>{certificate.title}</h2>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          {certificate.description}
        </p>

        {/* Certificate Credential Box */}
        <div
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--card-border)',
            borderRadius: '10px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Official Credential / Certificate ID
            </span>
            <button
              onClick={handleCopyId}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                color: copied ? '#10b981' : 'var(--text-highlight)',
                fontWeight: 600,
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy ID'}
            </button>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              color: 'var(--text-primary)',
              wordBreak: 'break-all',
              padding: '8px 12px',
              background: 'var(--card-bg-solid)',
              borderRadius: '6px',
              border: '1px solid var(--card-border)',
            }}
          >
            {certificate.credentialId}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              Issuing Body: <strong style={{ color: 'var(--text-primary)' }}>{certificate.issuer}</strong>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 600 }}>
              <ShieldCheck size={15} /> {certificate.issueDate}
            </span>
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Core Competencies Validated</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {certificate.skillsLearned.map((skill, idx) => (
            <span key={idx} className="tech-tag" style={{ background: 'var(--badge-bg)', color: 'var(--text-highlight)' }}>
              <CheckCircle2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
              {skill}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
