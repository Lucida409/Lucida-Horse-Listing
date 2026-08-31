import { createMiddlewareClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { supabase, response } = createMiddlewareClient(request);

  const { data: { session } } = await supabase.auth.getSession();

  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && !isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
