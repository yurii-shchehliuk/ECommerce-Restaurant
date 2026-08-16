import { Component } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EMAIL_PATTERN } from 'src/app/shared/validators/email';
import { AccountService } from '../account.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent {
  registerForm = this.fb.group({
    displayName: ['', [Validators.required]],
    email: [
      '',
      [Validators.required, Validators.pattern(EMAIL_PATTERN)],
      [this.validateEmailNotTaken()],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errors: string[] = [];
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

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
