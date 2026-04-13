import Link from 'next/link'
import { getPost, getAllSlugs, formatDate, CATEGORIAS, getRelatedPosts } from '@/lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
      title: `${post.title} — Gabriel García Acosta`,
      description: post.resumen,
      alternates: { canonical: `https://gabrielgarciaacosta.com/blog/${slug}` },
      openGraph: {
        title: post.title,
        description: post.resumen,
        type: 'article',
        publishedTime: post.date,
        authors: ['Gabriel García Acosta'],
        section: cat?.nombre,
        images: post.imagen ? [{ url: post.imagen, width: 1200, height: 630 }] : [],
      },
    }
  } catch {
    return { title: 'Entrada no encontrada' }
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
  const related = getRelatedPosts(slug, post.categoria, 3)
  const BASE = 'https://gabrielgarciaacosta.com'

  return (
    <>
      {/* CABECERA */}
      <header className="article-header">
        <div className="container container--narrow">

          {/* Breadcrumbs visibles */}
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
                style={{
                  '--badge-bg': cat.bg,
                  '--badge-border': cat.border,
                  '--badge-text': cat.text,
                } as React.CSSProperties}
              >
                {cat.icono} {cat.nombre}
              </Link>
            )}
            <time className="article-date" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>

          <h1 className="article-title">{post.title}</h1>
          <p className="article-lead">{post.resumen}</p>
        </div>
      </header>

      {/* CONTENIDO */}
      <article className="article-content">
        <div className="container container--narrow">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* POSTS RELACIONADOS */}
          {related.length > 0 && (
            <aside className="related-posts" aria-labelledby="related-heading">
              <h2 className="related-title" id="related-heading">
                Más en {cat?.nombre ?? 'el blog'}
              </h2>
              <div className="related-grid">
                {related.map((r) => {
                  const rCat = CATEGORIAS[r.categoria]
                  return (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="related-card">
                      <span className="related-card-cat">
                        {rCat?.icono} {rCat?.nombre}
                      </span>
                      <span className="related-card-title">{r.title}</span>
                      <time className="related-card-date" dateTime={r.date}>
                        {formatDate(r.date)}
                      </time>
                    </Link>
                  )
                })}
              </div>
            </aside>
          )}
        </div>
      </article>

      {/* JSON-LD BlogPosting + Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.resumen,
              datePublished: post.date,
              dateModified: post.date,
              inLanguage: 'es',
              url: `${BASE}/blog/${post.slug}`,
              mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${post.slug}` },
              author: {
                '@type': 'Person',
                name: 'Gabriel García Acosta',
                url: BASE,
              },
              publisher: {
                '@type': 'Person',
                name: 'Gabriel García Acosta',
                url: BASE,
              },
              articleSection: cat?.nombre,
              keywords: [cat?.nombre, 'negocios', 'aprendizaje', 'A Coruña', 'Galicia'],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE },
                ...(cat ? [{ '@type': 'ListItem', position: 2, name: cat.nombre, item: `${BASE}/categoria/${cat.slug}` }] : []),
                { '@type': 'ListItem', position: cat ? 3 : 2, name: post.title, item: `${BASE}/blog/${post.slug}` },
              ],
            },
          ]),
        }}
      />
    </>
  )
}
