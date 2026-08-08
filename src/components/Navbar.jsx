import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { navSections } from '../data/navigation'
import { scrollToId } from '../utils/scroll'
import useNavScroll from '../hooks/useNavScroll'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ activeSection, theme, onToggleTheme }) {
  const navRef = useNavScroll()
  const menuRef = useRef(null)
  const linkRefs = useRef({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

  const closeMenu = () => setMenuOpen(false)

  const handleNavClick = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
    closeMenu()
  }

  // Position the sliding active-link pill under the current section link.
  useLayoutEffect(() => {
    const el = linkRefs.current[activeSection]
    const container = menuRef.current
    if (!el || !container) return
    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setIndicator({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1,
    })
  }, [activeSection, menuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) closeMenu()
      const el = linkRefs.current[activeSection]
      const container = menuRef.current
      if (!el || !container) return
      const containerRect = container.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      setIndicator({ left: elRect.left - containerRect.left, width: elRect.width, opacity: 1 })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeSection])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close on outside click / Escape
  useEffect(() => {
    const onDocClick = (e) => {
      const nav = navRef.current
      if (!nav || !menuOpen) return
      if (!nav.contains(e.target)) closeMenu()
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, navRef])

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar__inner">
        <a
          href="#home"
          className="navbar__logo"
          onClick={handleNavClick('home')}
          aria-label="Chanithu Senvidu — home"
        >
          <span className="mono">CS</span>
        </a>

        <ul ref={menuRef} className={`navbar__menu${menuOpen ? ' is-open' : ''}`}>
          <span
            className="navbar__indicator"
            style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width, opacity: indicator.opacity }}
            aria-hidden="true"
          />
          {navSections.map((s, i) => (
            <li key={s.id} style={{ '--stagger-index': i }}>
              <a
                ref={(node) => {
                  linkRefs.current[s.id] = node
                }}
                href={`#${s.id}`}
                className={`navbar__link${activeSection === s.id ? ' is-active' : ''}`}
                aria-current={activeSection === s.id ? 'true' : undefined}
                onClick={handleNavClick(s.id)}
              >
                <span className="navbar__link-num mono" aria-hidden="true">{s.num}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className={`navbar__toggle${menuOpen ? ' is-open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  )
}
