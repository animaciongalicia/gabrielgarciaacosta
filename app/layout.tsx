import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://gabrielgarciaacosta.com'),
  title: {
    default: 'Gabriel García Acosta — Aprendiendo a pensar diferente',
    template: '%s | Gabriel García Acosta',
  },
  description:
    'Tengo 13 años y escribo lo que aprendo sobre negocios, decisiones e inversiones. No para parecer listo, sino para recordarlo.',
  keywords: ['gabriel garcia acosta', 'blog adolescente', 'negocios jóvenes', 'aprendizaje', 'a coruña', 'galicia'],
  authors: [{ name: 'Gabriel García Acosta' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://gabrielgarciaacosta.com',
    siteName: 'Gabriel García Acosta',
    title: 'Gabriel García Acosta — Aprendiendo a pensar diferente',
    description:
      'Tengo 13 años y escribo lo que aprendo sobre negocios, decisiones e inversiones.',
    images: [
      {
        url: '/og/primer-post.jpg',
        width: 1200,
        height: 630,
        alt: 'Gabriel García Acosta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel García Acosta',
    description: 'Tengo 13 años y escribo lo que aprendo sobre negocios y decisiones.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||((window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light');document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
