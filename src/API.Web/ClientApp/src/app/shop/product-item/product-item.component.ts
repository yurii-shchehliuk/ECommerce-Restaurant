import { Component, inject, input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { BasketService } from 'src/app/basket/basket.service';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css'],
    imports: [RouterLink, IconComponent, CurrencyPipe]
})
export class ProductItemComponent {
  readonly product = input.required<IProduct>();

  private basketService = inject(BasketService);

  addItemToBasket(): void {
    this.basketService.addItemToBasket(this.product());
  }
}
