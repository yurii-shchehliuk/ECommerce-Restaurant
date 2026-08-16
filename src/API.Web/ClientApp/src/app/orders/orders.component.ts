import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';
import { NgIf, NgFor, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    imports: [NgIf, NgFor, RouterLink, CurrencyPipe, DatePipe]
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];
  loading = true;
  error: string | null = null;

  constructor(private ordersService: OrdersService) {}

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
