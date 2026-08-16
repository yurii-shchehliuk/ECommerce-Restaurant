import { Component, inject } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EMAIL_PATTERN } from 'src/app/shared/validators/email';
import { AccountService } from '../account.service';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [ReactiveFormsModule, TextInputComponent, RouterLink, IconComponent]
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  readonly registerForm = new FormGroup({
    displayName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(EMAIL_PATTERN)],
      asyncValidators: [this.validateEmailNotTaken()],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  errors: string[] = [];
  submitting = false;

  onSubmit(): void {
    if (this.registerForm.invalid || this.submitting) {
      return;
    }

    this.submitting = true;
    this.errors = [];

    this.accountService.register(this.registerForm.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: (error) => {
        this.errors = error?.errors ?? ['Registration failed. Please try again.'];
        this.submitting = false;
      },
    });
  }

  /** Debounced so it asks the API once the address has stopped changing. */
  private validateEmailNotTaken(): AsyncValidatorFn {
    return (control) =>
      timer(400).pipe(
        switchMap(() =>
          control.value
            ? this.accountService
                .checkEmailExists(control.value)
                .pipe(map((exists) => (exists ? { emailExists: true } : null)))
            : of(null)
        )
      );
  }
}
