import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const infoCards = [
  { label: 'Current Role', value: 'Associate Software Engineer', icon: 'fa-solid fa-user-gear' },
  { label: 'Company', value: 'iVedha Inc.', icon: 'fa-solid fa-building' },
  { label: 'Focus', value: 'Cloud · Platform · DevOps', icon: 'fa-solid fa-server' },
  { label: 'Education', value: 'BSc Computer Science', icon: 'fa-solid fa-graduation-cap' },
  { label: 'Year', value: '4th Year', icon: 'fa-solid fa-calendar-days' },
  { label: 'Graduation', value: '2027', icon: 'fa-solid fa-flag-checkered' },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeading number="01" eyebrow="Get to know me" title="About" />

        <div className="about__grid">
          <Reveal className="about__intro">
            <p>
              I&rsquo;m a fourth-year Computer Science undergraduate at the University of Westminster and an
              Associate Software Engineer at iVedha Inc., working across cloud infrastructure, platform
              engineering, DevOps, and data engineering.
            </p>
            <p>
              My work focuses on building and supporting scalable cloud-native systems, automating
              infrastructure, operating Kubernetes workloads, managing GCP infrastructure with Terraform,
              and maintaining reliable production platforms.
            </p>

            <div className="about__progression">
              <span className="about__progression-step">
                <span className="mono">Platform Engineer / Airflow L1 Support Intern</span>
              </span>
              <i className="fa-solid fa-arrow-right about__progression-arrow" aria-hidden="true" />
              <span className="about__progression-step about__progression-step--current">
                <span className="mono">Associate Software Engineer</span>
              </span>
            </div>
          </Reveal>

          <div className="about__cards">
            {infoCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 70} className="about-card">
                <i className={card.icon} aria-hidden="true" />
                <span className="about-card__label mono">{card.label}</span>
                <span className="about-card__value">{card.value}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
