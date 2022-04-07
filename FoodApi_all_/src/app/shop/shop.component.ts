import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICategories } from '../shared/models/ICategories';
import { IPopularProuct } from '../shared/models/IPopularProduct';
import { IProduct } from '../shared/models/IProduct';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProduct[];
  categories: ICategories[];
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getProducts() {
    this.shopService
      .getProducts(this.shopParams)
      .subscribe(
        (response) => {
          this.products = response;
        },
        (error) => {
          console.log(error, "getProducts()");
        }
      );
  }

  getCategories() {
    this.shopService.getCategories().subscribe(
      (response) => {
        this.categories = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error, "getCategories()");
      }
    );
  }

  onCategorySelected(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sortSelected = sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
