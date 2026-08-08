import { skillCategories } from '../data/skills'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeading number="02" eyebrow="What I work with" title="Skills" />

        <div className="skills__bento">
          {skillCategories.map((cat, i) => (
            <Reveal
              key={cat.title}
              delay={i * 60}
              className={`skill-card skill-card--${cat.size}`}
            >
              <div className="skill-card__head">
                <span className="skill-card__number mono">{cat.number}</span>
                <i className={cat.icon} aria-hidden="true" />
                <h3>{cat.title}</h3>
              </div>
              <div className="skill-card__tags">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`tag${skill.featured ? ' tag--featured' : ''}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
