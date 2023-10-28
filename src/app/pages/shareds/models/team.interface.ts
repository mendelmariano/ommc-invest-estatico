import { Mode } from "./mode.interface";
import { User } from "./user.model";

export class Team {
    id?: number;
    team: string;
    check?: boolean;
    mode_id: number;
    user_id: number;
    mode?: Mode;
    user?: User;
}
