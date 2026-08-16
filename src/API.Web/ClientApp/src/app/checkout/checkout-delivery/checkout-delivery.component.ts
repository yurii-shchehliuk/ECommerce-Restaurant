import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { BasketService } from 'src/app/basket/basket.service';
import { NgFor, CurrencyPipe } from '@angular/common';
import { CdkStepperPrevious, CdkStepperNext } from '@angular/cdk/stepper';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-checkout-delivery',
    templateUrl: './checkout-delivery.component.html',
    styleUrls: ['./checkout-delivery.component.scss'],
    imports: [ReactiveFormsModule, NgFor, CdkStepperPrevious, IconComponent, CdkStepperNext, CurrencyPipe]
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    });
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
