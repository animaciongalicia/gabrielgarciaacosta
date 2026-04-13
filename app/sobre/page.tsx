import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Tengo 13 años, vivo en A Coruña y escribo sobre negocios, decisiones e inversiones. Aquí te cuento por qué.",
  alternates: { canonical: "https://gabrielgarciaacosta.com/sobre" },
}

export default function SobrePage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">Sobre mí</span>
          </nav>

          <div className="page-eyebrow" style={{ color: "var(--color-text-muted)" }}>
            Sobre mí
          </div>

          <h1 className="page-title">Tengo 13 años y vivo en A Coruña.</h1>
          <p className="page-desc">
            Este blog es un diario de lo que voy aprendiendo sobre negocios, decisiones e inversiones.
          </p>
        </div>
      </header>

      <section className="section divider-top">
        <div className="container">
          <div className="page-intro">
            <p>Me llamo Gabriel García Acosta. Estoy en primero de ESO.</p>
            <p>
              Este blog no busca hacerme famoso ni que me lea mucha gente.
              Busca dejar escrito lo que voy aprendiendo para poder volver aquí dentro de diez años y ver cómo pensaba.
            </p>
            <p>
              Escribo sobre negocios, decisiones, inversiones y habilidades prácticas.
              Cosas que no se enseñan en el colegio pero que me parecen muy útiles para la vida real.
            </p>
            <p>
              Cuando me equivoco en algo, también lo escribo. Me parece más honesto y más útil.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
