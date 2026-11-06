import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const forwardedProto = request.headers.get('x-forwarded-proto');

  // Force HTTPS if protocol is HTTP (from x-forwarded-proto)
  if (!hostname.includes('localhost') && forwardedProto === 'http') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  // Trailing slash normalization (strip trailing slash except root /)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();

  if (hostname.includes('.vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
