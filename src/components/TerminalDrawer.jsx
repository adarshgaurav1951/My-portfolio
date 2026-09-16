import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';

export default function TerminalDrawer({ isOpen, onClose, onOpenResume }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Adarsh Gaurav CLI Shell v2.4 (x86_64-antigravity-linux)\nType "help" to display available commands. Try "skills", "projects", or "resume".'
    }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'user', text: `adarsh@portfolio:~$ ${trimmed}` }];
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();

    switch (lower) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `AVAILABLE COMMANDS:
  about / bio   - Read Adarsh's summary & engineering objectives
  projects      - List flagship deep learning & RAG implementations
  demos         - Jump to interactive labs (ECG simulator & RAG tester)
  skills        - Display categorized technical skills matrix
  experience    - Show internship experience (CodSoft & CodeAlpha)
  education     - Display B.Tech CSE details & credentials
  resume        - Download or preview Adarsh's official PDF resume
  contact       - Output email, phone, and social links
  clear         - Clear the terminal screen buffer
  sudo          - Unlock developer superuser privileges
  exit / close  - Close this interactive shell`
        });
        break;

      case 'about':
      case 'bio':
        newHistory.push({
          type: 'response',
          text: `ADARSH GAURAV
CS Undergraduate @ Guru Ghasidas Vishwavidyalaya (Graduating May 2026)
Specialization: Machine Learning, Multimodal Deep Learning, RAG, and Predictive Analytics.
Proven track record engineering end-to-end pipelines from raw sensor/audio feeds to sub-150ms deployed APIs.`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `FLAGSHIP PROJECTS:
1. Multimodal Deep Learning Framework for Heart Disease Prediction
   - Architecture: CNN + BiLSTM + Transformer Self-Attention
   - Result: 96.2% Accuracy, 0.995 ROC-AUC
   - Stack: PyTorch, FastAPI, React.js, PostgreSQL

2. RAG-based AI Teaching Assistant
   - Pipeline: Whisper large-v2 -> BGE-M3 (1024d) -> Llama 3.2 (Ollama)
   - Feature: Zero cloud cost, exact timestamp grounding over video lectures`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `CORE TECHNICAL MATRIX:
Languages:     Python, SQL (Postgres), Java, C/C++, JavaScript, HTML/CSS
AI / ML:       PyTorch, Scikit-learn, CNN, BiLSTM, Transformers, RAG, Whisper, BGE-M3, Llama 3.2
Data Tools:    Pandas, NumPy, Matplotlib, Seaborn, Clinical ECG Signal Preprocessing
Backend/Web:   FastAPI, React.js, REST APIs, Git/GitHub, GCP, Docker basics`
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'response',
          text: `EXPERIENCE RECORD:
1. CodSoft — Data Science Intern (June 2025 – July 2025)
   - Real-time product analytics, predictive modeling in Pandas/NumPy, stakeholder visualizations.
2. CodeAlpha — Web Development Intern (Oct 2024 – Nov 2024)
   - Responsive user-facing web apps, real-time client-side form validation.`
        });
        break;

      case 'education':
        newHistory.push({
          type: 'response',
          text: `EDUCATION:
- B.Tech in Computer Science and Engineering (Dec 2022 – May 2026)
  Guru Ghasidas Vishwavidyalaya (Central University), Bilaspur (C.G.)
  CGPA: 7.1 / 10
- Senior Secondary (CBSE XII): 70% | Secondary (CBSE X): 80.88%`
        });
        break;

      case 'demos':
        newHistory.push({
          type: 'response',
          text: 'Navigating to Interactive ML Labs section...'
        });
        setTimeout(() => {
          onClose();
          const el = document.getElementById('demos');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 600);
        break;

      case 'resume':
        newHistory.push({
          type: 'response',
          text: 'Opening Adarsh Gaurav\'s resume modal...'
        });
        setTimeout(() => {
          onClose();
          onOpenResume();
        }, 500);
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `CONTACT COORDINATES:
Email:    adarshgaurav1624@gmail.com
Phone:    +91 7033375667
GitHub:   https://github.com/adarshgaurav1951
LinkedIn: https://linkedin.com/in/adarsh-gaurav`
        });
        break;

      case 'sudo':
        newHistory.push({
          type: 'response',
          text: '[ACCESS GRANTED]: User authenticated as Senior Technical Recruiter. Adarsh Gaurav has been scheduled for your technical interview loop.'
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'close':
      case 'quit':
        onClose();
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `command not found: "${trimmed}". Type "help" for valid options.`
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay">
      <div className="terminal-window glass-panel">
        {/* Terminal Title Bar */}
        <div className="terminal-titlebar">
          <div className="titlebar-buttons">
            <button className="tb-btn tb-close" onClick={onClose} title="Close shell" />
            <button className="tb-btn tb-min" onClick={onClose} title="Minimize" />
            <button className="tb-btn tb-max" title="Maximize" />
          </div>
          <div className="terminal-title mono">
            <Terminal size={14} className="cyan-icon" />
            <span>adarsh@portfolio: ~ (zsh)</span>
          </div>
          <button className="terminal-close-action" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Suggested Quick Commands */}
        <div className="terminal-quick-chips mono">
          <span className="chips-label">QUICK ACTIONS:</span>
          {['help', 'skills', 'projects', 'demos', 'resume', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              className="quick-chip"
              onClick={() => handleCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen Output */}
        <div className="terminal-body mono">
          {history.map((line, idx) => (
            <div key={idx} className={`term-line term-${line.type}`}>
              <pre>{line.text}</pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="terminal-input-row mono">
          <span className="prompt-symbol">adarsh@portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command (e.g. skills, resume)..."
            autoFocus
          />
          <button
            className="terminal-send-btn"
            onClick={() => handleCommand(input)}
          >
            <CornerDownLeft size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
