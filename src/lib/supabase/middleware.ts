import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check for demo persona cookie (for demo mode authentication)
  const demoPersona = request.cookies.get('eids-demo-persona')?.value

  // Public routes that don't require authentication
  const publicPaths = ['/login', '/auth', '/api', '/_next', '/favicon.ico']
  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // For this demo app: require demo persona for ALL routes except public paths
  // Users MUST select a persona from the login screen before accessing the app
  if (!user && !demoPersona && !isPublicPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // Save original path to redirect back after login
    if (request.nextUrl.pathname !== '/') {
      url.searchParams.set('redirect', request.nextUrl.pathname)
    }
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users from login page to dashboard
  // Both real Supabase users AND demo users should be redirected away from login
  if ((user || demoPersona) && request.nextUrl.pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
