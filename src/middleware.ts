import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
// Temporarily removing /dashboard from protected routes until proper Firebase session handling is implemented
const protectedRoutes = ['/admin', '/admin/*']

// Define admin-only routes
const adminRoutes = ['/admin', '/admin/*']

// Define public routes that should redirect if user is logged in
const authRoutes = ['/login', '/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.includes('*')) {
      const baseRoute = route.replace('/*', '')
      return pathname.startsWith(baseRoute)
    }
    return pathname === route
  })

  const isAdminRoute = adminRoutes.some(route => {
    if (route.includes('*')) {
      const baseRoute = route.replace('/*', '')
      return pathname.startsWith(baseRoute)
    }
    return pathname === route
  })

  const isAuthRoute = authRoutes.includes(pathname)

  // TODO: Implement proper Firebase Auth session handling
  // For now, client-side auth will handle dashboard protection

  // Get auth token from cookies (this will be set by Firebase Auth)
  const authToken = request.cookies.get('auth-token')

  // If trying to access protected route without auth, redirect to login
  if (isProtectedRoute && !authToken) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If trying to access auth routes while logged in, redirect to dashboard
  if (isAuthRoute && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // For admin routes, check if user is admin (this would need to be verified with Firebase Admin SDK)
  if (isAdminRoute) {
    // TODO: Verify admin status
    // For now, we'll just check if they're authenticated
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|studio).*)',
  ],
}