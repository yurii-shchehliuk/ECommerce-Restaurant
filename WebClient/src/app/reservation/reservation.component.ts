import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onReserve();
  }

  onReserve(){
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      disableClose: false,
      panelClass: ['col-9', 'col-sm-3'],
    });
  }


}
