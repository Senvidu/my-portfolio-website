import { useEffect, useState } from 'react'

export default function Loader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onLoad = () => window.setTimeout(() => setHidden(true), 550)
    if (document.readyState === 'complete') {
      onLoad()
      return undefined
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <div className={`loader${hidden ? ' hide' : ''}`} aria-hidden={hidden}>
      <div className="loader-mark mono">CS</div>
      <div className="loader-ring" />
    </div>
  )
}
