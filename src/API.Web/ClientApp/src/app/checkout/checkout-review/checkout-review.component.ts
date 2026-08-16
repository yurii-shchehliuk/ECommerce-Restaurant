import { Component, Input, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
    selector: 'app-checkout-review',
    templateUrl: './checkout-review.component.html',
    styleUrls: ['./checkout-review.component.scss'],
    standalone: false
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper!: CdkStepper;

  basket$!: Observable<IBasket | null>;
  creatingIntent = false;
  error: string | null = null;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  /**
   * The payment step cannot render until the basket carries a client secret, so the
   * intent is created here rather than on entry to the next step.
   */
  createPaymentIntent(): void {
    this.creatingIntent = true;
    this.error = null;

    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.creatingIntent = false;
        this.appStepper.next();
      },
      error: () => {
        this.creatingIntent = false;
        this.error = 'Payments are not configured on this deployment.';
      },
    });
  }
}
