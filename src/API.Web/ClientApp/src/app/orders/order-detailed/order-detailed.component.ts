import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { IOrder } from 'src/app/shared/models/order';
import { PageLabelService } from 'src/app/core/services/page-label.service';
import { OrdersService } from '../orders.service';

import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { OrderTotalsComponent } from '../../shared/components/order-totals/order-totals.component';

@Component({
    selector: 'app-order-detailed',
    templateUrl: './order-detailed.component.html',
    styleUrls: ['./order-detailed.component.css'],
    imports: [BasketSummaryComponent, OrderTotalsComponent, IconComponent, DatePipe, RouterLink]
})
export class OrderDetailedComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);
  private pageLabel = inject(PageLabelService);

  order: IOrder | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.ordersService.getOrderDetailed(id).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
        this.pageLabel.set(`Order #${order.id}`);
      },
      error: () => {
        this.error = 'That order could not be loaded.';
        this.loading = false;
      },
    });
  }
}
