import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {
  form: FormGroup;
  email: string;

  constructor(private dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.email, [Validators.required]],
    });
  }

  submitted() {
    this.dialogRef.close(this.form.value);
  }

  registraion() {
    //show password field
  }

}
