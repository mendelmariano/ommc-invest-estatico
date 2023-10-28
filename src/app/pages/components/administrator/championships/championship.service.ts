import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Championship } from 'src/app/pages/shareds/models/championship.interface';
import { IClassificationCheck } from 'src/app/pages/shareds/models/classification.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

    private apiUrl = environment.baseUrl;


    constructor(private http: HttpClient) { }

    listAll() {
        return this.http.get(`${this.apiUrl}championships/`);
    }


    save(championship: Championship) {
        return this.http.post(`${this.apiUrl}championships`, championship);
    }

    update(championship: Championship) {
        return this.http.put(`${this.apiUrl}championships/${championship.id}`, championship);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}championships/${id}`);
    }

    participate(id: number, team_id: number) {
        return this.http.patch(`${this.apiUrl}championships/${id}`, {team_id});
    }

    verifyParticipe(user_id: number) {
        return this.http.get(`${this.apiUrl}championships/check/${user_id}`);
    }

    forCheck(check: boolean) {
        return this.http.post(`${this.apiUrl}championships/forCheck`, { check });
    }


    checkChampionship(id: number) {
        return this.http.patch(`${this.apiUrl}classification/team/check`, {id});
    }


}
