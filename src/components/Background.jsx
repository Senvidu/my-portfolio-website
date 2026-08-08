import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

// Layered background: an animated grid + two gradient glows + a small field
// of drifting particles, each carrying its own CSS keyframe motion, plus
// JS-driven scroll parallax (all viewports) and mouse parallax (desktop,
// fine pointer only). Scroll and mouse offsets are written as separate
// custom properties so they compose in CSS instead of fighting over the
// same `transform`.

function particleCountForWidth(width) {
  if (width < 640) return 9
  if (width < 1100) return 14
  return 20
}

function createParticles(count) {
  return Array.from({ length: count }, (_, i) => {
    const depth = 0.3 + Math.random() * 0.7 // 0.3 (far/slow) - 1.0 (near/fast)
    const duration = 5 + Math.random() * 6 // 5-11s: fast enough to read as "moving" at a glance
    return {
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.5 + depth * 2.5,
      opacity: 0.14 + depth * 0.34,
      depth,
      duration,
      delay: -(Math.random() * duration),
      variant: i % 3 === 0 ? 'two' : 'one',
      driftX: Math.round((Math.random() - 0.5) * 150),
      driftY: Math.round((Math.random() - 0.5) * 150),
    }
  })
}

export default function Background() {
  const gridWrapRef = useRef(null)
  const glow1Ref = useRef(null)
  const glow2Ref = useRef(null)
  const particleSlotRefs = useRef({})
  const reducedMotion = usePrefersReducedMotion()

  const [particles] = useState(() => {
    if (typeof window === 'undefined') return []
    return createParticles(particleCountForWidth(window.innerWidth))
  })

  // Scroll parallax: grid, glows, and particles each drift at their own rate
  // as the page scrolls (particles use their individual `depth`), and the
  // glows drift a few degrees of hue across the page — ties the
  // background's motion directly to reading progress.
  useEffect(() => {
    if (reducedMotion) return

    let ticking = false

    const update = () => {
      const y = window.pageYOffset
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0

      if (gridWrapRef.current) {
        gridWrapRef.current.style.transform = `translate3d(0, ${y * 0.045}px, 0)`
      }
      if (glow1Ref.current) {
        glow1Ref.current.style.setProperty('--scroll-y', `${y * 0.16}px`)
        glow1Ref.current.style.setProperty('--scroll-hue', `${progress * 30}deg`)
      }
      if (glow2Ref.current) {
        glow2Ref.current.style.setProperty('--scroll-y', `${y * -0.12}px`)
        glow2Ref.current.style.setProperty('--scroll-hue', `${progress * -22}deg`)
      }
      particles.forEach((p) => {
        const el = particleSlotRefs.current[p.id]
        if (el) el.style.transform = `translate3d(0, ${y * 0.06 * p.depth}px, 0)`
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reducedMotion, particles])

  // Mouse parallax layers on top of the scroll offset via its own custom
  // properties. Desktop + fine pointer only.
  useEffect(() => {
    if (reducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMove = (e) => {
      if (window.innerWidth <= 900) return
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06

      if (glow1Ref.current) {
        glow1Ref.current.style.setProperty('--mouse-x', `${currentX * 34}px`)
        glow1Ref.current.style.setProperty('--mouse-y', `${currentY * 34}px`)
      }
      if (glow2Ref.current) {
        glow2Ref.current.style.setProperty('--mouse-x', `${currentX * -26}px`)
        glow2Ref.current.style.setProperty('--mouse-y', `${currentY * -26}px`)
      }
      raf = window.requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  return (
    <div className="bg-scene" aria-hidden="true">
      <div ref={gridWrapRef} className="bg-grid-wrap">
        <div className="bg-grid" />
      </div>
      <div className="bg-glow-orbit bg-glow-orbit--one">
        <div ref={glow1Ref} className="bg-glow bg-glow--one" />
      </div>
      <div className="bg-glow-orbit bg-glow-orbit--two">
        <div ref={glow2Ref} className="bg-glow bg-glow--two" />
      </div>
      <div className="bg-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            ref={(el) => {
              particleSlotRefs.current[p.id] = el
            }}
            className="bg-particle-slot"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
          >
            <span
              className={`bg-particle bg-particle--${p.variant}`}
              style={{
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                '--drift-x': `${p.driftX}px`,
                '--drift-y': `${p.driftY}px`,
              }}
            />
          </span>
        ))}
      </div>
      <div className="bg-noise" />
    </div>
  )
}
