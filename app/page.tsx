import Link from 'next/link'
import { getSortedPosts, formatDate, CATEGORIAS, getPostCountByCategoria } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gabriel García Acosta — Aprendiendo a pensar diferente',
  alternates: { canonical: 'https://gabrielgarciaacosta.com' },
}

export default function Home() {
  const posts = getSortedPosts()
  const counts = getPostCountByCategoria()

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="var(--color-primary)" aria-hidden="true">
              <circle cx="3" cy="3" r="3" />
            </svg>
            A Coruña · 13 años · Primero de ESO
          </div>
          <h1 className="hero-title">
            Aprendiendo a <em>pensar</em> diferente
          </h1>
          <p className="hero-desc">
            Escribo lo que voy aprendiendo sobre negocios, decisiones e inversiones.
            No para parecer listo. Para recordarlo dentro de diez años.
          </p>
        </div>
      </section>

      {/* GRID CATEGORÍAS */}
      <section className="categories-section" aria-labelledby="cats-heading">
        <div className="container">
          <p className="section-label" id="cats-heading">Secciones</p>
          <div className="categories-grid">
            {Object.values(CATEGORIAS).map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="category-card"
                style={{
                  '--cat-bg': cat.bg,
                  '--cat-border': cat.border,
                  '--cat-text': cat.text,
                } as React.CSSProperties}
                aria-label={`${cat.nombre} — ${counts[cat.slug] ?? 0} entradas`}
              >
                <span className="cat-icon" aria-hidden="true">{cat.icono}</span>
                <span className="cat-name">{cat.nombre}</span>
                <span className="cat-count">
                  {counts[cat.slug] ?? 0} {(counts[cat.slug] ?? 0) === 1 ? 'entrada' : 'entradas'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ÚLTIMAS ENTRADAS */}
      <section className="posts-section" aria-labelledby="posts-heading">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="posts-heading">Últimas entradas</h2>
            <span className="section-meta">{posts.length} publicadas</span>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Aún no hay entradas. Vuelve pronto.</p>
            </div>
          ) : (
            <ul className="posts-list" role="list">
              {posts.map((post, i) => {
                const cat = CATEGORIAS[post.categoria]
                return (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="post-card">
                      <span className="post-number" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="post-body">
                        {cat && (
                          <span
                            className="post-cat-badge"
                            style={{
                              '--badge-bg': cat.bg,
                              '--badge-border': cat.border,
                              '--badge-text': cat.text,
                            } as React.CSSProperties}
                          >
                            {cat.icono} {cat.nombre}
                          </span>
                        )}
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-excerpt">{post.resumen}</p>
                      </div>
                      <time className="post-date" dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      {/* JSON-LD Person + Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Gabriel García Acosta',
            url: 'https://gabrielgarciaacosta.com',
            description: 'Blog personal de Gabriel García Acosta. Aprendizaje sobre negocios, inversiones y mentalidad desde los 13 años.',
            inLanguage: 'es',
            author: {
              '@type': 'Person',
              name: 'Gabriel García Acosta',
              url: 'https://gabrielgarciaacosta.com',
              description: 'Estudiante de 1º ESO en A Coruña. Escribe sobre negocios, decisiones e inversiones.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'A Coruña',
                addressRegion: 'Galicia',
                addressCountry: 'ES',
              },
            },
          }),
        }}
      />
    </>
  )
}
