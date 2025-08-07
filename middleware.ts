import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'

const protectedRoutes = ['/profile', '/checkout']
const publicRoutes = ['/login', '/signup']

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const pathnameParts = pathname.split('/');
    const locale = pathnameParts[1] || 'pt';

    const isProtected = protectedRoutes.some(route => pathname.startsWith(`/${locale}${route}`))
    const isPublic = publicRoutes.some(route => pathname.startsWith(`/${locale}${route}`))

    const sessionCookie = req.cookies.get('Authorization')?.value
    const session = sessionCookie ? await decrypt(sessionCookie) : null

    if (isProtected && !session) {
        const loginUrl = new URL(`/${locale}/login`, req.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    if (isPublic && session) {
        return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|favicon\\.ico|public|api).*)'],
}
