import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-order-totals',
    templateUrl: './order-totals.component.html',
    styleUrls: ['./order-totals.component.scss'],
    imports: [CurrencyPipe]
})
export class OrderTotalsComponent {
  @Input() shippingPrice: number;
  @Input() subtotal: number;
  @Input() total: number;

}
