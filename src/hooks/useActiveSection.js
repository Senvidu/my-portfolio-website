import { useEffect, useState } from 'react'

// Tracks which section is currently most "in focus" using IntersectionObserver
// instead of manual offsetTop math on every scroll event.
export default function useActiveSection(sectionIds, { initial = sectionIds[0] } = {}) {
  const [activeId, setActiveId] = useState(initial)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const visibleRatios = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let bestId = null
        let bestRatio = 0
        visibleRatios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestId) setActiveId(bestId)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
