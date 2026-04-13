import type { Metadata } from "next"
import Link from "next/link"
import { getPostsByCategoria, formatDate } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Tengo 13 años, vivo en A Coruña y escribo sobre negocios, decisiones e inversiones. Aquí te cuento por qué.",
  alternates: { canonical: "https://gabrielgarciaacosta.com/sobre" },
}

export default function SobrePage() {
  const posts = getPostsByCategoria("sobre-mi")

  return (
    <>
      <header className="cat-page-header">
        <div className="container container--narrow">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">Sobre mí</span>
          </nav>
          <h1 className="cat-page-title">Sobre mí</h1>
          <p className="cat-page-desc">
            Tengo 13 años, vivo en A Coruña y estoy en primero de ESO.
            Este blog es un diario de lo que voy aprendiendo.
          </p>
        </div>
      </header>

      <div className="cat-page-intro">
        <div className="container container--narrow">
          <div className="cat-intro-text">
            <p>Me llamo Gabriel García Acosta. Tengo 13 años y vivo en A Coruña, en Galicia.</p>
            <p>Este blog es un diario de aprendizaje. No busco hacerme famoso ni que me lea mucha gente. Busco dejar escrito lo que voy aprendiendo para poder volver aquí dentro de diez años y ver cómo pensaba.</p>
            <p>Escribo sobre negocios, decisiones, inversiones y habilidades prácticas. Cosas que no se enseñan en el colegio pero que me parecen muy útiles para la vida real.</p>
            <p>Cuando me equivoco en algo, también lo escribo. Me parece más honesto y más útil.</p>
          </div>
        </div>
      </div>

      {posts.length > 0 && (
        <section style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
          <div className="container container--narrow">
            <div className="section-header">
              <h2 className="section-title">Entradas relacionadas</h2>
            </div>
            <ul className="posts-list" role="list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="post-card">
                    <div className="post-body">
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">{post.resumen}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                      <time className="post-date" dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="post-date">{post.readingTime} min</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
