import { Component, Input, OnInit, inject } from '@angular/core';
import { CdkStepper, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { IBasket } from 'src/app/shared/models/basket';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { AsyncPipe } from '@angular/common';
import { CheckoutForm } from '../checkout-form';
import { CheckoutService } from '../checkout.service';

@Component({
    selector: 'app-checkout-review',
    templateUrl: './checkout-review.component.html',
    imports: [BasketSummaryComponent, CdkStepperPrevious, IconComponent, AsyncPipe]
})
export class CheckoutReviewComponent implements OnInit {
  private basketService = inject(BasketService);
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private toast = inject(ToastService);

  @Input() appStepper!: CdkStepper;
  @Input({ required: true }) checkoutForm!: CheckoutForm;

  basket$!: Observable<IBasket | null>;
  creatingIntent = false;
  placing = false;

  /** Set once the intent call has answered that this deployment carries no Stripe key. */
  paymentsUnavailable = false;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  /**
   * The payment step cannot render until the basket carries a client secret, so the
   * intent is created here rather than on entry to the next step. A deployment with no
   * Stripe key answers with an error, and that is what opens the unpaid path below.
   */
  createPaymentIntent(): void {
    this.creatingIntent = true;

    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.creatingIntent = false;
        this.appStepper.next();
      },
      error: () => {
        this.creatingIntent = false;
        this.paymentsUnavailable = true;
      },
    });
  }

  /**
   * Places the order without a card, through the same `POST api/orders` the payment
   * step calls before it confirms the intent. The order is written and published
   * exactly as it would be; what it does not get is a payment, so its status stays
   * Pending instead of being moved on by a Stripe webhook.
   */
  placeOrder(): void {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) return;

    this.placing = true;

    this.checkoutService
      .createOrder({
        basketId: basket.id,
        deliveryMethodId: Number(
          this.checkoutForm.controls.deliveryForm.controls.deliveryMethod.value
        ),
        shipToAddress: this.checkoutForm.controls.addressForm.getRawValue(),
      })
      .subscribe({
        next: (order) => {
          this.placing = false;
          this.basketService.deleteBasket(basket);
          this.router.navigate(['/checkout/success'], { state: order });
        },
        error: () => {
          this.placing = false;
          this.toast.error('The order could not be placed.');
        },
      });
  }
}
