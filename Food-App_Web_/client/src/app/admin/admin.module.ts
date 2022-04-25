import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutesModule } from './admin-routes.module';
import { SharedModule } from '../shared/shared.module';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './users/list.component';
import { AddEditComponent } from './users/add-edit.component';

@NgModule({
  declarations: [
    CompletedOrdersComponent,
    ManageMenuComponent,
    ListComponent,
    AddEditComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AdminRoutesModule, SharedModule],
})
export class AdminModule {}
