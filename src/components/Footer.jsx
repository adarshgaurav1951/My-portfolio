import React from 'react';
import { Code2, Heart, ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        <div className="footer-main-row">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="brand-icon-box">
                <Code2 size={16} className="brand-icon" />
              </div>
              <span className="brand-text">
                Adarsh<span className="brand-accent">.ai</span>
              </span>
            </div>
            <p className="footer-tagline">
              Engineering intelligence through multimodal deep learning, predictive modeling, and scalable RAG
              architectures.
            </p>
          </div>

          <div className="footer-links-group">
            <span className="footer-col-title mono">EXPLORE</span>
            <ul className="footer-nav-list">
              <li><a href="#projects">Flagship Projects</a></li>
              <li><a href="#demos">Interactive Labs</a></li>
              <li><a href="#skills">Technical Skills</a></li>
              <li><a href="#experience">Experience & Leadership</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-social-group">
            <span className="footer-col-title mono">CONNECT</span>
            <div className="footer-social-icons">
              <a
                href="https://github.com/adarshgaurav1951"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/adarsh-gaurav"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:adarshgaurav1624@gmail.com"
                className="footer-icon-link"
                title="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copyright mono">
            &copy; {new Date().getFullYear()} Adarsh Gaurav. All rights reserved.
          </p>

          <button onClick={scrollToTop} className="back-to-top-btn" title="Back to top">
            <span className="mono">BACK TO TOP</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
