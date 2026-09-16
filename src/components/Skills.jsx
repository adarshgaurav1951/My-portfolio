import React, { useState } from 'react';
import { 
  Terminal, 
  BrainCircuit, 
  Database, 
  Code2, 
  Cloud, 
  Sparkles, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const skillsData = [
    // AI & Machine Learning
    {
      name: 'PyTorch & Deep Learning',
      category: 'ai',
      level: 90,
      experience: 'Hybrid CNN–BiLSTM–Transformer, signal & tabular fusion',
      badge: 'Advanced'
    },
    {
      name: 'RAG & Vector Retrieval',
      category: 'ai',
      level: 92,
      experience: 'BGE-M3 embeddings, cosine similarity, Ollama, Llama 3.2',
      badge: 'Core Specialization'
    },
    {
      name: 'Scikit-learn & Predictive Modeling',
      category: 'ai',
      level: 94,
      experience: 'SVM, Random Forests, cross-validation, ROC-AUC tuning',
      badge: 'Core'
    },
    {
      name: 'Speech-to-Text (Whisper)',
      category: 'ai',
      level: 88,
      experience: 'OpenAI Whisper large-v2, audio chunking with FFmpeg',
      badge: 'Production'
    },

    // Languages
    {
      name: 'Python',
      category: 'languages',
      level: 95,
      experience: 'Core DS/ML language, data pipelines, FastAPI, NumPy',
      badge: 'Primary'
    },
    {
      name: 'SQL (PostgreSQL)',
      category: 'languages',
      level: 88,
      experience: 'Complex queries, schema indexing, model persistence',
      badge: 'Proficient'
    },
    {
      name: 'Java',
      category: 'languages',
      level: 82,
      experience: 'Object-oriented programming, data structures, algorithms',
      badge: 'Proficient'
    },
    {
      name: 'C / C++',
      category: 'languages',
      level: 80,
      experience: 'Low-level computing, memory management, CS coursework',
      badge: 'Academic'
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'languages',
      level: 86,
      experience: 'Interactive frontends, React.js UI, asynchronous state',
      badge: 'Proficient'
    },
    {
      name: 'HTML5 & Modern CSS3',
      category: 'languages',
      level: 90,
      experience: 'Responsive UI, glassmorphism, accessibility, flex/grid',
      badge: 'Proficient'
    },

    // Data & Analytics
    {
      name: 'Pandas & NumPy',
      category: 'data',
      level: 94,
      experience: 'Feature engineering, time-series, data cleaning, CodSoft intern',
      badge: 'Core'
    },
    {
      name: 'Data Visualization',
      category: 'data',
      level: 90,
      experience: 'Matplotlib, Seaborn, interactive dashboards, stakeholder storytelling',
      badge: 'Core'
    },
    {
      name: 'Signal Processing (ECG)',
      category: 'data',
      level: 85,
      experience: 'Temporal filtering, P-Q-R-S-T extraction, medical data',
      badge: 'Domain Expert'
    },

    // Web & Backend
    {
      name: 'FastAPI',
      category: 'web',
      level: 88,
      experience: 'Sub-150ms ML inference microservices, Pydantic validation',
      badge: 'Production'
    },
    {
      name: 'React.js',
      category: 'web',
      level: 86,
      experience: 'State management, dynamic visualizations, component architecture',
      badge: 'Frontend'
    },

    // Tools & Cloud
    {
      name: 'Git & GitHub',
      category: 'tools',
      level: 92,
      experience: 'Branching, PR reviews, CI/CD workflows, open source',
      badge: 'Essential'
    },
    {
      name: 'Google Cloud Platform (GCP)',
      category: 'tools',
      level: 80,
      experience: 'Cloud storage, compute instances, model exploration',
      badge: 'Cloud'
    },
    {
      name: 'VS Code & Colab',
      category: 'tools',
      level: 95,
      experience: 'GPU notebook training, remote debugging, Python extensions',
      badge: 'Daily Driver'
    },
    {
      name: 'FFmpeg & Multimedia Streams',
      category: 'tools',
      level: 85,
      experience: 'Video/audio splitting, batch transcription pipelining',
      badge: 'Specialized'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Stack' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'languages', label: 'Languages' },
    { id: 'data', label: 'Data & Analytics' },
    { id: 'web', label: 'Web & Backend' },
    { id: 'tools', label: 'Tools & Cloud' }
  ];

  const filteredSkills =
    filter === 'all' ? skillsData : skillsData.filter((s) => s.category === filter);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Layers size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="violet-gradient-text">Engineering Toolkit</span>
          </h2>
          <p className="section-desc">
            A comprehensive matrix of programming languages, machine learning frameworks, data pipelines,
            and deployment environments honed through projects and professional internships.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="skills-filter-row">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, sIdx) => (
            <div key={sIdx} className="skill-card glass-panel">
              <div className="skill-top-meta">
                <span className="skill-name">{skill.name}</span>
                <span className="badge badge-cyan">{skill.badge}</span>
              </div>

              {/* Progress Level Bar */}
              <div className="skill-meter-wrap">
                <div className="meter-track">
                  <div
                    className="meter-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="meter-label mono">{skill.level}%</span>
              </div>

              {/* Practical Experience Context */}
              <p className="skill-context mono">
                <span className="context-prefix">&gt; </span>
                {skill.experience}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
