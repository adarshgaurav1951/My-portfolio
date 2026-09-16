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
      company: 'CodSoft',
      period: 'June 2025 – July 2025',
      location: 'Remote',
      type: 'Internship',
      color: 'cyan',
      description:
        'Focused on exploratory data analysis, feature engineering, and statistical predictive modeling on streaming product analytics datasets.',
      achievements: [
        'Analyzed real-time product datasets in Python (Pandas/NumPy) to surface user engagement patterns and behavioral trends.',
        'Built and benchmarked predictive models, translating raw unstructured data points into clear, actionable executive recommendations.',
        'Engineered high-impact data visualization dashboards that bridged complex machine learning findings for non-technical stakeholders.'
      ],
      tags: ['Python', 'Pandas', 'NumPy', 'Predictive Modeling', 'Data Storytelling', 'Product Analytics']
    },
    {
      role: 'Web Development Intern',
      company: 'CodeAlpha',
      period: 'Oct 2024 – Nov 2024',
      location: 'Remote',
      type: 'Internship',
      color: 'violet',
      description:
        'Engineered user-facing web interfaces, dynamic state management, and real-time form validation systems.',
      achievements: [
        'Shipped responsive, high-performance web applications using semantic HTML, Tailwind CSS, and modern JavaScript.',
        'Architected interactive UI modules with instant client-side validation, significantly reducing user submission error rates.',
        'Applied structured debugging methodologies to resolve cross-browser regressions and deploy production features on tight deadlines.'
      ],
      tags: ['JavaScript', 'HTML5', 'Tailwind CSS', 'UI Components', 'Form Validation', 'Structured Debugging']
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
