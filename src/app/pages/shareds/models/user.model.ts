import { Team } from "./team.interface";

export class User {
    id?:number;
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
