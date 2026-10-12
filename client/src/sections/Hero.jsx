import React, { useState } from 'react';
import { ArrowRight, Download, Send, Mail, Sparkles, FileText, CheckCircle } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { personalInfo } from '../data/portfolioData';
import DeveloperIllustration from '../components/DeveloperIllustration';

const Hero = () => {
  const [resumeDownloaded, setResumeDownloaded] = useState(false);

  const handleDownloadResume = () => {
    // Generate clean downloadable CV summary
    const resumeContent = `=====================================================
SHUBHAM RAMJE - MERN FULL STACK DEVELOPER
=====================================================
Location: ${personalInfo.location}
Email: ${personalInfo.email}
Phone: ${personalInfo.phoneDisplay}
GitHub: ${personalInfo.social.github}
LinkedIn: ${personalInfo.social.linkedin}

PROFESSIONAL SUMMARY:
${personalInfo.tagline}
BCA 2nd Year student (82.00%) & MERN Stack Developer Intern at Ypsilon IT Solutions Pvt. Ltd.

EXPERIENCE:
MERN Stack Developer Intern | Ypsilon IT Solutions Pvt. Ltd., Indore (March 2026 – Present)
- Developing MERN stack applications with React.js, Node.js, Express.js, and MongoDB.
- Building responsive interfaces, RESTful APIs, and implementing JWT authentication.

EDUCATION:
BCA – Bachelor of Computer Applications (2024 - 2027)
ISBA Institute of Professional Studies, DAVV University
Academic Score: 82.00%

CORE SKILLS:
- Frontend: React.js, JavaScript (ES6+), React Router, HTML5, CSS3 / Responsive Design
- Backend: Node.js, Express.js, RESTful APIs, JWT, Nodemailer, Axios
- Database: MongoDB, Mongoose ODM
- Programming & Tools: C, C++, Git, GitHub, MS Word, MS Excel

FEATURED PROJECTS:
1. StorageWars – Online Storage Auction & Management Platform (MERN, JWT, reCAPTCHA)
2. BizManager – Small Business Management System (MERN, Inventory, Invoicing, Reports)

CERTIFICATIONS:
- Advanced Diploma in Computer Application (ID: SC_AU01022082839LMP@skillcourse.in)
- MS Excel Certification (ID: SC_01038332LMP@skillcourse.in)
- Skill India Application Developer Certificate (AEMPA0021QG-05-IT-00512-V1.1-NASSCOM-111755)
=====================================================`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Shubham_Ramje_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setResumeDownloaded(true);
    setTimeout(() => setResumeDownloaded(false), 3500);
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="container">
        <div className="hero-grid">
          {/* Text Content */}
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="status-dot"></span>
              <span>Available for MERN Developer Opportunities</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
            </h1>

            <h2 className="hero-subtitle">
              {personalInfo.role}
            </h2>

            <p className="hero-tagline">
              {personalInfo.tagline}
            </p>

            {/* CTAs */}
            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-primary">
                View My Projects <ArrowRight size={18} />
              </a>

              <button
                onClick={handleDownloadResume}
                className="btn btn-secondary"
                aria-label="Download Resume"
              >
                {resumeDownloaded ? (
                  <>
                    <CheckCircle size={18} color="#10b981" /> Resume Downloaded!
                  </>
                ) : (
                  <>
                    <Download size={18} /> Download Resume
                  </>
                )}
              </button>

              <a href="#contact" className="btn btn-outline">
                Contact Me <Send size={16} />
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-socials">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                CONNECT:
              </span>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <Github size={19} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <Linkedin size={19} />
              </a>
              <a
                href={personalInfo.social.email}
                className="social-icon-btn"
                aria-label="Email Me"
                title="Email"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* Visual Showcase */}
          <DeveloperIllustration />
        </div>
      </div>
    </section>
  );
};

export default Hero;
