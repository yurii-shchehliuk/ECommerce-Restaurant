import { Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-checkout-success',
    templateUrl: './checkout-success.component.html',
    styleUrls: ['./checkout-success.component.scss'],
    imports: [IconComponent, NgIf, RouterLink]
})
export class CheckoutSuccessComponent {
  order: IOrder;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if (state) {
      this.order = state as IOrder;
    }
   }

}
