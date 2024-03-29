import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { FeaturesModule } from '../features/features.module';
// ngrx
import { StoreModule } from '@ngrx/store';
import { store } from 'src/environment';
import { productReducer } from '../state/product.reducer';

@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    FeaturesModule,
    StoreModule.forFeature(store.product, productReducer)
  ]
})
export class ShopModule { }
