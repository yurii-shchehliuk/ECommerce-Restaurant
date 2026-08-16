import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { IPagination } from 'src/app/shared/models/pagination';

/**
 * The catalogue, read through API.Basket's products endpoint - the same source the
 * storefront reads, so the admin table and the shop can never disagree.
 */
@Injectable({ providedIn: 'root' })
export class AdminProductsService {
  private baseUrl = `${environment.basketApi}products`;

  constructor(private http: HttpClient) {}

  getAll(pageSize = 50): Observable<IPagination> {
    return this.http.get<IPagination>(`${this.baseUrl}?pageIndex=1&pageSize=${pageSize}`);
  }
}
