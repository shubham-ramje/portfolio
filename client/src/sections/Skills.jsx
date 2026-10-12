import React, { useState } from 'react';
import {
  Code,
  Server,
  Database,
  Binary,
  Wrench,
  Layers,
  Atom,
  Route,
  FileCode,
  Layout,
  Cpu,
  Network,
  ShieldCheck,
  Mail,
  ArrowLeftRight,
  Workflow,
  Terminal,
  GitBranch,
  FileText,
  Table,
} from 'lucide-react';
import { Github } from '../components/Icons';
import { skillsData } from '../data/portfolioData';

// Map icon string to Lucide icon component
const iconMap = {
  Atom: Atom,
  Code: Code,
  Route: Route,
  FileCode: FileCode,
  Layout: Layout,
  Server: Server,
  Cpu: Cpu,
  Network: Network,
  ShieldCheck: ShieldCheck,
  Mail: Mail,
  ArrowLeftRight: ArrowLeftRight,
  Database: Database,
  Workflow: Workflow,
  Binary: Binary,
  Terminal: Terminal,
  GitBranch: GitBranch,
  Github: Github,
  FileText: FileText,
  Table: Table,
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSkills =
    selectedCategory === 'all'
      ? skillsData.skills
      : skillsData.skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Layers size={14} /> Technical Stack
          </div>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Tools, languages, and frameworks I use to engineer full-stack web applications.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skills-filter-bar">
          {skillsData.categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, idx) => {
            const IconComponent = iconMap[skill.icon] || Code;
            return (
              <div key={idx} className="skill-card">
                <div className="skill-icon-box">
                  <IconComponent size={24} />
                </div>
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-category-tag">{skill.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
