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
    'Data Scientist & ML Engineer',
    'Agentic AI & Data Pipeline Architect',
    'Multimodal Deep Learning Specialist',
    'RAG & Semantic Retrieval Practitioner'
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
            <span className="status-text">Available for Data Science & Agentic AI Roles</span>
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
          I am <strong>Adarsh Gaurav</strong>, a Data Scientist and Computer Science undergraduate with proven industry
          experience designing scalable data pipelines, predictive models, and <strong>Agentic AI systems</strong>.
          Demonstrated track record optimizing real-world AI training workflows—achieving a <strong>92% Agentic AI performance boost</strong> at
          Darexai private limited and developing multimodal deep learning architectures with <strong>96%+ accuracy</strong> and sub-150ms production inference.
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
              <Sparkles size={20} className="stat-icon cyan-icon" />
              <span className="stat-label mono">AGENTIC AI AT DAREXAI</span>
            </div>
            <div className="stat-value-group">
              <span className="stat-number cyan-gradient-text">+92%</span>
              <span className="stat-unit">Performance</span>
            </div>
            <p className="stat-subtext">Optimized data pipelines & multi-step tool-calling evaluation</p>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-header">
              <Activity size={20} className="stat-icon emerald-icon" />
              <span className="stat-label mono">HEART DISEASE MODEL</span>
            </div>
            <div className="stat-value-group">
              <span className="stat-number emerald-text">96.2%</span>
              <span className="stat-unit">0.995 ROC-AUC</span>
            </div>
            <p className="stat-subtext">Hybrid CNN-BiLSTM-Transformer ECG & clinical fusion</p>
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
            <p className="stat-subtext">Sub-45ms dense retrieval & zero cloud inference cost</p>
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
