import { NextResponse } from 'next/server';

export function middleware(req) {
  const uuid = req.cookies.get('iposyandubidan:_uuid');
  const { pathname } = req.nextUrl;
  // const protectedRoutes = ['/', '/dashboard', '/ibu-hamil', '/ibu-bersalin'];

  if (!uuid && pathname.startsWith(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (uuid && pathname.startsWith('/auth/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/ibu-hamil/:path*', '/ibu-bersalin/:path*'],
};
