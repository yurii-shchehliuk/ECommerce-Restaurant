import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { EMAIL_PATTERN } from 'src/app/shared/validators/email';
import { AccountService } from '../account.service';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [ReactiveFormsModule, TextInputComponent, RouterLink, IconComponent]
})
export class LoginComponent implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(EMAIL_PATTERN)],
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  returnUrl = '/shop';
  submitting = false;
  error: string | null = null;

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/shop';
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.submitting) {
      return;
    }

    this.submitting = true;
    this.error = null;

    this.accountService.login(this.loginForm.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: () => {
        this.error = 'That email address and password do not match an account.';
        this.submitting = false;
      },
    });
  }
}
