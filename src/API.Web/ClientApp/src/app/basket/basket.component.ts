import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { BasketService } from './basket.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { BasketSummaryComponent } from '../shared/components/basket-summary/basket-summary.component';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/components/icon/icon.component';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss'],
    imports: [NgIf, BasketSummaryComponent, OrderTotalsComponent, RouterLink, IconComponent, AsyncPipe]
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }

}
