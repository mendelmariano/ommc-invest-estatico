import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MovementRequest, MovementResponse } from '../api/movement';
import { Investment, mapMovementResponseToInvestment } from '../api/investment';
import { catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PeriodSearch } from '../api/patrimony';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

  getInvestments() {
    return this.http.get<MovementResponse[]>(`${this.apiUrl}movements/start/3`)
      .pipe(
        map(data => data.map(movement => mapMovementResponseToInvestment(movement))),
        catchError(this.handleError)
      )
      .toPromise();
  }

  getInvestmentsForPeriod(periodSearch: PeriodSearch) {
    return this.http.post<MovementResponse[]>(`${this.apiUrl}movements/start/3`, {periodo: periodSearch})
      .pipe(
        map(data => data.map(movement => mapMovementResponseToInvestment(movement))),
        catchError(this.handleError)
      )
      .toPromise();
  }

  createInvestments(investment: MovementRequest) {
    return this.http.post<MovementResponse>(`${this.apiUrl}movements/`, investment)
      .pipe(
        map(data => mapMovementResponseToInvestment(data)),
        catchError(this.handleError)
      )
      .toPromise();
  }

  update(investment: MovementRequest) {
    return this.http.put<MovementResponse>(`${this.apiUrl}movements/${investment.id}`, investment)
      .pipe(
        map(data => mapMovementResponseToInvestment(data)),
        catchError(this.handleError)
      )
      .toPromise();
  }

  delete(investment: Investment) {
    return this.http.delete<any>(`${this.apiUrl}movements/${investment.id}`)
      .toPromise();
  }

  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro', error);
    return Promise.reject(error.message || error);
  }
}
