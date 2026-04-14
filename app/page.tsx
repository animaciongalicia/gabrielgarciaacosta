import Link from "next/link"
import type { Metadata } from "next"
import { getSortedPosts, formatDate, getPostCountByCategoria } from "@/lib/posts"
import { CATEGORIAS, CATEGORIA_SLUGS } from "@/lib/categorias"

export const metadata: Metadata = {
  title: "Gabriel García Acosta — Aprendiendo a pensar diferente",
  alternates: { canonical: "https://gabrielgarciaacosta.com" },
}

export default function Home() {
  const posts = getSortedPosts()
  const featured = posts[0]
  const rest = posts.slice(1, 5)
  const counts = getPostCountByCategoria()

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="var(--color-primary)" aria-hidden="true">
              <circle cx="3" cy="3" r="3" />
            </svg>
            A Coruña · 13 años · Primero de ESO
          </div>
          <h1 className="hero-title">Aprendiendo a <em>pensar</em> diferente</h1>
          <p className="hero-desc">
            Escribo lo que voy aprendiendo sobre negocios, decisiones e inversiones.
            No para parecer listo. Para recordarlo dentro de diez años.
          </p>
        </div>
      </section>

      {featured && (() => {
        const cat = CATEGORIAS[featured.categoria]
        return (
          <section className="home-featured" aria-labelledby="featured-heading">
            <div className="container">
              <Link
                href={`/blog/${featured.slug}`}
                className="home-featured-card"
                style={{ "--cat-color": `var(--cat-${featured.categoria})` } as React.CSSProperties}
              >
                <span className="home-featured-eyebrow">
                  Última entrada
                  {cat && <><span aria-hidden="true">·</span><span className="home-featured-cat">{cat.nombre}</span></>}
                </span>
                <h2 className="home-featured-title" id="featured-heading">{featured.title}</h2>
                <p className="home-featured-excerpt">{featured.resumen}</p>
                <div className="home-featured-meta">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{featured.readingTime} min de lectura</span>
                  <span className="home-featured-cta">
                    Leer
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )
      })()}

      {rest.length > 0 && (
        <section className="section divider-top" aria-labelledby="posts-heading">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title" id="posts-heading">Más entradas</h2>
              {posts.length > 5 && (
                <Link href="/blog" className="section-meta-link">
                  Ver todas ({posts.length}) →
                </Link>
              )}
            </div>

            <ul className="home-grid" role="list">
              {rest.map((post) => {
                const cat = CATEGORIAS[post.categoria]
                return (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="home-card"
                      style={{ "--cat-color": `var(--cat-${post.categoria})` } as React.CSSProperties}
                    >
                      <div className="home-card-top">
                        {cat && (
                          <span className="home-card-cat">{cat.nombre}</span>
                        )}
                        <h3 className="home-card-title">{post.title}</h3>
                        <p className="home-card-excerpt">{post.resumen}</p>
                      </div>
                      <div className="home-card-meta">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime} min</span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <section className="section divider-top">
          <div className="container">
            <div className="empty-state">
              <p>Aún no hay entradas. Vuelve pronto.</p>
            </div>
          </div>
        </section>
      )}

      <section className="section divider-top" aria-labelledby="explore-heading">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="explore-heading">Explora por tema</h2>
            <span className="section-meta">5 secciones</span>
          </div>

          <ul className="explore-grid" role="list">
            {CATEGORIA_SLUGS.map((slug) => {
              const cat = CATEGORIAS[slug]
              const count = counts[slug] ?? 0
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="explore-card"
                    style={{ "--cat-color": `var(--cat-${slug})` } as React.CSSProperties}
                  >
                    <span className="explore-icon" aria-hidden="true">{cat.icono}</span>
                    <div className="explore-body">
                      <h3 className="explore-name">{cat.nombre}</h3>
                      <p className="explore-desc">{cat.descripcion.split(".")[0]}.</p>
                    </div>
                    <span className="explore-count">
                      {count} {count === 1 ? "entrada" : "entradas"}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "Blog",
            name: "Gabriel García Acosta",
            url: "https://gabrielgarciaacosta.com",
            description: "Blog personal de Gabriel García Acosta. Aprendizaje sobre negocios, inversiones y mentalidad desde los 13 años.",
            inLanguage: "es",
            author: {
              "@type": "Person",
              name: "Gabriel García Acosta",
              url: "https://gabrielgarciaacosta.com",
              description: "Estudiante de 1º ESO en A Coruña. Escribe sobre negocios, decisiones e inversiones.",
              address: { "@type": "PostalAddress", addressLocality: "A Coruña", addressRegion: "Galicia", addressCountry: "ES" },
            },
          }),
        }}
      />
    </>
  )
}
