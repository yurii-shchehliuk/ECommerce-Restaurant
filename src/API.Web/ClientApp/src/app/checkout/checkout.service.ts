import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IOrder, IOrderToCreate } from '../shared/models/order';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private baseUrl = environment.basketApi;

  constructor(private http: HttpClient) {}

  createOrder(order: IOrderToCreate): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.baseUrl}orders`, order);
  }

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.http
      .get<IDeliveryMethod[]>(`${this.baseUrl}orders/deliveryMethods`)
      .pipe(map((methods) => [...methods].sort((a, b) => b.price - a.price)));
  }
}
