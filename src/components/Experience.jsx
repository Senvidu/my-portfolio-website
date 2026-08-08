import { experience } from '../data/experience'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// Group consecutive entries that share a company so internal progression
// (e.g. iVedha: Platform Engineer -> Associate Software Engineer) renders as
// a single connected card instead of two disconnected ones.
function groupByCompany(items) {
  const groups = []
  items.forEach((item) => {
    const last = groups[groups.length - 1]
    if (last && last.companyId === item.companyId) {
      last.roles.push(item)
    } else {
      groups.push({
        companyId: item.companyId,
        company: item.company,
        logo: item.logo,
        url: item.url,
        location: item.location,
        roles: [item],
      })
    }
  })
  return groups
}

export default function Experience() {
  const groups = groupByCompany(experience)

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeading number="03" eyebrow="Where I've worked" title="Experience" />

        <div className="timeline">
          {groups.map((group, gi) => (
            <Reveal key={group.companyId} delay={gi * 90} className="timeline__group">
              <div className="timeline__node" aria-hidden="true">
                <span className="timeline__dot" />
              </div>

              <div className="timeline__card">
                <a
                  href={group.url}
                  target="_blank"
                  rel="noreferrer"
                  className="timeline__company"
                >
                  <img src={group.logo} alt="" loading="lazy" />
                  <div>
                    <span className="timeline__company-name">{group.company}</span>
                    {group.location && <span className="timeline__location mono">{group.location}</span>}
                  </div>
                </a>

                {group.roles.length > 1 && (
                  <span className="timeline__progression-tag mono">
                    <i className="fa-solid fa-arrow-trend-up" aria-hidden="true" />
                    Internal progression
                  </span>
                )}

                <div className="timeline__roles">
                  {group.roles.map((role, ri) => (
                    <div key={role.id} className="timeline__role">
                      {ri > 0 && <span className="timeline__role-connector" aria-hidden="true" />}
                      <div className="timeline__role-head">
                        <h3>{role.role}</h3>
                        <span className={`timeline__period mono${role.current ? ' is-current' : ''}`}>
                          {role.current && <span className="timeline__period-dot" />}
                          {role.period}
                        </span>
                      </div>
                      <p className="timeline__desc">{role.description}</p>
                      <div className="timeline__tech">
                        {role.tech.map((t, ti) => (
                          <span key={t} className="tag" style={{ '--stagger-index': ti }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
