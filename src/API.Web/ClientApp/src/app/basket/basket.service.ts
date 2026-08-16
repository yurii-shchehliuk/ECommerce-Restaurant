import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';

/**
 * The basket lives in Redis behind API.Basket, and every mutation is a round trip:
 * the server owns the record. What is held here is the last response, so the header
 * badge and the totals can read it without another request.
 */
@Injectable({ providedIn: 'root' })
export class BasketService {
  private http = inject(HttpClient);
  private baseUrl = environment.basketApi;

  private shipping = 0;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);

  readonly basket$ = this.basketSource.asObservable();
  readonly basketTotal$ = this.basketTotalSource.asObservable();

  getCurrentBasketValue(): IBasket | null {
    return this.basketSource.value;
  }

  getBasket(id: string): Observable<IBasket> {
    return this.http.get<IBasket>(`${this.baseUrl}basket`, { params: { id } }).pipe(
      tap((basket) => {
        this.basketSource.next(basket);
        this.shipping = basket.shippingPrice ?? 0;
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket): void {
    this.http.post<IBasket>(`${this.baseUrl}basket`, basket).subscribe({
      next: (saved) => {
        this.basketSource.next(saved);
        this.calculateTotals();
      },
    });
  }

  createPaymentIntent(): Observable<void> {
    const basket = this.getCurrentBasketValue();
    if (!basket) {
      throw new Error('There is no basket to pay for.');
    }

    return this.http.post<IBasket>(`${this.baseUrl}payments/${basket.id}`, {}).pipe(
      map((updated) => {
        this.basketSource.next(updated);
      })
    );
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod): void {
    const basket = this.getCurrentBasketValue();
    if (!basket) {
      return;
    }

    this.shipping = deliveryMethod.price;
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }

  addItemToBasket(product: IProduct, quantity = 1): void {
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, this.toBasketItem(product, quantity), quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const line = basket?.items.find((candidate) => candidate.id === item.id);
    if (!basket || !line) {
      return;
    }
    line.quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const line = basket?.items.find((candidate) => candidate.id === item.id);
    if (!basket || !line) {
      return;
    }

    if (line.quantity > 1) {
      line.quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    if (!basket || !basket.items.some((line) => line.id === item.id)) {
      return;
    }

    basket.items = basket.items.filter((line) => line.id !== item.id);

    // An emptied basket is deleted rather than saved empty, so its Redis key goes
    // with it instead of lingering as a zero-item record.
    if (basket.items.length > 0) {
      this.setBasket(basket);
    } else {
      this.deleteBasket(basket);
    }
  }

  deleteBasket(basket: IBasket): void {
    this.http.delete(`${this.baseUrl}basket`, { params: { id: basket.id } }).subscribe({
      next: () => this.clearLocalBasket(),
      error: () => this.clearLocalBasket(),
    });
  }

  clearLocalBasket(): void {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    this.shipping = 0;
    localStorage.removeItem('basket_id');
  }

  private calculateTotals(): void {
    const basket = this.getCurrentBasketValue();
    if (!basket) {
      this.basketTotalSource.next(null);
      return;
    }

    const subtotal = basket.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.basketTotalSource.next({
      shipping: this.shipping,
      subtotal,
      total: subtotal + this.shipping,
    });
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const existing = items.find((item) => item.id === itemToAdd.id);
    if (existing) {
      existing.quantity += quantity;
      return items;
    }
    return [...items, { ...itemToAdd, quantity }];
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  /**
   * `pictureUrl`, `brand` and `type` are not decoration: BasketItem's server-side
   * validation rejects a line without them with a 400 that lists them.
   */
  private toBasketItem(product: IProduct, quantity: number): IBasketItem {
    return {
      id: product.id,
      productName: product.name,
      price: product.price,
      pictureUrl: product.pictureUrl,
      quantity,
      brand: product.productBrand,
      type: product.productType,
    };
  }
}
