import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Check for demo persona cookie OR local user cookie FIRST (for demo mode authentication)
  // This check happens before Supabase to ensure demo mode always works
  const demoPersona = request.cookies.get('eids-demo-persona')?.value
  const localUser = request.cookies.get('eids-user')?.value

  // Public routes that don't require authentication
  const publicPaths = ['/login', '/auth', '/api', '/_next', '/favicon.ico', '/manifest']
  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // Also allow static assets
  const isStaticAsset = /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf)$/i.test(
    request.nextUrl.pathname
  )

  // If it's a public path or static asset, allow through
  if (isPublicPath || isStaticAsset) {
    // But redirect authenticated users away from login page
    if (demoPersona && request.nextUrl.pathname === '/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    return NextResponse.next({ request })
  }

  // For protected routes, check authentication
  let supabaseResponse = NextResponse.next({
    request,
  })

  let user = null

  // Try to get Supabase user, but don't fail if Supabase is unavailable
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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

      const { data } = await supabase.auth.getUser()
      user = data?.user
    }
  } catch {
    // Supabase auth failed - continue with demo persona check only
    console.warn('Supabase auth check failed, falling back to demo persona only')
  }

  // For this demo app: require demo persona for ALL routes except public paths
  // Users MUST select a persona from the login screen before accessing the app
  if (!user && !demoPersona) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // Save original path to redirect back after login
    if (request.nextUrl.pathname !== '/') {
      url.searchParams.set('redirect', request.nextUrl.pathname)
    }
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
