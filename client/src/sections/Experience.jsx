import React from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} /> Professional Journey
          </div>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Hands-on industry experience building scalable web solutions and writing production code.
          </p>
        </div>

        <div className="timeline">
          {experienceData.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-marker">
                <Briefcase size={13} color="#2563eb" />
              </div>

              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <div className="timeline-company">
                      {item.company}
                      <span className="timeline-location">
                        <MapPin size={14} /> {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="timeline-period">
                    <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    {item.duration}
                  </div>
                </div>

                <div className="timeline-tasks">
                  {item.responsibilities.map((resp, idx) => (
                    <div key={idx} className="timeline-task-item">
                      <ChevronRight size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>

                <div className="timeline-tags">
                  {item.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
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

export default Experience;
