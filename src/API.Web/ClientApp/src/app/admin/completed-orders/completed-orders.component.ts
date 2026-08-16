import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { CompletedOrdersService } from './completed-orders.service';
import { NgIf, NgFor, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-completed-orders',
    templateUrl: './completed-orders.component.html',
    styleUrls: ['./completed-orders.component.scss'],
    imports: [NgIf, NgFor, RouterLink, CurrencyPipe, DatePipe]
})
export class CompletedOrdersComponent implements OnInit {
  orders: IOrder[] = [];
  loading = true;
  error: string | null = null;

  constructor(private service: CompletedOrdersService) {}

  ngOnInit(): void {
    this.service.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not reach API.Basket.';
        this.loading = false;
      },
    });
  }

  /** Client-side export, so it works without an endpoint that does not exist. */
  exportData(): void {
    const blob = new Blob([JSON.stringify(this.orders, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'orders.json';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }
}
