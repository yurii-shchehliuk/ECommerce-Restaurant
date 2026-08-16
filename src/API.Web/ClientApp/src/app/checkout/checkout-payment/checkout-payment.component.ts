import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CdkStepperPrevious } from '@angular/cdk/stepper';
import { firstValueFrom } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { environment } from 'src/environment';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { CheckoutForm } from '../checkout-form';
import { CheckoutService } from '../checkout.service';
import { Stripe, StripeElement, StripeElementChangeEvent } from '../stripe';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
  imports: [ReactiveFormsModule, TextInputComponent, CdkStepperPrevious, IconComponent],
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  readonly checkoutForm = input.required<CheckoutForm>();

  readonly cardNumberElement = viewChild.required<ElementRef<HTMLElement>>('cardNumber');
  readonly cardExpiryElement = viewChild.required<ElementRef<HTMLElement>>('cardExpiry');
  readonly cardCvcElement = viewChild.required<ElementRef<HTMLElement>>('cardCvc');

  cardErrors: string | null = null;
  stripeUnavailable = false;
  loading = false;

  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  private basketService = inject(BasketService);
  private checkoutService = inject(CheckoutService);
  private toast = inject(ToastService);
  private router = inject(Router);

  private stripe: Stripe | null = null;
  private cardNumber: StripeElement | null = null;
  private cardExpiry: StripeElement | null = null;
  private cardCvc: StripeElement | null = null;

  get canSubmit(): boolean {
    return (
      !this.loading &&
      !this.stripeUnavailable &&
      this.checkoutForm().controls.paymentForm.valid &&
      this.cardNumberValid &&
      this.cardExpiryValid &&
      this.cardCvcValid
    );
  }

  ngAfterViewInit(): void {
    // Stripe.js is loaded from js.stripe.com rather than bundled, so a blocked or
    // offline load must degrade to a message instead of throwing on mount.
    if (!window.Stripe) {
      this.stripeUnavailable = true;
      return;
    }

    this.stripe = window.Stripe(environment.stripePublishableKey);
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement().nativeElement);
    this.cardNumber.on('change', (event) => this.onCardChange(event));

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement().nativeElement);
    this.cardExpiry.on('change', (event) => this.onCardChange(event));

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement().nativeElement);
    this.cardCvc.on('change', (event) => this.onCardChange(event));
  }

  ngOnDestroy(): void {
    this.cardNumber?.destroy();
    this.cardExpiry?.destroy();
    this.cardCvc?.destroy();
  }

  /**
   * The order is created first and paid second, which is the order API.Basket
   * expects: the PaymentIntent was minted against this basket, and the order is what
   * the webhook later marks paid or failed.
   */
  async submitOrder(): Promise<void> {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket || !this.stripe || !this.cardNumber) {
      return;
    }

    const form = this.checkoutForm();
    this.loading = true;

    try {
      const createdOrder = await firstValueFrom(
        this.checkoutService.createOrder({
          basketId: basket.id,
          deliveryMethodId: Number(form.controls.deliveryForm.controls.deliveryMethod.value),
          shipToAddress: form.controls.addressForm.getRawValue(),
        })
      );

      const result = await this.stripe.confirmCardPayment(basket.clientSecret ?? '', {
        payment_method: {
          card: this.cardNumber,
          billing_details: { name: form.controls.paymentForm.controls.nameOnCard.value },
        },
      });

      if (result.paymentIntent) {
        this.basketService.deleteBasket(basket);
        this.router.navigate(['/checkout/success'], { state: createdOrder });
      } else {
        this.toast.error(result.error?.message ?? 'The payment was declined.');
      }
    } catch {
      this.toast.error('The order could not be placed.');
    } finally {
      this.loading = false;
    }
  }

  private onCardChange(event: StripeElementChangeEvent): void {
    this.cardErrors = event.error?.message ?? null;

    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }
}
