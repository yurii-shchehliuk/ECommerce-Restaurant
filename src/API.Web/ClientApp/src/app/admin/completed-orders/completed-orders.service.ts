import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { IOrder } from 'src/app/shared/models/order';

@Injectable({ providedIn: 'root' })
export class CompletedOrdersService {
  private baseUrl = environment.basketApi;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}orders/allOrders`);
  }
}
