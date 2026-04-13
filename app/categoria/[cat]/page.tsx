import Link from 'next/link'
import { getPostsByCategoria, CATEGORIAS, formatDate, getAllSlugs } from '@/lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ cat: string }>
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIAS).map((cat) => ({ cat }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params
  const config = CATEGORIAS[cat]
  if (!config) return { title: 'Categoría no encontrada' }
  return {
    title: `${config.nombre} — Gabriel García Acosta`,
    description: config.descripcion,
    alternates: { canonical: `https://gabrielgarciaacosta.com/categoria/${cat}` },
    openGraph: {
      title: `${config.nombre} — Gabriel García Acosta`,
      description: config.descripcion,
      type: 'website',
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
      {/* CABECERA CATEGORÍA */}
      <header
        className="cat-page-header"
        style={{ borderBottom: `3px solid ${config.border}` }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">{config.nombre}</span>
          </nav>

          <div
            className="cat-page-icon"
            aria-hidden="true"
            style={{ background: config.bg, display: 'inline-block', padding: '12px', borderRadius: '16px', marginBottom: '16px' }}
          >
            {config.icono}
          </div>
          <h1 className="cat-page-title">{config.nombre}</h1>
          <p className="cat-page-desc">{config.descripcion}</p>
        </div>
      </header>

      {/* POSTS DE LA CATEGORÍA */}
      <section className="posts-section" aria-label={`Entradas de ${config.nombre}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {posts.length === 0 ? 'Próximamente' : 'Entradas'}
            </h2>
            <span className="section-meta">{posts.length} publicadas</span>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Todavía no hay entradas en esta sección. En cuanto tenga algo que contar, aparece aquí.</p>
            </div>
          ) : (
            <ul className="posts-list" role="list">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="post-card">
                    <span className="post-number" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="post-body">
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

      {/* JSON-LD CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${config.nombre} — Gabriel García Acosta`,
            description: config.descripcion,
            url: `https://gabrielgarciaacosta.com/categoria/${cat}`,
            inLanguage: 'es',
            author: {
              '@type': 'Person',
              name: 'Gabriel García Acosta',
              url: 'https://gabrielgarciaacosta.com',
            },
          }),
        }}
      />
    </>
  )
}
