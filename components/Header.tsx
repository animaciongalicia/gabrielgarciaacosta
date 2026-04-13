"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { CATEGORIAS } from "@/lib/categorias"

const NAV_CATS = ["mentalidad", "negocios", "decisiones", "inversiones", "habilidades"]

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    setTheme((stored as "light" | "dark") || sys)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    localStorage.setItem("theme", next)
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="header-inner">
            <Link href="/" className="site-logo" aria-label="Gabriel García Acosta — Inicio">
              <div className="logo-mark" aria-hidden="true"><span>G</span></div>
              <span>Gabriel</span>
            </Link>

            <nav className="header-nav" aria-label="Categorías">
              {NAV_CATS.map((slug) => (
                <Link
                  key={slug}
                  href={`/categoria/${slug}`}
                  className={`nav-link${isActive(`/categoria/${slug}`) ? " active" : ""}`}
                >
                  {CATEGORIAS[slug]?.nombre}
                </Link>
              ))}
              <Link href="/sobre" className={`nav-link${isActive("/sobre") ? " active" : ""}`}>
                Sobre mí
              </Link>
            </nav>

            <div className="header-actions">
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
              >
                {theme === "dark" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
              <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                <span style={menuOpen ? { transform: "rotate(45deg) translate(4px, 4px)" } : {}} />
                <span style={menuOpen ? { opacity: 0 } : {}} />
                <span style={menuOpen ? { transform: "rotate(-45deg) translate(4px, -4px)" } : {}} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className={`mobile-nav${menuOpen ? " open" : ""}`} aria-label="Menú móvil">
        {NAV_CATS.map((slug) => (
          <Link
            key={slug}
            href={`/categoria/${slug}`}
            className={`nav-link${isActive(`/categoria/${slug}`) ? " active" : ""}`}
          >
            <span style={{ marginRight: "8px" }}>{CATEGORIAS[slug]?.icono}</span>
            {CATEGORIAS[slug]?.nombre}
          </Link>
        ))}
        <Link href="/sobre" className={`nav-link${isActive("/sobre") ? " active" : ""}`}>
          👤 Sobre mí
        </Link>
      </nav>
    </>
  )
}
