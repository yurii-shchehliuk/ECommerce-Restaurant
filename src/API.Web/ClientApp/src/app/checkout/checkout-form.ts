import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * The checkout wizard's form, typed once and shared by every step.
 *
 * The steps are sibling components that each own one sub-group, so the type has to
 * live outside all of them; with it, `form.controls.addressForm.controls.city` is
 * checked at compile time instead of being a string lookup that returns
 * `AbstractControl | null`.
 */
export type AddressForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  street: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  zipcode: FormControl<string>;
}>;

export type DeliveryForm = FormGroup<{
  /** The radio group's value is the delivery method id, as a string. */
  deliveryMethod: FormControl<string>;
}>;

export type PaymentForm = FormGroup<{
  nameOnCard: FormControl<string>;
}>;

export type CheckoutForm = FormGroup<{
  addressForm: AddressForm;
  deliveryForm: DeliveryForm;
  paymentForm: PaymentForm;
}>;

const required = () =>
  new FormControl('', { nonNullable: true, validators: [Validators.required] });

export function createCheckoutForm(): CheckoutForm {
  return new FormGroup({
    addressForm: new FormGroup({
      firstName: required(),
      lastName: required(),
      street: required(),
      city: required(),
      state: required(),
      zipcode: required(),
    }),
    deliveryForm: new FormGroup({
      deliveryMethod: required(),
    }),
    paymentForm: new FormGroup({
      nameOnCard: required(),
    }),
  });
}
