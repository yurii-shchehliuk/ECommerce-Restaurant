import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { Store } from '@ngrx/store';
import { getDisplayImage, productActionFn, State } from 'src/app/state/product.reducer';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
    private store: Store<State>
  ) {
    this.bcService.set('@productDetails', '');
  }

  ngOnInit() {
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  loadProduct() {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    });
  }

  displayImage: boolean = true;
  onCheckChanged(): void {
    this.store.dispatch(productActionFn.toggleImage());
    // this.store.subscribe(state => {
    //   this.displayImage = state.product.displayImage;
    // });
    // this.store.select('product').subscribe(
    //   displ => {
    //     this.displayImage = displ.displayImage;
    //     console.log(displ);
    //   }
    // );

    this.store.select(getDisplayImage).subscribe(
      showImage => this.displayImage = showImage
    );
  }
}
