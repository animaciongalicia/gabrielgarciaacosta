"use client"
import { useEffect, useState } from "react"

interface Heading {
  id: string
  text: string
  level: number
}

export default function ArticleTOC({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Elige el primer heading visible (más arriba)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav className="article-toc" aria-label="Índice del artículo">
      <div className="toc-label">En esta entrada</div>
      <ul className="toc-list">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`toc-item is-h${h.level}${activeId === h.id ? " is-active" : ""}`}
          >
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
