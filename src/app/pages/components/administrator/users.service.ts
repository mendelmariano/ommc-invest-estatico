import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../shareds/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private apiUrl = environment.baseUrl;


    constructor(private http: HttpClient) { }

    usuariosList(page: number) {
        return this.http.get(`${this.apiUrl}users/paginate/index/${page}`);
    }

    usuariosListSearch(page: number, search: string) {
        return this.http.post(`${this.apiUrl}users/paginate/search`, {page, search});
    }

    update(user: User) {
        return this.http.put(`${this.apiUrl}users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}users/${id}`);
    }
}
