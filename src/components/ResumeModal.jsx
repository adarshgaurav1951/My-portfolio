import React from 'react';
import { X, FileDown, ExternalLink, CheckCircle2, Award, Calendar, Mail, Phone } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content resume-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-wrap">
              <FileDown size={22} className="cyan-icon" />
            </div>
            <div>
              <span className="badge badge-cyan mono">OFFICIAL RESUME</span>
              <h2 className="modal-title">Adarsh Gaurav — Curriculum Vitae</h2>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body resume-modal-body">
          {/* Quick Summary Strip */}
          <div className="resume-quick-strip glass-panel">
            <div className="quick-item">
              <span className="quick-label mono">CANDIDATE</span>
              <span className="quick-val">Adarsh Gaurav</span>
            </div>
            <div className="quick-item">
              <span className="quick-label mono">TARGET ROLES</span>
              <span className="quick-val cyan-text">Data Science & ML Engineering</span>
            </div>
            <div className="quick-item">
              <span className="quick-label mono">AVAILABILITY</span>
              <span className="quick-val emerald-text">May 2026 Grad (Immediate Intern)</span>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div className="pdf-viewer-container glass-panel">
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0"
              title="Adarsh Gaurav Resume"
              className="pdf-iframe"
            />
          </div>

          {/* Fallback & Highlights */}
          <div className="resume-download-bar">
            <p className="resume-hint mono">
              If the PDF preview does not load in your browser, use the direct download button below.
            </p>
            <div className="resume-actions-group">
              <a
                href="/resume.pdf"
                download="Adarsh_Gaurav_Resume_DS.pdf"
                className="btn btn-primary"
              >
                <FileDown size={17} />
                <span>Download Official PDF (62 KB)</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <ExternalLink size={16} />
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
