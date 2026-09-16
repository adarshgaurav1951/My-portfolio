import React from 'react';
import { X, Activity, BrainCircuit, CheckCircle2, TrendingUp, Cpu, Database, Layers, ArrowRight } from 'lucide-react';

export default function CaseStudyModal({ projectId, onClose }) {
  if (!projectId) return null;

  const isHeart = projectId === 'heart-disease';
  const isRAG = projectId === 'rag-assistant';
  const isChurn = projectId === 'churn-prediction';

  const getTitle = () => {
    if (isHeart) return 'Multimodal Deep Learning Framework for Heart Disease Prediction';
    if (isRAG) return 'RAG-based AI Teaching Assistant with Dense Vector Retrieval';
    return 'Customer Churn & Lifetime Value (LTV) Predictive Pipeline';
  };

  const getIcon = () => {
    if (isHeart) return <Activity size={24} className="cyan-icon" />;
    if (isRAG) return <BrainCircuit size={24} className="violet-icon" />;
    return <Database size={24} className="emerald-icon" />;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-wrap">
              {getIcon()}
            </div>
            <div>
              <span className="badge badge-cyan mono">ARCHITECTURAL DEEP DIVE</span>
              <h2 className="modal-title">{getTitle()}</h2>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {isHeart ? (
            <div className="case-study-details">
              {/* Problem & Solution */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">01 / PROBLEM STATEMENT & CLINICAL HYPOTHESIS</h3>
                <p className="case-text">
                  Cardiovascular disease remains the leading cause of global mortality. Conventional clinical predictive
                  models depend solely on static tabular indicators (blood pressure, cholesterol, resting blood sugar),
                  missing acute dynamic electrophysiological shifts. Conversely, isolated ECG classification models ignore
                  vital patient metabolic context.
                </p>
                <div className="callout-box glass-panel">
                  <strong>Hypothesis:</strong> Jointly optimizing spatial-temporal representations from continuous ECG waveforms
                  with normalized tabular clinical markers via cross-modal attention yields significantly higher diagnostic sensitivity.
                </div>
              </div>

              {/* Architecture Diagram */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">02 / END-TO-END ARCHITECTURAL PIPELINE</h3>
                <div className="arch-flow-box glass-panel mono">
                  <div className="arch-branch">
                    <div className="arch-node cyan-border">
                      <span className="node-title">BRANCH A: ECG Waveform</span>
                      <span className="node-sub">Continuous Lead II Signal (1000 Hz)</span>
                      <div className="node-stack">&darr; 1D-CNN Encoders &rarr; BiLSTM &rarr; Transformer Self-Attention</div>
                    </div>
                  </div>
                  <div className="arch-plus">+</div>
                  <div className="arch-branch">
                    <div className="arch-node violet-border">
                      <span className="node-title">BRANCH B: Clinical Tabular</span>
                      <span className="node-sub">Age, BP, Cholesterol, ST-depression</span>
                      <div className="node-stack">&darr; Z-score Normalization &rarr; Dense Multi-Layer Perceptron</div>
                    </div>
                  </div>
                  <div className="arch-plus">&darr;</div>
                  <div className="arch-node emerald-border full-node">
                    <span className="node-title">Cross-Attention Feature Fusion Layer</span>
                    <span className="node-sub">Dynamically weights clinical features conditioned on ECG temporal anomalies</span>
                    <div className="node-stack">&darr; Dense Classification Head &rarr; Sigmoid Probability Output</div>
                  </div>
                </div>
              </div>

              {/* Quantitative Benchmarks */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">03 / EMPIRICAL BENCHMARKS & EVALUATION</h3>
                <div className="benchmark-table-wrap glass-panel">
                  <table className="benchmark-table mono">
                    <thead>
                      <tr>
                        <th>Architecture / Modality</th>
                        <th>Accuracy</th>
                        <th>ROC-AUC</th>
                        <th>Precision</th>
                        <th>Recall</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tabular MLP (Baseline)</td>
                        <td>81.4%</td>
                        <td>0.865</td>
                        <td>0.80</td>
                        <td>0.82</td>
                      </tr>
                      <tr>
                        <td>1D-CNN ECG Signal Only</td>
                        <td>87.2%</td>
                        <td>0.912</td>
                        <td>0.86</td>
                        <td>0.88</td>
                      </tr>
                      <tr className="highlight-row">
                        <td><strong>Adarsh&apos;s Hybrid Multimodal Framework</strong></td>
                        <td><strong className="cyan-text">96.2%</strong></td>
                        <td><strong className="cyan-text">0.995</strong></td>
                        <td><strong className="cyan-text">0.95</strong></td>
                        <td><strong className="cyan-text">0.97</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Deployment */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">04 / PRODUCTION DEPLOYMENT</h3>
                <p className="case-text">
                  Containerized as a high-throughput microservice using <strong>FastAPI</strong> with asynchronous request
                  handling. Features an interactive <strong>React.js</strong> web dashboard enabling cardiologists to adjust
                  patient biomarkers and observe live model inference with sub-150ms round-trip latency, backed by
                  <strong>PostgreSQL</strong> for patient historical record persistence.
                </p>
              </div>
            </div>
          ) : (
            <div className="case-study-details">
              {/* Problem & Solution */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">01 / CHALLENGE: GRANULAR VIDEO SEARCH</h3>
                <p className="case-text">
                  University recorded lectures span dozens of hours, making manual search for specific mathematical formulas or
                  algorithmic nuances tedious. Commercial cloud LLM solutions incur recurring API costs and suffer from hallucinations
                  when answering domain-specific lecture inquiries without rigorous source attribution.
                </p>
                <div className="callout-box glass-panel">
                  <strong>Solution:</strong> A zero-cloud-cost, locally hosted pipeline leveraging Whisper large-v2 for precise audio transcription,
                  BGE-M3 for dense semantic vectorization, and locally served Llama 3.2 via Ollama constrained to citation-grounded generation.
                </div>
              </div>

              {/* Architecture Diagram */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">02 / RETRIEVAL & SYNTHESIS WORKFLOW</h3>
                <div className="arch-flow-box glass-panel mono">
                  <div className="arch-node violet-border full-node">
                    <span className="node-title">1. Audio Extraction & Word-Level Alignment</span>
                    <span className="node-sub">FFmpeg stream slicing &rarr; OpenAI Whisper large-v2 generates time-stamped JSON chunks</span>
                  </div>
                  <div className="arch-plus">&darr;</div>
                  <div className="arch-node cyan-border full-node">
                    <span className="node-title">2. Dense Vector Indexing (BGE-M3)</span>
                    <span className="node-sub">1024-dimensional dense semantic embeddings &rarr; Cosine similarity search in NumPy</span>
                  </div>
                  <div className="arch-plus">&darr;</div>
                  <div className="arch-node emerald-border full-node">
                    <span className="node-title">3. Anti-Hallucination Prompt Grounding & Local Inference</span>
                    <span className="node-sub">Strict system prompts inject retrieved snippets &rarr; Llama 3.2 generates responses with exact video timestamps</span>
                  </div>
                </div>
              </div>

              {/* Quantitative Metrics */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">03 / PERFORMANCE & COST EFFICIENCY</h3>
                <div className="metrics-cards-row">
                  <div className="metric-chip glass-panel">
                    <span className="chip-val mono cyan-text">0.00 $</span>
                    <span className="chip-lbl">Cloud API Costs (100% Local Inference)</span>
                  </div>
                  <div className="metric-chip glass-panel">
                    <span className="chip-val mono violet-text">&lt; 1.2s</span>
                    <span className="chip-lbl">End-to-End Query-to-Answer Latency</span>
                  </div>
                  <div className="metric-chip glass-panel">
                    <span className="chip-val mono emerald-text">98.4%</span>
                    <span className="chip-lbl">Citation Grounding Accuracy</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="case-study-details">
              {/* Problem & Solution */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">01 / PROBLEM STATEMENT & RETENTION ECONOMICS</h3>
                <p className="case-text">
                  Customer acquisition costs across subscription and SaaS platforms are at an all-time high, making retention
                  the primary growth lever. Legacy heuristic rule engines fail to capture non-linear engagement decay curves and
                  crumble under extreme target class imbalance (85% retained vs. 15% churned).
                </p>
                <div className="callout-box glass-panel">
                  <strong>Solution:</strong> A scalable feature engineering pipeline extracting 30+ Recency-Frequency-Monetary (RFM)
                  indicators via SQL window functions, synthetic minority oversampling via SMOTE-NC, and gradient boosting trees
                  optimized through Bayesian search (Optuna) with SHAP explainability.
                </div>
              </div>

              {/* Architecture Diagram */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">02 / END-TO-END DATA & ML PIPELINE</h3>
                <div className="arch-flow-box glass-panel mono">
                  <div className="arch-node cyan-border full-node">
                    <span className="node-title">1. SQL Feature Store & RFM Velocity Engineering</span>
                    <span className="node-sub">Aggregates 250K+ transactional & session events &rarr; Generates 30+ behavioral momentum metrics</span>
                  </div>
                  <div className="arch-plus">&darr;</div>
                  <div className="arch-node violet-border full-node">
                    <span className="node-title">2. Class Imbalance Handling (SMOTE-NC) & Bayesian Tuning</span>
                    <span className="node-sub">Synthesizes minority churn instances preserving categorical dependencies &rarr; Optuna optimizes XGBoost/LightGBM</span>
                  </div>
                  <div className="arch-plus">&darr;</div>
                  <div className="arch-node emerald-border full-node">
                    <span className="node-title">3. Model Explainability & Stakeholder Decision Engine</span>
                    <span className="node-sub">SHAP value decomposition &rarr; Exports high-risk accounts with interpretable churn drivers to CRM</span>
                  </div>
                </div>
              </div>

              {/* Quantitative Benchmarks */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">03 / EMPIRICAL BENCHMARKS & EVALUATION</h3>
                <div className="benchmark-table-wrap glass-panel">
                  <table className="benchmark-table mono">
                    <thead>
                      <tr>
                        <th>Model Architecture</th>
                        <th>PR-AUC</th>
                        <th>Recall</th>
                        <th>ROC-AUC</th>
                        <th>F1-Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Logistic Regression Baseline</td>
                        <td>0.72</td>
                        <td>68.0%</td>
                        <td>0.78</td>
                        <td>0.71</td>
                      </tr>
                      <tr>
                        <td>Standard Random Forest</td>
                        <td>0.81</td>
                        <td>76.5%</td>
                        <td>0.85</td>
                        <td>0.79</td>
                      </tr>
                      <tr className="highlight-row">
                        <td><strong>Adarsh&apos;s Tuned XGBoost + LightGBM</strong></td>
                        <td><strong className="cyan-text">0.91</strong></td>
                        <td><strong className="cyan-text">86.5%</strong></td>
                        <td><strong className="cyan-text">0.93</strong></td>
                        <td><strong className="cyan-text">0.88</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Deployment */}
              <div className="case-study-section">
                <h3 className="section-subtitle mono">04 / BUSINESS IMPACT & RETENTION ROI</h3>
                <p className="case-text">
                  Integrated with automated batch scoring workflows and real-time inference endpoints. Model outputs provide
                  customer success managers with transparent risk attributions, projected to decrease annual customer attrition by
                  <strong> 18%</strong> and safeguard high-value enterprise accounts.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <a
            href="https://github.com/adarshgaurav1951"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
          >
            <span>View Source Code on GitHub</span>
            <ArrowRight size={15} />
          </a>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
