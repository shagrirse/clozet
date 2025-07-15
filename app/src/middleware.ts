import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

import { authConfig } from '~/server/auth/config'

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const pathname = req.nextUrl.pathname

  // manage route protection
  const isAuth = req.auth

  const AUTH_ROUTES = ['/api/auth/signin']

  const PROTECTED_ROUTES: string[] = []

  const isAccessingApiAuthRoute = pathname.startsWith('/api/auth')
  const isAccessingAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route),
  )
  const isAccessingProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  )

  if (isAccessingApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAccessingAuthRoute) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  }

  if (!isAuth && isAccessingProtectedRoute) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url))
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
