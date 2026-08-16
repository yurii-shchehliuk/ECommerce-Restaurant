import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { IOrder } from '../shared/models/order';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private baseUrl = environment.basketApi;

  constructor(private http: HttpClient) {}

  getOrdersForUser(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}orders`);
  }

  getOrderDetailed(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.baseUrl}orders/${id}`);
  }
}
