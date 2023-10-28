import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mode } from '../shareds/models/mode.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }


    save(mode: Mode) {
        return this.http.post(`${this.apiUrl}modes`, mode);
    }

    update(mode: Mode) {
        return this.http.put(`${this.apiUrl}modes/${mode.id}`, mode);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}modes/${id}`);
    }

    getAll() {
        return this.http.get(`${this.apiUrl}modes`);
    }

    getMode(id: number) {
        return this.http.get(`${this.apiUrl}modes/${id}`);
    }
}
