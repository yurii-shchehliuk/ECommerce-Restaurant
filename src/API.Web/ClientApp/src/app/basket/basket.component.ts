import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { BasketService } from './basket.service';
import { AsyncPipe } from '@angular/common';
import { BasketSummaryComponent } from '../shared/components/basket-summary/basket-summary.component';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/components/icon/icon.component';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css'],
    imports: [BasketSummaryComponent, OrderTotalsComponent, RouterLink, IconComponent, AsyncPipe]
})
export class BasketComponent {
  private basketService = inject(BasketService);

  readonly basket$: Observable<IBasket | null> = this.basketService.basket$;
  readonly basketTotals$: Observable<IBasketTotals | null> = this.basketService.basketTotal$;

  removeBasketItem(item: IBasketItem): void {
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem): void {
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem): void {
    this.basketService.decrementItemQuantity(item);
  }
}
