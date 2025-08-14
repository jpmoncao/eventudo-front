import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();
    const authorization = cookieStore.get('Authorization')?.value;

    const session = authorization ? await decrypt(authorization) : null;

    if (!session)
        return NextResponse.redirect(new URL('/', req.url))

    const userId = (session as { id: string }).id

    return NextResponse.redirect(new URL('/profile/' + userId, req.url))
}