import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm!: ElementRef<HTMLInputElement>;

  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  shopParams: ShopParams;
  totalCount = 0;
  loading = true;
  error: string | null = null;

  readonly sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: low to high', value: 'priceAsc' },
    { name: 'Price: high to low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getTypes();
  }

  getProducts(useCache = false): void {
    this.loading = true;
    this.error = null;

    this.shopService.getProducts(useCache).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalCount = response.count;
        this.loading = false;
      },
      error: () => {
        this.error = 'The catalogue could not be loaded.';
        this.loading = false;
      },
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (types) => (this.types = [{ id: 0, name: 'All' }, ...types]),
      error: () => undefined,
    });
  }

  onTypeSelected(typeId: number): void {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(page: number): void {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== page) {
      params.pageNumber = page;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch(): void {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset(): void {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
