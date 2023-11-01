export class UserList {

    currentPage: number;
            totalPages: number;
            totalCount: number;
            users: [
               User
            ]


}

export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    whatsapp?: string;
    profile: {
        name: string;
        id: number,
    },
    profile_id: number;
}

export interface UserUpdate {
    id?: string;
    name: string;
    email: string;
    whatsapp?: string;
    password?: string;
    confirmPassword?: string;
    oldPassword?: string;
    uuid?: string;
    profile_id?: number
}
