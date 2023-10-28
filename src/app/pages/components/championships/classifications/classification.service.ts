import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

    private apiUrl = environment.baseUrl;


    constructor(private http: HttpClient) { }


    champClassification(championship_id: number) {
        return this.http.get(`${this.apiUrl}classifications/championship/${championship_id}`);
    }

    champsForTeams(teams_ids: number[]){
        return this.http.post(`${this.apiUrl}classifications/championship/forTeams`, {teams_ids})
    }

}
