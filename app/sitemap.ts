import { MetadataRoute } from 'next'
import { getSortedPosts } from '@/lib/posts'
import { CATEGORIA_SLUGS } from '@/lib/categorias'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPosts()
  const BASE = 'https://gabrielgarciaacosta.com'

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date + 'T00:00:00'),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const pillarEntries: MetadataRoute.Sitemap = CATEGORIA_SLUGS.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/sobre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...pillarEntries,
    ...postEntries,
  ]
}
