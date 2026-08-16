import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { PageLabelService } from 'src/app/core/services/page-label.service';
import { ShopService } from '../shop.service';
import { CurrencyPipe } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CommentComponent } from '../../features/comments/comment.component';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css'],
    imports: [IconComponent, CommentComponent, CurrencyPipe, RouterLink]
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private route = inject(ActivatedRoute);
  private basketService = inject(BasketService);
  private pageLabel = inject(PageLabelService);

  product: IProduct | null = null;
  productId = '';
  quantity = 1;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
    this.shopService.getProduct(+this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
        // The breadcrumb shows the product's name rather than its id.
        this.pageLabel.set(product.name);
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
