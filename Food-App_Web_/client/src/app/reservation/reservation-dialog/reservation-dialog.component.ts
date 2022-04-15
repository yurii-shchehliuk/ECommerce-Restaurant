import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {
  frmLDAPSvr: FormGroup;
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  
  constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>,
    private fb: FormBuilder
    ) {}


  ngOnInit(): void {
    this.createLDAPServerForm();
  }

  private createLDAPServerForm() {
    this.frmLDAPSvr = this.fb.group({
      txtTableId:[1],
      txtLDAPSvr: [null, [Validators.required]],
      chkSecure: [false, Validators.required],
      txtURL: [null, Validators.required],
      txtDomain: [null, Validators.required],
      txtUsername: [null, Validators.required],
      txtPassword: [null, Validators.required],
      testLDAPLabel: [null, Validators.required],
    });
  }
  onSubmit() {
    console.log(this.frmLDAPSvr);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
