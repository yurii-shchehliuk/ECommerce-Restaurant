import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { IAddress } from 'src/app/shared/models/address';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CdkStepperNext } from '@angular/cdk/stepper';

@Component({
    selector: 'app-checkout-address',
    templateUrl: './checkout-address.component.html',
    styleUrls: ['./checkout-address.component.scss'],
    imports: [ReactiveFormsModule, TextInputComponent, RouterLink, IconComponent, CdkStepperNext]
})
export class CheckoutAddressComponent {
  @Input() checkoutForm: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastService) { }

  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value)
      .subscribe((address: IAddress) => {
        this.toastr.success('Address saved');
        this.checkoutForm.get('addressForm').reset(address);
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
  }

}
