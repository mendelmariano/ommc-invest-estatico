import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../api/category';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getCategories() {
        return this.http.get<any>(`${this.apiUrl}categories`)
            .toPromise()
            .then(res => res as Category[])
            .then(data => data);
    }


}
