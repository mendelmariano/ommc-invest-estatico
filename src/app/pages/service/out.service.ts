import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Out } from '../api/out';

@Injectable()
export class OutService {

    constructor(private http: HttpClient) { }

    getEntriesSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Out[])
            .then(data => data);
    }

    getEntries() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Out[])
            .then(data => data);
    }

    getEntriesMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Out[])
            .then(data => data);
    }

    getEntriesWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Out[])
            .then(data => data);
    }
}
