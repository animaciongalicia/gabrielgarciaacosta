import Link from "next/link"
import type { Metadata } from "next"
import { getSortedPosts, formatDate } from "@/lib/posts"
import { CATEGORIAS } from "@/lib/categorias"

export const metadata: Metadata = {
  title: "Gabriel García Acosta — Aprendiendo a pensar diferente",
  alternates: { canonical: "https://gabrielgarciaacosta.com" },
}

export default function Home() {
  const posts = getSortedPosts()

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

      <section className="section divider-top" aria-labelledby="posts-heading">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="posts-heading">Últimas entradas</h2>
            <span className="section-meta">
              {posts.length} {posts.length === 1 ? "publicada" : "publicadas"}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Aún no hay entradas. Vuelve pronto.</p>
            </div>
          ) : (
            <>
              <ul className="posts-list" role="list">
                {posts.slice(0, 6).map((post, i) => {
                  const cat = CATEGORIAS[post.categoria]
                  const isFeatured = i === 0
                  return (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className={`post-card${isFeatured ? " post-card--featured" : ""}`}
                        style={isFeatured ? ({ "--cat-color": `var(--cat-${post.categoria})` } as React.CSSProperties) : undefined}
                      >
                        <div className="post-body">
                          {cat && (
                            <span
                              className="post-cat-label"
                              style={{ "--cat-color": `var(--cat-${post.categoria})` } as React.CSSProperties}
                            >
                              {cat.nombre}
                            </span>
                          )}
                          <h3 className="post-title">{post.title}</h3>
                          <p className="post-excerpt">{post.resumen}</p>
                        </div>
                        <div className="post-meta-right">
                          <time className="post-date" dateTime={post.date}>{formatDate(post.date)}</time>
                          <span className="post-reading-time">{post.readingTime} min</span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              {posts.length > 6 && (
                <div className="posts-ver-todas">
                  <Link href="/blog" className="posts-ver-todas-link">
                    Ver todas las entradas ({posts.length})
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              )}
            </>
          )}
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
