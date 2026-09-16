import React, { useState, useEffect } from 'react';
import { Terminal, FileDown, Menu, X, Code2, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenTerminal, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'projects', 'demos', 'skills', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'projects', label: 'Projects' },
    { id: 'demos', label: 'Live Demos' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-box">
            <Code2 size={18} className="brand-icon" />
          </div>
          <span className="brand-text">
            Adarsh<span className="brand-accent">.ai</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
              {activeSection === link.id && <span className="active-dot" />}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* CLI Terminal Toggle */}
          <button
            className="btn btn-secondary btn-sm nav-terminal-btn"
            onClick={onOpenTerminal}
            title="Open Interactive Developer CLI"
            aria-label="Open Interactive CLI"
          >
            <Terminal size={15} className="cyan-icon" />
            <span className="mono nav-terminal-text">Terminal</span>
            <span className="keyboard-badge mono">~</span>
          </button>

          {/* Resume Action */}
          <button
            className="btn btn-outline btn-sm nav-resume-btn"
            onClick={onOpenResume}
            title="View & Download Resume"
          >
            <FileDown size={15} />
            <span>Resume</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass-panel">
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-menu-divider" />
            <div className="mobile-action-buttons">
              <button
                className="btn btn-secondary btn-sm w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
              >
                <Terminal size={16} /> Interactive Terminal
              </button>
              <button
                className="btn btn-primary btn-sm w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
              >
                <FileDown size={16} /> View & Download Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
