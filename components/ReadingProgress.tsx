"use client"
import { useEffect, useState } from "react"

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function update() {
      const doc = document.documentElement
      const scrollTop = window.scrollY
      const viewport = window.innerHeight
      const total = doc.scrollHeight - viewport
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrollTop / total) * 100)) : 0
      setProgress(pct)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  )
}
