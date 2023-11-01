
export class User {
    id?:number | string;
    name: string;
    email: string;
    whatsapp?: string;
    password?: string;
    profile_id: number;
    profile?: {
        name: string;
        id?: number;
    };
  }
