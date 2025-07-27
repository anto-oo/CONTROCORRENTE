import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_USERS: Record<string, string> = {
    'admin':'admin',
    'peppe':'seppepepe08',
    'irene':'stairway650',
}

export function middleware(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const [username, password] = atob(authHeader.split(' ')[1]).split(':');
    if (AUTH_USERS[username] !== password) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    export function middleware(request: NextRequest) {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const [username, password] = atob(authHeader.split(' ')[1]).split(':');
        if (AUTH_USERS[username] !== password) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        return NextResponse.next();}}
