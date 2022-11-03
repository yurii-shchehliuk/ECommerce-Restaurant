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
  mytime: Date = new Date();

  constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>,
    private fb: FormBuilder
    ) {}


  ngOnInit(): void {
    this.createLDAPServerForm();
  }

  private createLDAPServerForm() {
    this.frmLDAPSvr = this.fb.group({
      txtTableId:[1],
    });
  }
  onSubmit() {
    console.log(this.frmLDAPSvr);
    this.onCancel();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
