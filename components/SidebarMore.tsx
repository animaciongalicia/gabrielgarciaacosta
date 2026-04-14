import Link from "next/link"
import type { PostMeta } from "@/lib/posts"
import { CATEGORIAS } from "@/lib/categorias"

interface Props {
  posts: PostMeta[]
  currentSlug: string
  currentCategoria: string
  limit?: number
}

/**
 * Selecciona hasta `limit` posts para el sidebar "Otras lecturas".
 * Prioriza diversidad de categoría, luego más recientes.
 */
function pickPosts(posts: PostMeta[], currentSlug: string, currentCategoria: string, limit: number): PostMeta[] {
  const eligible = posts.filter((p) => p.slug !== currentSlug)

  const byOtherCategory = new Map<string, PostMeta>()
  for (const post of eligible) {
    if (post.categoria !== currentCategoria && !byOtherCategory.has(post.categoria)) {
      byOtherCategory.set(post.categoria, post)
    }
  }
  const diverse = Array.from(byOtherCategory.values())
  if (diverse.length >= limit) return diverse.slice(0, limit)

  const picked = new Set(diverse.map((p) => p.slug))
  const rest = eligible.filter((p) => !picked.has(p.slug))
  return [...diverse, ...rest].slice(0, limit)
}

export default function SidebarMore({ posts, currentSlug, currentCategoria, limit = 5 }: Props) {
  const picked = pickPosts(posts, currentSlug, currentCategoria, limit)
  if (picked.length === 0) return null

  return (
    <aside className="sidebar-more" aria-labelledby="sidebar-more-heading">
      <div className="sidebar-more-label" id="sidebar-more-heading">Otras lecturas</div>
      <ul className="sidebar-more-list" role="list">
        {picked.map((post) => {
          const cat = CATEGORIAS[post.categoria]
          return (
            <li key={post.slug} className="sidebar-more-item">
              <Link href={`/blog/${post.slug}`} className="sidebar-more-link">
                {cat && (
                  <span
                    className="sidebar-more-cat"
                    style={{ "--cat-color": `var(--cat-${post.categoria})` } as React.CSSProperties}
                  >
                    {cat.nombre}
                  </span>
                )}
                <span className="sidebar-more-title">{post.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
