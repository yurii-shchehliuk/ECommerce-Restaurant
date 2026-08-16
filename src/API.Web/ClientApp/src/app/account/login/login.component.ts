import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EMAIL_PATTERN } from 'src/app/shared/validators/email';
import { AccountService } from '../account.service';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ReactiveFormsModule, TextInputComponent, NgIf, RouterLink]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    password: new FormControl('', Validators.required),
  });

  returnUrl = '/shop';
  submitting = false;
  error: string | null = null;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
