import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-basket-summary',
    templateUrl: './basket-summary.component.html',
    styleUrls: ['./basket-summary.component.scss'],
    imports: [NgIf, NgFor, RouterLink, IconComponent, CurrencyPipe]
})
export class BasketSummaryComponent {
  @Input() items: (IBasketItem | IOrderItem)[] = [];
  /** Basket rows are editable; order rows are a record and must not be. */
  @Input() isBasket = true;
  @Input() isOrder = false;

  @Output() decrement = new EventEmitter<IBasketItem>();
  @Output() increment = new EventEmitter<IBasketItem>();
  @Output() remove = new EventEmitter<IBasketItem>();

  decrementItemQuantity(item: IBasketItem): void {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: IBasketItem): void {
    this.increment.emit(item);
  }

  removeBasketItem(item: IBasketItem): void {
    this.remove.emit(item);
  }
}
