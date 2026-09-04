import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['C++ (17/20)', 'Rust', 'C#', 'Python', 'Go', 'SQL', 'TypeScript / JS']
  },
  {
    title: 'Systems & Engine Runtimes',
    skills: [
      'CUDA (C++ GPU Acceleration)',
      'Distributed Systems & Consensus',
      'Unity Runtime API',
      'Harmony IL Bytecode Patching',
      'Reflection & Metadata',
      'Multithreading & Concurrency',
      'Win32 API & IPC',
      'ONNX C++ API',
      'WebAssembly (WASM)'
    ]
  },
  {
    title: 'Core Competencies',
    skills: [
      'Memory Management',
      'Low-Latency Optimization',
      'Data Structures & Algorithms',
      'Compilers & Stack Bytecode VMs',
      'Distributed Leases & Job Semantics',
      'Deterministic Snapshot Engines'
    ]
  },
  {
    title: 'Tools, Testing & DevOps',
    skills: [
      'Regression Testing & Unit Tests',
      'AddressSanitizer (ASan) & UBSan',
      'PostgreSQL (ACID & SKIP LOCKED)',
      'MinIO / S3 Object Storage',
      'Git & GitHub Actions (CI/CD)',
      'Docker',
      'CMake & Ninja',
      'egui / eframe (Rust GUI)',
      'React & Vite',
      'Perfetto / Chrome Tracing'
    ]
  }
];

const timelineEvents = [
  {
    role: 'M.S. in Computer Science (GPA: 3.5)',
    company: 'California State University, Chico (CSU Chico)',
    period: 'Expected Dec 2027',
    description:
      'Graduate focus on Systems Programming, Distributed Systems, Compilers, Virtual Machines, Algorithms & Data Structures, Software Engineering, Object-Oriented Design, and Computer Graphics.'
  },
  {
    role: 'AI Trainer – Coding & Software Engineering Domain',
    company: 'Handshake AI Fellowship',
    period: 'June 2026 – Present (Remote)',
    description:
      'Conducted comparative evaluations on multi-turn coding benchmarks for frontier LLMs, assessing logical correctness, edge cases, and code efficiency; promoted to Reviewer.'
  },
  {
    role: 'Programming Specialist & General AI Trainer (Contract)',
    company: 'DataAnnotation',
    period: 'June 2024 – June 2026 (Remote)',
    description:
      'Evaluated, audited, and debugged AI-generated code across Python, C++, and Java to improve model accuracy, logical safety, and edge-case handling.'
  },
  {
    role: 'B.S. in Computer Science (GPA: 3.84)',
    company: 'Southern New Hampshire University (SNHU)',
    period: 'Dec 2024',
    description:
      'Graduated with honors. Rigorous foundations in software design, computer architecture, data structures, algorithms, and distributed computing.'
  }
];

export const AboutPage: React.FC = () => {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About Me</h1>
        <div className={styles.subtitle}>M.S. Computer Science Student @ CSU Chico</div>
      </header>

      <div className={styles.bioSection}>
        <p>
          Hi! I am <strong>Juan F. Sanchez</strong>, a Computer Science Master's student at California State University, Chico.
        </p>
        <p>
          My focus is in <strong>systems programming, distributed compute, compilers, GPU acceleration, and interactive tools</strong> in C++20, Go, and Rust.
        </p>
        <p>
          I have built durable distributed GPU compute engines (<Link to="/project/anvilmesh" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>AnvilMesh</Link>), custom programming language virtual machines (<Link to="/project/framestepp" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>FrameStep++</Link>), wait-free shared-memory tracing systems (<Link to="/project/traceforge" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>TraceForge</Link>), interactive 150-algorithm visualizer suites (<Link to="/project/algobuddy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>AlgoBuddy</Link>), and runtime game engine modding plugins.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Technical Skills</h2>
        <div className={styles.skillsGrid}>
          {skillCategories.map((cat, index) => (
            <div key={index} className={styles.skillCategoryCard}>
              <h3 className={styles.categoryName}>{cat.title}</h3>
              <div className={styles.skillBadges}>
                {cat.skills.map((skill) => (
                  <span key={skill} className={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education & Experience</h2>
        <div className={styles.timeline}>
          {timelineEvents.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <h3 className={styles.roleTitle}>{item.role}</h3>
              <div className={styles.companyRow}>
                <span>{item.company}</span>
                <span>•</span>
                <span>{item.period}</span>
              </div>
              <p className={styles.experienceDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.ctaRow}>
        <a
          href="https://github.com/Rowrow620"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeBtn}
        >
          GitHub Profile ↗
        </a>
        <a
          href="https://www.linkedin.com/in/juan-sanchez-b7b276348/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactBtn}
        >
          LinkedIn Profile ↗
        </a>
        <Link to="/contact" className={styles.contactBtn}>
          Get In Touch →
        </Link>
      </div>
    </article>
  );
};
