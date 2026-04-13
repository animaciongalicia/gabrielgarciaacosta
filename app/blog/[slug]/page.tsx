import Link from "next/link"
import { getPost, getAllSlugs, formatDate, CATEGORIAS, getRelatedPosts, getAdjacentPosts } from "@/lib/posts"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPost(slug)
    const cat = CATEGORIAS[post.categoria]
    return {
      // ✅ Fix: sin duplicar nombre — el template "%s | Gabriel García Acosta" lo añade
      title: post.title,
      description: post.resumen,
      // ✅ Fix: keywords específicos por post desde el frontmatter
      keywords: post.keywords,
      alternates: { canonical: `https://gabrielgarciaacosta.com/blog/${slug}` },
      openGraph: {
        title: post.title,
        description: post.resumen,
        type: "article",
        publishedTime: post.date,
        authors: ["Gabriel García Acosta"],
        section: cat?.nombre,
        images: post.imagen ? [{ url: post.imagen, width: 1200, height: 630, alt: post.title }] : [],
      },
      // ✅ Fix: twitter:title usa el título del artículo, no el nombre del autor
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.resumen,
        images: post.imagen ? [{ url: post.imagen, width: 1200, height: 630 }] : [],
      },
    }
  } catch {
    return { title: "Entrada no encontrada" }
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  let post
  try {
    post = await getPost(slug)
  } catch {
    notFound()
  }

  const cat = CATEGORIAS[post.categoria]
  const related = getRelatedPosts(slug, post.categoria, 2)
  const { prev, next } = getAdjacentPosts(slug)
  const BASE = "https://gabrielgarciaacosta.com"

  return (
    <>
      <header className="article-header">
        <div className="container container--narrow">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="sep" aria-hidden="true">›</span>
            {cat && (
              <>
                <Link href={`/categoria/${cat.slug}`}>{cat.nombre}</Link>
                <span className="sep" aria-hidden="true">›</span>
              </>
            )}
            <span className="current">{post.title}</span>
          </nav>

          <div className="article-meta">
            {cat && (
              <Link
                href={`/categoria/${cat.slug}`}
                className="article-cat-badge"
                style={{ "--badge-bg": cat.bg, "--badge-border": cat.border, "--badge-text": cat.text } as React.CSSProperties}
              >
                {cat.icono} {cat.nombre}
              </Link>
            )}
            <time className="article-date" dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="article-reading-time">{post.readingTime} min de lectura</span>
          </div>

          <h1 className="article-title">{post.title}</h1>
          <p className="article-lead">{post.resumen}</p>
        </div>
      </header>

      <article className="article-content">
        <div className="container container--narrow">
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

          {related.length > 0 && (
            <aside className="related-posts" aria-labelledby="related-heading">
              <h2 className="related-title" id="related-heading">Leer también</h2>
              <div className="related-grid">
                {related.map((r) => {
                  const rCat = CATEGORIAS[r.categoria]
                  return (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="related-card">
                      <span className="related-card-cat">{rCat?.icono} {rCat?.nombre}</span>
                      <span className="related-card-title">{r.title}</span>
                      <span className="related-card-date">{r.readingTime} min de lectura</span>
                    </Link>
                  )
                })}
              </div>
            </aside>
          )}

          {(prev || next) && (
            <nav className="post-nav" aria-label="Navegación entre entradas">
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="post-nav-link prev">
                  <span className="post-nav-label">← Anterior</span>
                  <span className="post-nav-title">{prev.title}</span>
                </Link>
              )}
              {next && (
                <Link href={`/blog/${next.slug}`} className="post-nav-link next">
                  <span className="post-nav-label">Siguiente →</span>
                  <span className="post-nav-title">{next.title}</span>
                </Link>
              )}
            </nav>
          )}

          <div style={{ marginTop: "var(--space-10)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--color-divider)" }}>
            <Link href={`/categoria/${post.categoria}`} className="article-back">
              ← Volver a {cat?.nombre ?? "la sección"}
            </Link>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org", "@type": "BlogPosting",
              headline: post.title, description: post.resumen,
              datePublished: post.date, dateModified: post.date,
              inLanguage: "es", url: `${BASE}/blog/${post.slug}`,
              mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },
              author: { "@type": "Person", name: "Gabriel García Acosta", url: BASE },
              publisher: { "@type": "Person", name: "Gabriel García Acosta", url: BASE },
              articleSection: cat?.nombre, keywords: post.keywords,
            },
            {
              "@context": "https://schema.org", "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: BASE },
                ...(cat ? [{ "@type": "ListItem", position: 2, name: cat.nombre, item: `${BASE}/categoria/${cat.slug}` }] : []),
                { "@type": "ListItem", position: cat ? 3 : 2, name: post.title, item: `${BASE}/blog/${post.slug}` },
              ],
            },
          ]),
        }}
      />
    </>
  )
}
