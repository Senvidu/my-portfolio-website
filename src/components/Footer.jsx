import { socialLinks } from '../data/social'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__identity">
          <span className="footer__name">Chanithu Senvidu</span>
          <span className="footer__tagline mono">Software Engineer · Cloud · Platform · DevOps</span>
        </div>

        <div className="footer__social">
          {socialLinks.map((s) => (
            <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
              <i className={s.icon} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="footer__meta mono">
          <span>&copy; {new Date().getFullYear()} Chanithu Senvidu</span>
          <span className="footer__dot" aria-hidden="true">·</span>
          <span>Built with React</span>
        </div>
      </div>
    </footer>
  )
}
