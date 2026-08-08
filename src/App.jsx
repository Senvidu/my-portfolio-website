import { useMemo } from 'react'
import { navSections } from './data/navigation'
import useTheme from './hooks/useTheme'
import useActiveSection from './hooks/useActiveSection'
import Loader from './components/Loader'
import Background from './components/Background'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const sectionIds = useMemo(() => navSections.map((s) => s.id), [])
  const activeSection = useActiveSection(sectionIds)

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <Loader />
      <Background />
      <ScrollProgress />
      <Navbar activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
