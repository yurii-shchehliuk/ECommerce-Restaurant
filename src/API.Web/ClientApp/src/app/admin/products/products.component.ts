import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { AdminProductsService } from './products.service';

@Component({
    selector: 'app-admin-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    standalone: false
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  loading = true;
  error: string | null = null;

  constructor(private service: AdminProductsService) {}

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
