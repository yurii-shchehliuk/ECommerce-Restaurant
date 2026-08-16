import { Component, OnInit, inject } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/components/icon/icon.component';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    imports: [RouterLink, CurrencyPipe, DatePipe, IconComponent]
})
export class OrdersComponent implements OnInit {
  private ordersService = inject(OrdersService);

  orders: IOrder[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.ordersService.getOrdersForUser().subscribe({
      next: (orders) => {
        this.orders = orders ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Your orders could not be loaded.';
        this.loading = false;
      },
    });
  }
}
