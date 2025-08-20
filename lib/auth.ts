import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';

export async function getSession() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('Authorization')?.value;

    if (!cookie)
        return null;

    const session = (await decrypt(cookie) as { id: string });

    return session;
}
