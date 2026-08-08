import { projects } from '../data/projects'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeading number="04" eyebrow="Selected work" title="Featured Projects" />

        <div className="projects__bento">
          {featured && (
            <Reveal className="projects__featured">
              <ProjectCard project={featured} featured />
            </Reveal>
          )}
          <div className="projects__secondary">
            {rest.map((project, i) => (
              <Reveal key={project.id} delay={i * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
