import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Team } from '../../shareds/models/team.interface';
import { IResultRequest } from '../../shareds/models/result.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    loadResultUser(user_id: number) {
        return this.http.get(`${this.apiUrl}results/user/${user_id}`);
    }

    checkResult(id: number) {
        return this.http.patch(`${this.apiUrl}results/check`, {id});
    }

    teamsHomeForResult(user_id: number, championship_id: number ) {
        return this.http.get(`${this.apiUrl}classifications/result/listHomeTeams/${user_id}/${championship_id}`);
    }

    teamsAwayForResult(user_id: number, championship_id: number ) {
        return this.http.get(`${this.apiUrl}classifications/result/listAwayTeams/${user_id}/${championship_id}`);
    }

    postResult(result: IResultRequest) {
        return this.http.post(`${this.apiUrl}results`, result);
    }

    declineResult(result: IResultRequest) {
        return this.http.patch(`${this.apiUrl}results/decline`, result);
    }

}
