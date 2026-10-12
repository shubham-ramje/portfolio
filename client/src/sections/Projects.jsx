import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Eye, CheckCircle, Database, Server, Laptop } from 'lucide-react';
import { Github } from '../components/Icons';
import { projectsData } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FolderGit2 size={14} /> Featured Work
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world full-stack MERN applications built with secure authentication, RESTful APIs, and responsive design.
          </p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card">
              {/* Project Visual / Image Placeholder */}
              <div className="project-image-box">
                <div className="project-visual-preview">
                  {project.id === 'storagewars' ? (
                    <>
                      <Database size={42} />
                      <span>StorageWars MERN</span>
                    </>
                  ) : (
                    <>
                      <Laptop size={42} />
                      <span>BizManager ERP</span>
                    </>
                  )}
                </div>
              </div>

              {/* Project Card Content */}
              <div className="project-content">
                <div className="project-badge-row">
                  <span className="section-badge" style={{ margin: 0, padding: '2px 8px', fontSize: '0.75rem' }}>
                    Full Stack MERN
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
                    {project.status}
                  </span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <h4 className="project-subtitle">{project.subtitle}</h4>

                <p className="project-desc">{project.shortDescription}</p>

                {/* Features Highlights Snippet */}
                <div className="project-features-summary">
                  <div className="project-feature-bullet">
                    <CheckCircle size={14} color="#3b82f6" />
                    <span>{project.features[0]}</span>
                  </div>
                  <div className="project-feature-bullet">
                    <CheckCircle size={14} color="#3b82f6" />
                    <span>{project.features[1]}</span>
                  </div>
                  <div className="project-feature-bullet">
                    <CheckCircle size={14} color="#3b82f6" />
                    <span>{project.features[2]}</span>
                  </div>
                </div>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.25rem' }}>
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="tech-tag" style={{ color: 'var(--text-highlight)' }}>
                      +{project.technologies.length - 5} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-primary"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', flexGrow: 1 }}
                  >
                    <Eye size={15} /> View Details
                  </button>

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '0.55rem 0.85rem' }}
                      aria-label="GitHub Code"
                    >
                      <Github size={16} />
                    </a>
                  ) : (
                    <button
                      className="btn btn-secondary btn-disabled"
                      title="GitHub repository is private / in final polishing"
                      style={{ padding: '0.55rem 0.85rem' }}
                      aria-label="GitHub Repository Unavailable"
                    >
                      <Github size={16} />
                    </button>
                  )}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ padding: '0.55rem 0.85rem' }}
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <button
                      className="btn btn-outline btn-disabled"
                      title="Deployment preview in setup"
                      style={{ padding: '0.55rem 0.85rem' }}
                      aria-label="Live Demo Unavailable"
                    >
                      <ExternalLink size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Viewer */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
