import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { IOrder } from 'src/app/shared/models/order';

@Injectable({ providedIn: 'root' })
export class CompletedOrdersService {
  private http = inject(HttpClient);

  private baseUrl = environment.basketApi;

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}orders/allOrders`);
  }
}
