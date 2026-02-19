import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  FiActivity,
  FiArrowRight,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiZap,
} from 'react-icons/fi';
import './App.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Current', href: '#current-project' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const quickStats = [
  { label: 'GPA', value: '3.84 / 4.00' },
  { label: 'Graduation', value: 'May 2027' },
  { label: 'Core Focus', value: 'Embedded, FPGA, PCB Design' },
  { label: 'Current Teams', value: 'Eco Illini, Illini EV' },
];

const heroRoles = ['FPGA edge-detection pipeline', 'Embedded sensing boards', 'PCB power systems', 'Hardware validation flows'];

const aboutCards = [
  {
    title: 'Design Style',
    text: 'I prefer modular architectures and clear signal boundaries so systems stay debuggable as complexity grows.',
  },
  {
    title: 'Validation Style',
    text: 'I use simulation plus instrument-driven bench checks to confirm behavior, not assumptions.',
  },
];

const courseworkTape = [
  'Digital Logic Design',
  'FPGA Laboratory',
  'Computer Systems',
  'Electronic Circuits',
  'Analog Signal Processing',
  'Digital Signal Processing',
  'Applied Parallel Programming',
  'Data Structures',
];

const currentProject = {
  title: 'FPGA Edge Detection Pipeline',
  summary:
    'Real-time edge extraction accelerator for camera-to-display streaming, optimized for deterministic timing and stable edge quality.',
  phases: [
    { stage: 'Capture Input', focus: 'OV7670 camera timing and pixel ingest synchronization.' },
    { stage: 'Filter Core', focus: 'Sliding-window convolution for Sobel-style edge response.' },
    { stage: 'Threshold Tuning', focus: 'Dynamic threshold controls for stable contour extraction.' },
    { stage: 'Display Output', focus: 'VGA path integration with low-latency pipeline output.' },
  ],
  stats: [
    { label: 'Pipeline Stages', value: '4 Main Blocks' },
    { label: 'Current Status', value: 'Implementation + Tuning' },
    { label: 'Target', value: 'Real-Time Demo' },
  ],
  tech: ['SystemVerilog', 'FPGA', 'OV7670', 'VGA', 'BRAM'],
  github: 'https://github.com/',
};

const featuredProjects = [
  {
    title: 'Pipelined RISC-V CPU Core',
    stack: ['SystemVerilog', 'RTL Design', 'Vivado', 'FPGA'],
    summary:
      'Built a 5-stage RV32I CPU with forwarding, hazard handling, and branch flush logic to achieve steady 1 CPI operation.',
    impact: 'Measured 3.8x throughput gain over a single-cycle baseline.',
    highlights: [
      'Implemented modular pipeline registers with precise control propagation.',
      'Validated stalls and forwarding across 100+ directed/random tests.',
      'Closed timing and verified utilization on the RealDigital Blackboard board.',
    ],
    media: { kind: 'Logic Capture', label: 'Pipeline Stage Activity', metric: 'Forwarding + hazard control verified.', tone: 'cpu' },
    link: { label: 'GitHub', href: 'https://github.com/', kind: 'github' },
  },
  {
    title: 'Hardware-Accelerated Computer Vision Pipeline',
    stack: ['SystemVerilog', 'FPGA', 'OV7670', 'VGA'],
    summary:
      'Designed a real-time FPGA pipeline that captures live camera frames, finds brightest regions, and overlays coordinates to VGA output.',
    impact: 'Cut compute load by 99% via 640x480 to 32x32 streaming downsample architecture.',
    highlights: [
      'Implemented BRAM-backed peak detection for low-latency coordinate extraction.',
      'Built stable cross-clock synchronization between camera PCLK and VGA domains.',
      'Optimized datapath and memory flow for deterministic real-time performance.',
    ],
    media: { kind: 'Video Feed', label: 'OV7670 to VGA Overlay', metric: 'Real-time tracking with stable synchronization.', tone: 'vision' },
    link: { label: 'GitHub', href: 'https://github.com/', kind: 'github' },
  },
  {
    title: 'FPGA Edge Detection Pipeline',
    stack: ['SystemVerilog', 'FPGA', 'Streaming Architecture', 'Image Processing'],
    summary:
      'Current project implementing hardware-first edge extraction with low-latency pixel streaming and threshold control.',
    impact: 'Targeting deterministic edge maps at real-time frame rates without external frame memory.',
    highlights: [
      'Designing convolution window logic for fast edge response.',
      'Tuning thresholds to reduce noise while preserving contours.',
      'Integrating with camera/VGA path for full hardware pipeline demonstration.',
    ],
    media: { kind: 'Current Build', label: 'Edge Stream Analyzer', metric: 'Live threshold tuning and edge quality checks.', tone: 'edge' },
    link: { label: 'GitHub', href: 'https://github.com/', kind: 'github' },
  },
  {
    title: 'Hardware Guitar Auto-Tuner',
    stack: ['Analog Design', 'Op-Amps', 'RLC Filters', 'Motor Control'],
    summary:
      'Created a fully analog auto-tuning system using frequency-selective circuits, peak detection, and mechanical actuation.',
    impact: 'Reached tuning accuracy within 2 Hz with >40 dB noise attenuation.',
    highlights: [
      'Designed high-Q filter targets around 630 Hz, 660 Hz, and 690 Hz.',
      'Integrated comparator and peak-detector logic with H-bridge motor drive.',
      'Achieved peg rotation precision within 3 degrees during bench validation.',
    ],
    media: { kind: 'Waveform Scope', label: 'Analog Frequency Window', metric: 'Stable low-noise string correction loop.', tone: 'analog' },
    link: { label: 'Journal', href: 'https://drive.google.com/', kind: 'journal' },
  },
];

const experience = [
  {
    role: 'Battery Management System - Eco Illini',
    period: 'Aug 2025 - Present',
    location: 'Champaign, IL',
    impact: 'Reduced prototype cycles by 30% while improving measurement reliability.',
    metrics: [
      { label: 'Prototype Cycle', value: '-30%' },
      { label: 'Rail Ripple', value: '<50 mV' },
      { label: 'Sensing Error', value: '<1%' },
    ],
    tags: ['KiCad', 'INA228', 'STM32', 'CAN', 'SPI', 'I2C'],
    points: [
      'Led PDU and Joule Meter PCB design tracks in KiCad, reducing prototype iteration cycles by 30%.',
      'Designed buck converters and LDO regulators for clean 12 V and 3.3 V rails with <50 mV ripple.',
      'Built and validated INA228 + STM32 sensing circuits with <1% error using LTSpice and oscilloscope testing.',
      'Integrated CAN, SPI, and I2C interfaces with powertrain and telemetry teams for reliable system data.',
    ],
  },
  {
    role: 'Motor Encoder Team - Illini EV Concept',
    period: 'Aug 2024 - Present',
    location: 'Champaign, IL',
    impact: 'Improved feedback fidelity and cut validation turnaround by 40%.',
    metrics: [
      { label: 'Feedback Accuracy', value: '+15%' },
      { label: 'Validation Time', value: '-40%' },
      { label: 'Bugs Resolved', value: '5+' },
    ],
    tags: ['KiCad', 'LTSpice', 'Oscilloscope', 'Logic Analyzer', 'Drivetrain Integration'],
    points: [
      'Spearheaded encoder PCB design and simulation in KiCad + LTSpice for 15% better speed feedback accuracy.',
      'Drove bring-up with oscilloscopes, logic analyzers, and differential probes to resolve 5+ hardware bugs.',
      'Reduced validation time by 40% through structured test plans and bench-debug workflows.',
      'Coordinated drivetrain, power, and controls integration for stable motor communication.',
    ],
  },
];

const skillGroups = [
  {
    title: 'Languages',
    summary: 'Low-level and high-level toolchain for embedded and RTL flows.',
    proficiency: 88,
    items: ['Python', 'C++', 'C', 'Verilog', 'SystemVerilog', 'RISC-V', 'MATLAB', 'Assembly'],
  },
  {
    title: 'Hardware + Embedded',
    summary: 'Hands-on design, bring-up, instrumentation, and communication protocols.',
    proficiency: 94,
    items: [
      'FPGA',
      'LTSpice',
      'KiCad',
      'Altium Designer',
      'STM32CubeIDE',
      'Logic Analyzer',
      'Oscilloscope',
      'Waveform Generator',
      'UART / SPI / I2C / CAN',
    ],
  },
  {
    title: 'Software + Simulation',
    summary: 'Simulation-first verification stack and collaborative development tooling.',
    proficiency: 84,
    items: ['Vivado', 'ModelSim', 'Quartus Prime', 'EDA Playground', 'EPWave', 'Git', 'Linux CLI', 'LabVIEW'],
  },
];

const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatingNodes = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${(index * 7 + 13) % 100}%`,
  top: `${(index * 11 + 19) % 100}%`,
  delay: (index % 6) * 0.6,
  duration: 3.8 + (index % 5) * 0.8,
}));

const previewBars = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  delay: `${index * 0.05}s`,
  height: `${24 + ((index * 9) % 64)}%`,
}));

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}

function ProjectPreview({ media }) {
  return (
    <div className={`project-preview tone-${media.tone}`}>
      <div className="preview-meta">
        <span>{media.kind}</span>
        <span>{media.label}</span>
      </div>
      <div className="preview-screen" aria-hidden="true">
        <div className="preview-grid-overlay" />
        <div className="preview-sweep" />
        <div className="preview-bars">
          {previewBars.map((bar) => (
            <span key={`${media.tone}-${bar.id}`} style={{ '--bar-delay': bar.delay, '--bar-height': bar.height }} />
          ))}
        </div>
        <div className="preview-target">
          <span />
        </div>
      </div>
      <p>{media.metric}</p>
    </div>
  );
}

function App() {
  const [activeRole, setActiveRole] = useState(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.3 });
  const scannerY = useTransform(smoothProgress, [0, 1], ['-12vh', '112vh']);
  const heroBeamY = useTransform(smoothProgress, [0, 1], [-28, 130]);

  useEffect(() => {
    const updateCursor = (event) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', updateCursor);
    return () => window.removeEventListener('pointermove', updateCursor);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveRole((current) => (current + 1) % heroRoles.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="portfolio-shell">
      <div className="scroll-lane" aria-hidden="true" />
      <motion.div className="scroll-scanner" style={{ y: scannerY }} aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />
      {floatingNodes.map((node) => (
        <span
          key={node.id}
          className="floating-node"
          style={{
            left: node.left,
            top: node.top,
            animationDelay: `${node.delay}s`,
            animationDuration: `${node.duration}s`,
          }}
          aria-hidden="true"
        />
      ))}

      <header className="top-nav">
        <a className="brand" href="#home">
          <span className="brand-dot" aria-hidden="true" />
          Jashwanth Bamidi
        </a>
        <nav>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <motion.div className="hero-beam" style={{ y: heroBeamY }} aria-hidden="true" />
          <motion.div className="hero-copy" initial="hidden" animate="show" variants={containerVariant}>
            <motion.p variants={itemVariant} className="eyebrow">
              Electrical Engineering @ UIUC
            </motion.p>
            <motion.h1 variants={itemVariant}>
              Building robust hardware systems from architecture to validated prototypes.
            </motion.h1>
            <motion.p variants={itemVariant} className="hero-summary">
              I design embedded and FPGA systems that balance clean architecture, real-world validation, and measurable
              performance gains.
            </motion.p>

            <motion.div variants={itemVariant} className="hero-rotator" aria-live="polite">
              <span>Now building:</span>
              <AnimatePresence mode="wait">
                <motion.strong
                  key={heroRoles[activeRole]}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  {heroRoles[activeRole]}
                </motion.strong>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariant} className="hero-build-track" aria-hidden="true">
              <span className="track-label">Build Loop</span>
              <div className="pulse-rail">
                <span className="rail-node" />
                <span className="rail-node" />
                <span className="rail-node" />
                <span className="rail-node" />
                <span className="pulse-dot" />
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="hero-actions">
              <a className="button button-primary" href="#projects">
                View Projects <FiArrowRight />
              </a>
              <a className="button button-secondary" href="./Jashwanth_Bamidi_Resume.pdf" target="_blank" rel="noreferrer">
                Resume <FiDownload />
              </a>
            </motion.div>
            <motion.div variants={itemVariant} className="hero-meta">
              <span>
                <FiMapPin /> Los Angeles, CA
              </span>
              <span>
                <FiMail /> jassubamidi24@gmail.com
              </span>
            </motion.div>
          </motion.div>

          <motion.aside
            className="hero-panel"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <div className="reactor" aria-hidden="true">
              <motion.div
                className="reactor-ring ring-a"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="reactor-ring ring-b"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="reactor-core"
                animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <p className="panel-title">Signal Snapshot</p>
            <div className="scanline" aria-hidden="true" />
            {quickStats.map((stat) => (
              <motion.div key={stat.label} className="stat-row" whileHover={{ x: 4 }}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </motion.div>
            ))}
            <div className="status-pill">SYSTEM READY</div>
          </motion.aside>
        </section>

        <motion.section
          id="about"
          className="section about-section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariant}
        >
          <SectionHeading
            eyebrow="About"
            title="Engineer focused on execution, validation, and system-level thinking"
            description="From PCB design to timing closure, I build with measurable outcomes and verification-first workflows."
          />

          <div className="about-layout">
            <motion.article className="about-main-card" variants={itemVariant} whileHover={{ y: -8, scale: 1.01 }}>
              <p className="about-kicker">How I work</p>
              <h3>Design. Simulate. Validate. Iterate.</h3>
              <p>
                I like end-to-end ownership from architecture to bench results. My goal is always the same: build systems
                that are easy to reason about and reliable under real constraints.
              </p>
              <div className="about-pillars">
                <div className="pillar">
                  <span>Architecture</span>
                  <p>Modular blocks with clear interfaces and predictable timing.</p>
                </div>
                <div className="pillar">
                  <span>Debugging</span>
                  <p>Fast issue isolation with waveform analysis and targeted test vectors.</p>
                </div>
                <div className="pillar">
                  <span>Verification</span>
                  <p>Simulation plus instrumented bench checks before integration.</p>
                </div>
              </div>
            </motion.article>

            <div className="about-side-grid">
              {aboutCards.map((card) => (
                <motion.article key={card.title} className="about-side-card" variants={itemVariant} whileHover={{ y: -8, scale: 1.01 }}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <motion.div className="about-marquee" variants={itemVariant}>
            <div className="about-marquee-track">
              {[...courseworkTape, ...courseworkTape].map((topic, index) => (
                <span key={`${topic}-${index}`}>{topic}</span>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="current-project"
          className="section"
          initial={{ opacity: 0, y: 38, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading eyebrow="Current Project" title={currentProject.title} description={currentProject.summary} />

          <motion.article className="current-project-console" whileHover={{ y: -8, scale: 1.01 }}>
            <div className="console-head">
              <div>
                <p className="console-kicker">
                  <FiActivity /> Live Development Track
                </p>
                <h3>{currentProject.title}</h3>
                <p>
                  Moving from signal pipeline design to full-camera integration with threshold tuning and output quality
                  verification.
                </p>
              </div>
              <a className="project-cta" href={currentProject.github} target="_blank" rel="noreferrer">
                <FiGithub /> GitHub
              </a>
            </div>

            <div className="console-body">
              <div className="pipeline-track">
                {currentProject.phases.map((phase, index) => (
                  <motion.div
                    key={phase.stage}
                    className="phase-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                  >
                    <span className="phase-index">0{index + 1}</span>
                    <h4>{phase.stage}</h4>
                    <p>{phase.focus}</p>
                  </motion.div>
                ))}
              </div>

              <div className="console-aside">
                <div className="mini-stats">
                  {currentProject.stats.map((stat) => (
                    <div key={stat.label} className="mini-stat">
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  ))}
                </div>
                <div className="chip-row">
                  {currentProject.tech.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </motion.section>

        <motion.section
          id="projects"
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={containerVariant}
        >
          <SectionHeading
            eyebrow="Projects"
            title="Featured builds"
            description="Equal-sized project cards with richer previews, cleaner interactions, and direct artifact links."
          />
          <div className="projects-board">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                className="project-card"
                variants={itemVariant}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              >
                <div className="project-corner" aria-hidden="true" />
                <ProjectPreview media={project.media} />
                <span className="project-index">0{index + 1}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <p className="impact">{project.impact}</p>
                <div className="chip-row">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <ul>
                  {project.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="project-links">
                  <a className="project-cta" href={project.link.href} target="_blank" rel="noreferrer">
                    {project.link.kind === 'github' ? <FiGithub /> : <FiExternalLink />} {project.link.label}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="section experience-section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariant}
        >
          <SectionHeading
            eyebrow="Experience"
            title="Engineering teams and applied hardware development"
            description="Hands-on roles where system integration, measurement fidelity, and debugging rigor were central."
          />
          <div className="experience-grid">
            {experience.map((entry) => (
              <motion.article key={entry.role} className="exp-card" variants={itemVariant} whileHover={{ y: -8, scale: 1.01 }}>
                <div className="exp-head">
                  <div>
                    <h3>{entry.role}</h3>
                    <p className="timeline-meta">
                      <span>{entry.period}</span>
                      <span>{entry.location}</span>
                    </p>
                  </div>
                  <span className="exp-badge">
                    <FiActivity /> Active Impact
                  </span>
                </div>
                <p className="exp-impact">{entry.impact}</p>
                <div className="exp-metrics">
                  {entry.metrics.map((metric) => (
                    <div key={metric.label} className="exp-metric-chip">
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>
                <ul className="exp-points">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="chip-row exp-tags">
                  {entry.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariant}
        >
          <SectionHeading
            eyebrow="Skills"
            title="Technical stack"
            description="Tools and technologies I use to move from concept to validated implementation."
          />
          <div className="skills-showcase">
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <motion.article
                  key={group.title}
                  className="skills-card skills-card--enhanced"
                  variants={itemVariant}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <div className="skills-top">
                    <h3>{group.title}</h3>
                    <span className="skills-level">
                      <FiZap /> {group.proficiency}%
                    </span>
                  </div>
                  <p className="skills-summary">{group.summary}</p>
                  <div className="skill-meter" aria-hidden="true">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${group.proficiency}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div className="chip-row">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
            <motion.aside className="skills-constellation" variants={itemVariant} whileHover={{ y: -6, scale: 1.01 }}>
              <p>Capability Constellation</p>
              <div className="constellation-grid" aria-hidden="true">
                {Array.from({ length: 20 }, (_, index) => (
                  <span key={`node-${index}`} style={{ '--node-delay': `${(index % 6) * 0.4}s` }} />
                ))}
              </div>
              <ul>
                <li>Hardware architecture + bring-up</li>
                <li>RTL design + verification</li>
                <li>Bench validation + debugging</li>
                <li>Tool-driven implementation loops</li>
              </ul>
            </motion.aside>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="section contact-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            eyebrow="Contact"
            title="Let us build something that ships"
            description="Open to internships, hardware roles, and collaborative engineering projects."
          />
          <div className="contact-card">
            <a href="mailto:jassubamidi24@gmail.com">
              <FiMail /> jassubamidi24@gmail.com
            </a>
            <a href="tel:+18052684693">
              <FiPhone /> +1 (805) 268-4693
            </a>
            <a href="https://www.linkedin.com/in/jashwanthbamidi" target="_blank" rel="noreferrer">
              <FiLinkedin /> LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FiGithub /> GitHub
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;
