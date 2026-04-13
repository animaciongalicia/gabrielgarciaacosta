import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Específicas primero (orden importa)
      { source: "/categoria/sobre-mi", destination: "/sobre", permanent: true },
      // Genérica: /categoria/xxx → /xxx
      { source: "/categoria/:slug", destination: "/:slug", permanent: true },
    ]
  },
}

export default nextConfig
