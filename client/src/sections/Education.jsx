import React from 'react';
import { GraduationCap, Calendar, Award, MapPin, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/portfolioData';

const Education = () => {
  return (
    <section id="education" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <GraduationCap size={14} /> Academic Background
          </div>
          <h2 className="section-title">
            Education &amp; <span className="gradient-text">Learning</span>
          </h2>
          <p className="section-subtitle">
            Formal computer science education and ongoing professional curriculum.
          </p>
        </div>

        <div className="timeline">
          {educationData.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-marker">
                <GraduationCap size={13} color="#2563eb" />
              </div>

              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{item.degree}</h3>
                    <div className="timeline-company">
                      {item.institute} — {item.university}
                      <span className="timeline-location">
                        <MapPin size={14} /> {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="timeline-period">
                    <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    {item.currentYear} • Grad: {item.expectedGraduation}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.85rem 0' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#10b981',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    <Award size={15} /> Academic Score: {item.percentage}
                  </div>

                  <span
                    style={{
                      fontSize: '0.8rem',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: 'var(--badge-bg)',
                      color: 'var(--text-highlight)',
                    }}
                  >
                    Status: {item.status}
                  </span>
                </div>

                <div className="timeline-tasks">
                  {item.highlights.map((point, idx) => (
                    <div key={idx} className="timeline-task-item">
                      <CheckCircle2 size={15} color="#3b82f6" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
