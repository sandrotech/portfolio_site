/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  generateEtags: false, // Prevent inode leaking via ETags
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
          // NOTE: CSP is now handled by middleware.ts with nonces
        ],
      },
    ]
  },
}

export default nextConfig
