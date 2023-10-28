import { Championship } from "./championship.interface";
import { Team } from "./team.interface";

export interface IResultRequest {
    id?: number;
    home_team: number;
    away_team: number;
    championship_id: number;
    home_goals: number;
    away_goals: number;
    status: number;
    created_at?: Date;
    updated_at?: Date;
    motivo_cancelamento?: string;
}

export interface IResultResponse {
    id?: number;
    owner: number;
    home_team: number;
    home: Team;
    away: Team;
    away_team: number;
    championship_id: number;
    championship: Championship;
    home_goals: number;
    away_goals: number;
    status: number;
    created_at?: Date;
    updated_at?: Date;
    motivo_cancelamento?: string;
}
