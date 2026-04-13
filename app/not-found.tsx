import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="empty-state" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
        404
      </h1>
      <p style={{ marginBottom: 'var(--space-6)' }}>Esta página no existe.</p>
      <Link href="/" style={{ color: 'var(--color-primary)', fontSize: 'var(--text-sm)' }}>
        ← Volver al inicio
      </Link>
    </div>
  )
}
