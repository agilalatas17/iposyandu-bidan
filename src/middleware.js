import { NextResponse } from 'next/server';

export function middleware(req) {
  const uuid = req.cookies.get('iposyandubidan:_uuid');
  const protectedRoutes = ['/dashboard', '/ibu-hamil', '/ibu-bersalin'];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !uuid) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (uuid && req.nextUrl.pathname.startsWith('/auth/login')) {
    return Response.redirect(new URL('/dashboard', req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/ibu-hamil/:path*', '/ibu-bersalin/:path*'],
};
