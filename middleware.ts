import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  // Create a Supabase client scoped to the middleware
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  // Retrieve the current session
  const {
    data: { session }
  } = await supabase.auth.getSession();
  // Protect all /admin routes (except the login page)
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    if (!session) {
      // If no session, redirect to the admin login page
      const redirectUrl = new URL('/admin', req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }
  return res;
}

export const config = {
  matcher: ['/admin/:path*']
};