export default function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      aria-pressed={isLight}
      onClick={onToggle}
    >
      <i key={theme} className={`theme-toggle__icon ${isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}`} aria-hidden="true" />
    </button>
  )
}
