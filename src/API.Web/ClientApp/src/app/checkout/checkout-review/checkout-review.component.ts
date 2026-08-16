import { Component, Input, OnInit, inject } from '@angular/core';
import { CdkStepper, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-checkout-review',
    templateUrl: './checkout-review.component.html',
    imports: [BasketSummaryComponent, CdkStepperPrevious, IconComponent, AsyncPipe]
})
export class CheckoutReviewComponent implements OnInit {
  private basketService = inject(BasketService);

  @Input() appStepper!: CdkStepper;

  basket$!: Observable<IBasket | null>;
  creatingIntent = false;
  error: string | null = null;

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
