import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CdkStepperNext } from '@angular/cdk/stepper';
import { AccountService } from 'src/app/account/account.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { CheckoutForm } from '../checkout-form';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
  imports: [ReactiveFormsModule, TextInputComponent, RouterLink, IconComponent, CdkStepperNext],
})
export class CheckoutAddressComponent {
  readonly checkoutForm = input.required<CheckoutForm>();

  private accountService = inject(AccountService);
  private toast = inject(ToastService);

  saveUserAddress(): void {
    const addressForm = this.checkoutForm().controls.addressForm;

    this.accountService.updateUserAddress(addressForm.getRawValue()).subscribe({
      next: (address) => {
        // Reset rather than patch, so the form returns to pristine and the
        // save-as-default button correctly disables itself again.
        addressForm.reset(address);
        this.toast.success('Saved as your default address');
      },
      error: () => this.toast.error('That address could not be saved'),
    });
  }
}
