import { Component, OnInit, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CheckoutForm } from '../checkout-form';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css'],
  imports: [ReactiveFormsModule, CdkStepperPrevious, IconComponent, CdkStepperNext, CurrencyPipe],
})
export class CheckoutDeliveryComponent implements OnInit {
  readonly checkoutForm = input.required<CheckoutForm>();

  deliveryMethods: IDeliveryMethod[] = [];
  error: string | null = null;

  private checkoutService = inject(CheckoutService);
  private basketService = inject(BasketService);

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (methods) => (this.deliveryMethods = methods),
      error: () => (this.error = 'Delivery options could not be loaded.'),
    });
  }

  setShippingPrice(method: IDeliveryMethod): void {
    this.basketService.setShippingPrice(method);
  }
}
