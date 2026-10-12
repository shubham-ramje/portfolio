import React, { useState } from 'react';
import { Award, ShieldCheck, Eye, ExternalLink, FileCheck } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';
import CertificateModal from '../components/CertificateModal';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Award size={14} /> Qualifications
          </div>
          <h2 className="section-title">
            Certifications &amp; <span className="gradient-text">Credentials</span>
          </h2>
          <p className="section-subtitle">
            Industry accredited certifications validating skills in application development, computer concepts, and data analysis.
          </p>
        </div>

        <div className="cert-grid">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
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
                  <Award size={22} />
                </div>

                <span
                  style={{
                    fontSize: '0.78rem',
                    color: '#10b981',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  <ShieldCheck size={14} /> Verified
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', flexGrow: 1 }}>{cert.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-highlight)', fontWeight: 500, marginBottom: '0.85rem' }}>
                {cert.issuer}
              </p>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                {cert.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="btn btn-primary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', width: '100%' }}
                >
                  <Eye size={15} /> View Credential Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Certificate Verification Details */}
        {selectedCert && (
          <CertificateModal
            certificate={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Certifications;
