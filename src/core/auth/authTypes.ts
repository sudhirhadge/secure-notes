export interface AuthUser {
    id: number;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    image?: string;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
}