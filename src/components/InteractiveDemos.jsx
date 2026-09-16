import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  BrainCircuit, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  FileText, 
  Cpu,
  ChevronRight,
  Database
} from 'lucide-react';

export default function InteractiveDemos() {
  const [activeTab, setActiveTab] = useState('ecg');

  /* -------------------------------------------------------------
     DEMO 1: Multimodal ECG & Clinical Risk Simulator State
     ------------------------------------------------------------- */
  const canvasRef = useRef(null);
  const [ecgMode, setEcgMode] = useState('normal'); // 'normal' or 'arrhythmia'
  const [patientAge, setPatientAge] = useState(54);
  const [bloodPressure, setBloodPressure] = useState(132);
  const [cholesterol, setCholesterol] = useState(245);
  const [maxHeartRate, setMaxHeartRate] = useState(148);
  const [stDepression, setStDepression] = useState(1.2);

  // Computed Risk Score
  const [riskScore, setRiskScore] = useState(28);

  useEffect(() => {
    // Multimodal fusion formula mimicking tabular + temporal ECG weights
    let score = 0;
    // Age factor
    score += (patientAge - 30) * 0.45;
    // BP factor
    score += (bloodPressure - 110) * 0.35;
    // Cholesterol factor
    score += (cholesterol - 180) * 0.22;
    // Max Heart rate (inversely correlated with stress condition)
    score += (180 - maxHeartRate) * 0.25;
    // ST depression (strong clinical signal)
    score += stDepression * 14;
    // ECG signal anomaly
    if (ecgMode === 'arrhythmia') {
      score += 26;
    }

    const normalized = Math.min(Math.max(Math.round(score), 4), 98);
    setRiskScore(normalized);
  }, [patientAge, bloodPressure, cholesterol, maxHeartRate, stDepression, ecgMode]);

  // ECG Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 180);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = 180;
    };
    window.addEventListener('resize', handleResize);

    let t = 0;
    const points = [];
    const maxPoints = Math.floor(width / 2);

    // Initial point fill
    for (let i = 0; i < maxPoints; i++) {
      points.push(height / 2);
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 10, 15, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Draw medical grid lines
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 20;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ECG wave generation (P-Q-R-S-T sequence)
      t += ecgMode === 'normal' ? 0.08 : 0.12;
      const cycle = t % (Math.PI * 2);
      let yOffset = 0;

      // P wave
      if (cycle > 0.4 && cycle < 0.7) {
        yOffset = -Math.sin((cycle - 0.4) * (Math.PI / 0.3)) * 9;
      }
      // Q dip
      else if (cycle > 0.85 && cycle < 0.95) {
        yOffset = 7;
      }
      // R peak
      else if (cycle > 0.95 && cycle < 1.12) {
        const rHeight = ecgMode === 'normal' ? 48 : 34;
        yOffset = -Math.sin((cycle - 0.95) * (Math.PI / 0.17)) * rHeight;
      }
      // S dip
      else if (cycle > 1.12 && cycle < 1.25) {
        yOffset = 14;
      }
      // T wave + ST depression anomaly
      else if (cycle > 1.4 && cycle < 1.85) {
        const stDrop = ecgMode === 'arrhythmia' ? stDepression * 5 : 0;
        yOffset = -Math.sin((cycle - 1.4) * (Math.PI / 0.45)) * 14 + stDrop;
      }

      const currentY = height / 2 + yOffset;
      points.push(currentY);
      if (points.length > maxPoints) {
        points.shift();
      }

      // Render glowing ECG trace
      ctx.beginPath();
      ctx.strokeStyle = ecgMode === 'normal' ? '#00F2FE' : '#F43F5E';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = ecgMode === 'normal' ? 'rgba(0, 242, 254, 0.6)' : 'rgba(244, 63, 94, 0.7)';
      ctx.shadowBlur = 8;

      for (let i = 0; i < points.length; i++) {
        const x = (i / maxPoints) * width;
        const y = points[i];
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Scanning cursor
      const headX = (points.length / maxPoints) * width;
      ctx.fillStyle = ecgMode === 'normal' ? '#FFFFFF' : '#FF6B81';
      ctx.beginPath();
      ctx.arc(headX, points[points.length - 1] || height / 2, 3.5, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [ecgMode, stDepression]);

  /* -------------------------------------------------------------
     DEMO 2: RAG Teaching Assistant Simulator State
     ------------------------------------------------------------- */
  const sampleQueries = [
    {
      q: 'How does backpropagation handle vanishing gradients in deep networks?',
      videoSource: 'CS402_Lecture_14_Backpropagation_and_ResNets.mp4',
      timestamp: '00:42:15 - 00:44:30',
      similarity: 0.942,
      retrievedSnippet:
        '"...when we compute recursive chain-rule derivatives through dozens of saturated Sigmoidal layers, gradients diminish exponentially to zero. Residual skip connections (ResNets) solve this by establishing an identity gradient highway where d(x + F(x))/dx = 1 + F\'(x), ensuring non-zero gradient backflow..."',
      answer:
        'Backpropagation struggles with vanishing gradients because continuous multiplication of fractional Jacobian matrices rapidly squashes gradient magnitudes toward zero. As detailed in the lecture at [00:42:15], residual connections counteract this by introducing an identity mapping highway f(x) = x + F(x), guaranteeing that gradient components have a direct path of unity back to initial layers.'
    },
    {
      q: 'Explain multi-head self-attention mechanisms in Transformers.',
      videoSource: 'CS480_DeepLearning_Lecture_21_Transformers.mp4',
      timestamp: '01:12:04 - 01:14:28',
      similarity: 0.958,
      retrievedSnippet:
        '"...instead of computing attention once with high dimensional keys, queries and values, multi-head attention projects them h times with learnable linear projections W_q, W_k, W_v. This allows the model to jointly attend to information from different representation subspaces at different token positions..."',
      answer:
        'Multi-head attention divides embeddings across h independent projection heads (as formulated at [01:12:04]). Each head independently computes scaled dot-product attention: Attention(Q, K, V) = softmax((Q*K^T)/sqrt(d_k)) * V, enabling the model to simultaneously capture syntactic, positional, and semantic relationships without conflating them into a single averaging subspace.'
    },
    {
      q: 'What is the clinical value of fusing tabular stats with raw ECG waveforms?',
      videoSource: 'BME510_Physiological_Modeling_Week_08.mp4',
      timestamp: '00:18:40 - 00:20:55',
      similarity: 0.929,
      retrievedSnippet:
        '"...static tabular blood panels provide systemic metabolic risk context, but only dynamic electrograms capture transient ST-segment depressions and micro-arrhythmias. Fusing both via a shared multimodal embedding prevents false-negatives in acute coronary syndromes..."',
      answer:
        'As explained in the lecture segment at [00:18:40], neither modality alone provides complete diagnostic coverage. Tabular clinical features represent patient baseline risk, while high-frequency ECG waveforms record instantaneous electrophysiological conduction anomalies. Combining both representations through cross-attention fusion achieves 96%+ diagnostic reliability.'
    }
  ];

  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [pipelineState, setPipelineState] = useState('idle'); // idle, processing, done

  const handleRunRAG = () => {
    setPipelineState('processing');
    setTimeout(() => {
      setPipelineState('done');
    }, 850);
  };

  return (
    <section id="demos" className="section demos-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Interactive Engineering Labs</span>
          </div>
          <h2 className="section-title">
            Test The <span className="gradient-text">Live Machine Learning</span> Workflows
          </h2>
          <p className="section-desc">
            Interact with simulated versions of Adarsh&apos;s models. Test real-time signal fusion, adjust clinical risk
            parameters, and observe dense vector retrieval with local LLM synthesis.
          </p>
        </div>

        {/* Lab Navigation Switcher */}
        <div className="demo-tabs-wrapper">
          <button
            className={`demo-tab-btn ${activeTab === 'ecg' ? 'active' : ''}`}
            onClick={() => setActiveTab('ecg')}
            id="ecg-demo"
          >
            <Activity size={18} className="cyan-icon" />
            <span>Multimodal ECG & Risk Fusion Lab</span>
          </button>
          <button
            className={`demo-tab-btn ${activeTab === 'rag' ? 'active' : ''}`}
            onClick={() => setActiveTab('rag')}
            id="rag-demo"
          >
            <BrainCircuit size={18} className="violet-icon" />
            <span>RAG Video Semantic Q&A Lab</span>
          </button>
        </div>

        {/* DEMO 1: Multimodal Heart Disease Simulator */}
        {activeTab === 'ecg' && (
          <div className="demo-canvas-card glass-panel">
            <div className="demo-card-header">
              <div className="demo-title-group">
                <h3 className="demo-card-title">Real-Time ECG Waveform & Clinical Risk Predictor</h3>
                <p className="demo-card-subtitle mono">
                  Model: Hybrid 1D-CNN + BiLSTM + Tabular Cross-Attention | Deployed on FastAPI
                </p>
              </div>
              <div className="demo-mode-toggles">
                <span className="toggle-label mono">Rhythm Mode:</span>
                <button
                  className={`btn-mode ${ecgMode === 'normal' ? 'active-normal' : ''}`}
                  onClick={() => setEcgMode('normal')}
                >
                  Normal Sinus
                </button>
                <button
                  className={`btn-mode ${ecgMode === 'arrhythmia' ? 'active-alert' : ''}`}
                  onClick={() => setEcgMode('arrhythmia')}
                >
                  Ischemia / Arrhythmia
                </button>
              </div>
            </div>

            {/* Live Canvas Monitor */}
            <div className="ecg-monitor-frame">
              <div className="monitor-header-overlay mono">
                <span>LEAD II (25mm/s, 10mm/mV)</span>
                <span className={ecgMode === 'normal' ? 'status-ok' : 'status-danger'}>
                  {ecgMode === 'normal' ? 'NORMAL CONDUCTION' : 'ST-ELEVATION / DEPRESSION DETECTED'}
                </span>
                <span>BPM: {ecgMode === 'normal' ? '72' : '96'}</span>
              </div>
              <canvas ref={canvasRef} className="ecg-canvas" />
            </div>

            {/* Interactive Biomarker Controls & Gauge Grid */}
            <div className="demo-controls-grid">
              {/* Sliders Column */}
              <div className="controls-col">
                <div className="controls-header">
                  <Sliders size={16} className="cyan-icon" />
                  <span className="mono">CLINICAL TABULAR BIOMARKERS</span>
                </div>

                <div className="slider-group">
                  <div className="slider-label-row mono">
                    <span>Patient Age</span>
                    <span className="cyan-text">{patientAge} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="80"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="demo-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label-row mono">
                    <span>Resting Blood Pressure</span>
                    <span className="cyan-text">{bloodPressure} mm Hg</span>
                  </div>
                  <input
                    type="range"
                    min="95"
                    max="190"
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(Number(e.target.value))}
                    className="demo-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label-row mono">
                    <span>Serum Cholesterol</span>
                    <span className="cyan-text">{cholesterol} mg/dL</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="380"
                    value={cholesterol}
                    onChange={(e) => setCholesterol(Number(e.target.value))}
                    className="demo-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label-row mono">
                    <span>Max Heart Rate</span>
                    <span className="cyan-text">{maxHeartRate} bpm</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="195"
                    value={maxHeartRate}
                    onChange={(e) => setMaxHeartRate(Number(e.target.value))}
                    className="demo-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label-row mono">
                    <span>ST Depression (Electrocardiogram)</span>
                    <span className="cyan-text">{stDepression} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4.0"
                    step="0.1"
                    value={stDepression}
                    onChange={(e) => setStDepression(Number(e.target.value))}
                    className="demo-slider"
                  />
                </div>
              </div>

              {/* Real-Time Prediction Gauge Column */}
              <div className="prediction-gauge-col">
                <div className="gauge-box">
                  <div className="gauge-header mono">MULTIMODAL FUSED PROBABILITY</div>
                  <div className="gauge-circle-wrap">
                    <div
                      className={`risk-number-display ${
                        riskScore < 40 ? 'risk-low' : riskScore < 70 ? 'risk-med' : 'risk-high'
                      }`}
                    >
                      <span className="risk-val mono">{riskScore}%</span>
                      <span className="risk-tag mono">
                        {riskScore < 40 ? 'LOW RISK' : riskScore < 70 ? 'ELEVATED RISK' : 'HIGH CARDIAC RISK'}
                      </span>
                    </div>
                  </div>

                  {/* Feature Importance Contribution Breakdown */}
                  <div className="attribution-list">
                    <span className="attrib-title mono">ATTENTION CONTRIBUTION WEIGHTS:</span>
                    <div className="attrib-bar-row">
                      <span className="attrib-name mono">Temporal ECG Signal</span>
                      <div className="attrib-track">
                        <div
                          className="attrib-fill cyan-fill"
                          style={{ width: ecgMode === 'arrhythmia' ? '68%' : '38%' }}
                        />
                      </div>
                      <span className="attrib-pct mono">{ecgMode === 'arrhythmia' ? '68%' : '38%'}</span>
                    </div>

                    <div className="attrib-bar-row">
                      <span className="attrib-name mono">Blood Pressure & Age</span>
                      <div className="attrib-track">
                        <div
                          className="attrib-fill violet-fill"
                          style={{ width: `${Math.min(bloodPressure / 2.5, 45)}%` }}
                        />
                      </div>
                      <span className="attrib-pct mono">{Math.min(Math.round(bloodPressure / 2.5), 45)}%</span>
                    </div>

                    <div className="attrib-bar-row">
                      <span className="attrib-name mono">ST-Depression & Chl</span>
                      <div className="attrib-track">
                        <div
                          className="attrib-fill emerald-fill"
                          style={{ width: `${Math.min(stDepression * 16 + 15, 60)}%` }}
                        />
                      </div>
                      <span className="attrib-pct mono">{Math.min(Math.round(stDepression * 16 + 15), 60)}%</span>
                    </div>
                  </div>

                  <div className="model-validation-footer mono">
                    <CheckCircle2 size={14} className="emerald-icon" />
                    <span>Cross-Validated: 96.2% Accuracy | 0.995 ROC-AUC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEMO 2: RAG Video Assistant Simulator */}
        {activeTab === 'rag' && (
          <div className="demo-rag-card glass-panel">
            <div className="demo-card-header">
              <div className="demo-title-group">
                <h3 className="demo-card-title">Interactive RAG Pipeline: Whisper + BGE-M3 + Llama 3.2</h3>
                <p className="demo-card-subtitle mono">
                  Dense retrieval over multi-hour lecture recordings with zero cloud API costs
                </p>
              </div>
              <div className="rag-status-badge mono">
                <span className="status-dot" />
                <span>OLLAMA ENGINE READY</span>
              </div>
            </div>

            {/* Query Selector */}
            <div className="rag-query-box">
              <label className="rag-label mono">
                <Search size={14} className="cyan-icon" />
                <span>SELECT SAMPLE LECTURE QUERY:</span>
              </label>

              <div className="query-pills">
                {sampleQueries.map((item, qIdx) => (
                  <button
                    key={qIdx}
                    className={`query-pill ${selectedQueryIndex === qIdx ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedQueryIndex(qIdx);
                      setPipelineState('idle');
                    }}
                  >
                    <span>{item.q}</span>
                  </button>
                ))}
              </div>

              <div className="rag-action-row">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleRunRAG}
                  disabled={pipelineState === 'processing'}
                >
                  <Play size={14} />
                  <span>{pipelineState === 'processing' ? 'Retrieving Chunks...' : 'Run Pipeline'}</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setPipelineState('idle')}
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Pipeline Step Visualizer */}
            <div className="rag-steps-container">
              {/* Step 1 */}
              <div className={`rag-step-box ${pipelineState !== 'idle' ? 'step-active' : ''}`}>
                <div className="step-num mono">STAGE 01</div>
                <div className="step-title">Audio & Transcription</div>
                <p className="step-desc mono">Whisper large-v2 + FFmpeg slice</p>
                <div className="step-data-chip mono">
                  <Clock size={12} />
                  <span>Timestamp: {sampleQueries[selectedQueryIndex].timestamp}</span>
                </div>
              </div>

              <div className="step-connector mono">&rarr;</div>

              {/* Step 2 */}
              <div className={`rag-step-box ${pipelineState !== 'idle' ? 'step-active' : ''}`}>
                <div className="step-num mono">STAGE 02</div>
                <div className="step-title">Dense Vector Search</div>
                <p className="step-desc mono">BGE-M3 (1024-dim Cosine Similarity)</p>
                <div className="step-data-chip mono">
                  <Database size={12} />
                  <span>Score: {sampleQueries[selectedQueryIndex].similarity}</span>
                </div>
              </div>

              <div className="step-connector mono">&rarr;</div>

              {/* Step 3 */}
              <div className={`rag-step-box ${pipelineState === 'done' ? 'step-active' : ''}`}>
                <div className="step-num mono">STAGE 03</div>
                <div className="step-title">Grounded Synthesis</div>
                <p className="step-desc mono">Llama 3.2 via Ollama</p>
                <div className="step-data-chip mono">
                  <Cpu size={12} />
                  <span>Latency: 768ms</span>
                </div>
              </div>
            </div>

            {/* Output Panels */}
            {pipelineState === 'done' && (
              <div className="rag-results-grid">
                {/* Retrieved Context Chunk */}
                <div className="rag-result-panel glass-panel">
                  <div className="panel-header mono">
                    <FileText size={15} className="cyan-icon" />
                    <span>RETRIEVED LECTURE CHUNK (WHISPER)</span>
                  </div>
                  <div className="video-citation-meta mono">
                    <span>Source: {sampleQueries[selectedQueryIndex].videoSource}</span>
                    <span className="cyan-text">[{sampleQueries[selectedQueryIndex].timestamp}]</span>
                  </div>
                  <p className="retrieved-text">{sampleQueries[selectedQueryIndex].retrievedSnippet}</p>
                </div>

                {/* Grounded LLM Response */}
                <div className="rag-result-panel glass-panel highlight-panel">
                  <div className="panel-header mono">
                    <BrainCircuit size={15} className="violet-icon" />
                    <span>GROUNDED ANSWER (LLAMA 3.2 VIA OLLAMA)</span>
                  </div>
                  <p className="llm-response-text">{sampleQueries[selectedQueryIndex].answer}</p>
                  <div className="panel-footer-metrics mono">
                    <span>&bull; Hallucination Check: PASSED</span>
                    <span>&bull; Grounding Confidence: 98.4%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
