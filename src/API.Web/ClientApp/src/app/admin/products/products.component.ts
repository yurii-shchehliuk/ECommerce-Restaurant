import { Component, OnInit, inject } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { AdminProductsService } from './products.service';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-admin-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    imports: [CurrencyPipe]
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
