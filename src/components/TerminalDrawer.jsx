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
  projects      - List flagship ML, RAG & Predictive analytics projects
  demos         - Jump to interactive labs (ECG simulator & RAG tester)
  skills        - Display categorized technical skills matrix
  experience    - Show industry experience (Darexia Private Limited)
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
Data Scientist & ML Engineer @ Guru Ghasidas Vishwavidyalaya (Graduating May 2026)
Industry Experience: Data Science Intern @ Darexia Private Limited (Agentic AI data pipelines, +92% reasoning boost).
Specialization: Agentic AI, Multimodal Deep Learning (PyTorch), RAG (BGE-M3/Llama 3.2), and Predictive Modeling (XGBoost/LightGBM).`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `FLAGSHIP PROJECTS:
1. Multimodal Deep Learning Framework for Clinical Disease Prediction
   - Architecture: 1D-CNN + BiLSTM + Transformer Self-Attention
   - Result: 96.2% Accuracy, 0.995 ROC-AUC, sub-150ms FastAPI latency
   - Stack: PyTorch, Scikit-learn, FastAPI, PostgreSQL

2. Autonomous RAG & Semantic Analytics Engine
   - Pipeline: Whisper large-v2 -> BGE-M3 (1024d) -> Llama 3.2 (Ollama)
   - Result: Sub-45ms dense retrieval, zero cloud cost, 100% grounded citations

3. Customer Churn & Lifetime Value (LTV) Predictive Pipeline
   - Architecture: SQL Window Features + SMOTE-NC + Optuna Bayesian Tuning
   - Result: 0.91 PR-AUC, 86.5% Recall, -18% Projected Churn
   - Stack: Python, XGBoost, LightGBM, SQL, Optuna, SHAP`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `CORE TECHNICAL MATRIX:
Languages:     Python (Advanced), SQL (PostgreSQL, MySQL), C/C++, Java, JavaScript
Agentic & AI:  Agentic Workflows, Tool-Calling, RAG, BGE-M3, Llama 3.2, Whisper, Prompt Engineering
ML & DL:       PyTorch, Scikit-learn, XGBoost, LightGBM, CNN, BiLSTM, Transformers, Optuna, SHAP
Data Eng:      Scalable Data Pipelines, Pandas, NumPy, SQL Window Functions, Feature Stores, EDA
Deployment:    FastAPI, Git/GitHub, Docker (Basics), GCP, RESTful APIs, Linux/Bash`
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'response',
          text: `EXPERIENCE RECORD:
Darexai private limited — Data Science Intern (June 2026 – Sept 2026)
- Architected & optimized end-to-end data pipelines for training real-world Agentic AI models.
- Enhanced Agentic AI system task performance by 92% via tool-calling validation & feedback loops.
- Reduced execution latency across internal developer tools and client project pipelines.
- Formulated scalable data pipelines across multiple client projects via Python & SQL.`
        });
        break;

      case 'education':
        newHistory.push({
          type: 'response',
          text: `EDUCATION:
- B.Tech in Computer Science and Engineering (Dec 2022 – May 2026)
  Guru Ghasidas Vishwavidyalaya (Central University), Bilaspur (C.G.)
  Focus: Machine Learning, Probability & Statistics, Algorithms, DBMS (SQL)`
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
