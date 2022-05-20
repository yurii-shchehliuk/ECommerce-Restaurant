import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompletedOrdersService {
  constructor(private http: HttpClient) {}
  getOrders() {
    return this.http.get('https://localhost:5001/api/Orders/allOrders');
  }
}
