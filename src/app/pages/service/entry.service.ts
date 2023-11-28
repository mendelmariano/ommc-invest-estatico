import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entry, mapMovementResponseToEntry } from '../api/entry';
import { environment } from 'src/environments/environment';
import { MovementRequest, MovementResponse } from '../api/movement';
import { catchError, map } from 'rxjs';
import { PeriodSearch } from '../api/patrimony';

@Injectable()
export class EntryService {

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getEntries() {
        return this.http.get<MovementResponse[]>(`${this.apiUrl}movements/start/1`)
          .pipe(
            map(data => data.map(movement => mapMovementResponseToEntry(movement))),
            catchError(this.handleError)
          )
          .toPromise();
      }

      getEntriesForPeriod(periodSearch: PeriodSearch) {
        return this.http.post<MovementResponse[]>(`${this.apiUrl}movements/start/1`, {periodo: periodSearch})
          .pipe(
            map(data => data.map(movement => mapMovementResponseToEntry(movement))),
            catchError(this.handleError)
          )
          .toPromise();
      }

      createEntries(entry: MovementRequest) {
        return this.http.post<MovementResponse>(`${this.apiUrl}movements/`, entry)
          .pipe(
            map(data => mapMovementResponseToEntry(data)),
            catchError(this.handleError)
          )
          .toPromise();
      }

      update(entry: MovementRequest) {
        return this.http.put<MovementResponse>(`${this.apiUrl}movements/${entry.id}`, entry)
          .pipe(
            map(data => mapMovementResponseToEntry(data)),
            catchError(this.handleError)
          )
          .toPromise();
      }

      delete(entry: Entry) {
        return this.http.delete<any>(`${this.apiUrl}movements/${entry.id}`)
          .toPromise();
      }

      private handleError(error: any): Promise<any> {
        console.error('Ocorreu um erro', error);
        return Promise.reject(error.message || error);
      }

}
