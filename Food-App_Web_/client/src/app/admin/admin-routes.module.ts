import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { ManageMenuComponent } from './manage-menu/menu-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './manage-users/user-list.component';
import { AddEditComponent as u } from './manage-users/add-edit.component';
import { AddEditComponent as m } from './manage-menu/add-edit.component';

const routes: Routes = [
  { path: 'completed-orders', component: CompletedOrdersComponent },
  {
    path: 'menu-management',
    component: ManageMenuComponent,
    children: [
      { path: 'add', component: m },
      { path: 'edit/:id', component: m },
    ],
  },
  {
    path: 'users',
    component: UserListComponent,
    children: [
      { path: 'add', component: u },
      { path: 'edit/:id', component: u },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, CommonModule],
})
export class AdminRoutesModule {}
