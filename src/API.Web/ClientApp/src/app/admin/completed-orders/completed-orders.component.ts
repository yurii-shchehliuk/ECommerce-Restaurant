import { Component, OnInit, inject } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CompletedOrdersService } from './completed-orders.service';

@Component({
    selector: 'app-completed-orders',
    templateUrl: './completed-orders.component.html',
    imports: [RouterLink, CurrencyPipe, DatePipe, IconComponent]
})
export class CompletedOrdersComponent implements OnInit {
  private service = inject(CompletedOrdersService);

  orders: IOrder[] = [];
  loading = true;
  error: string | null = null;

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
