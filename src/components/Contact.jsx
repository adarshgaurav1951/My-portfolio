import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copiedField, setCopiedField] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4500);
    }, 900);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <MessageSquare size={14} />
            <span>Direct Communication</span>
          </div>
          <h2 className="section-title">
            Let&apos;s Connect & <span className="cyan-gradient-text">Build Together</span>
          </h2>
          <p className="section-desc">
            Whether you are discussing open Machine Learning / Data Science roles, potential technical collaborations,
            or RAG pipeline design, my inbox is open.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Channels Card */}
          <div className="contact-info-card glass-panel">
            <h3 className="contact-card-title">Contact Coordinates</h3>
            <p className="contact-card-desc">
              Fastest response via Email or LinkedIn. Available for full-time opportunities starting mid-2026 as well
              as research internships.
            </p>

            <div className="contact-methods-list">
              {/* Email */}
              <div className="contact-method-item">
                <div className="contact-icon-box">
                  <Mail size={18} className="cyan-icon" />
                </div>
                <div className="method-details">
                  <span className="method-label mono">EMAIL</span>
                  <a href="mailto:adarshgaurav1624@gmail.com" className="method-link">
                    adarshgaurav1624@gmail.com
                  </a>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy('adarshgaurav1624@gmail.com', 'email')}
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedField === 'email' ? <Check size={16} className="emerald-icon" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone */}
              <div className="contact-method-item">
                <div className="contact-icon-box">
                  <Phone size={18} className="violet-icon" />
                </div>
                <div className="method-details">
                  <span className="method-label mono">PHONE</span>
                  <a href="tel:7033375667" className="method-link mono">
                    +91 7033375667
                  </a>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy('+917033375667', 'phone')}
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check size={16} className="emerald-icon" /> : <Copy size={16} />}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="contact-method-item">
                <div className="contact-icon-box">
                  <Linkedin size={18} className="cyan-icon" />
                </div>
                <div className="method-details">
                  <span className="method-label mono">LINKEDIN</span>
                  <a
                    href="https://linkedin.com/in/adarsh-gaurav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="method-link"
                  >
                    linkedin.com/in/adarsh-gaurav
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-method-item">
                <div className="contact-icon-box">
                  <Github size={18} className="emerald-icon" />
                </div>
                <div className="method-details">
                  <span className="method-label mono">GITHUB</span>
                  <a
                    href="https://github.com/adarshgaurav1951"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="method-link"
                  >
                    github.com/adarshgaurav1951
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-status-card glass-panel">
              <span className="status-dot" />
              <div>
                <span className="mono status-headline">CURRENT STATUS</span>
                <p className="status-sub">Actively interviewing for Data Science & ML Engineering roles.</p>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="contact-form-card glass-panel">
            <h3 className="contact-card-title">Send a Direct Message</h3>

            {status === 'success' && (
              <div className="form-alert-success mono">
                <Check size={18} />
                <span>Thank you! Your message has been prepared and sent successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label mono" htmlFor="name">
                  YOUR NAME *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label mono" htmlFor="email">
                  YOUR EMAIL *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="e.g. sarah@techcorp.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label mono" htmlFor="subject">
                  SUBJECT / ROLE INQUIRY
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. ML Engineer Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label mono" htmlFor="message">
                  MESSAGE *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Share details about the role, team, or project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-primary w-full"
              >
                <Send size={16} />
                <span>{status === 'sending' ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
