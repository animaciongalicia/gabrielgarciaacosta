import Link from "next/link"
import { getPostsByCategoria, CATEGORIAS, formatDate } from "@/lib/posts"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ cat: string }>
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIAS).map((cat) => ({ cat }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params
  const config = CATEGORIAS[cat]
  if (!config) return { title: "Categoría no encontrada" }
  return {
    title: config.nombre,
    description: config.descripcion,
    alternates: { canonical: `https://gabrielgarciaacosta.com/categoria/${cat}` },
    openGraph: {
      title: `${config.nombre} — Gabriel García Acosta`,
      description: config.descripcion,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${config.nombre} — Gabriel García Acosta`,
      description: config.descripcion,
    },
  }
}

export default async function CategoriaPage({ params }: Props) {
  const { cat } = await params
  const config = CATEGORIAS[cat]
  if (!config) notFound()

  const posts = getPostsByCategoria(cat)

  return (
    <>
      <header className="cat-page-header">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">{config.nombre}</span>
          </nav>
          <div
            className="cat-page-icon"
            aria-hidden="true"
            style={{ background: config.bg, display: "inline-block", padding: "12px", borderRadius: "16px", marginBottom: "16px" }}
          >
            {config.icono}
          </div>
          <h1 className="cat-page-title">{config.nombre}</h1>
          <p className="cat-page-desc">{config.descripcion}</p>
        </div>
      </header>

      {/* CONTENIDO EDITORIAL — el corazón de la página reina */}
      <section className="cat-page-intro" aria-labelledby="cat-intro-heading">
        <div className="container">
          <p className="section-label" id="cat-intro-heading">De qué va esta sección</p>
          <div className="cat-intro-text">
            {config.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <p className="cat-que-encontrar">
            <strong>En esta sección:</strong> {config.queEncontrar}
          </p>
          <div className="cat-temas" role="list" aria-label="Temas de esta sección">
            {config.temas.map((tema) => (
              <span
                key={tema}
                className="cat-tema-badge"
                role="listitem"
                style={{ background: config.bg, border: `1px solid ${config.border}`, color: config.text } as React.CSSProperties}
              >
                {tema}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="posts-section" aria-label={`Entradas de ${config.nombre}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{posts.length === 0 ? "Próximamente" : "Entradas"}</h2>
            {posts.length > 0 && (
              <span className="section-meta">{posts.length} {posts.length === 1 ? "publicada" : "publicadas"}</span>
            )}
          </div>
          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Todavía no hay entradas en esta sección.</p>
              <p>Estoy trabajando en ello. En cuanto tenga algo que contar, aparece aquí.</p>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--color-divider)", padding: "var(--space-8) 0 var(--space-16)" }}>
        <div className="container">
          <Link href="/" style={{ fontSize: "var(--text-sm)", color: "var(--color-primary)", textDecoration: "none" }}>
            ← Ver todas las entradas
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "CollectionPage",
            name: `${config.nombre} — Gabriel García Acosta`,
            description: config.descripcion,
            url: `https://gabrielgarciaacosta.com/categoria/${cat}`,
            inLanguage: "es",
            author: { "@type": "Person", name: "Gabriel García Acosta", url: "https://gabrielgarciaacosta.com" },
          }),
        }}
      />
    </>
  )
}
