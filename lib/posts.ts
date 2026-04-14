import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { CATEGORIAS, CATEGORIA_SLUGS, SERIES } from "./categorias"

export { CATEGORIAS, CATEGORIA_SLUGS, SERIES } from "./categorias"
export type { CategoriaConfig, SerieConfig } from "./categorias"

const postsDirectory = path.join(process.cwd(), "posts")

export interface PostMeta {
  slug: string
  title: string
  date: string
  categoria: string
  resumen: string
  imagen?: string
  keywords?: string[]
  serie?: string
  readingTime: number
}

export interface Heading {
  id: string
  text: string
  level: number
}

export interface Post extends PostMeta {
  content: string
  headings: Heading[]
}

function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
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
        serie: data.serie,
        readingTime: calcReadingTime(content),
      } as PostMeta
    })
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostsByCategoria(categoria: string): PostMeta[] {
  return getSortedPosts().filter((p) => p.categoria === categoria)
}

export function getPostsInSerie(serie: string): PostMeta[] {
  // Orden ascendente por fecha: parte 1 primero
  return getSortedPosts()
    .filter((p) => p.serie === serie)
    .reverse()
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
  let contentHtml = processedContent.toString()

  // Inyectar IDs en h2/h3 y extraer índice
  const headings: Heading[] = []
  contentHtml = contentHtml.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (_, tag, innerHtml) => {
    const text = innerHtml.replace(/<[^>]+>/g, "").trim()
    const id = slugifyHeading(text)
    const level = tag === "h2" ? 2 : 3
    headings.push({ id, text, level })
    return `<${tag} id="${id}">${innerHtml}</${tag}>`
  })

  return {
    slug,
    title: data.title,
    date: data.date,
    categoria: data.categoria,
    resumen: data.resumen,
    imagen: data.imagen,
    keywords: data.keywords ?? [],
    serie: data.serie,
    readingTime: calcReadingTime(content),
    content: contentHtml,
    headings,
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
  for (const cat of CATEGORIA_SLUGS) {
    counts[cat] = posts.filter((p) => p.categoria === cat).length
  }
  return counts
}
