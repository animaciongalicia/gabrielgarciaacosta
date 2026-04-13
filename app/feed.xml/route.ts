import { getSortedPosts, CATEGORIAS } from '@/lib/posts'

const BASE = 'https://gabrielgarciaacosta.com'

export async function GET() {
  const posts = getSortedPosts()

  const items = posts
    .map((post) => {
      const cat = CATEGORIAS[post.categoria]
      const pubDate = new Date(post.date + 'T00:00:00').toUTCString()
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${post.slug}</guid>
      <description><![CDATA[${post.resumen}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${cat?.nombre ?? post.categoria}]]></category>
      <author>gabriel@gabrielgarciaacosta.com (Gabriel García Acosta)</author>
    </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Gabriel García Acosta</title>
    <link>${BASE}</link>
    <description>Aprendiendo a pensar diferente desde los 13 años. Negocios, inversiones, decisiones y mentalidad desde A Coruña.</description>
    <language>es</language>
    <managingEditor>gabriel@gabrielgarciaacosta.com (Gabriel García Acosta)</managingEditor>
    <webMaster>gabriel@gabrielgarciaacosta.com (Gabriel García Acosta)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE}/og/primer-post.jpg</url>
      <title>Gabriel García Acosta</title>
      <link>${BASE}</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
