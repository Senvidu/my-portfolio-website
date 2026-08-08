import Reveal from './Reveal'

export default function SectionHeading({ number, title, eyebrow, align = 'center' }) {
  return (
    <Reveal as="div" className={`section-heading section-heading--${align}`}>
      <span className="section-heading__number mono" aria-hidden="true">{number}</span>
      <div>
        {eyebrow && <p className="section-heading__eyebrow mono">{eyebrow}</p>}
        <h2 className="section-heading__title">{title}</h2>
      </div>
    </Reveal>
  )
}
