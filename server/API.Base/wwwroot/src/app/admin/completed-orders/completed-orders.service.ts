import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class CompletedOrdersService {
  baseUrl = environment.basketApi;

  constructor(private http: HttpClient) { }
  getOrders() {
    return this.http.get(this.baseUrl + '/Orders/allOrders');
  }
}
