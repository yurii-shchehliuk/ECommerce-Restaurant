import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { IconComponent } from '../../shared/components/icon/icon.component';


@Component({
    selector: 'app-checkout-success',
    templateUrl: './checkout-success.component.html',
    styleUrls: ['./checkout-success.component.scss'],
    imports: [IconComponent, RouterLink]
})
export class CheckoutSuccessComponent {
  /**
   * Handed over through router state by the payment step. A direct visit or a
   * refresh has no state, which is why the page also works without an order.
   */
  readonly order: IOrder | null;

  constructor() {
    const router = inject(Router);

    this.order = (router.currentNavigation()?.extras?.state as IOrder | undefined) ?? null;
  }
}
