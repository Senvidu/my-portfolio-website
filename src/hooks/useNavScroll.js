import { useEffect, useRef } from 'react'

// Drives the navbar's "glass on scroll" + hide-on-scroll-down behavior by
// toggling classes directly on the DOM node (no React re-render per pixel).
export default function useNavScroll() {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    let lastScroll = window.pageYOffset
    let ticking = false

    const update = () => {
      const current = window.pageYOffset

      nav.classList.toggle('is-scrolled', current > 40)

      if (current > lastScroll && current > 400) nav.classList.add('is-hidden')
      else nav.classList.remove('is-hidden')

      lastScroll = current
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
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return navRef
}
