import React, { useState, useEffect } from 'react';
import { User, Terminal, CheckCircle2, Sparkles } from 'lucide-react';

const DeveloperIllustration = () => {
  const [activeTab, setActiveTab] = useState('server.js');

  const tabs = [
    { id: 'server.js', label: 'server.js', icon: 'Node' },
    { id: 'App.jsx', label: 'App.jsx', icon: 'React' },
    { id: 'schema.js', label: 'Contact.js', icon: 'Mongo' },
  ];

  return (
    <div className="dev-visual-wrapper">
      <div className="dev-code-window">
        {/* Window Top Bar */}
        <div className="window-header">
          <div className="window-dots">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-yellow"></span>
            <span className="window-dot dot-green"></span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: activeTab === tab.id ? 'var(--card-border)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--text-highlight)' : 'var(--text-muted)',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="window-title">shubham-ramje-mern</div>
        </div>

        {/* Code Content */}
        <div className="window-body">
          {activeTab === 'server.js' && (
            <div>
              <p className="code-comment">// MERN Full Stack Backend Core</p>
              <p>
                <span className="code-keyword">const</span> express = <span className="code-fn">require</span>(<span className="code-string">'express'</span>);
              </p>
              <p>
                <span className="code-keyword">const</span> mongoose = <span className="code-fn">require</span>(<span className="code-string">'mongoose'</span>);
              </p>
              <p>
                <span className="code-keyword">const</span> app = <span className="code-fn">express</span>();
              </p>
              <br />
              <p className="code-comment">// Connect to MongoDB Atlas / Local</p>
              <p>
                <span className="code-keyword">await</span> mongoose.<span className="code-fn">connect</span>(process.env.<span className="code-var">MONGODB_URI</span>);
              </p>
              <p>
                app.<span className="code-fn">use</span>(<span className="code-string">'/api/contact'</span>, contactRouter);
              </p>
              <p>
                app.<span className="code-fn">listen</span>(<span className="code-var">5000</span>, () =&gt; &#123;
              </p>
              <p style={{ paddingLeft: '1.25rem' }}>
                console.<span className="code-fn">log</span>(<span className="code-string">'🚀 Server running on port 5000'</span>);
              </p>
              <p>&#125;);</p>
            </div>
          )}

          {activeTab === 'App.jsx' && (
            <div>
              <p className="code-comment">// Modern React.js Architecture</p>
              <p>
                <span className="code-keyword">import</span> React, &#123; useState, useEffect &#125; <span className="code-keyword">from</span> <span className="code-string">'react'</span>;
              </p>
              <p>
                <span className="code-keyword">import</span> axios <span className="code-keyword">from</span> <span className="code-string">'axios'</span>;
              </p>
              <br />
              <p>
                <span className="code-keyword">export default function</span> <span className="code-fn">Portfolio</span>() &#123;
              </p>
              <p style={{ paddingLeft: '1.25rem' }}>
                <span className="code-keyword">const</span> developer = &#123;
              </p>
              <p style={{ paddingLeft: '2.5rem' }}>
                name: <span className="code-string">'Shubham Ramje'</span>,
              </p>
              <p style={{ paddingLeft: '2.5rem' }}>
                role: <span className="code-string">'MERN Full Stack Developer'</span>,
              </p>
              <p style={{ paddingLeft: '2.5rem' }}>
                stack: [<span className="code-string">'MongoDB'</span>, <span className="code-string">'Express'</span>, <span className="code-string">'React'</span>, <span className="code-string">'Node'</span>],
              </p>
              <p style={{ paddingLeft: '1.25rem' }}>&#125;;</p>
              <p style={{ paddingLeft: '1.25rem' }}>
                <span className="code-keyword">return</span> &lt;<span className="code-fn">Application</span> developer=&#123;developer&#125; /&gt;;
              </p>
              <p>&#125;</p>
            </div>
          )}

          {activeTab === 'schema.js' && (
            <div>
              <p className="code-comment">// MongoDB Contact Schema</p>
              <p>
                <span className="code-keyword">const</span> contactSchema = <span className="code-keyword">new</span> mongoose.<span className="code-fn">Schema</span>(&#123;
              </p>
              <p style={{ paddingLeft: '1.25rem' }}>
                name: &#123; type: String, required: <span className="code-keyword">true</span> &#125;,
              </p>
              <p style={{ paddingLeft: '1.25rem' }}>
                email: &#123; type: String, required: <span className="code-keyword">true</span> &#125;,
              </p>
              <p style={{ paddingLeft: '1.25rem' }}>
                message: &#123; type: String, required: <span className="code-keyword">true</span> &#125;,
              </p>
              <p style={{ paddingLeft: '1.25rem' }}>
                isRead: &#123; type: Boolean, default: <span className="code-keyword">false</span> &#125;,
              </p>
              <p>&#125;, &#123; timestamps: <span className="code-keyword">true</span> &#125;);</p>
              <p>
                <span className="code-keyword">module.exports</span> = mongoose.<span className="code-fn">model</span>(<span className="code-string">'Contact'</span>, contactSchema);
              </p>
            </div>
          )}

          {/* Interactive Stack Pill Badges */}
          <div
            style={{
              marginTop: '1.25rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--card-border)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>MongoDB</span>
            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)' }}>Express.js</span>
            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.3)' }}>React.js</span>
            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.3)' }}>Node.js</span>
            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)' }}>REST APIs</span>
          </div>
        </div>
      </div>

      {/* Profile Image & Status Card Placeholder */}
      <div className="profile-avatar-card">
        <div className="avatar-placeholder" title="Profile Image Placeholder (Add your photo anytime)">
          <User size={24} />
        </div>
        <div className="avatar-meta">
          <h4>Shubham Ramje</h4>
          <p>MERN Full Stack Dev</p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperIllustration;
