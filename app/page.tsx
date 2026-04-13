import Link from 'next/link'
import { getSortedPosts, formatDate, CATEGORIAS } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gabriel García Acosta — Aprendiendo a pensar diferente',
}

export default function Home() {
  const posts = getSortedPosts()

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-label">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="var(--color-primary)" aria-hidden="true">
              <circle cx="3" cy="3" r="3" />
            </svg>
            A Coruña · 13 años
          </div>
          <h1 className="hero-title">
            Aprendiendo a <em>pensar</em> diferente
          </h1>
          <p className="hero-desc">
            Escribo lo que voy aprendiendo sobre negocios, decisiones e inversiones.
            No para parecer listo. Para recordarlo dentro de diez años y ver cómo pensaba.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="posts-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Entradas</h2>
            <span className="section-meta">{posts.length} publicadas</span>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Aún no hay entradas. Vuelve pronto.</p>
            </div>
          ) : (
            <ul className="posts-list" role="list">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="post-card">
                    <span className="post-number">{String(i + 1).padStart(2, '0')}</span>
                    <div className="post-body">
                      <span className="post-cat">
                        {CATEGORIAS[post.categoria] || post.categoria}
                      </span>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">{post.resumen}</p>
                    </div>
                    <time className="post-date" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* JSON-LD Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Gabriel García Acosta',
            url: 'https://gabrielgarciaacosta.com',
            description:
              'Estudiante de 1º ESO en A Coruña. Escribo lo que aprendo sobre negocios, decisiones e inversiones.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'A Coruña',
              addressRegion: 'Galicia',
              addressCountry: 'ES',
            },
          }),
        }}
      />
    </>
  )
}
