import React from 'react';
import { User, CheckCircle2, Code2, Sparkles, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { personalInfo, aboutData } from '../data/portfolioData';

const About = () => {
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <User size={14} /> About Me
          </div>
          <h2 className="section-title">
            Passionate Developer, <span className="gradient-text">Problem Solver</span>
          </h2>
          <p className="section-subtitle">
            A look into my background, core competencies, and passion for creating production-ready web software.
          </p>
        </div>

        <div className="about-grid">
          {/* Text Description */}
          <div className="about-text">
            <p>
              I am Shubham Ramje, a <strong>BCA student</strong> (Bachelor of Computer Applications) and an enthusiastic <strong>MERN Full Stack Developer</strong> based in Indore, Madhya Pradesh. My core technical focus is engineering modern, highly responsive, and scalable web applications from database modeling to frontend interaction.
            </p>
            <p>
              Through practical application development and industry internship experience, I have developed a solid foundation in <strong>React.js, Node.js, Express.js, and MongoDB</strong>. I specialize in designing structured RESTful APIs, implementing robust authentication mechanisms (JWT & bcrypt), and writing clean, reusable components with responsive CSS.
            </p>

            <div className="about-highlights-list">
              {aboutData.highlights.map((item, idx) => (
                <div key={idx} className="about-highlight-item">
                  <CheckCircle2 size={18} className="highlight-bullet" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <MapPin size={16} color="#3b82f6" /> {personalInfo.location}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <GraduationCap size={16} color="#3b82f6" /> ISBA / DAVV University (2027)
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Briefcase size={16} color="#3b82f6" /> Ypsilon IT Solutions Intern
              </div>
            </div>
          </div>

          {/* Stats & Focus Area Cards */}
          <div className="about-stats-container">
            <div className="stats-grid">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Focus Highlights Card */}
            <div className="card" style={{ marginTop: '1.25rem', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code2 size={18} color="#3b82f6" /> Core Engineering Focus
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {aboutData.focusAreas.map((area, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.8rem',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'var(--badge-bg)',
                      border: '1px solid var(--badge-border)',
                      color: 'var(--text-highlight)',
                      fontWeight: 500,
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
