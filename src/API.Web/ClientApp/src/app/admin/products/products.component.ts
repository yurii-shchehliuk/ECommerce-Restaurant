import { Component, OnInit, inject } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { AdminProductsService } from './products.service';

@Component({
    selector: 'app-admin-products',
    templateUrl: './products.component.html',
    imports: [CurrencyPipe, RouterLink, IconComponent]
})
export class ProductsComponent implements OnInit {
  private service = inject(AdminProductsService);

  products: IProduct[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (page) => {
        this.products = page.data ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not reach API.Basket.';
        this.loading = false;
      },
    });
  }
}
