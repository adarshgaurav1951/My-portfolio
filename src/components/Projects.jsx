import React from 'react';
import { 
  Activity, 
  BrainCircuit, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  Cpu, 
  Database, 
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Github } from './SocialIcons';

export default function Projects({ onOpenCaseStudy }) {
  const projects = [
    {
      id: 'heart-disease',
      title: 'Multimodal Deep Learning Framework for Heart Disease Prediction',
      subtitle: 'Hybrid CNN–BiLSTM–Transformer fusing raw ECG signals with tabular clinical features',
      badge: '96%+ Accuracy | 0.995 ROC-AUC',
      badgeType: 'emerald',
      icon: Activity,
      summary:
        'Engineered an end-to-end multimodal predictive architecture that addresses diagnostic blindness by fusing continuous physiological signals (ECG waveforms) with static clinical indicators (demographics, blood pressure, cholesterol panels).',
      keyMetrics: [
        { label: 'Accuracy', value: '96.2%' },
        { label: 'ROC-AUC', value: '0.995' },
        { label: 'Inference Latency', value: '<150ms' },
        { label: 'Data Modes', value: 'ECG + Tabular' }
      ],
      stack: [
        'PyTorch',
        'CNN',
        'BiLSTM',
        'Transformer',
        'ECG Signal Processing',
        'FastAPI',
        'React.js',
        'PostgreSQL',
        'Scikit-learn'
      ],
      highlights: [
        'Designed custom 1D-CNN temporal encoders paired with bidirectional LSTM and self-attention heads for multi-lead ECG signals.',
        'Engineered tabular clinical normalization pipelines feeding into an attention-weighted feature fusion bottleneck.',
        'Validated through 5-fold cross validation and held-out hospital benchmarks, beating pure-tabular baselines by 14.8%.',
        'Deployed production-ready REST API with FastAPI and real-time interactive React dashboard backed by PostgreSQL.'
      ],
      github: 'https://github.com/adarshgaurav1951',
      hasDemo: true,
      demoTarget: '#ecg-demo'
    },
    {
      id: 'rag-assistant',
      title: 'RAG-based AI Teaching Assistant',
      subtitle: 'Autonomous video semantic search & question answering with dense vector retrieval',
      badge: 'Zero Cloud Cost | Local LLM',
      badgeType: 'violet',
      icon: BrainCircuit,
      summary:
        'Engineered an automated pipeline capable of digesting multi-hour academic video lectures, generating time-aligned transcriptions with Whisper, dense vector indexing via BGE-M3, and grounded synthesis using local Llama 3.2.',
      keyMetrics: [
        { label: 'Speech Model', value: 'Whisper large-v2' },
        { label: 'Embedding', value: 'BGE-M3 (1024d)' },
        { label: 'Local LLM', value: 'Llama 3.2 (Ollama)' },
        { label: 'Audio Tool', value: 'FFmpeg stream' }
      ],
      stack: [
        'Python',
        'OpenAI Whisper',
        'BGE-M3',
        'Llama 3.2',
        'Ollama',
        'NumPy',
        'Scikit-learn',
        'FFmpeg'
      ],
      highlights: [
        'Automated speech extraction from lecture videos using FFmpeg audio stream slicing and OpenAI Whisper large-v2.',
        'Constructed dense semantic search index using 1024-dimensional BGE-M3 embeddings and cosine similarity search.',
        'Tuned top-K chunk retrieval and context window packing to maximize factual precision while keeping latency below 1.2s.',
        'Engineered hallucination-constrained prompt templates forcing exact video timestamp citations for all generated answers.'
      ],
      github: 'https://github.com/adarshgaurav1951',
      hasDemo: true,
      demoTarget: '#rag-demo'
    },
    {
      id: 'churn-prediction',
      title: 'Customer Churn & Lifetime Value (LTV) Predictive Pipeline',
      subtitle: 'Production classification & Bayesian optimization on 250K+ customer profiles',
      badge: '0.91 PR-AUC | 86.5% Recall',
      badgeType: 'cyan',
      icon: Database,
      summary:
        'Engineered an enterprise-grade churn prediction and customer lifetime value forecasting pipeline on 250K+ customer profiles, resolving severe target imbalance with SMOTE-NC and providing transparent, actionable feature attribution via SHAP.',
      keyMetrics: [
        { label: 'PR-AUC', value: '0.91' },
        { label: 'Recall', value: '86.5%' },
        { label: 'Dataset Scale', value: '250K+' },
        { label: 'Expected Attrition', value: '-18%' }
      ],
      stack: [
        'Python',
        'XGBoost',
        'LightGBM',
        'SQL (PostgreSQL)',
        'Optuna',
        'SHAP',
        'Scikit-learn',
        'Pandas'
      ],
      highlights: [
        'Formulated 30+ Recency-Frequency-Monetary (RFM) and behavioral interaction features via complex SQL window functions and Pandas.',
        'Mitigated 85:15 class imbalance using SMOTE-NC and tuned gradient boosting hyperparameters with Optuna Bayesian optimization.',
        'Achieved 0.91 PR-AUC and 86.5% recall, powering retention workflows projected to reduce annual customer churn by 18%.',
        'Integrated SHAP (SHapley Additive exPlanations) for global and local interpretability, empowering stakeholders with transparent churn drivers.'
      ],
      github: 'https://github.com/adarshgaurav1951',
      hasDemo: false
    }
  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Featured Engineering</span>
          </div>
          <h2 className="section-title">
            Flagship <span className="cyan-gradient-text">AI & Deep Learning</span> Projects
          </h2>
          <p className="section-desc">
            Production-oriented implementations focusing on rigorous model evaluation, multimodal data fusion,
            and scalable retrieval pipelines.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <article key={project.id} className="project-card glass-panel">
                {/* Project Header */}
                <div className="project-top-meta">
                  <div className="project-icon-box">
                    <Icon size={24} className="cyan-icon" />
                  </div>
                  <div className="project-badge-box">
                    <span className={`badge badge-${project.badgeType}`}>
                      <TrendingUp size={12} />
                      <span>{project.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Project Titles */}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle mono">{project.subtitle}</p>

                {/* Description */}
                <p className="project-summary">{project.summary}</p>

                {/* Key Metrics Bar */}
                <div className="project-metrics-strip">
                  {project.keyMetrics.map((metric, mIdx) => (
                    <div key={mIdx} className="metric-item">
                      <span className="metric-val mono">{metric.value}</span>
                      <span className="metric-lbl">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bullet Highlights */}
                <div className="project-highlights">
                  <span className="highlights-label mono">KEY ACHIEVEMENTS:</span>
                  <ul className="highlights-list">
                    {project.highlights.map((point, hIdx) => (
                      <li key={hIdx} className="highlight-item">
                        <span className="bullet-indicator" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="project-tech-tags">
                  {project.stack.map((tech, tIdx) => (
                    <span key={tIdx} className="badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Footer */}
                <div className="project-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onOpenCaseStudy(project.id)}
                  >
                    <span>View Architecture & Case Study</span>
                    <ArrowRight size={15} />
                  </button>

                  <div className="project-sub-actions">
                    {project.hasDemo && (
                      <a href={project.demoTarget} className="btn btn-secondary btn-sm">
                        <Sparkles size={14} className="cyan-icon" />
                        <span>Try Demo</span>
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      title="View GitHub Repository"
                    >
                      <Github size={15} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
