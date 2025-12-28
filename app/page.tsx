'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Lock body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    // Close menu on window resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 992 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your interest! We will contact you soon.')
    setFormData({ name: '', email: '', phone: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="main-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span>ASTRAVEDA</span>
          </div>
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {isMenuOpen && (
            <div className="nav-overlay" onClick={closeMenu}></div>
          )}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-links">
              <li><a href="#problem" onClick={closeMenu}>Problem</a></li>
              <li><a href="#solution" onClick={closeMenu}>Solution</a></li>
              <li><a href="#why" onClick={closeMenu}>Why It Matters</a></li>
              <li><a href="#who" onClick={closeMenu}>Who It's For</a></li>
              <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="stars-layer"></div>
          <div className="nebula-layer"></div>
          <div className="planet-layer" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge-top">Seed Round Open · Raising $10M</div>
          <div className="hero-subtitle">Quantum-Ready Ground Infrastructure</div>
          <h1 className="hero-title">
            <span className="title-line-1">ASTRAVEDA</span>
            {/* <span className="title-line-2">VEDA</span> */}
          </h1>
          <p className="hero-description">
            Sovereign by Design<br />
            Building secure, scalable satellite ground networks for governments, defense, and next-generation space operators.
          </p>
          <div className="hero-locations">
            <span>🇮🇳 India</span>
            <span>🇬🇧 UK</span>
            <span>🇪🇺 Europe</span>
            <span>🇦🇪 Middle East</span>
            <span>🇺🇸 Strategic US Interest</span>
          </div>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              <span>Request Investor Access</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span>Partner With Us</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="section problem-section">
        <div className="section-background-image" style={{ backgroundImage: 'url(/img/gasstaton.webp)' }}></div>
        <div className="section-overlay"></div>
        <div className="container">
          <div className="section-header">
            <div className="section-number">01</div>
            <h2 className="section-title">Problem</h2>
            <p className="section-subtitle">
              <strong>The ground segment is the weak link in the quantum era.</strong>
            </p>
          </div>
          <div className="problem-content">
            <p className="problem-intro">
              Quantum risk isn't a distant, hypothetical issue. Adversaries can <strong>capture encrypted satellite traffic today and decrypt it later</strong> ("record now, decrypt later"). Because space links traverse open airspace, years of sensitive operations can be harvested long before quantum decryption becomes routine.
            </p>
            <div className="problem-stakes">
              <h3 className="stakes-title">What's at stake?</h3>
              <ul className="stakes-list">
                <li>
                  <strong>Today's trust foundation breaks.</strong> Once cryptographically relevant quantum computers arrive, RSA/ECC-based security becomes vulnerable—putting TT&C, ranging, software updates, payload tasking, and station-to-station links at risk.
                </li>
                <li>
                  <strong>The ground segment is the primary attack surface.</strong> Most cyber intrusions target ground infrastructure—not spacecraft—and it was not designed for quantum-era adversaries.
                </li>
                <li>
                  <strong>Patching isn't enough.</strong> This requires a structural upgrade, not incremental fixes: a ground architecture designed for post-quantum security from day one.
                </li>
              </ul>
            </div>
          </div>
          <div className="section-footer">
            <p className="highlight-text">
              <strong>Bottom line:</strong> Every civil, commercial, and defense operator will need a quantum-safe ground upgrade. The question is <strong>when</strong>, not <strong>if</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="section solution-section">
        <div className="container">
          <div className="section-header">
            <div className="section-number">02</div>
            <h2 className="section-title">Quantum-secure ground infrastructure—delivered as an assured service.</h2>
            <p className="section-subtitle">
              Astraveda provides a unified <strong>RF + optical</strong> ground architecture secured end-to-end with <strong>post-quantum cryptography</strong>, delivering long-term confidentiality and command integrity—while supporting high-throughput links and QKD-ready operations.
            </p>
          </div>
          
          <div className="solution-layout">
            <div className="solution-left">
              <div className="solution-sticky-content">
                <div className="quantum-notation">
                  <span className="ket-bracket ket-left">⟨</span>
                  <span className="ket-content">4 pillars (integrated, not bolt-on)</span>
                  <span className="ket-bracket ket-right">⟩</span>
                </div>
                <div className="solution-platform-sticky">
                  <h3 className="platform-title-sticky">AstraVeda Platform</h3>
                  <p className="platform-description-sticky">Integrated quantum-secure ground infrastructure</p>
                </div>
              </div>
            </div>
            
            <div className="solution-right">
              <div className="solution-pillars-boxed">
                <div className="solution-box">
                  <div className="box-icon">🔐</div>
                  <h3>PQC across every critical link</h3>
                  <p>Native Post-Quantum Cryptography across TT&C, software updates, mission data transport, and station-to-station traffic—using hybrid transition modes aligned with NIST and NSA CNSA 2.0 guidance (e.g., Dilithium signatures, Kyber key exchange).</p>
                </div>
                <div className="solution-box">
                  <div className="box-icon">📡</div>
                  <h3>Hybrid RF–optical network</h3>
                  <p>RF for robust all-weather operations; optical for secure narrow-beam high throughput when conditions allow—coordinated by an orchestration layer that manages mode selection and handovers.</p>
                </div>
                <div className="solution-box">
                  <div className="box-icon">🔬</div>
                  <h3>Dual-use optical terminals (QKD + lasercom)</h3>
                  <p>Optical ground terminals designed for quantum key reception and multi-Gbps to tens-of-Gbps laser downlinks, including QKD post-processing within the same operational framework.</p>
                </div>
                <div className="solution-box">
                  <div className="box-icon">🤖</div>
                  <h3>Mission Control Software as the trust anchor</h3>
                  <p>Cloud-native MCS that orchestrates RF/optical assets and embeds cryptographic trust: telemetry ingest, command validation/uplink, scheduling, health monitoring, secure automation, and multi-tenant separation.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="section-footer">
            <p className="highlight-text">
              A scalable transition to quantum-safe operations—without forcing a redesign of the space segment.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section id="why" className="section stats-section">
        {/* <div className="section-background-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80)' }}></div>
        <div className="section-overlay"></div> */}
        <div className="container">
          <div className="section-header">
            <div className="section-number">03</div>
            <h2 className="section-title">Why It Matters</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-number">$115B</div>
              <div className="stat-label">global ground segment market</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🛰️</div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">LEO satellites require scalable access</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-number">&lt;10</div>
              <div className="stat-label">years until quantum computing threatens encryption</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🛡️</div>
              <div className="stat-number">100%</div>
              <div className="stat-label">data sovereignty is a national security requirement</div>
            </div>
          </div>
          <div className="section-footer">
            <p className="highlight-text">
              No incumbent solves all four. AstraVeda does.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-number">04</div>
            <h2 className="section-title">What We Do</h2>
          </div>
          <div className="features-showcase">
            <div className="feature-item">
              <div className="feature-image">
                <img
                  src="/img/gasstaton.webp"
                  alt="Ground Stations"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: 'block' }}
                />
              </div>
              <div className="feature-content">
                <h3>Ground Stations (GSaaS)</h3>
                <p>Pay-per-use RF and optical ground access, globally distributed and sovereign-deployable.</p>
              </div>
            </div>
            <div className="feature-item reverse">
              <div className="feature-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80)' }}></div>
              <div className="feature-content">
                <h3>Mission Control Software</h3>
                <p>AI-driven scheduling, automated TT&C, anomaly detection, API-first integration.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80)' }}></div>
              <div className="feature-content">
                <h3>Data & Processing</h3>
                <p>Secure pipelines, EO correction, ML analytics, sovereign cloud delivery.</p>
              </div>
            </div>
            <div className="feature-item reverse">
              <div className="feature-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80)' }}></div>
              <div className="feature-content">
                <h3>Quantum-Safe Security</h3>
                <p>Post-quantum cryptography today. QKD-ready architecture for tomorrow.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section id="who" className="section who-section">
        <div className="container">
          <div className="section-header">
            <div className="section-number">05</div>
            <h2 className="section-title">Who It's for</h2>
            <p className="section-subtitle">
              AstraVeda is built for organizations where control, security, and future-readiness are non-negotiable.
            </p>
          </div>
          <div className="who-grid">
            <div className="who-card">
              <div className="who-icon">🏛️</div>
              <h3>Government Space Agencies</h3>
              <p>National missions requiring full sovereign control of TT&C and data.</p>
            </div>
            <div className="who-card">
              <div className="who-icon">🛡️</div>
              <h3>Defense & Intelligence Missions</h3>
              <p>Secure, quantum-resilient ground infrastructure for classified operations.</p>
            </div>
            <div className="who-card">
              <div className="who-icon">📡</div>
              <h3>Commercial Satellite Constellations</h3>
              <p>EO, telecom, IoT, and broadband operators needing scalable GSaaS.</p>
            </div>
            <div className="who-card">
              <div className="who-icon">🌍</div>
              <h3>Emerging Space Nations</h3>
              <p>Countries building national space capability without heavy CapEx.</p>
            </div>
            <div className="who-card">
              <div className="who-icon">🏢</div>
              <h3>Private Corporations & Strategic Enterprises</h3>
              <p>Space-enabled, data-intensive companies requiring secure, compliant, sovereign-grade satellite communications.</p>
            </div>
          </div>
          <div className="section-footer">
            <p className="highlight-text">
              If data sovereignty, security, and strategic control matter - AstraVeda is built for you.
            </p>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="section why-now-section">
        {/* <div className="section-background-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&q=80)' }}></div>
        <div className="section-overlay"></div> */}
        <div className="container">
          <div className="section-header">
            <div className="section-number">06</div>
            <h2 className="section-title">Why Now</h2>
          </div>
          <div className="why-now-grid">
            <div className="why-now-card">
              <div className="why-now-number">01</div>
              <h3>Accelerating Launches</h3>
              <p>Satellite launches are accelerating faster than ground infrastructure</p>
            </div>
            <div className="why-now-card">
              <div className="why-now-number">02</div>
              <h3>Quantum Risk</h3>
              <p>Quantum risk is no longer theoretical</p>
            </div>
            <div className="why-now-card">
              <div className="why-now-number">03</div>
              <h3>Service Models</h3>
              <p>Governments are shifting from CapEx to service-based models</p>
            </div>
            <div className="why-now-card">
              <div className="why-now-number">04</div>
              <h3>Infrastructure Gap</h3>
              <p>Existing providers cannot meet sovereign or quantum requirements</p>
            </div>
          </div>
          <div className="section-footer">
            <p className="highlight-text-large">
              Infrastructure winners are decided early.
            </p>
          </div>
        </div>
      </section>

      {/* Seed Round Section */}
      <section className="seed-section">
        <div className="seed-background">
          <div className="seed-stars"></div>
          <div className="seed-nebula"></div>
          <div className="seed-particles"></div>
        </div>
        <div className="container">
          <div className="section-number-white">07</div>
          
          {/* Heading Section */}
          <div className="seed-header-section">
            <h2 className="seed-title">The Seed Round</h2>
            <div className="seed-amount">
              <span className="amount-label">Seed Raise</span>
              <span className="amount-value">$10M</span>
            </div>
            <p className="seed-description">
              We are seeking strategic partners and investors to accelerate our mission of building sovereign, quantum-secure ground infrastructure.
            </p>
          </div>

          {/* Left-Right Layout */}
          <div className="seed-layout">
            {/* Left Side - Content */}
            <div className="seed-left">
              <div className="seed-focus-section">
                <h3 className="seed-subtitle">Focus Areas</h3>
                <div className="focus-areas-grid">
                  <div className="focus-card">
                    <div className="focus-icon-wrapper">
                      <div className="focus-icon">🚀</div>
                      <div className="focus-glow"></div>
                    </div>
                    <h4>Core Platform</h4>
                    <p>Core platform & engineering</p>
                  </div>
                  <div className="focus-card">
                    <div className="focus-icon-wrapper">
                      <div className="focus-icon">🌍</div>
                      <div className="focus-glow"></div>
                    </div>
                    <h4>Deployments</h4>
                    <p>First sovereign ground station deployments</p>
                  </div>
                  <div className="focus-card">
                    <div className="focus-icon-wrapper">
                      <div className="focus-icon">📋</div>
                      <div className="focus-glow"></div>
                    </div>
                    <h4>Regulatory</h4>
                    <p>Regulatory approvals (India, UK, EU, Middle East)</p>
                  </div>
                  <div className="focus-card">
                    <div className="focus-icon-wrapper">
                      <div className="focus-icon">🤝</div>
                      <div className="focus-glow"></div>
                    </div>
                    <h4>Business Development</h4>
                    <p>Strategic business development</p>
                  </div>
                </div>
              </div>

              <div className="seed-seeking-section">
                <h3 className="seed-subtitle">We Are Seeking</h3>
                <div className="seeking-list">
                  <div className="seeking-item">
                    <div className="seeking-icon">💼</div>
                    <div className="seeking-text">
                      <strong>Strategic and institutional investors</strong>
                    </div>
                    <div className="seeking-arrow">→</div>
                  </div>
                  <div className="seeking-item">
                    <div className="seeking-icon">🏛️</div>
                    <div className="seeking-text">
                      <strong>Sovereign-aligned funds</strong>
                    </div>
                    <div className="seeking-arrow">→</div>
                  </div>
                  <div className="seeking-item">
                    <div className="seeking-icon">🛡️</div>
                    <div className="seeking-text">
                      <strong>Defense, space, and infrastructure partners</strong>
                    </div>
                    <div className="seeking-arrow">→</div>
                  </div>
                  <div className="seeking-item">
                    <div className="seeking-icon">📈</div>
                    <div className="seeking-text">
                      <strong>Equity and long-term partnership opportunities</strong>
                    </div>
                    <div className="seeking-arrow">→</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Animated Vector */}
            <div className="seed-right">
              <div className="seed-vector-container">
                <svg className="seed-vector" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                  {/* Animated Background Circle */}
                  <circle className="vector-circle-1" cx="300" cy="300" r="250" fill="none" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="2"/>
                  <circle className="vector-circle-2" cx="300" cy="300" r="200" fill="none" stroke="rgba(167, 139, 250, 0.2)" strokeWidth="2"/>
                  <circle className="vector-circle-3" cx="300" cy="300" r="150" fill="none" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="2"/>
                  
                  {/* Central Earth */}
                  <circle className="vector-earth" cx="300" cy="300" r="80" fill="url(#earthGradient)"/>
                  <defs>
                    <radialGradient id="earthGradient">
                      <stop offset="0%" stopColor="#4a90e2"/>
                      <stop offset="50%" stopColor="#2d5aa0"/>
                      <stop offset="100%" stopColor="#1e3a5f"/>
                    </radialGradient>
                  </defs>
                  
                  {/* Orbiting Satellites */}
                  <g className="satellite-group-1">
                    <circle className="satellite-dot" cx="300" cy="50" r="8" fill="#60a5fa">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 300 300;360 300 300"
                        dur="20s"
                        repeatCount="indefinite"/>
                    </circle>
                    <path className="satellite-path" d="M 300 50 L 300 300" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="1" strokeDasharray="5,5">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 300 300;360 300 300"
                        dur="20s"
                        repeatCount="indefinite"/>
                    </path>
                  </g>
                  
                  <g className="satellite-group-2">
                    <circle className="satellite-dot" cx="550" cy="300" r="8" fill="#a78bfa">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 300 300;360 300 300"
                        dur="25s"
                        repeatCount="indefinite"/>
                    </circle>
                    <path className="satellite-path" d="M 550 300 L 300 300" stroke="rgba(167, 139, 250, 0.3)" strokeWidth="1" strokeDasharray="5,5">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 300 300;360 300 300"
                        dur="25s"
                        repeatCount="indefinite"/>
                    </path>
                  </g>
                  
                  <g className="satellite-group-3">
                    <circle className="satellite-dot" cx="300" cy="550" r="8" fill="#60a5fa">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 300 300;360 300 300"
                        dur="30s"
                        repeatCount="indefinite"/>
                    </circle>
                    <path className="satellite-path" d="M 300 550 L 300 300" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="1" strokeDasharray="5,5">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 300 300;360 300 300"
                        dur="30s"
                        repeatCount="indefinite"/>
                    </path>
                  </g>
                  
                  <g className="satellite-group-4">
                    <circle className="satellite-dot" cx="50" cy="300" r="8" fill="#a78bfa">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 300 300;-360 300 300"
                        dur="22s"
                        repeatCount="indefinite"/>
                    </circle>
                    <path className="satellite-path" d="M 50 300 L 300 300" stroke="rgba(167, 139, 250, 0.3)" strokeWidth="1" strokeDasharray="5,5">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 300 300;-360 300 300"
                        dur="22s"
                        repeatCount="indefinite"/>
                    </path>
                  </g>
                  
                  {/* Connection Lines */}
                  <line className="connection-line" x1="300" y1="300" x2="300" y2="50" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
                  </line>
                  <line className="connection-line" x1="300" y1="300" x2="550" y2="300" stroke="rgba(167, 139, 250, 0.2)" strokeWidth="1">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" begin="0.5s" repeatCount="indefinite"/>
                  </line>
                  <line className="connection-line" x1="300" y1="300" x2="300" y2="550" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" begin="1s" repeatCount="indefinite"/>
                  </line>
                  <line className="connection-line" x1="300" y1="300" x2="50" y2="300" stroke="rgba(167, 139, 250, 0.2)" strokeWidth="1">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" begin="1.5s" repeatCount="indefinite"/>
                  </line>
                  
                  {/* Floating Particles */}
                  <circle className="particle" cx="100" cy="150" r="3" fill="#60a5fa" opacity="0.6">
                    <animate attributeName="cy" values="150;100;150" dur="4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="particle" cx="500" cy="450" r="3" fill="#a78bfa" opacity="0.6">
                    <animate attributeName="cy" values="450;400;450" dur="5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="5s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="particle" cx="150" cy="500" r="3" fill="#60a5fa" opacity="0.6">
                    <animate attributeName="cx" values="150;200;150" dur="6s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="6s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="particle" cx="450" cy="100" r="3" fill="#a78bfa" opacity="0.6">
                    <animate attributeName="cx" values="450;400;450" dur="4.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="4.5s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                
                {/* Glow Effect */}
                <div className="vector-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Governance Section */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header">
            <div className="section-number">08</div>
            <h2 className="section-title">Team & Governance</h2>
            <p className="section-subtitle">
              Built by former space-agency engineers and operators, with governance designed for defense-grade and sovereign procurement environments.
            </p>
            <p className="highlight-text-large" style={{ marginTop: '2rem' }}>
              We build infrastructure nations can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <div className="section-number">09</div>
            <h2 className="section-title">Contact</h2>
            <p className="section-subtitle">
              Interested in Investing or Partnering?
            </p>
            <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '2rem auto 0', opacity: 0.8 }}>
              We keep public information intentionally focused. Full technical and commercial details are shared directly with aligned parties.
            </p>
          </div>
          <div className="contact-wrapper">
            {/* <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <span>Submit Inquiry</span>
                <span className="btn-arrow">→</span>
              </button>
            </form> */}
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:info@astraveda.space">info@astraveda.space</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🌍</div>
                <div>
                  <h4>Locations</h4>
                  <p>India · UK · Middle East</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📅</div>
                <div>
                  <h4>Book a Meeting</h4>
                  <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer">Schedule a call</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🚀</span>
            <span>ASTRAVEDA</span>
          </div>
          <p>Confidential · Strategic Infrastructure Platform</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
            © 2024 AstraVeda Spacetech. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
