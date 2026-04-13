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
  intro: string[]
  queEncontrar: string
  temas: string[]
}

export const CATEGORIAS: Record<string, CategoriaConfig> = {
  mentalidad: {
    slug: "mentalidad",
    nombre: "Pensar diferente",
    descripcion: "Mentalidad aplicada. Cómo tomar decisiones que la mayoría no toma, y por qué eso importa más que el conocimiento técnico.",
    icono: "🧠",
    bg: "var(--cat-mentalidad-bg)",
    border: "var(--cat-mentalidad-border)",
    text: "var(--cat-mentalidad-text)",
    intro: [
      "Aquí escribo sobre cómo funciona el pensamiento. No lo que dicen los libros de autoayuda. Lo que voy observando yo.",
      "Por qué la gente toma decisiones raras. Por qué yo las tomo a veces también. Por qué aprender a pensar mejor es la habilidad más útil que existe y casi nadie la trabaja en serio.",
      "No busco tener razón en todo. Busco entender mejor. Hay una diferencia grande entre las dos cosas.",
    ],
    queEncontrar: "Artículos sobre sesgos, razonamiento crítico, ideas contraintuitivas y casos donde la lógica habitual falla.",
    temas: ["Sesgos cognitivos", "Razonamiento crítico", "Cómo aprender de verdad", "Ideas contraintuitivas"],
  },
  negocios: {
    slug: "negocios",
    nombre: "Negocios reales",
    descripcion: "Casos concretos, sin teoría vacía. Lo que funciona, lo que no funciona, y lo que aprendí haciéndolo.",
    icono: "💡",
    bg: "var(--cat-negocios-bg)",
    border: "var(--cat-negocios-border)",
    text: "var(--cat-negocios-text)",
    intro: [
      "No me interesan los negocios de papel. Me interesan los negocios reales: qué pasa cuando alguien vende algo, qué hace que una cosa se compre y otra no, cómo funciona el dinero de verdad cuando intentas ganarlo.",
      "Con 13 años no tengo empresa. Pero sí tengo ojos abiertos y ganas de entender cómo funciona esto antes de que alguien me lo explique mal.",
      "Aquí escribo sobre mis propios experimentos, casos que observo y lecciones que aprendo en la práctica. Cuando me equivoco, también lo escribo.",
    ],
    queEncontrar: "Experimentos propios, casos reales, análisis de cómo funciona el dinero y los negocios a nivel práctico.",
    temas: ["Vender cosas reales", "Cómo funciona un precio", "Experimentos pequeños", "Lo que observo en negocios de adultos"],
  },
  decisiones: {
    slug: "decisiones",
    nombre: "Decisiones & errores",
    descripcion: "Decisiones que tomé, por qué las tomé, y qué pasó. Los errores también cuentan, a veces más.",
    icono: "⚖️",
    bg: "var(--cat-decisiones-bg)",
    border: "var(--cat-decisiones-border)",
    text: "var(--cat-decisiones-text)",
    intro: [
      "Las decisiones son el tema más infravalorado que existe. Todo el mundo las toma constantemente y casi nadie las piensa en serio.",
      "Aquí escribo sobre las mías: por qué las tomé, qué pasó, qué hubiera hecho distinto. Y sobre las de otros que me parecen interesantes de analizar.",
      "Los errores también entran aquí. Un error bien analizado vale más que diez decisiones correctas que no entiendes por qué funcionaron.",
    ],
    queEncontrar: "Análisis de decisiones reales, errores propios con aprendizaje, y formas de pensar mejor antes de actuar.",
    temas: ["Por qué tomé cierta decisión", "Qué falló y por qué", "Cómo pienso antes de elegir", "Decisiones difíciles a los 13"],
  },
  inversiones: {
    slug: "inversiones",
    nombre: "Inversiones",
    descripcion: "Aprender a mover el dinero desde joven. Conceptos, casos y razonamientos sobre cómo crecer a largo plazo.",
    icono: "📈",
    bg: "var(--cat-inversiones-bg)",
    border: "var(--cat-inversiones-border)",
    text: "var(--cat-inversiones-text)",
    intro: [
      "Empezar a entender el dinero con 13 años es una ventaja enorme. No porque vayas a hacerte rico inmediatamente, sino porque tienes tiempo para equivocarte, aprender y que el interés compuesto haga su trabajo.",
      "La mayoría de los adultos empiezan a pensar en inversiones demasiado tarde, cuando ya han perdido los años más valiosos.",
      "Aquí escribo lo que voy aprendiendo sobre inversiones, ahorro y cómo funciona el dinero a largo plazo. Desde cero, sin pretender que sé más de lo que sé.",
    ],
    queEncontrar: "Conceptos básicos de inversión, cómo funciona el dinero a largo plazo, y lo que voy aprendiendo desde cero.",
    temas: ["Interés compuesto", "Por qué ahorrar no es suficiente", "Conceptos que nadie explica bien", "Errores comunes con el dinero"],
  },
  habilidades: {
    slug: "habilidades",
    nombre: "Habilidades prácticas",
    descripcion: "Ventas, negociación, foco, hablar en público. Las habilidades que no enseñan en el cole pero que más importan.",
    icono: "🛠️",
    bg: "var(--cat-habilidades-bg)",
    border: "var(--cat-habilidades-border)",
    text: "var(--cat-habilidades-text)",
    intro: [
      "Hay habilidades que no se enseñan en el colegio pero que son las que más valen en la vida real. Vender, negociar, comunicar bien, mantener el foco, hablar con gente.",
      "Cosas que parecen obvias pero que casi nadie trabaja de forma consciente. Yo tampoco las trabajo perfectamente. Pero sí intento mejorar en ellas.",
      "Aquí escribo sobre las habilidades que estoy intentando desarrollar y lo que voy aprendiendo en el proceso. Con los fallos incluidos.",
    ],
    queEncontrar: "Artículos sobre ventas, comunicación, negociación, foco y hábitos útiles — con ejemplos reales, no teoría.",
    temas: ["Cómo vender sin ser pesado", "Hablar en público", "Negociar desde cero", "Mantener el foco", "Hábitos que funcionan"],
  },
  "sobre-mi": {
    slug: "sobre-mi",
    nombre: "Sobre mí",
    descripcion: "Quién soy, por qué escribo esto, y cómo pienso.",
    icono: "👤",
    bg: "var(--cat-sobre-mi-bg)",
    border: "var(--cat-sobre-mi-border)",
    text: "var(--cat-sobre-mi-text)",
    intro: [
      "Me llamo Gabriel García Acosta. Tengo 13 años y vivo en A Coruña, en Galicia.",
      "Este blog es un diario de aprendizaje. No busco hacerme famoso ni que me lea mucha gente. Busco dejar escrito lo que voy aprendiendo para poder volver aquí dentro de diez años.",
    ],
    queEncontrar: "Entradas sobre por qué escribo, qué me interesa y cómo pienso.",
    temas: ["Por qué escribo", "Cómo aprendo", "Reflexiones personales"],
  },
}
