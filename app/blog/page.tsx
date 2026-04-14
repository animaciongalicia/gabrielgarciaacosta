import Link from "next/link"
import type { Metadata } from "next"
import { getSortedPosts, formatDate } from "@/lib/posts"
import { CATEGORIAS } from "@/lib/categorias"

export const metadata: Metadata = {
  title: "Todas las entradas",
  description: "Todas las entradas del blog de Gabriel García Acosta sobre negocios, decisiones, inversiones y habilidades prácticas.",
  alternates: { canonical: "https://gabrielgarciaacosta.com/blog" },
}

export default function BlogPage() {
  const posts = getSortedPosts()

  return (
    <>
      <header className="page-header divider-bottom">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">Todas las entradas</span>
          </nav>
          <h1 className="page-title">Todas las entradas</h1>
          <p className="page-desc">
            {posts.length} {posts.length === 1 ? "entrada publicada" : "entradas publicadas"} hasta ahora.
          </p>
        </div>
      </header>

      <section className="section" aria-labelledby="blog-heading">
        <div className="container">
          <h2 className="sr-only" id="blog-heading">Lista de entradas</h2>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Aún no hay entradas. Vuelve pronto.</p>
            </div>
          ) : (
            <ul className="posts-list" role="list">
              {posts.map((post) => {
                const cat = CATEGORIAS[post.categoria]
                return (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="post-card">
                      <div className="post-body">
                        {cat && (
                          <span
                            className="post-cat-label"
                            style={{ "--cat-color": `var(--cat-${post.categoria})` } as React.CSSProperties}
                          >
                            {cat.nombre}
                          </span>
                        )}
                        <h2 className="post-title">{post.title}</h2>
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
          )}
        </div>
      </section>
    </>
  )
}
