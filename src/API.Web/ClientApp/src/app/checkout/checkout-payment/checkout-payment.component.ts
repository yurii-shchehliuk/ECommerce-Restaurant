import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { firstValueFrom } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { environment } from 'src/environment';
import { CheckoutService } from '../checkout.service';
import { StripeElement, StripeElementChangeEvent, Stripe } from '../stripe';

@Component({
    selector: 'app-checkout-payment',
    templateUrl: './checkout-payment.component.html',
    styleUrls: ['./checkout-payment.component.scss'],
    standalone: false
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm!: FormGroup;

  @ViewChild('cardNumber', { static: true }) cardNumberElement!: ElementRef<HTMLElement>;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement!: ElementRef<HTMLElement>;
  @ViewChild('cardCvc', { static: true }) cardCvcElement!: ElementRef<HTMLElement>;

  cardErrors: string | null = null;
  stripeUnavailable = false;
  loading = false;

  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  private stripe: Stripe | null = null;
  private cardNumber: StripeElement | null = null;
  private cardExpiry: StripeElement | null = null;
  private cardCvc: StripeElement | null = null;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastService,
    private router: Router
  ) {}

  get canSubmit(): boolean {
    return (
      !this.loading &&
      !this.stripeUnavailable &&
      this.checkoutForm?.get('paymentForm')?.valid === true &&
      this.cardNumberValid &&
      this.cardExpiryValid &&
      this.cardCvcValid
    );
  }

  ngAfterViewInit(): void {
    // Stripe.js is loaded from its CDN; an offline or blocked load must not take the
    // rest of checkout down with it.
    if (!window.Stripe) {
      this.stripeUnavailable = true;
      return;
    }

    this.stripe = window.Stripe(environment.stripePublishableKey);
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.on('change', (event) => this.onCardChange(event));

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.on('change', (event) => this.onCardChange(event));

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.on('change', (event) => this.onCardChange(event));
  }

  ngOnDestroy(): void {
    this.cardNumber?.destroy();
    this.cardExpiry?.destroy();
    this.cardCvc?.destroy();
  }

  async submitOrder(): Promise<void> {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket || !this.stripe || !this.cardNumber) {
      return;
    }

    this.loading = true;

    try {
      const createdOrder = await firstValueFrom(
        this.checkoutService.createOrder({
          basketId: basket.id,
          deliveryMethodId: +this.checkoutForm.get('deliveryForm')!.get('deliveryMethod')!.value,
          shipToAddress: this.checkoutForm.get('addressForm')!.value,
        })
      );

      const result = await this.stripe.confirmCardPayment(basket.clientSecret ?? '', {
        payment_method: {
          card: this.cardNumber,
          billing_details: {
            name: this.checkoutForm.get('paymentForm')!.get('nameOnCard')!.value,
          },
        },
      });

      if (result.paymentIntent) {
        this.basketService.deleteBasket(basket as IBasket);
        this.router.navigate(['checkout/success'], { state: createdOrder });
      } else {
        this.toastr.error(result.error?.message ?? 'The payment was declined.');
      }
    } catch {
      this.toastr.error('The order could not be placed.');
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
