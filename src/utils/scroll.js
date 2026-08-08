export const NAV_OFFSET = 80

export function scrollToId(id, offset = NAV_OFFSET) {
  const el = document.getElementById(id)
  if (!el) return
  const elementPosition = el.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
}
