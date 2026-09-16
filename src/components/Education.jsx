import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen, MapPin } from 'lucide-react';

export default function Education() {
  const educationList = [
    {
      institution: 'Guru Ghasidas Vishwavidyalaya (A Central University)',
      location: 'Bilaspur (C.G.), India',
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      period: 'Dec. 2022 – May 2026',
      grade: 'CGPA: 7.1 / 10',
      status: 'Final Year Undergraduate',
      featured: true,
      highlights: [
        'Advanced coursework in Machine Learning, Deep Learning, Statistical Modeling, and Signal Processing.',
        'Core Foundations: Data Structures & Algorithms, Database Management Systems (SQL), Operating Systems, and Computer Networks.',
        'Led student research initiatives bridging multimodal biomedical telemetry with deep learning classification models.'
      ]
    },
    {
      institution: 'Central Public School',
      location: 'Bihar, India',
      degree: 'Senior Secondary Education (CBSE Class XII - Science PCM)',
      period: 'April 2019 – March 2021',
      grade: 'Score: 70%',
      status: 'Completed',
      featured: false,
      highlights: ['Mathematics, Physics, Chemistry focus providing quantitative & analytical foundations.']
    },
    {
      institution: 'D.A.V. Public School',
      location: 'Bihar, India',
      degree: 'Secondary School Education (CBSE Class X)',
      period: 'April 2018 – March 2019',
      grade: 'Score: 80.88%',
      status: 'Completed',
      featured: false,
      highlights: ['Strong academic record with foundational sciences and competitive mathematics.']
    }
  ];

  return (
    <section id="education" className="section education-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <GraduationCap size={14} />
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">
            Education & <span className="violet-gradient-text">Credentials</span>
          </h2>
          <p className="section-desc">
            Strong foundations in computer science theory, algorithms, statistical learning, and systems engineering.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="education-grid">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              className={`education-card glass-panel ${edu.featured ? 'featured-edu-card' : ''}`}
            >
              <div className="edu-top-row">
                <div className="edu-icon-box">
                  <GraduationCap size={22} className={edu.featured ? 'cyan-icon' : 'violet-icon'} />
                </div>
                <div className="edu-badge-group">
                  <span className="badge badge-cyan mono">{edu.grade}</span>
                  {edu.featured && <span className="badge badge-emerald mono">Expected May 2026</span>}
                </div>
              </div>

              <h3 className="edu-institution">{edu.institution}</h3>
              <p className="edu-degree">{edu.degree}</p>

              <div className="edu-meta-row mono">
                <span className="edu-meta-item">
                  <Calendar size={13} />
                  {edu.period}
                </span>
                <span className="meta-sep">&bull;</span>
                <span className="edu-meta-item">
                  <MapPin size={13} />
                  {edu.location}
                </span>
              </div>

              <ul className="edu-highlights">
                {edu.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="edu-highlight-item">
                    <span className="bullet-indicator" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
