import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BASE = 'https://gabrielgarciaacosta.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Gabriel García Acosta — Aprendiendo a pensar diferente',
    template: '%s | Gabriel García Acosta',
  },
  description:
    'Tengo 13 años y escribo lo que aprendo sobre negocios, decisiones e inversiones. No para parecer listo, sino para recordarlo.',
  keywords: [
    'gabriel garcia acosta', 'blog adolescente', 'negocios jóvenes',
    'aprendizaje negocios', 'inversiones desde joven', 'a coruña', 'galicia',
    'mentalidad emprendedora', 'habilidades prácticas',
  ],
  authors: [{ name: 'Gabriel García Acosta', url: BASE }],
  creator: 'Gabriel García Acosta',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: BASE,
    siteName: 'Gabriel García Acosta',
    title: 'Gabriel García Acosta — Aprendiendo a pensar diferente',
    description: 'Tengo 13 años y escribo lo que aprendo sobre negocios, decisiones e inversiones.',
    images: [{ url: '/og/primer-post.jpg', width: 1200, height: 630, alt: 'Gabriel García Acosta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel García Acosta',
    description: 'Tengo 13 años y escribo lo que aprendo sobre negocios y decisiones.',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: BASE,
    types: { 'application/rss+xml': `${BASE}/feed.xml` },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Previene FOUC en dark mode antes de que React hidrate */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
        {/* RSS autodiscovery */}
        <link rel="alternate" type="application/rss+xml" title="Gabriel García Acosta" href="/feed.xml" />
      </head>
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
