import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Team } from '../../shareds/models/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }


    save(team: Team) {
        return this.http.post(`${this.apiUrl}teams`, team);
    }

    loadTeams() {
        return this.http.get(`${this.apiUrl}teams`);
    }

    loadTeamsUser(user_id) {
        return this.http.get(`${this.apiUrl}teams/user/${user_id}`);
    }

    loadTeamsUserChecked(user_id) {
        return this.http.get(`${this.apiUrl}teams/user/checked/${user_id}`);
    }

    activeTeam(id: number) {
        return this.http.patch(`${this.apiUrl}teams/check/${id}`, {});
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}teams/${id}`);
    }

    update(team: Team) {
        return this.http.put(`${this.apiUrl}teams/${team.id}`, team);
    }

    searchById(id: number) {
        return this.http.get(`${this.apiUrl}teams/${id}`);
    }
}
