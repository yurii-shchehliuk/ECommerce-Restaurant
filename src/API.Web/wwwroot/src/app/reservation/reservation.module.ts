import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


@NgModule({
  declarations: [ReservationComponent, ReservationDialogComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    MatDialogModule,
    BsDatepickerModule,
    TimepickerModule,
    // MatDatepickerModule,
    // MatFormFieldModule,
    // MatNativeDateModule,
    SharedModule
  ]
})
export class ReservationModule { }
