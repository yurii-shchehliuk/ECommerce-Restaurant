import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketTotals } from '../shared/models/IBasket';
import { IProduct } from '../shared/models/IProduct';
import { IShoppingCartItem } from '../shared/models/IShoppingCartItem';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<IShoppingCartItem[]>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(user_id: number) {
    return this.http
      .get<IShoppingCartItem[]>(this.baseUrl + 'ShoppingCartItems/' + user_id)
      .pipe(
        map((res: IShoppingCartItem[]) => {
          this.basketSource.next(res);
          this.calculateTotals();
        })
      );
  }

  setBasket(basket: IShoppingCartItem) {
    let response = this.http
      .post(this.baseUrl + 'ShoppingCartItems', basket)
      .subscribe(
        (res: IShoppingCartItem[]) => {
          this.basketSource.next(res);
          this.getBasket(basket.customerId).subscribe();
        },
        (error) => {
          console.error('setBasket(basket: IShoppingCartItem)', error);
        }
      );
    return response;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const user_id = +localStorage.getItem('user_Id');
    const basket_id = +localStorage.getItem('basket_id');
    if (!basket_id) {
      this.createBasket();
    }
    const itemToAdd: IShoppingCartItem = this.mapProductItemToBasketItem(
      item,
      quantity,
      user_id == 0 || user_id == undefined ? 1 : +user_id,
      basket_id ?? 0
    );
    this.setBasket(itemToAdd);
  }

  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number,
    user_id: number,
    basket_id: number
  ): IShoppingCartItem {
    return {
      id: item.id,
      price: item.price,
      totalAmount: 0,
      qty: quantity,
      productName: item.name,
      imageUrl: item.imageUrl,
      productId: item.id,
      basketId: basket_id,
      customerId: user_id,
      categoryName: '',
    };
  }

  incrementItemQuantity(item: IShoppingCartItem) {
    const basket = this.getCurrentBasketValue();
    const foundItmIndex = basket.findIndex((x) => x.id === item.id);
    let bitem = basket[foundItmIndex];
    bitem.qty++;
    this.setBasket(bitem);
  }
  decrementItemQuantity(item: IShoppingCartItem) {
    const basket = this.getCurrentBasketValue();
    const foundItmIndex = basket.findIndex((x) => x.id === item.id);
    let bitem = basket[foundItmIndex];
    if (bitem.qty > 1) {
      bitem.qty--;
    } else {
      bitem.qty = 0;
    }
    this.setBasket(bitem);
  }
  deleteItm(item: IShoppingCartItem) {
    const basket = this.getCurrentBasketValue();
    const foundItmIndex = basket.findIndex((x) => x.id === item.id);
    let bitem = basket[foundItmIndex];
    bitem.qty = 0;
    this.setBasket(bitem);
  }

  deleteItem(item: IShoppingCartItem) {
    let basket = this.getCurrentBasketValue();
    if (basket.some((x) => x.id === item.id)) {
      basket = basket.filter((i) => i.id !== item.id);
      if (basket.length > 0) {
        // this.setBasket(basket)
      } else {
        this.deleteBasket();
      }
    }
  }
  deleteBasket() {
    const user_id = +localStorage.getItem('user_Id');
    return this.http
      .delete(this.baseUrl + 'ShoppingCartItems/' + user_id)
      .subscribe(
        () => {
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
          localStorage.removeItem('basket_id');
          localStorage.removeItem('user_Id');
        },
        (error) => {
          console.error('deleteBasket()', error);
        }
      );
  }
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  private createBasket() {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id.toString());
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    if (basket) {
      const subtotal = basket.reduce((a, b) => b.price * b.qty + a, 0);
      const total = subtotal + shipping;
      this.basketTotalSource.next({ shipping, total, subtotal });
    }
  }
}
