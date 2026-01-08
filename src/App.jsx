import React, { useEffect, useMemo, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import chanithuImg from './assets/chanithu.jpg'
import oceanImg from './assets/oc.png'
import hopeBridgeImg from './assets/HopeBridge.JPG'
import ticketingImg from './assets/ticketing-system.png'
import cvPdf from './assets/ChanithuCV.pdf'
import ivedhaImg from './assets/Ivedha.jpg'
import gamageImg from './assets/Gamage.jpg'
import vectorPulseImg from './assets/Logo final final final.png'


const NAV_OFFSET = 80

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [typedSubtitle, setTypedSubtitle] = useState('')
  const [activeSection, setActiveSection] = useState('home')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const navRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const formRef = useRef(null)

  const sections = useMemo(() => ([
  { id: 'home', label: 'Home', num: '01.' },
  { id: 'about', label: 'About', num: '02.' },
  { id: 'skills', label: 'Skills', num: '03.' },
  { id: 'experience', label: 'Experience', num: '04.' },
  { id: 'projects', label: 'Projects', num: '05.' },
  { id: 'resume', label: 'Resume', num: '06.' },
  { id: 'contact', label: 'Contact', num: '07.' },
]), [])

  // Apply theme to body
  useEffect(() => {
    const body = document.body
    if (theme === 'light') body.classList.add('light-theme')
    else body.classList.remove('light-theme')
    localStorage.setItem('theme', theme)
  }, [theme])

  // Loader hide after load
  useEffect(() => {
    const onLoad = () => {
      window.setTimeout(() => setLoaderHidden(true), 1000)
    }
    window.addEventListener('load', onLoad)
    // If already loaded (fast refresh / cached)
    if (document.readyState === 'complete') onLoad()
    return () => window.removeEventListener('load', onLoad)
  }, [])

  // Smooth scroll handler
  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - NAV_OFFSET
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }

  // Close mobile menu on route click / outside click
  useEffect(() => {
    const onDocClick = (e) => {
      const nav = navRef.current
      if (!nav) return
      const toggleBtn = nav.querySelector('.menu-toggle')
      const menu = nav.querySelector('.nav-menu')
      if (!toggleBtn || !menu) return
      if (menuOpen && !toggleBtn.contains(e.target) && !menu.contains(e.target)) {
        setMenuOpen(false)
        document.body.style.overflow = ''
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [menuOpen])

  // Reveal on scroll + active section + navbar behavior
  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll('.reveal'))
    const sectionEls = Array.from(document.querySelectorAll('section'))
    let lastScroll = window.pageYOffset

    const revealOnScroll = () => {
      revealEls.forEach((el) => {
        const windowHeight = window.innerHeight
        const elTop = el.getBoundingClientRect().top
        const visible = 150
        if (elTop < windowHeight - visible) el.classList.add('active')
      })
    }

    const updateActiveSection = () => {
      let current = 'home'
      sectionEls.forEach((section) => {
        const top = section.offsetTop
        if (window.pageYOffset >= top - 200) current = section.id
      })
      setActiveSection(current)
    }

    const updateNavStyle = () => {
      const nav = navRef.current
      if (!nav) return
      const body = document.body
      const currentScroll = window.pageYOffset

      if (currentScroll > 50) {
        nav.style.background = body.classList.contains('light-theme')
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(10, 10, 10, 0.95)'
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)'
      } else {
        nav.style.background = body.classList.contains('light-theme')
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(10, 10, 10, 0.8)'
        nav.style.boxShadow = 'none'
      }

      if (currentScroll > lastScroll && currentScroll > 500) nav.style.transform = 'translateY(-100%)'
      else nav.style.transform = 'translateY(0)'

      lastScroll = currentScroll
    }

    const onScroll = () => {
      revealOnScroll()
      updateActiveSection()
      updateNavStyle()
    }

    window.addEventListener('scroll', onScroll)
    // Initial
    revealOnScroll()
    updateActiveSection()
    updateNavStyle()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Typing effect for subtitle
  useEffect(() => {
    const full = 'COMPUTER SCIENCE UNDERGRADUATE / BACKEND DEVELOPER / AIRFLOW SUPPORT ENGINEER INTERN'
    setTypedSubtitle('')
    let i = 0
    const start = window.setTimeout(() => {
      const t = window.setInterval(() => {
        i += 1
        setTypedSubtitle(full.slice(0, i))
        if (i >= full.length) window.clearInterval(t)
      }, 100)
    }, 1500)
    return () => window.clearTimeout(start)
  }, [])

  // Parallax orbs (desktop only)
  useEffect(() => {
    const handler = (e) => {
      if (window.innerWidth <= 768) return
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      const orbs = [orb1Ref.current, orb2Ref.current].filter(Boolean)
      orbs.forEach((orb, idx) => {
        const speed = (idx + 1) * 20
        const xOffset = (x - 0.5) * speed
        const yOffset = (y - 0.5) * speed
        orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })
    }
    document.addEventListener('mousemove', handler)
    return () => document.removeEventListener('mousemove', handler)
  }, [])

  // Handle resize: close menu on desktop
  useEffect(() => {
    let timer
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        // Trigger reveal recalculation
        const ev = new Event('scroll')
        window.dispatchEvent(ev)
      }, 250)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const onSubmitContact = async (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setSent(false)

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS env vars. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY.')
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey })

      setSent(true)
      e.target.reset()
      window.setTimeout(() => setSent(false), 3000)
    } catch (err) {
      console.error(err)
      alert('Message failed to send. Please check EmailJS keys and template variables, then try again.')
    } finally {
      setSending(false)
    }
  }


  const iconClass = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon'

  return (
    <>
      {/* Loading Screen */}
      <div className={`loader ${loaderHidden ? 'hide' : ''}`}>
        <div className="loader-ring"></div>
      </div>

      {/* Animated Background */}
      <div className="bg-animation">
        <div className="bg-grid"></div>
        <div ref={orb1Ref} className="floating-orb orb-1"></div>
        <div ref={orb2Ref} className="floating-orb orb-2"></div>
      </div>

      {/* Theme Toggle */}
      <button
        className="theme-toggle"
        aria-label="Toggle theme"
        onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      >
        <i className={iconClass}></i>
      </button>

      {/* Navigation */}
      <nav ref={navRef}>
        <div className="nav-container">
          <a
            href="#home"
            className="logo"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('home')
              setMenuOpen(false)
            }}
          >
            CS
          </a>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`nav-link ${activeSection === s.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(s.id)
                    setMenuOpen(false)
                  }}
                >
                  <span>{s.num}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            <h1 className="hero-title">CHANITHU SENVIDU</h1>
            <h2 className="hero-subtitle">{typedSubtitle}</h2>
            <p className="hero-description">
              Backend Developer and Intern – Airflow (Level 1 Support / Operations) focused on scalable backend systems and
              production support. Co-founder &amp; CHRO of Vector Pulse, contributing to building an early-stage tech startup.
              Passionate about backend engineering and real-world problem solving.
            </p>

            <div className="hero-buttons">
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('contact')
                }}
              >
                <i className="fas fa-envelope"></i> Contact Me
              </a>
              <a
                href="#projects"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('projects')
                }}
              >
                <i className="fas fa-folder"></i> View Projects
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img src={chanithuImg} alt="Chanithu Senvidu" loading="lazy" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about reveal">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p>
  I’m currently an <strong>Intern – Airflow (Level 1 Support / Operations)</strong> at{" "}
  <a
    href="https://ivedha.com/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "inherit", textDecoration: "underline" }}
  >
    iVedha Inc
  </a>
  , Toronto, Canada, where I support and monitor production data workflows,
  handle first-level operational issues, and help maintain the reliability of
  Apache Airflow pipelines in live environments. Alongside this, I work as a{" "}
  <strong>Backend Developer Intern</strong> at{" "}
  <a
    href="https://gamagerecruiters.lk/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "inherit", textDecoration: "underline" }}
  >
    Gamage Recruiters
  </a>
  , building and supporting backend services and APIs.

  <br /><br />

  In parallel, I am a co-founder and the <strong>Chief Human Resources Officer (CHRO)</strong> at{" "}
  <a
    href="https://thevectorpulse.com/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "inherit", textDecoration: "underline" }}
  >
    Vector Pulse
  </a>
  , an IT startup founded by me and five other friends, where we focus on building
  scalable technology solutions while fostering a strong engineering-driven and
  collaborative team culture.

  <br /><br />

  I’m a curious and detail-oriented computer science undergraduate who enjoys
  understanding how systems work beyond just writing code—especially how software
  behaves in production. I’m driven by continuous learning, problem-solving, and
  improving system reliability, with a strong interest in backend engineering,
  workflow automation, and scalable system design.
</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
<section id="skills" className="skills reveal">
  <div className="container">
    <h2 className="section-title">Technical Skills</h2>

    <div className="skills-grid">
      {/* Programming Languages */}
      <div className="skill-card">
        <h3>
          <i className="fas fa-code"></i> Programming Languages
        </h3>
        <ul className="skill-list">
          <li>Java</li>
          <li>JavaScript (ES6+)</li>
          <li>Python</li>
          <li>TypeScript (Basic)</li>
          <li>HTML</li>
          <li>CSS</li>
        </ul>
      </div>

      {/* Frameworks */}
      <div className="skill-card">
        <h3>
          <i className="fas fa-layer-group"></i> Frameworks & Libraries
        </h3>
        <ul className="skill-list">
          <li>Spring Boot</li>
          <li>JAX-RS</li>
          <li>React.js</li>
          <li>Angular</li>
          <li>Express.js</li>
          <li>Flutter</li>
        </ul>
      </div>

      {/* Databases */}
      <div className="skill-card">
        <h3>
          <i className="fas fa-database"></i> Databases
        </h3>
        <ul className="skill-list">
          <li>MongoDB</li>
          <li>MySQL</li>
          <li>PostgreSQL</li>
          <li>H2</li>
        </ul>
      </div>

      {/* Tools */}
      <div className="skill-card">
        <h3>
          <i className="fas fa-tools"></i> Tools & Platforms
        </h3>
        <ul className="skill-list">
          <li>Git & GitHub</li>
          <li>Postman</li>
          <li>Apache Airflow</li>
          <li>Docker (Basic)</li>
          <li>VS Code</li>
        </ul>
      </div>

      {/* NEW: Tech Stack */}
      <div className="skill-card">
        <h3>
          <i className="fas fa-cubes"></i> Tech Stack
        </h3>
        <ul className="skill-list">
          <li>MERN Stack (MongoDB, Express.js, React, Node.js)</li>
          <li>RESTful API Architecture</li>
          <li>Microservices (Basic)</li>
          <li>Workflow Automation</li>
          <li>Production Monitoring & Support</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* Experience Section */}
<section id="experience" className="experience reveal">
  <div className="container">
    <h2 className="section-title">Experience</h2>

    <div className="experience-grid">
      {/* iVedha */}
      <a
        href="https://ivedha.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="experience-card"
      >
        <div className="experience-header">
          <img src={ivedhaImg} alt="iVedha Inc" />
          <div>
            <h3>Intern – Airflow (L1 Support / Operations)</h3>
            <p className="company">iVedha Inc · Toronto, Canada</p>
            <span className="duration">Jan 2026 – Present</span>
          </div>
        </div>

        <p className="experience-desc">
          Supporting and monitoring production Apache Airflow workflows,
          handling first-level operational issues, and ensuring reliable execution
          of scheduled data pipelines in live environments.
        </p>

        <p className="experience-tech">
          Apache Airflow · Production Monitoring · Incident Support · Data Pipelines
        </p>
      </a>

      {/* Gamage Recruiters */}
      <a
        href="https://gamagerecruiters.lk/"
        target="_blank"
        rel="noopener noreferrer"
        className="experience-card"
      >
        <div className="experience-header">
          <img src={gamageImg} alt="Gamage Recruiters" />
          <div>
            <h3>Backend Developer Intern</h3>
            <p className="company">Gamage Recruiters · Sri Lanka</p>
            <span className="duration">Aug 2025 – Present</span>
          </div>
        </div>

        <p className="experience-desc">
          Developing and maintaining RESTful APIs for recruitment workflows,
          designing scalable MongoDB schemas, implementing authentication,
          and supporting CI/CD deployments.
        </p>

        <p className="experience-tech">
          Node.js · Express · MongoDB · React · JWT · Docker · GitHub Actions
        </p>
      </a>

      {/* VectorPulse */}
      <a
        href="https://thevectorpulse.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="experience-card"
      >
        <div className="experience-header">
          <img src={vectorPulseImg} alt="VectorPulse" />
          <div>
            <h3>Co-Founder & CHRO</h3>
            <p className="company">VectorPulse · Startup</p>
            <span className="duration">2025 – Present</span>
          </div>
        </div>

        <p className="experience-desc">
          Co-founder and Chief Human Resources Officer at VectorPulse, leading
          talent strategy, recruitment, internal operations, and organizational
          growth while contributing to overall startup direction.
        </p>

        <p className="experience-tech">
          Startup Operations · HR Strategy · Team Building · Leadership
        </p>
      </a>
    </div>
  </div>
</section>


      {/* Projects Section */}
      <section id="projects" className="projects reveal">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <ProjectCard
              image={oceanImg}
              title="OCEAN"
              date="September 2023 - December 2023"
              description="Collaborated with a university group to develop Ocean, a website aimed at water conservation and management."
              tech="HTML • CSS • JavaScript"
            />
            <ProjectCard
              image={hopeBridgeImg}
              title="Hope Bridge"
              date="November 2024 - March 2025"
              description="Developed a donation platform using Flutter and Spring Boot to connect donors, underprivileged individuals, and businesses for secure and transparent contributions."
              tech="Flutter • Spring Boot • React JS"
            />
            <ProjectCard
              image={ticketingImg}
              title="Real-time Ticketing System"
              date="November 2024 - December 2024"
              description="Implemented a real-time ticketing system to manage and track ticket sales efficiently."
              tech="Spring Boot • React JS"
            />
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="resume reveal">
        <div className="container">
          <h2 className="section-title">Resume</h2>
          <div className="resume-content">
            <div className="resume-text">
              <h3>Why Choose Me?</h3>
              <p>
                As a passionate Computer Science student with a strong foundation in modern technologies and a drive for
                innovation, I bring fresh perspectives and cutting-edge solutions to every project.
              </p>
              <a className="download-btn" href={cvPdf} download>
                <i className="fas fa-download"></i>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact reveal">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <p>+94 74 278 6530</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <p>senviduchanithu89@gmail.com</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>Malabe, Colombo</p>
              </div>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/chanithusenvidu/" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/Senvidu" target="_blank" rel="noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>

            <form ref={formRef} className="contact-form" onSubmit={onSubmitContact}>
              <input type="text" name="from_name" placeholder="Your Name" required />
              <input type="email" name="reply_to" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>

              <button type="submit" className="submit-btn" disabled={sending}>
                {sending ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : sent ? (
                  <>
                    <i className="fas fa-check"></i> Sent Successfully!
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2026 Chanithu Senvidu. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

function ProjectCard({ image, title, date, description, tech }) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 768)
  const cardRef = useRef(null)

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth > 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onMove = (e) => {
    if (!isDesktop) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const onLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <div ref={cardRef} className="project-card" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="project-image">
        <img src={image} alt={title} />
        <div className="project-overlay">
          <a href="https://github.com/Senvidu" onClick={(e) => e.preventDefault()} aria-label="GIT HUB LINK">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p className="project-date">{date}</p>
        <p className="project-description">{description}</p>
        <p className="tech-stack">{tech}</p>
      </div>
    </div>
  )
}
