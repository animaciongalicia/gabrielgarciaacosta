'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme((stored as 'light' | 'dark') || sys)
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="site-logo" aria-label="Gabriel García Acosta — Inicio">
            {/* Logo SVG */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="8" fill="var(--color-primary)" />
              <text
                x="14"
                y="20"
                textAnchor="middle"
                fontFamily="serif"
                fontStyle="italic"
                fontSize="18"
                fill="white"
                fontWeight="400"
              >
                G
              </text>
            </svg>
            <span>Gabriel</span>
          </Link>

          <div className="header-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
