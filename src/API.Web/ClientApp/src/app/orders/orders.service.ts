import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { IOrder } from '../shared/models/order';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);

  private baseUrl = environment.basketApi;

  getOrdersForUser(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}orders`);
  }

  getOrderDetailed(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.baseUrl}orders/${id}`);
  }
}
