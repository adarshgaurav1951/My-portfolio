import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Activity, 
  BrainCircuit, 
  FileDown, 
  Mail, 
  Phone,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

export default function Hero({ onOpenResume }) {
  const roles = [
    'Machine Learning Engineer',
    'Multimodal Deep Learning Practitioner',
    'RAG & Dense Retrieval Specialist',
    'Full-Stack Data Application Developer'
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const updateSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero-section">
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      <div className="container hero-container">
        {/* Availability Pill */}
        <div className="hero-badge-wrapper">
          <div className="status-badge">
            <span className="status-dot" />
            <span className="status-text">Available for Data Science & ML Roles</span>
            <span className="badge-tag mono">Graduating May 2026</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          Engineering Intelligence <br />
          <span className="gradient-text">From Data to Deployment</span>
        </h1>

        {/* Dynamic Subtitle */}
        <div className="hero-typewriter-box">
          <span className="typewriter-prefix mono">&gt; </span>
          <span className="typewriter-text mono">{displayText}</span>
          <span className="typewriter-cursor mono">_</span>
        </div>

        {/* Bio summary */}
        <p className="hero-bio">
          I am <strong>Adarsh Gaurav</strong>, a Computer Science undergraduate skilled at building, evaluating, 
          and deploying end-to-end ML & deep learning architectures — from feature engineering across tabular 
          and biomedical signal data to custom RAG pipelines with dense vector retrieval. Proficient in Python, 
          PyTorch, SQL, and modern full-stack systems to solve real-world problems at scale.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            <span>Explore Projects</span>
            <ArrowRight size={17} />
          </a>
          <a href="#demos" className="btn btn-secondary">
            <BrainCircuit size={17} className="cyan-icon" />
            <span>Interactive ML Demos</span>
          </a>
          <button className="btn btn-outline" onClick={onOpenResume}>
            <FileDown size={17} />
            <span>Resume (PDF)</span>
          </button>
        </div>

        {/* Quick Social Links */}
        <div className="hero-social-strip">
          <a
            href="https://github.com/adarshgaurav1951"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill"
            title="GitHub Profile"
          >
            <Github size={16} />
            <span className="mono">github/adarshgaurav1951</span>
          </a>
          <a
            href="https://linkedin.com/in/adarsh-gaurav"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill"
            title="LinkedIn Profile"
          >
            <Linkedin size={16} />
            <span className="mono">linkedin/in/adarsh-gaurav</span>
          </a>
          <a
            href="mailto:adarshgaurav1624@gmail.com"
            className="social-pill"
            title="Email Directly"
          >
            <Mail size={16} />
            <span className="mono">adarshgaurav1624@gmail.com</span>
          </a>
          <a
            href="tel:7033375667"
            className="social-pill"
            title="Call"
          >
            <Phone size={16} />
            <span className="mono">+91 7033375667</span>
          </a>
        </div>

        {/* Highlight Stats Bar */}
        <div className="hero-stats-grid">
          <div className="stat-card glass-panel">
            <div className="stat-header">
              <Activity size={20} className="stat-icon cyan-icon" />
              <span className="stat-label mono">HEART DISEASE MODEL</span>
            </div>
            <div className="stat-value-group">
              <span className="stat-number cyan-gradient-text">96%+</span>
              <span className="stat-unit">Accuracy</span>
            </div>
            <p className="stat-subtext">0.995 ROC-AUC with CNN-BiLSTM-Transformer fusion</p>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-header">
              <BrainCircuit size={20} className="stat-icon violet-icon" />
              <span className="stat-label mono">LOCAL RAG PIPELINE</span>
            </div>
            <div className="stat-value-group">
              <span className="stat-number violet-gradient-text">BGE-M3</span>
              <span className="stat-unit">+ Llama 3.2</span>
            </div>
            <p className="stat-subtext">Dense vector retrieval & Whisper large-v2 audio transcription</p>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-header">
              <Layers size={20} className="stat-icon emerald-icon" />
              <span className="stat-label mono">ACADEMIC EXCELLENCE</span>
            </div>
            <div className="stat-value-group">
              <span className="stat-number">7.1</span>
              <span className="stat-unit">/ 10 CGPA</span>
            </div>
            <p className="stat-subtext">B.Tech in Computer Science & Engineering (2022–2026)</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <a href="#projects" aria-label="Scroll to Projects">
            <span className="mono scroll-text">SCROLL TO EXPLORE</span>
            <ChevronDown size={18} className="scroll-chevron" />
          </a>
        </div>
      </div>
    </section>
  );
}
