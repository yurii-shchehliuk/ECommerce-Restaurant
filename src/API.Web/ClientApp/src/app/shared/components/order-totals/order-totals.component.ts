import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss'],
  imports: [CurrencyPipe],
})
export class OrderTotalsComponent {
  readonly shippingPrice = input(0);
  readonly subtotal = input(0);
  readonly total = input(0);
}
