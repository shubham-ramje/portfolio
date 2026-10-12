import React from 'react';
import { Monitor, Layers, Server, Smartphone, Database, CheckCircle2, Sparkles } from 'lucide-react';
import { servicesData } from '../data/portfolioData';

const iconMap = {
  Monitor: Monitor,
  Layers: Layers,
  Server: Server,
  Smartphone: Smartphone,
  Database: Database,
};

const Services = () => {
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> What I Offer
          </div>
          <h2 className="section-title">
            Services &amp; <span className="gradient-text">Solutions</span>
          </h2>
          <p className="section-subtitle">
            Specialized software development capabilities focused on quality, security, and scalability.
          </p>
        </div>

        <div className="services-grid">
          {servicesData.map((service) => {
            const IconComp = iconMap[service.icon] || Layers;
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon-box">
                  <IconComp size={24} />
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>

                <div className="service-list">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="service-list-item">
                      <CheckCircle2 size={15} color="#3b82f6" style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
