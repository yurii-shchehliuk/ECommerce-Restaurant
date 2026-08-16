import { Component, computed, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';
import { IconComponent } from '../icon/icon.component';

/**
 * One row of the line-item table, whichever shape the caller passed in.
 *
 * A basket item keys the product by `id` and an order item by `productId`; both are
 * projected onto this before the template sees them, so the template never has to
 * ask which kind of list it is rendering.
 */
export interface SummaryRow {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  type: string | null;
  /** The original object, so an edit emits back exactly what the caller handed in. */
  source: IBasketItem | IOrderItem;
}

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
  imports: [RouterLink, IconComponent, CurrencyPipe],
})
export class BasketSummaryComponent {
  readonly items = input<(IBasketItem | IOrderItem)[]>([]);
  /** Basket rows are editable; order rows are a record of what happened and are not. */
  readonly editable = input(true);

  readonly decrement = output<IBasketItem>();
  readonly increment = output<IBasketItem>();
  readonly remove = output<IBasketItem>();

  readonly rows = computed<SummaryRow[]>(() =>
    this.items().map((item) => ({
      productId: 'productId' in item ? item.productId : item.id,
      productName: item.productName,
      pictureUrl: item.pictureUrl,
      price: item.price,
      quantity: item.quantity,
      type: 'type' in item ? item.type : null,
      source: item,
    }))
  );

  decrementItemQuantity(row: SummaryRow): void {
    this.decrement.emit(row.source as IBasketItem);
  }

  incrementItemQuantity(row: SummaryRow): void {
    this.increment.emit(row.source as IBasketItem);
  }

  removeBasketItem(row: SummaryRow): void {
    this.remove.emit(row.source as IBasketItem);
  }
}
