// Configuración de categorías — sin imports de Node.js
// Se puede importar tanto en Server Components como en Client Components

export interface CategoriaConfig {
  slug: string
  nombre: string
  descripcion: string
  icono: string
  bg: string
  border: string
  text: string
}

export const CATEGORIAS: Record<string, CategoriaConfig> = {
  mentalidad: {
    slug: 'mentalidad',
    nombre: 'Pensar diferente',
    descripcion:
      'Mentalidad aplicada. Cómo tomar decisiones que la mayoría no toma, y por qué eso importa más que el conocimiento técnico.',
    icono: '🧠',
    bg: 'var(--cat-mentalidad-bg)',
    border: 'var(--cat-mentalidad-border)',
    text: 'var(--cat-mentalidad-text)',
  },
  negocios: {
    slug: 'negocios',
    nombre: 'Negocios reales',
    descripcion:
      'Casos concretos, sin teoría vacía. Lo que funciona, lo que no funciona, y lo que aprendí haciéndolo.',
    icono: '💡',
    bg: 'var(--cat-negocios-bg)',
    border: 'var(--cat-negocios-border)',
    text: 'var(--cat-negocios-text)',
  },
  decisiones: {
    slug: 'decisiones',
    nombre: 'Decisiones & errores',
    descripcion:
      'Decisiones que tomé, por qué las tomé, y qué pasó. Los errores también cuentan, a veces más.',
    icono: '⚖️',
    bg: 'var(--cat-decisiones-bg)',
    border: 'var(--cat-decisiones-border)',
    text: 'var(--cat-decisiones-text)',
  },
  inversiones: {
    slug: 'inversiones',
    nombre: 'Inversiones',
    descripcion:
      'Aprender a mover el dinero desde joven. Conceptos, casos y razonamientos sobre cómo crecer a largo plazo.',
    icono: '📈',
    bg: 'var(--cat-inversiones-bg)',
    border: 'var(--cat-inversiones-border)',
    text: 'var(--cat-inversiones-text)',
  },
  habilidades: {
    slug: 'habilidades',
    nombre: 'Habilidades prácticas',
    descripcion:
      'Ventas, negociación, foco, hablar en público. Las habilidades que no enseñan en el cole pero que más importan.',
    icono: '🛠️',
    bg: 'var(--cat-habilidades-bg)',
    border: 'var(--cat-habilidades-border)',
    text: 'var(--cat-habilidades-text)',
  },
  'sobre-mi': {
    slug: 'sobre-mi',
    nombre: 'Sobre mí',
    descripcion: 'Quién soy, por qué escribo esto, y cómo pienso.',
    icono: '👤',
    bg: 'var(--cat-sobre-mi-bg)',
    border: 'var(--cat-sobre-mi-border)',
    text: 'var(--cat-sobre-mi-text)',
  },
}
