import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPost, getAllSlugs, formatDate, getRelatedPosts, getAdjacentPosts } from "@/lib/posts"
import { CATEGORIAS } from "@/lib/categorias"

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
      title: post.title,
      description: post.resumen,
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
      <header className="page-header">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="sep" aria-hidden="true">›</span>
            {cat && (
              <>
                <Link href={`/${cat.slug}`}>{cat.nombre}</Link>
                <span className="sep" aria-hidden="true">›</span>
              </>
            )}
            <span className="current">{post.title}</span>
          </nav>

          <div className="article-meta">
            {cat && (
              <Link
                href={`/${cat.slug}`}
                className="article-cat-link"
                style={{ "--cat-color": `var(--cat-${post.categoria})` } as React.CSSProperties}
              >
                {cat.nombre}
              </Link>
            )}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime} min de lectura</span>
          </div>

          <h1 className="article-title">{post.title}</h1>
          <p className="article-lead">{post.resumen}</p>
        </div>
      </header>

      <article className="section divider-top">
        <div className="container">
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

          {(prev || next) && (
            <nav className="post-nav" aria-label="Navegación entre entradas">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="post-nav-link prev">
                  <span className="post-nav-label">← Anterior</span>
                  <span className="post-nav-title">{prev.title}</span>
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="post-nav-link next">
                  <span className="post-nav-label">Siguiente →</span>
                  <span className="post-nav-title">{next.title}</span>
                </Link>
              ) : <span />}
            </nav>
          )}

          {related.length > 0 && (
            <aside style={{ marginTop: "var(--space-16)", paddingTop: "var(--space-10)", borderTop: "1px solid var(--color-divider)" }}>
              <div className="section-header" style={{ marginBottom: "var(--space-6)" }}>
                <h2 className="section-title">Leer también</h2>
                {cat && (
                  <Link
                    href={`/${cat.slug}`}
                    style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    Ver sección →
                  </Link>
                )}
              </div>
              <ul className="posts-list" role="list">
                {related.map((r) => {
                  const rCat = CATEGORIAS[r.categoria]
                  return (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="post-card">
                        <div className="post-body">
                          {rCat && (
                            <span
                              className="post-cat-label"
                              style={{ "--cat-color": `var(--cat-${r.categoria})` } as React.CSSProperties}
                            >
                              {rCat.nombre}
                            </span>
                          )}
                          <h3 className="post-title">{r.title}</h3>
                          <p className="post-excerpt">{r.resumen}</p>
                        </div>
                        <div className="post-meta-right">
                          <time className="post-date" dateTime={r.date}>{formatDate(r.date)}</time>
                          <span className="post-reading-time">{r.readingTime} min</span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </aside>
          )}
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
                ...(cat ? [{ "@type": "ListItem", position: 2, name: cat.nombre, item: `${BASE}/${cat.slug}` }] : []),
                { "@type": "ListItem", position: cat ? 3 : 2, name: post.title, item: `${BASE}/blog/${post.slug}` },
              ],
            },
          ]),
        }}
      />
    </>
  )
}
