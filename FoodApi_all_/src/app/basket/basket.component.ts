import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingCartItem } from '../shared/models/IShoppingCartItem';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IShoppingCartItem[]>;
  items: IShoppingCartItem[];
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketService.basket$.subscribe(
      (res) => {
        this.items = res;
      },
      (error) => {
        console.error('BasketOnInit', error);
      }
    );
    console.log(this.basket$, 'bsssket');
    console.log(this.items, 'bsssket');
  }
  incrementQuantity(item: IShoppingCartItem) {
    this.basketService.incrementItemQuantity(item);
  }
  decrementQuantity(item: IShoppingCartItem) {
    this.basketService.decrementItemQuantity(item);
  }

  deleteItem(item: IShoppingCartItem) {
    this.basketService.deleteItm(item);
  }
}
