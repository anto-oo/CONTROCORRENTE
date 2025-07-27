import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mappa di utenti validi: username => password
const AUTH_USERS: Record<string, string> = {
    'admin': 'admin',
    'peppe': 'seppepepe08',
    'irene': 'stairway650',
}

export function middleware(request: NextRequest) {
    const authHeader = request.headers.get('authorization')

    if (!authHeader ) {
        return new Response('Authentication required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
            },
        })
    }

    try {
        const base64Credentials = authHeader.split(' ')[1]
        const credentials = atob(base64Credentials)
        const [username, password] = credentials.split(':')

        if (!username || !password || AUTH_USERS[username] !== password) {
            return new Response('Unauthorized', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Secure Area"',
                },
            })
        }

        return NextResponse.next()
    } catch (e) {
        return new Response('Invalid auth format', { status: 400 })
    }
}
