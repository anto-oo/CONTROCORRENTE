import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_USERS: Record<string, string> = {
    admin: 'admin',
    peppe: 'seppepe08',
    irene: 'stairway650',
};

export function middleware(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const encoded = authHeader.split(' ')[1];
        const [username, password] = atob(encoded).split(':');

        if (AUTH_USERS[username] !== password) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        // ✅ Auth successful — redirect to /index.html
        return NextResponse.redirect(new URL('/index.html', request.url));
    } catch {
        return new NextResponse('Bad Request', { status: 400 });
    }
}

// ⛔ Prevent middleware from applying to /index.html itself
export const config = {
    matcher: ['/((?!index\\.html).*)'],
};
