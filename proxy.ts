import { NextRequest, NextResponse } from 'next/server'

const LOCALE_PREFIXES = ['/de', '/fr', '/es', '/it', '/pt', '/ja', '/fi']

/**
 * Attach the current route locale as an `x-locale` request header so the root
 * layout can render `<html lang="…">` per URL instead of a global `en`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const matched = LOCALE_PREFIXES.find(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
  const locale = matched ? matched.slice(1) : 'en'

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  // Skip static assets, API routes and files with extensions.
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}
