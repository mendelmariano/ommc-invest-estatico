import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Out, mapMovementResponseToOut } from '../api/out';
import { environment } from 'src/environments/environment';
import { MovementRequest, MovementResponse } from '../api/movement';
import { catchError, map } from 'rxjs';
import { PeriodSearch } from '../api/patrimony';

@Injectable()
export class OutService {

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getOuts() {
        return this.http.get<MovementResponse[]>(`${this.apiUrl}movements/start/2`)
          .pipe(
            map(data => data.map(movement => mapMovementResponseToOut(movement))),
            catchError(this.handleError)
          )
          .toPromise();
      }

      getOutsForPeriod(periodSearch: PeriodSearch) {
        return this.http.post<MovementResponse[]>(`${this.apiUrl}movements/start/2`, {periodo: periodSearch})
          .pipe(
            map(data => data.map(movement => mapMovementResponseToOut(movement))),
            catchError(this.handleError)
          )
          .toPromise();
      }

      createOuts(out: MovementRequest) {
        return this.http.post<MovementResponse>(`${this.apiUrl}movements/`, out)
          .pipe(
            map(data => mapMovementResponseToOut(data)),
            catchError(this.handleError)
          )
          .toPromise();
      }


      update(out: MovementRequest) {
        return this.http.put<MovementResponse>(`${this.apiUrl}movements/${out.id}`, out)
          .pipe(
            map(data => mapMovementResponseToOut(data)),
            catchError(this.handleError)
          )
          .toPromise();
      }

      delete(out: Out) {
        return this.http.delete<any>(`${this.apiUrl}movements/${out.id}`)
          .toPromise();
      }

      private handleError(error: any): Promise<any> {
        console.error('Ocorreu um erro', error);
        return Promise.reject(error.message || error);
      }
}
