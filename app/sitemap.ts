import { MetadataRoute } from 'next'
import { getSortedPosts, CATEGORIAS } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPosts()
  const BASE = 'https://gabrielgarciaacosta.com'

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date + 'T00:00:00'),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const catEntries: MetadataRoute.Sitemap = Object.keys(CATEGORIAS).map((slug) => ({
    url: `${BASE}/categoria/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...catEntries,
    ...postEntries,
  ]
}
