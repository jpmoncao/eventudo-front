import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { decrypt } from '@/lib/session';

const protectedRoutes = ['/profile', '/checkout', '/logout'];
const publicRoutes = ['/login', '/signup'];

// Cria o middleware base do next-intl
const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  // Executa o next-intl para garantir que locale esteja resolvido
  const res = intlMiddleware(req);

  const { pathname, search } = req.nextUrl;
  const locale = pathname.split('/')[1] || routing.defaultLocale;

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(`/${locale}${route}`)
  );
  const isPublic = publicRoutes.some(route =>
    pathname.startsWith(`/${locale}${route}`)
  );

  const sessionCookie = req.cookies.get('Authorization')?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  if (isProtected && !session) {
    // Remove o locale do pathname para construir o callbackUrl
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set('callbackUrl', `${pathWithoutLocale}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublic && session) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
