import { Component, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { IconComponent } from '../shared/components/icon/icon.component';
import { PagerComponent } from '../shared/components/pager/pager.component';
import { PagingHeaderComponent } from '../shared/components/paging-header/paging-header.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [PagingHeaderComponent, ProductItemComponent, PagerComponent, IconComponent],
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);

  readonly searchTerm = viewChild<ElementRef<HTMLInputElement>>('search');

  products: IProduct[] = [];
  types: IType[] = [];
  shopParams: ShopParams;
  totalCount = 0;
  loading = true;
  error: string | null = null;

  /** Placeholder cards, one per slot on a full page. */
  readonly skeletons = Array.from({ length: 6 }, (_, i) => i);

  readonly sortOptions = [
    { name: 'Name, A to Z', value: 'name' },
    { name: 'Price, low to high', value: 'priceAsc' },
    { name: 'Price, high to low', value: 'priceDesc' },
  ];

  constructor() {
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
      next: (page) => {
        this.products = page.data;
        this.totalCount = page.count;
        this.loading = false;
      },
      error: () => {
        this.error = 'The menu could not be loaded.';
        this.loading = false;
      },
    });
  }

  /** Categories are a nicety; losing them should not empty the page. */
  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (types) => (this.types = [{ id: 0, name: 'Everything' }, ...types]),
      error: () => undefined,
    });
  }

  onTypeSelected(typeId: number): void {
    this.updateParams((params) => {
      params.typeId = typeId;
      params.pageNumber = 1;
    });
  }

  onSortSelected(sort: string): void {
    this.updateParams((params) => {
      params.sort = sort;
      params.pageNumber = 1;
    });
  }

  onPageChanged(page: number): void {
    if (this.shopParams.pageNumber === page) {
      return;
    }
    this.updateParams((params) => (params.pageNumber = page), true);
  }

  onSearch(): void {
    this.updateParams((params) => {
      params.search = this.searchTerm()?.nativeElement.value ?? '';
      params.pageNumber = 1;
    });
  }

  onReset(): void {
    const input = this.searchTerm();
    if (input) {
      input.nativeElement.value = '';
    }
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }

  /**
   * Paging may serve from the cache; changing a filter, a sort or the search never
   * may, because the cache is keyed by page alone and would answer the old query.
   */
  private updateParams(mutate: (params: ShopParams) => void, useCache = false): void {
    const params = this.shopService.getShopParams();
    mutate(params);
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts(useCache);
  }
}
