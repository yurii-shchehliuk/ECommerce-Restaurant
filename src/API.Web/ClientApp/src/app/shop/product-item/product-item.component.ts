import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { BasketService } from 'src/app/basket/basket.service';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
    imports: [RouterLink, IconComponent, CurrencyPipe]
})
export class ProductItemComponent {
  @Input() product: IProduct;

  constructor(private basketService: BasketService) { }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }

}
