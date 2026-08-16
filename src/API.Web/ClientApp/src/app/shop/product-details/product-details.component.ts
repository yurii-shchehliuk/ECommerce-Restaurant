import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct | null = null;
  productId = '';
  quantity = 1;
  loading = true;
  error: string | null = null;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
    this.shopService.getProduct(+this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: () => {
        this.error = 'That product could not be loaded.';
        this.loading = false;
      },
    });
  }

  addItemToBasket(): void {
    if (this.product) {
      this.basketService.addItemToBasket(this.product, this.quantity);
    }
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
