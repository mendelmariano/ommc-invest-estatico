import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patrimony, PatrimonyRequest, PatrimonyResponse, PeriodSearch, mapPatrimonyResponseToPatrimony } from '../api/patrimony';
import { catchError, map } from 'rxjs';
import { MovementRequest, MovementResponse } from '../api/movement';

@Injectable({
  providedIn: 'root'
})
export class PatrymonyService {

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getPatromonies() {
        return this.http.get<PatrimonyResponse[]>(`${this.apiUrl}patrimonies/`)
          .pipe(
            map(data => data.map(patrimony => mapPatrimonyResponseToPatrimony(patrimony))),
            catchError(this.handleError)
          )
          .toPromise();
      }

      getPatromoniesForPeriod(periodSearch: PeriodSearch) {
        return this.http.post<PatrimonyResponse[]>(`${this.apiUrl}patrimonies/period`, {periodo: periodSearch})
          .pipe(
            map(data => data.map(patrimony => mapPatrimonyResponseToPatrimony(patrimony))),
            catchError(this.handleError)
          )
          .toPromise();
      }


      createPatrimony(patrimony: PatrimonyRequest) {
        return this.http.post<PatrimonyResponse>(`${this.apiUrl}patrimonies/`, patrimony)
          .pipe(
            map(data => mapPatrimonyResponseToPatrimony(data)),
            catchError(this.handleError)
          )
          .toPromise();
      }

      update(patrimony: PatrimonyRequest) {
        return this.http.put<PatrimonyResponse>(`${this.apiUrl}patrimonies/${patrimony.id}`, patrimony)
          .pipe(
            map(data => mapPatrimonyResponseToPatrimony(data)),
            catchError(this.handleError)
          )
          .toPromise();
      }

      updatePart(patrimony: PatrimonyRequest) {
        return this.http.put<PatrimonyResponse>(`${this.apiUrl}patrimonies/part/${patrimony.id}`, patrimony)
          .pipe(
            map(data => mapPatrimonyResponseToPatrimony(data)),
            catchError(this.handleError)
          )
          .toPromise();
      }

      delete(patrimony: Patrimony) {
        return this.http.delete<any>(`${this.apiUrl}patrimonies/${patrimony.id}`)
          .toPromise();
      }

      desative(patrimony: Patrimony) {
        return this.http.put<any>(`${this.apiUrl}patrimonies/desative/${patrimony.id}`, patrimony)
          .toPromise();
      }

      private handleError(error: any): Promise<any> {
        console.error('Ocorreu um erro', error);
        return Promise.reject(error.message || error);
      }
}
