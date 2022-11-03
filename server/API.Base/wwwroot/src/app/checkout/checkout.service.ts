import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {IDeliveryMethod} from '../shared/models/deliveryMethod';
import { IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.basketApi;

  constructor(private http: HttpClient) { }

  creatOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders', order);
  }

  getDeliveryMethods() {
    return this.http.get(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => dm.sort((a, b) => b.price - a.price))
    );
  }
}
