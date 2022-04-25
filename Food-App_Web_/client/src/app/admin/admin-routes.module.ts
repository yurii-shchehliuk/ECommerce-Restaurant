import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './users/list.component';
import { AddEditComponent } from './users/add-edit.component';

const routes: Routes = [
  { path: 'completed-orders', component: CompletedOrdersComponent },
  { path: 'menu-management', component: ManageMenuComponent },
  {
    path: 'users',
    component: ListComponent,
    children: [
      { path: 'users/add', component: AddEditComponent },
      { path: 'users/edit/:id', component: AddEditComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, CommonModule],
})
export class AdminRoutesModule {}
