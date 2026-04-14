import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPostsByCategoria, formatDate } from "@/lib/posts"
import { CATEGORIAS, CATEGORIA_SLUGS } from "@/lib/categorias"

interface Props {
  params: Promise<{ pillar: string }>
}

export async function generateStaticParams() {
  return CATEGORIA_SLUGS.map((pillar) => ({ pillar }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar } = await params
  const config = CATEGORIAS[pillar]
  if (!config) return { title: "Sección no encontrada" }
  return {
    title: config.nombre,
    description: config.descripcion,
    alternates: { canonical: `https://gabrielgarciaacosta.com/${pillar}` },
    openGraph: {
      title: `${config.nombre} — Gabriel García Acosta`,
      description: config.descripcion,
      type: "website",
      url: `https://gabrielgarciaacosta.com/${pillar}`,
    },
    twitter: {
      card: "summary",
      title: `${config.nombre} — Gabriel García Acosta`,
      description: config.descripcion,
    },
  }
}

export default async function PillarPage({ params }: Props) {
  const { pillar } = await params
  const config = CATEGORIAS[pillar]
  if (!config) notFound()

  const posts = getPostsByCategoria(pillar)
  const BASE = "https://gabrielgarciaacosta.com"
  const catColorVar = `var(--cat-${pillar})`

  return (
    <>
      <header className="pillar-header" style={{ "--cat-color": catColorVar } as React.CSSProperties}>
        <div className="pillar-accent-bar" aria-hidden="true" />
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">{config.nombre}</span>
          </nav>

          <div className="pillar-hero">
            <div className="page-eyebrow">
              {config.nombre}
            </div>
            <h1 className="page-title">{config.descripcion.split(".")[0]}.</h1>
            <p className="page-desc">
              {config.descripcion.split(".").slice(1).join(".").trim()}
            </p>
            <div className="pillar-counter">
              <strong>{posts.length}</strong>
              {posts.length === 1 ? "entrada publicada" : "entradas publicadas"}
            </div>
          </div>
        </div>
      </header>

      <section className="section divider-top">
        <div className="container">
          <div className="page-intro">
            {config.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {config.temas.length > 0 && (
            <div className="page-meta-row">
              <span className="page-meta-label">Temas:</span>
              {config.temas.map((tema, i) => (
                <span key={tema} style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                  {tema}{i < config.temas.length - 1 ? " ·" : ""}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section divider-top">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {posts.length === 0 ? "Aún no hay entradas" : "Entradas"}
            </h2>
            {posts.length > 0 && (
              <span className="section-meta">
                {posts.length} {posts.length === 1 ? "publicada" : "publicadas"}
              </span>
            )}
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Todavía no he escrito nada en esta sección.</p>
              <p>Estoy trabajando en ello.</p>
            </div>
          ) : (
            <ul className="pillar-posts-grid" role="list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="home-card"
                    style={{ "--cat-color": catColorVar } as React.CSSProperties}
                  >
                    <div className="home-card-top">
                      <span className="home-card-cat">{config.nombre}</span>
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
              ))}
            </ul>
          )}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${config.nombre} — Gabriel García Acosta`,
            description: config.descripcion,
            url: `${BASE}/${pillar}`,
            inLanguage: "es",
            author: { "@type": "Person", name: "Gabriel García Acosta", url: BASE },
          }),
        }}
      />
    </>
  )
}
