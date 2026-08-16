import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { OrderEventsComponent } from './order-events/order-events.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'completed-orders', component: CompletedOrdersComponent },
  { path: 'order-events', component: OrderEventsComponent },
  { path: 'menu-management', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutesModule {}
