import { Championship } from "./championship.interface";
import { Team } from "./team.interface";

export class Classification {
    id: number;
    points: number;
    goals_pro: number;
    goals_conceded: number;
    goals_difference: number;
    wins: number;
    loses: number;
    ties: number;
    check: boolean;
    team_id: number;
    championship_id: number
}

export interface IClassificationCheck {
    id: number;
    points: number;
    goals_pro: number;
    goals_conceded: number;
    goals_difference: number;
    wins: number;
    loses: number;
    ties: number;
    check: boolean;
    team_id: number;
    championship_id: number;
    team?: Team;
    championship: Championship;
}

