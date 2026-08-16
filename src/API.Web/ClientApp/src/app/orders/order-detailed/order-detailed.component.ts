import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { OrdersService } from '../orders.service';
import { NgIf } from '@angular/common';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { OrderTotalsComponent } from '../../shared/components/order-totals/order-totals.component';

@Component({
    selector: 'app-order-detailed',
    templateUrl: './order-detailed.component.html',
    styleUrls: ['./order-detailed.component.scss'],
    imports: [NgIf, BasketSummaryComponent, OrderTotalsComponent]
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private ordersService: OrdersService) {}

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.ordersService.getOrderDetailed(id).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: () => {
        this.error = 'That order could not be loaded.';
        this.loading = false;
      },
    });
  }
}
