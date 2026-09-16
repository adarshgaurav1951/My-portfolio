import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, ListFlowable, ListItem
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Single page enforcement or metadata canvas"""
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        # We want a pristine 1-page resume without distracting page footer numbers,
        # but if it ever exceeds 1 page, print subtle indicator
        if page_count > 1:
            self.setFont("Helvetica", 8)
            self.setFillColor(HexColor("#64748b"))
            self.drawRightString(letter[0] - 0.5 * inch, 0.25 * inch, f"Page {self._pageNumber} of {page_count}")

def build_pdf(filename="Adarsh_Gaurav_Data_Scientist_Resume.pdf"):
    # Target 1-page pristine layout
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=0.35 * inch,
        rightMargin=0.35 * inch,
        topMargin=0.28 * inch,
        bottomMargin=0.28 * inch,
        title="Adarsh Gaurav - Data Scientist Resume",
        author="Adarsh Gaurav",
        subject="Data Science / Machine Learning Resume",
        keywords="Data Science, Machine Learning, Deep Learning, Python, SQL, PyTorch, Scikit-learn, RAG, NLP, Predictive Modeling, XGBoost, Statistics"
    )

    content_width = letter[0] - 0.70 * inch

    # Color Palette - Professional ATS-compliant slate & navy
    c_primary = HexColor("#0f172a")     # Very dark slate
    c_secondary = HexColor("#0369a1")   # Deep professional blue for links/accents
    c_text = HexColor("#1e293b")        # Dark slate body text
    c_subtext = HexColor("#334155")     # Slate for dates/subtitles
    c_line = HexColor("#cbd5e1")        # Clean separator line

    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16.5,
        leading=18.5,
        alignment=TA_CENTER,
        textColor=c_primary,
        spaceAfter=1
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.2,
        alignment=TA_CENTER,
        textColor=c_subtext,
        spaceAfter=2
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.9,
        leading=10.8,
        textColor=c_primary,
        spaceBefore=0,
        spaceAfter=0.5,
        textTransform='uppercase'
    )

    summary_style = ParagraphStyle(
        'SummaryStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.1,
        alignment=TA_JUSTIFY,
        textColor=c_text
    )

    role_style = ParagraphStyle(
        'RoleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.6,
        leading=10.5,
        textColor=c_primary
    )

    company_style = ParagraphStyle(
        'CompanyStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.3,
        leading=10.5,
        textColor=c_subtext
    )

    date_style = ParagraphStyle(
        'DateStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.0,
        leading=10.5,
        alignment=TA_RIGHT,
        textColor=c_subtext
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.9,
        leading=9.9,
        alignment=TA_JUSTIFY,
        textColor=c_text,
        leftIndent=9,
        firstLineIndent=-9,
        spaceAfter=0.6
    )

    skill_title_style = ParagraphStyle(
        'SkillTitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.0,
        leading=10.0,
        textColor=c_primary
    )

    skill_val_style = ParagraphStyle(
        'SkillValStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.9,
        leading=9.9,
        textColor=c_text
    )

    story = []

    # 1. HEADER
    story.append(Paragraph("ADARSH GAURAV", name_style))
    contact_text = (
        "+91 7033375667 &nbsp;|&nbsp; "
        "<a href='mailto:adarshgaurav1624@gmail.com' color='#0369a1'>adarshgaurav1624@gmail.com</a> &nbsp;|&nbsp; "
        "<a href='https://linkedin.com/in/adarsh-gaurav' color='#0369a1'>linkedin.com/in/adarsh-gaurav</a> &nbsp;|&nbsp; "
        "<a href='https://github.com/adarshgaurav1951' color='#0369a1'>github.com/adarshgaurav1951</a> &nbsp;|&nbsp; "
        "Bilaspur, India"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(HRFlowable(width="100%", thickness=1.0, color=c_primary, spaceBefore=0.5, spaceAfter=3))

    # Helper function for section divider
    def add_section_header(title):
        story.append(Paragraph(title, section_heading))
        story.append(HRFlowable(width="100%", thickness=0.5, color=c_line, spaceBefore=0.5, spaceAfter=2))

    # 2. PROFESSIONAL SUMMARY
    add_section_header("PROFESSIONAL SUMMARY")
    summary_p = (
        "<b>Data Scientist</b> and Computer Science undergraduate specializing in end-to-end Machine Learning pipelines, "
        "predictive modeling, statistical analysis, and Generative AI (RAG). Proficient in Python, SQL, PyTorch, and Scikit-learn, "
        "with proven success designing multimodal deep learning architectures achieving <b>96%+ classification accuracy</b> "
        "and sub-150ms REST API inference. Adept at high-dimensional feature engineering, Bayesian hyperparameter optimization (Optuna), "
        "and converting complex algorithmic outputs into data-driven business decisions."
    )
    story.append(Paragraph(summary_p, summary_style))
    story.append(Spacer(1, 2.5))

    # 3. TECHNICAL SKILLS
    add_section_header("TECHNICAL SKILLS")
    skills_data = [
        [
            Paragraph("Machine Learning & Modeling:", skill_title_style),
            Paragraph("Supervised & Unsupervised Learning, XGBoost, LightGBM, Random Forest, Logistic Regression, SVM, K-Means, Cross-Validation, Hyperparameter Tuning (Optuna, GridSearchCV), Model Evaluation (ROC-AUC, PR-AUC, F1)", skill_val_style)
        ],
        [
            Paragraph("Deep Learning & GenAI:", skill_title_style),
            Paragraph("PyTorch, CNN, BiLSTM, Transformers, Multimodal Data Fusion, Retrieval-Augmented Generation (RAG), Vector Embeddings (BGE-M3), Semantic Search, OpenAI Whisper, Prompt Engineering, Ollama (Llama 3.2)", skill_val_style)
        ],
        [
            Paragraph("Data Analytics & Engineering:", skill_title_style),
            Paragraph("Python, Pandas, NumPy, SQL (PostgreSQL, MySQL), Feature Engineering, Exploratory Data Analysis (EDA), Statistical Hypothesis Testing, Data Imputation, Matplotlib, Seaborn, Time-Series & Signal Processing", skill_val_style)
        ],
        [
            Paragraph("Developer Tools & Deployment:", skill_title_style),
            Paragraph("FastAPI, Git, GitHub, Docker (Basics), Google Cloud Platform (GCP), RESTful APIs, Linux/Bash, VS Code, Google Colab", skill_val_style)
        ]
    ]
    col1_w = 145
    col2_w = content_width - col1_w
    t_skills = Table(skills_data, colWidths=[col1_w, col2_w])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0.3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0.3),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 2.5))

    # 4. WORK EXPERIENCE
    add_section_header("WORK EXPERIENCE")

    # Role 1: CodSoft
    exp1_row = [
        [
            Paragraph("<b>Data Science Intern</b> &nbsp;|&nbsp; <font color='#334155'>CodSoft</font>", role_style),
            Paragraph("June 2025 – July 2025 &nbsp;|&nbsp; Remote", date_style)
        ]
    ]
    t_exp1 = Table(exp1_row, colWidths=[content_width - 150, 150])
    t_exp1.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
    ]))
    story.append(t_exp1)

    exp1_bullets = [
        "Conducted end-to-end <b>Exploratory Data Analysis (EDA)</b> and feature engineering on 100K+ transactional records using <b>Python (Pandas, NumPy)</b>, uncovering key customer behavioral patterns and data distributions.",
        "Built and evaluated predictive classification models (Random Forest, XGBoost, Logistic Regression); resolved target imbalance via <b>SMOTE</b> and achieved an <b>88.4% F1-score</b> (+14.2% over baseline heuristics).",
        "Formulated 20+ predictive indicators and executed 5-fold cross-validation with grid search to optimize model convergence.",
        "Created interactive data visualizations with <b>Seaborn and Matplotlib</b> to communicate feature importances and analytical insights to non-technical stakeholders, driving data-informed business recommendations."
    ]
    for b in exp1_bullets:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))
    story.append(Spacer(1, 1.5))

    # Role 2: CodeAlpha
    exp2_row = [
        [
            Paragraph("<b>Software & Data Engineering Intern</b> &nbsp;|&nbsp; <font color='#334155'>CodeAlpha</font>", role_style),
            Paragraph("Oct 2024 – Nov 2024 &nbsp;|&nbsp; Remote", date_style)
        ]
    ]
    t_exp2 = Table(exp2_row, colWidths=[content_width - 150, 150])
    t_exp2.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
    ]))
    story.append(t_exp2)

    exp2_bullets = [
        "Engineered web applications and data capture interfaces with <b>JavaScript, HTML5, and Tailwind CSS</b>, optimizing responsive UI components and ensuring zero-loss client-side telemetry.",
        "Implemented rigorous client-side input validation and error handling schemas, reducing corrupted data submissions by <b>28%</b>.",
        "Optimized frontend asynchronous data fetching and API state management, reducing dashboard load times by <b>35%</b>."
    ]
    for b in exp2_bullets:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))
    story.append(Spacer(1, 2.5))

    # 5. SELECTED DATA SCIENCE & AI PROJECTS
    add_section_header("SELECTED DATA SCIENCE & AI PROJECTS")

    # Project 1: Multimodal Deep Learning
    p1_row = [
        [
            Paragraph("<b>Multimodal Deep Learning System for Clinical Disease Prediction</b>", role_style),
            Paragraph("<font color='#0369a1'><b>PyTorch, Scikit-learn, FastAPI, PostgreSQL</b></font>", date_style)
        ]
    ]
    t_p1 = Table(p1_row, colWidths=[content_width - 200, 200])
    t_p1.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
    ]))
    story.append(t_p1)

    p1_bullets = [
        "Architected an end-to-end multimodal deep learning pipeline fusing continuous 12-lead ECG time-series signals with structured clinical laboratory records for early cardiovascular disease detection.",
        "Designed a hybrid <b>CNN–BiLSTM–Transformer</b> network with an attention-weighted feature bottleneck to jointly extract spatial waveform features and non-linear tabular interactions, beating unimodal tabular baselines by <b>15.6%</b>.",
        "Achieved <b>96.2% classification accuracy</b> and a <b>0.995 ROC-AUC</b> evaluated across 5-fold stratified cross-validation.",
        "Containerized the inference pipeline behind a high-throughput <b>FastAPI</b> REST service with PostgreSQL persistence, achieving sub-<b>150ms real-time latency</b>."
    ]
    for b in p1_bullets:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))
    story.append(Spacer(1, 1.5))

    # Project 2: Enterprise RAG & Semantic Analytics Engine
    p2_row = [
        [
            Paragraph("<b>Autonomous RAG & Semantic Analytics Engine</b>", role_style),
            Paragraph("<font color='#0369a1'><b>Python, BGE-M3, Llama 3.2, Whisper, Scikit-learn</b></font>", date_style)
        ]
    ]
    t_p2 = Table(p2_row, colWidths=[content_width - 210, 210])
    t_p2.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
    ]))
    story.append(t_p2)

    p2_bullets = [
        "Engineered an automated <b>Retrieval-Augmented Generation (RAG)</b> analytics engine to transcribe, index, and query multi-hour unstructured audio/video lectures and technical corpora without external cloud API dependencies.",
        "Automated speech-to-text pipeline using <b>OpenAI Whisper (large-v2)</b> and FFmpeg audio stream slicing, generating structured, time-stamped text chunks for semantic indexing.",
        "Built a dense vector retrieval index with 1024-dimensional <b>BGE-M3 embeddings</b> and cosine similarity search (Scikit-learn/NumPy), achieving sub-<b>45ms query response times</b>.",
        "Integrated local LLM inference via <b>Ollama (Llama 3.2)</b> with custom hallucination-mitigation prompt templates, ensuring 100% of responses include grounded, exact temporal video citations."
    ]
    for b in p2_bullets:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))
    story.append(Spacer(1, 1.5))

    # Project 3: Customer Churn & LTV Predictive Analytics
    p3_row = [
        [
            Paragraph("<b>Customer Churn & Lifetime Value (LTV) Predictive Pipeline</b>", role_style),
            Paragraph("<font color='#0369a1'><b>Python, XGBoost, LightGBM, SQL, Optuna, SHAP</b></font>", date_style)
        ]
    ]
    t_p3 = Table(p3_row, colWidths=[content_width - 210, 210])
    t_p3.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
    ]))
    story.append(t_p3)

    p3_bullets = [
        "Developed an end-to-end churn prediction pipeline on 250K+ customer profiles, engineering <b>30+ behavioral and Recency-Frequency-Monetary (RFM)</b> features using complex SQL window functions and Pandas.",
        "Trained and tuned <b>XGBoost and LightGBM</b> classifiers; mitigated severe class imbalance via <b>SMOTE-NC</b> and tuned hyperparameters with Bayesian optimization (<b>Optuna</b>), achieving <b>0.91 PR-AUC</b> and <b>86.5% Recall</b>.",
        "Leveraged <b>SHAP (SHapley Additive exPlanations)</b> for global and individual feature attribution, delivering interpretable churn risk factors to business stakeholders to proactively retain high-value accounts."
    ]
    for b in p3_bullets:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))
    story.append(Spacer(1, 2.5))

    # 6. EDUCATION
    add_section_header("EDUCATION")
    edu_row = [
        [
            Paragraph("<b>Guru Ghasidas Vishwavidyalaya (A Central University)</b> &nbsp;|&nbsp; <font color='#334155'>Bilaspur, India</font>", role_style),
            Paragraph("Dec 2022 – May 2026", date_style)
        ]
    ]
    t_edu = Table(edu_row, colWidths=[content_width - 130, 130])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0.5),
    ]))
    story.append(t_edu)

    edu_details = (
        "Bachelor of Technology (B.Tech) in Computer Science and Engineering &nbsp;|&nbsp; <b>CGPA: 7.1 / 10</b><br/>"
        "<font color='#475569'><b>Relevant Coursework:</b> Machine Learning, Probability & Statistics, Data Structures & Algorithms, "
        "Database Management Systems (DBMS), Artificial Intelligence, Operating Systems, OOP in Java/C++</font>"
    )
    story.append(Paragraph(edu_details, ParagraphStyle('EduSub', parent=styles['Normal'], fontName='Helvetica', fontSize=8.0, leading=10.2, textColor=c_text)))
    story.append(Spacer(1, 2.5))

    # 7. CERTIFICATIONS & LEADERSHIP
    add_section_header("CERTIFICATIONS & LEADERSHIP")
    certs_bullets = [
        "<b>Deloitte Data Analytics Job Simulation (Forage):</b> Completed corporate analytics engagement — executed data cleaning, exploratory data analysis (EDA), hypothesis testing, and designed executive data dashboards.",
        "<b>Student Leader, Pregrad:</b> Directed campus tech initiatives and coordinated 15+ student teams across hackathons and software development sprints."
    ]
    for b in certs_bullets:
        story.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    build_pdf()
