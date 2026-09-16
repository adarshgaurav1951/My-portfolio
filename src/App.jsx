import React, { useState } from 'react';
import NeuralBackground from './components/NeuralBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import InteractiveDemos from './components/InteractiveDemos';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalDrawer from './components/TerminalDrawer';
import CaseStudyModal from './components/CaseStudyModal';
import ResumeModal from './components/ResumeModal';
import { Terminal } from 'lucide-react';
import './App.css';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState(null);

  return (
    <div className="portfolio-root">
      {/* Interactive Neural Constellation Background */}
      <NeuralBackground />

      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* Flagship Projects Section */}
        <Projects onOpenCaseStudy={(id) => setActiveCaseStudyId(id)} />

        {/* Live Interactive Machine Learning Labs */}
        <InteractiveDemos />

        {/* Technical Skills Matrix */}
        <Skills />

        {/* Professional Experience & Leadership Timeline */}
        <Experience />

        {/* Education & Academic Credentials */}
        <Education />

        {/* Direct Contact Channels & Interactive Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Interactive Terminal Launcher */}
      {!terminalOpen && (
        <button
          className="floating-terminal-launcher"
          onClick={() => setTerminalOpen(true)}
          title="Open Developer Shell (CLI)"
          aria-label="Open Interactive CLI Terminal"
        >
          <Terminal size={17} className="cyan-icon" />
          <span className="mono">Interactive CLI</span>
        </button>
      )}

      {/* Interactive Developer CLI Drawer */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Architectural Deep-Dive Case Study Modal */}
      <CaseStudyModal
        projectId={activeCaseStudyId}
        onClose={() => setActiveCaseStudyId(null)}
      />

      {/* Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
