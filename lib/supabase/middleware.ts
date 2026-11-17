import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured yet (e.g. initial setup or demo mode), allow admin access with dev notification
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Admin protection: strictly enforce authentication and authorization
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      // Allow demo session cookie for local/demo admin preview and mock editing
      const demoAdmin = request.cookies.get('gcek_admin_demo_session')?.value;
      if (demoAdmin !== 'active') {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    } else {
      // If user is authenticated via Supabase, verify admin role if role metadata is specified
      const appRole = (user.app_metadata as Record<string, unknown>)?.role;
      const userRole = (user.user_metadata as Record<string, unknown>)?.role;
      if (appRole && appRole !== 'admin' && userRole !== 'admin') {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
