import useScrollReveal from '../hooks/useScrollReveal'

// Generic scroll-triggered reveal wrapper. `delay` (ms) staggers siblings.
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const { ref, inView } = useScrollReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
