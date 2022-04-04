import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategories } from '../shared/models/ICategories';
import { IProduct } from '../shared/models/IProduct';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    let url = 'products';

    if (shopParams.categoryId) {
      url += '/ProductsByCategory/' + shopParams.categoryId;
    }
    if (shopParams.sortSelected) {
      params = params.append('sortSelected', shopParams.sortSelected);
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageNumber', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return (
      this.http
        .get<IProduct[]>(this.baseUrl + url, { observe: 'response', params })
        .pipe(
          map((response) => {
            return response.body;
          })
        )
    );
  }
  getCategories() {
    return this.http.get<ICategories[]>(this.baseUrl + 'Categories');
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
}
