import 'next-auth';

declare module 'next-auth' {
    interface User {
        _id: string;
        username: string;
        email: string;
        isGuest: boolean;
    }

    interface Session {
        user: User & {
            _id: string;
            username: string;
            email: string;
            isGuest: boolean;
        };
    }
}
