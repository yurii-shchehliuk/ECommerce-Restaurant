import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutesModule } from './admin-routes.module';
import { SharedModule } from '../shared/shared.module';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { ManageMenuComponent } from './manage-menu/menu-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './manage-users/user-list.component';
import { AddEditComponent as u } from './manage-users/add-edit.component';
import { AddEditComponent as m } from './manage-menu/add-edit.component';

@NgModule({
  declarations: [
    CompletedOrdersComponent,
    ManageMenuComponent,
    UserListComponent,
    u,
    m,
  ],
  imports: [CommonModule, ReactiveFormsModule, AdminRoutesModule, SharedModule],
})
export class AdminModule {}
