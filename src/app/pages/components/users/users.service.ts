import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserUpdate } from '../../shareds/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

update(user: UserUpdate) {
    return this.http.put(`${this.apiUrl}users`, user);
}

updateGoogle(user: UserUpdate, id: string) {
    return this.http.put(`${this.apiUrl}users/google/${id}`, user);
}

findUser(id: number | string) {
    return this.http.get(`${this.apiUrl}users/${id}`);
}
}
