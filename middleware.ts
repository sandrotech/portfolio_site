import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Generate a random nonce for CSP
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    // Clone the request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)

    // Create response with nonce in headers
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    // Strict CSP without unsafe-inline and unsafe-eval
    const cspHeader = [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com`,
        `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
        "img-src 'self' data: https: blob:",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
        "media-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
        "block-all-mixed-content",
    ].join('; ')

    // Set CSP header with nonce
    response.headers.set('Content-Security-Policy', cspHeader)

    // Remove ETag to prevent inode leaking
    response.headers.delete('ETag')

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}
