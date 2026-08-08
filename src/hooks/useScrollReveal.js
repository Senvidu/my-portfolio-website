import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from './usePrefersReducedMotion'

// Returns a ref + boolean that flips to true once the element scrolls into
// view, then disconnects. Reduced-motion users get content visible instantly.
export default function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const [inView, setInView] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setInView(true)
      return
    }
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion, threshold, rootMargin])

  return { ref, inView }
}
