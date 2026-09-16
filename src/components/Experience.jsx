import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Users 
} from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: 'Data Science Intern',
      company: 'Darexai private limited',
      period: 'June 2026 – Sept 2026',
      location: 'India',
      type: 'Internship',
      color: 'cyan',
      description:
        'Architected, built, and optimized scalable data pipelines to train and fine-tune real-world Agentic AI models, dramatically improving reasoning accuracy and slashing system latency across internal tools and client projects.',
      achievements: [
        'Architected and optimized end-to-end data pipelines to ingest, clean, and preprocess high-throughput multimodal and structured datasets for training real-world Agentic AI models.',
        'Enhanced the execution accuracy and multi-step reasoning performance of Agentic AI systems by 92% through systematic prompt engineering, tool-calling validation schemas, and automated feedback loops.',
        'Streamlined vector retrieval pipelines and real-time data ingestion flows, significantly reducing system execution latency across existing internal developer tools and client project pipelines.',
        'Collaborated across multiple concurrent client projects and internal tools, translating business requirements into scalable feature transformations, monitoring model drift, and ensuring high data fidelity via Python and SQL.'
      ],
      tags: ['Agentic AI', 'Data Pipelines', 'Python', 'SQL', 'Latency Optimization', 'Multi-Agent Workflows', 'Model Training']
    }
  ];

  const leadership = [
    {
      title: 'Student Leader',
      organization: 'Pregrad',
      icon: Users,
      description:
        'Led campus technology initiatives, mentoring junior student peers and coordinating cross-functional student teams across hackathons and innovation sprints.'
    },
    {
      title: 'Deloitte Data Analytics Simulation',
      organization: 'Deloitte / Forage',
      icon: Award,
      description:
        'Completed simulated corporate analytics engagement, formulating statistical data cleaning pipelines and delivering business-critical data recommendations.'
    }
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>Career History</span>
          </div>
          <h2 className="section-title">
            Work Experience & <span className="cyan-gradient-text">Leadership</span>
          </h2>
          <p className="section-desc">
            Hands-on professional experience applying predictive analytics, data storytelling, and production software
            engineering to practical challenges.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="experience-timeline">
          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-marker">
                <div className={`marker-dot marker-${exp.color}`} />
                {idx < experiences.length - 1 && <div className="marker-line" />}
              </div>

              <div className="timeline-content glass-panel">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-company-row mono">
                      <span className="timeline-company">{exp.company}</span>
                      <span className="meta-sep">&bull;</span>
                      <span className="timeline-period">
                        <Calendar size={13} />
                        {exp.period}
                      </span>
                      <span className="meta-sep">&bull;</span>
                      <span className="timeline-location">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className={`badge badge-${exp.color} mono`}>{exp.type}</span>
                </div>

                <p className="timeline-desc">{exp.description}</p>

                <ul className="timeline-achievements">
                  {exp.achievements.map((item, aIdx) => (
                    <li key={aIdx} className="achievement-item">
                      <CheckCircle2 size={16} className={`${exp.color}-icon`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="timeline-tags">
                  {exp.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership & Additional Achievements */}
        <div className="leadership-subgrid">
          <div className="leadership-header mono">
            <Sparkles size={16} className="cyan-icon" />
            <span>LEADERSHIP & PROFESSIONAL SIMULATIONS</span>
          </div>

          <div className="leadership-cards-grid">
            {leadership.map((item, lIdx) => {
              const Icon = item.icon;
              return (
                <div key={lIdx} className="leadership-card glass-panel">
                  <div className="leadership-icon-wrap">
                    <Icon size={20} className="cyan-icon" />
                  </div>
                  <div>
                    <h4 className="leadership-title">{item.title}</h4>
                    <span className="leadership-org mono">{item.organization}</span>
                    <p className="leadership-text">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
