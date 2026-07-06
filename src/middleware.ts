import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Since Firebase Auth is client-side primarily in Next.js App Router,
  // we check for the existence of an auth cookie or session token.
  // In a production Firebase app, you would typically use Firebase Session Cookies.
  const session = request.cookies.get('__session') || request.cookies.get('session');

  // 1. Protect authentication routes
  // Temporairement désactivé pour debug : on laisse passer vers /dashboard 
  // pour vérifier si le problème vient du middleware ou du layout.
  /*
  if (!session && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  */

  // 2. Redirect authenticated users away from login/invite
  if (session && (path === '/login' || path.startsWith('/invite'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Note: Role-Based Access Control (RBAC) for Firebase is handled 
  // inside the DashboardLayout client component to ensure the latest 
  // profile data is fetched from Firestore.

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/invite/:path*',
  ],
}