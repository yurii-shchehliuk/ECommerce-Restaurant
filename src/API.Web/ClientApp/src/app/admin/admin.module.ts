import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutesModule } from './admin-routes.module';
import { SharedModule } from '../shared/shared.module';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { OrderEventsComponent } from './order-events/order-events.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [CompletedOrdersComponent, OrderEventsComponent, ProductsComponent],
  imports: [CommonModule, AdminRoutesModule, SharedModule],
})
export class AdminModule {}
