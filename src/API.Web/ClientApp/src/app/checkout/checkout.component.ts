import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CdkStep } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasketTotals } from '../shared/models/basket';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';
import { StepperComponent } from '../shared/components/stepper/stepper.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutForm, createCheckoutForm } from './checkout-form';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [
    StepperComponent,
    CdkStep,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    OrderTotalsComponent,
    AsyncPipe,
  ],
})
export class CheckoutComponent implements OnInit {
  private accountService = inject(AccountService);
  private basketService = inject(BasketService);

  readonly checkoutForm: CheckoutForm = createCheckoutForm();
  readonly basketTotals$: Observable<IBasketTotals | null> = this.basketService.basketTotal$;

  ngOnInit(): void {
    this.prefillAddress();
    this.prefillDeliveryMethod();
  }

  /** A saved default address is a convenience, so failing to read one is silent. */
  private prefillAddress(): void {
    this.accountService.getUserAddress().subscribe({
      next: (address) => address && this.checkoutForm.controls.addressForm.patchValue(address),
      error: () => undefined,
    });
  }

  private prefillDeliveryMethod(): void {
    const deliveryMethodId = this.basketService.getCurrentBasketValue()?.deliveryMethodId;
    if (deliveryMethodId != null) {
      this.checkoutForm.controls.deliveryForm.controls.deliveryMethod.setValue(
        String(deliveryMethodId)
      );
    }
  }
}
