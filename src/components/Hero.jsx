import { useEffect, useState } from 'react'
import chanithuImg from '../assets/chanithu.jpg'
import cvPdf from '../assets/ChanithuCV.pdf'
import { socialLinks } from '../data/social'
import { scrollToId } from '../utils/scroll'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import Reveal from './Reveal'

const SUBTITLE = 'SOFTWARE ENGINEER · CLOUD INFRASTRUCTURE · PLATFORM ENGINEERING · DEVOPS'
const BADGES = ['GCP', 'Kubernetes', 'Terraform', 'Python']

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const [typed, setTyped] = useState(reducedMotion ? SUBTITLE : '')

  useEffect(() => {
    if (reducedMotion) {
      setTyped(SUBTITLE)
      return undefined
    }
    let i = 0
    const start = window.setTimeout(() => {
      const t = window.setInterval(() => {
        i += 1
        setTyped(SUBTITLE.slice(0, i))
        if (i >= SUBTITLE.length) window.clearInterval(t)
      }, 35)
    }, 900)
    return () => window.clearTimeout(start)
  }, [reducedMotion])

  return (
    <section id="home" className="hero">
      <div className="container hero__wrapper">
        <div className="hero__content">
          <Reveal className="hero__status">
            <span className="hero__status-dot" />
            <span className="mono">Currently</span>
            <span className="hero__status-value">Associate Software Engineer @ iVedha Inc.</span>
          </Reveal>

          <Reveal as="h1" delay={60} className="hero__title">
            Chanithu Senvidu
          </Reveal>

          <Reveal as="h2" delay={120} className="hero__role">
            Associate Software Engineer
          </Reveal>

          <Reveal as="p" delay={180} className="hero__subtitle mono">
            {typed}
            <span className="hero__cursor" aria-hidden="true" />
          </Reveal>

          <Reveal as="p" delay={240} className="hero__description">
            Associate Software Engineer at iVedha Inc. working across cloud infrastructure, platform
            engineering, DevOps, and data engineering. Building and supporting scalable cloud-native
            systems using GCP, Kubernetes, Terraform, Python, Rust, Apache Airflow, and CI/CD.
          </Reveal>

          <Reveal delay={280} className="hero__education">
            <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
            Fourth-year Computer Science undergraduate at the University of Westminster
          </Reveal>

          <Reveal delay={340} className="hero__buttons">
            <a
              href="#projects"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('projects')
              }}
            >
              View My Work
              <i className="fa-solid fa-arrow-right btn__arrow" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="btn btn--secondary"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('contact')
              }}
            >
              Contact Me
            </a>
            <a href={cvPdf} download className="btn btn--ghost">
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download CV
            </a>
          </Reveal>

          <Reveal delay={400} className="hero__social">
            {socialLinks.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <i className={s.icon} aria-hidden="true" />
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal delay={200} className="hero__visual">
          <div className="hero__image-ring">
            <img src={chanithuImg} alt="Chanithu Senvidu" loading="eager" />
          </div>
          {BADGES.map((badge, i) => (
            <span key={badge} className={`hero__badge hero__badge--${i}`}>
              <span className="mono">{badge}</span>
            </span>
          ))}
        </Reveal>
      </div>

      <a
        href="#about"
        className="hero__scroll-cue"
        aria-label="Scroll to About section"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('about')
        }}
      >
        <span className="mono">SCROLL</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
      </a>
    </section>
  )
}
