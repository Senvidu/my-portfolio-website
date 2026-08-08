export default function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-card${featured ? ' project-card--featured' : ''}`}>
      <div className="project-card__image">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-card__overlay">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="project-card__github"
            aria-label={`View ${project.title} on GitHub`}
          >
            <i className="fa-brands fa-github" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="project-card__body">
        <div className="project-card__heading">
          <h3>{project.title}</h3>
          <span className="project-card__date mono">{project.date}</span>
        </div>
        <p className="project-card__desc">{project.description}</p>
        <div className="project-card__tags">
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link">
          View on GitHub
          <i className="fa-solid fa-arrow-right btn__arrow" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
