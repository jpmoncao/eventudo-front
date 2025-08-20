import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const session = await getSession();

    if (!session)
        return NextResponse.redirect(new URL('/', req.url));

    return NextResponse.redirect(new URL('/profile/' + session.id, req.url));
}