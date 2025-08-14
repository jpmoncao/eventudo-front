import 'server-only'
import { jwtVerify } from 'jose'

const secretKey = process.env.NEXT_PUBLIC_API_SECRET

if (!secretKey) {
    throw new Error('SESSION_SECRET não definido no ambiente')
}

const encodedKey = new TextEncoder().encode(secretKey)

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey)
        return payload
    } catch (error) {
        console.log('🔒 Falha ao verificar sessão:', error)
        return null
    }
}
