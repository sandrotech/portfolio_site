/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Clickjacking Protection
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // MIME Sniffing Protection
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Disable Legacy XSS Filter (CSP is better)
          {
            key: 'X-XSS-Protection',
            value: '0',
          },
          // Force HTTPS (2 years)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy (Restrict Browser Features)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy (CSP)
          {
            key: 'Content-Security-Policy',
            value: [
              // Default: Only same origin
              "default-src 'self'",
              // Scripts: Self + Next.js chunks + Vercel Analytics + unsafe-eval for dev
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
              // Styles: Self + Inline (for Radix UI, Framer Motion) + Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images: Self + Data URIs + Vercel + External CDNs
              "img-src 'self' data: https: blob:",
              // Fonts: Self + Google Fonts + Data URIs
              "font-src 'self' data: https://fonts.gstatic.com",
              // Connect (AJAX/Fetch): Self + Vercel Analytics
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              // Media: Self only
              "media-src 'self'",
              // Objects/Embeds: None (block Flash, Java applets)
              "object-src 'none'",
              // Base URI: Self only
              "base-uri 'self'",
              // Form Actions: Self only
              "form-action 'self'",
              // Frame Ancestors: None (additional clickjacking protection)
              "frame-ancestors 'none'",
              // Upgrade HTTP to HTTPS
              "upgrade-insecure-requests",
              // Block mixed content
              "block-all-mixed-content",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
