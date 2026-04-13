import Link from 'next/link'
import { getPost, getAllSlugs, formatDate, CATEGORIAS } from '@/lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPost(slug)
    return {
      title: post.title,
      description: post.resumen,
      openGraph: {
        title: post.title,
        description: post.resumen,
        type: 'article',
        publishedTime: post.date,
        authors: ['Gabriel García Acosta'],
        images: post.imagen ? [{ url: post.imagen, width: 1200, height: 630 }] : [],
      },
    }
  } catch {
    return { title: 'Post no encontrado' }
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

  return (
    <>
      {/* CABECERA DEL ARTÍCULO */}
      <header className="article-header">
        <div className="container container--narrow">
          <Link href="/" className="article-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Volver al inicio
          </Link>

          <div className="article-meta">
            <span className="article-cat">
              {CATEGORIAS[post.categoria] || post.categoria}
            </span>
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
        </div>
      </article>

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.resumen,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: 'Gabriel García Acosta',
              url: 'https://gabrielgarciaacosta.com',
            },
            publisher: {
              '@type': 'Person',
              name: 'Gabriel García Acosta',
            },
            inLanguage: 'es',
            url: `https://gabrielgarciaacosta.com/blog/${post.slug}`,
          }),
        }}
      />
    </>
  )
}
