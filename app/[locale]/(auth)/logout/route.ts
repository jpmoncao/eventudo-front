import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/axios";

export async function GET(req: NextRequest) {
    try {
        const authToken = req.cookies.get('Authorization')?.value;

        if (!authToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await api.post('/logout', {}, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true,
        });

        return NextResponse.redirect(new URL('/login/', req.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
