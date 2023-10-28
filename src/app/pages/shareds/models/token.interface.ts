export interface TokenResponse {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
        password_hash: string;
        createdAt: string;
        updatedAt: string;
        ProfileId: number;
        profile_id: number;
        whatsapp?: string;
    },
    iat: number;
    exp: number;
}
