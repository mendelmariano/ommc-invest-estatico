import { Mode } from "./mode.interface";

export class Championship {
    id?: number;
    name: string;
    mode_id: number;
    mode?: Mode;
}
