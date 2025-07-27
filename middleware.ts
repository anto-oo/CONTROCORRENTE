import { NextRequest, NextResponse } from 'next/server'

// List of valid users (username: password)
const validUsers: Record<string, string> = {
    'admin': 'admin',
    'peppe': 'seppepepe08',
    'irene': 'stairway650',
}

export function middleware(req: NextRequest) {
    const basicAuth = req.headers.get('authorization')

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1]
        const [user, pass] = atob(authValue).split(':')

        if (validUsers[user] && validUsers[user] === pass) {
            return NextResponse.next()
        }
    }

    return new NextResponse('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    })
}

export const config = {
    matcher: '/:path*',
}
