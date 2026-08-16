import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environment';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

/**
 * The catalogue, plus a small cache.
 *
 * Products already fetched are kept so paging back to a visited page and opening a
 * product from the grid do not re-request what the client already has. The cache is
 * dropped whenever a filter, sort or search changes, because it is keyed only by
 * page and would otherwise serve results from the previous query.
 */
@Injectable({ providedIn: 'root' })
export class ShopService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.basketApi}products`;

  private products: IProduct[] = [];
  private brands: IBrand[] = [];
  private types: IType[] = [];
  private pagination: IPagination = { pageIndex: 1, pageSize: 9, count: 0, data: [] };
  private shopParams = new ShopParams();

  getShopParams(): ShopParams {
    return this.shopParams;
  }

  setShopParams(params: ShopParams): void {
    this.shopParams = params;
  }

  getProducts(useCache: boolean): Observable<IPagination> {
    if (!useCache) {
      this.products = [];
    }

    if (useCache && this.products.length > 0) {
      const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);
      if (this.shopParams.pageNumber <= pagesReceived) {
        const start = (this.shopParams.pageNumber - 1) * this.shopParams.pageSize;
        return of({
          ...this.pagination,
          data: this.products.slice(start, start + this.shopParams.pageSize),
        });
      }
    }

    let params = new HttpParams()
      .append('sort', this.shopParams.sort)
      .append('pageIndex', this.shopParams.pageNumber)
      .append('pageSize', this.shopParams.pageSize);

    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId);
    }
    if (this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId);
    }
    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    return this.http.get<IPagination>(this.baseUrl, { params }).pipe(
      tap((page) => {
        this.products = [...this.products, ...page.data];
        this.pagination = page;
      })
    );
  }

  getProduct(id: number): Observable<IProduct> {
    const cached = this.products.find((product) => product.id === id);
    return cached ? of(cached) : this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  getBrands(): Observable<IBrand[]> {
    return this.brands.length
      ? of(this.brands)
      : this.http
          .get<IBrand[]>(`${this.baseUrl}/brands`)
          .pipe(map((brands) => (this.brands = brands)));
  }

  getTypes(): Observable<IType[]> {
    return this.types.length
      ? of(this.types)
      : this.http.get<IType[]>(`${this.baseUrl}/types`).pipe(map((types) => (this.types = types)));
  }
}
