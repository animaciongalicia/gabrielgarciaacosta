import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { CATEGORIAS } from "./categorias"

export { CATEGORIAS } from "./categorias"
export type { CategoriaConfig } from "./categorias"

const postsDirectory = path.join(process.cwd(), "posts")

export interface PostMeta {
  slug: string
  title: string
  date: string
  categoria: string
  resumen: string
  imagen?: string
  keywords?: string[]
  readingTime: number
}

export interface Post extends PostMeta {
  content: string
}

function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getSortedPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fn) => fn.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)
      return {
        slug,
        title: data.title,
        date: data.date,
        categoria: data.categoria,
        resumen: data.resumen,
        imagen: data.imagen,
        keywords: data.keywords ?? [],
        readingTime: calcReadingTime(content),
      } as PostMeta
    })
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostsByCategoria(categoria: string): PostMeta[] {
  return getSortedPosts().filter((p) => p.categoria === categoria)
}

export function getRelatedPosts(currentSlug: string, categoria: string, limit = 2): PostMeta[] {
  return getSortedPosts()
    .filter((p) => p.slug !== currentSlug && p.categoria === categoria)
    .slice(0, limit)
}

export function getAdjacentPosts(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const all = getSortedPosts()
  const index = all.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.filter((fn) => fn.endsWith(".md")).map((fn) => fn.replace(/\.md$/, ""))
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()
  return {
    slug,
    title: data.title,
    date: data.date,
    categoria: data.categoria,
    resumen: data.resumen,
    imagen: data.imagen,
    keywords: data.keywords ?? [],
    readingTime: calcReadingTime(content),
    content: contentHtml,
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00")
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getPostCountByCategoria(): Record<string, number> {
  const posts = getSortedPosts()
  const counts: Record<string, number> = {}
  for (const cat of Object.keys(CATEGORIAS)) {
    counts[cat] = posts.filter((p) => p.categoria === cat).length
  }
  return counts
}
