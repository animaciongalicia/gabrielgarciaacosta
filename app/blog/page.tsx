import Link from "next/link"
import type { Metadata } from "next"
import { getSortedPosts, formatDate } from "@/lib/posts"
import { CATEGORIAS } from "@/lib/categorias"

export const metadata: Metadata = {
  title: "Blog — Todas las entradas",
  description: "Todas las entradas del blog de Gabriel García Acosta sobre negocios, decisiones, inversiones, mentalidad y habilidades prácticas.",
  alternates: { canonical: "https://gabrielgarciaacosta.com/blog" },
}

export default function BlogPage() {
  const posts = getSortedPosts()

  return (
    <>
      <header className="page-header">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">Blog</span>
          </nav>
          <div className="page-eyebrow" style={{ color: "var(--color-primary)" }}>
            Blog completo
          </div>
          <h1 className="page-title">Todo lo que he escrito hasta ahora.</h1>
          <p className="page-desc">
            {posts.length} {posts.length === 1 ? "entrada" : "entradas"} sobre negocios, decisiones, inversiones, mentalidad y habilidades. Ordenadas de más reciente a más antigua.
          </p>
        </div>
      </header>

      <section className="section divider-top" aria-labelledby="blog-heading">
        <div className="container">
          <h2 className="sr-only" id="blog-heading">Lista de entradas</h2>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Aún no hay entradas. Vuelve pronto.</p>
            </div>
          ) : (
            <ul className="blog-grid" role="list">
              {posts.map((post) => {
                const cat = CATEGORIAS[post.categoria]
                return (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="blog-card"
                      style={{ "--cat-color": `var(--cat-${post.categoria})` } as React.CSSProperties}
                    >
                      <div className="blog-card-top">
                        {cat && (
                          <span className="blog-card-cat">{cat.nombre}</span>
                        )}
                        <h3 className="blog-card-title">{post.title}</h3>
                        <p className="blog-card-excerpt">{post.resumen}</p>
                      </div>
                      <div className="blog-card-meta">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime} min</span>
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
