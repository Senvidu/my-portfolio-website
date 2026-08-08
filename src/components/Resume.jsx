import cvPdf from '../assets/ChanithuCV.pdf'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Resume() {
  return (
    <section id="resume" className="section resume">
      <div className="container">
        <SectionHeading number="05" eyebrow="Full experience" title="Resume" />

        <div className="resume__grid">
          <Reveal className="resume__text">
            <p>
              As a fourth-year Computer Science undergraduate and Associate Software Engineer, I combine
              software engineering fundamentals with hands-on experience in cloud infrastructure, DevOps,
              platform engineering, and production systems.
            </p>
            <a className="btn btn--primary" href={cvPdf} download>
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download Resume
            </a>
          </Reveal>

          <Reveal delay={120} className="resume__file-card">
            <div className="resume__file-icon">
              <i className="fa-solid fa-file-lines" aria-hidden="true" />
            </div>
            <div className="resume__file-meta">
              <span className="resume__file-name">Chanithu_Senvidu_CV.pdf</span>
              <span className="resume__file-sub mono">Resume · PDF</span>
            </div>
            <a className="resume__file-download" href={cvPdf} download aria-label="Download resume PDF">
              <i className="fa-solid fa-arrow-down" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
