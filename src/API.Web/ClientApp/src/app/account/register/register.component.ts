import { Component, inject } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { toMessages } from 'src/app/shared/validators/api-errors';
import { EMAIL_PATTERN } from 'src/app/shared/validators/email';
import { PASSWORD_PATTERN, PASSWORD_RULE, passwordsMatch } from 'src/app/shared/validators/password';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, TextInputComponent, RouterLink, IconComponent],
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  readonly passwordRule = PASSWORD_RULE;

  /**
   * Mirrors API.Identity's `RegisterVM`. Every field it marks `[Required]` is here,
   * including `confirmPassword`, which the endpoint rejects the request without, and
   * the password rule is checked here as well so the answer arrives while the person
   * is still typing rather than as a 400.
   */
  readonly registerForm = new FormGroup(
    {
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
        validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: passwordsMatch('password', 'confirmPassword') }
  );

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
        this.errors = toMessages(error, 'That account could not be created.');
        this.submitting = false;
      },
    });
  }

  /** Debounced, so it asks the API once the address has stopped changing. */
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
