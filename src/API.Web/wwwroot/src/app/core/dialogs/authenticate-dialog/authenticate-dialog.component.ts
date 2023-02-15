import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-authenticate-dialog',
  templateUrl: './authenticate-dialog.component.html',
  styleUrls: ['./authenticate-dialog.component.scss']
})
export class AuthenticateDialogComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private accountService: AccountService, public dialogRef: MatDialogRef<AuthenticateDialogComponent>) { }

  ngOnInit() {
    this.createLoginForm();
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

  private createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }

}
