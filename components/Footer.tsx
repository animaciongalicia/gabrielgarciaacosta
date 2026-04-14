import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">

          {/* Marca */}
          <div className="footer-brand">
            <p className="footer-copy">
              © {year} <strong>Gabriel García Acosta</strong>
            </p>
            <p className="footer-copy">A Coruña, Galicia</p>
            <p className="footer-copy footer-copy--faint">Empecé esto con 13 años.</p>
          </div>

          {/* Columna 1 */}
          <nav className="footer-col" aria-label="Sección pensar y decisiones">
            <Link href="/mentalidad" className="footer-nav-link">Pensar diferente</Link>
            <Link href="/decisiones" className="footer-nav-link">Decisiones &amp; errores</Link>
            <Link href="/habilidades" className="footer-nav-link">Habilidades prácticas</Link>
          </nav>

          {/* Columna 2 */}
          <nav className="footer-col" aria-label="Sección negocios e inversiones">
            <Link href="/negocios" className="footer-nav-link">Negocios reales</Link>
            <Link href="/inversiones" className="footer-nav-link">Inversiones</Link>
          </nav>

          {/* Columna 3 */}
          <nav className="footer-col" aria-label="Sobre y RSS">
            <Link href="/sobre" className="footer-nav-link">Sobre mí</Link>
            <a href="/feed.xml" className="footer-nav-link footer-rss" aria-label="RSS Feed">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
              </svg>
              RSS
            </a>
          </nav>

        </div>
      </div>
    </footer>
  )
}
