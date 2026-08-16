import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment';
import { IPagination } from '../shared/models/pagination';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

const productsUrl = `${environment.basketApi}products`;

const page = (ids: number[], count = ids.length): IPagination => ({
  pageIndex: 1,
  pageSize: 9,
  count,
  data: ids.map((id) => ({
    id,
    name: `Product ${id}`,
    description: '',
    price: id,
    pictureUrl: '',
    productType: 'Snacks',
    productBrand: 'Owlet',
  })),
});

describe('ShopService', () => {
  let service: ShopService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ShopService);
    http = TestBed.inject(HttpTestingController);
    service.setShopParams(new ShopParams());
  });

  afterEach(() => http.verify());

  it('sends the paging and sort parameters the API expects', async () => {
    const request$ = firstValueFrom(service.getProducts(false));
    const request = http.expectOne((r) => r.url === productsUrl);

    expect(request.request.params.get('pageIndex')).toBe('1');
    expect(request.request.params.get('pageSize')).toBe('9');
    expect(request.request.params.get('sort')).toBe('name');

    request.flush(page([1, 2]));
    await request$;
  });

  it('omits the brand and type filters when they are unset', async () => {
    const request$ = firstValueFrom(service.getProducts(false));
    const request = http.expectOne((r) => r.url === productsUrl);

    expect(request.request.params.has('brandId')).toBe(false);
    expect(request.request.params.has('typeId')).toBe(false);

    request.flush(page([1]));
    await request$;
  });

  it('serves a page it already has from the cache', async () => {
    const first$ = firstValueFrom(service.getProducts(false));
    http.expectOne((r) => r.url === productsUrl).flush(page([1, 2, 3], 3));
    await first$;

    const cached = await firstValueFrom(service.getProducts(true));

    // No second request; verify() in afterEach would fail if one had been made.
    expect(cached.data.map((p) => p.id)).toEqual([1, 2, 3]);
  });

  it('re-requests when the caller says not to use the cache', async () => {
    const first$ = firstValueFrom(service.getProducts(false));
    http.expectOne((r) => r.url === productsUrl).flush(page([1, 2, 3], 3));
    await first$;

    const second$ = firstValueFrom(service.getProducts(false));
    http.expectOne((r) => r.url === productsUrl).flush(page([4, 5], 2));

    expect((await second$).data.map((p) => p.id)).toEqual([4, 5]);
  });

  it('answers a product lookup from the catalogue it already fetched', async () => {
    const first$ = firstValueFrom(service.getProducts(false));
    http.expectOne((r) => r.url === productsUrl).flush(page([7, 8]));
    await first$;

    const product = await firstValueFrom(service.getProduct(7));

    expect(product.name).toBe('Product 7');
  });

  it('fetches a product it has never seen', async () => {
    const product$ = firstValueFrom(service.getProduct(42));
    const request = http.expectOne(`${productsUrl}/42`);
    request.flush(page([42]).data[0]);

    expect((await product$).id).toBe(42);
  });

  it('fetches the types once and remembers them', async () => {
    const first$ = firstValueFrom(service.getTypes());
    http.expectOne(`${productsUrl}/types`).flush([{ id: 1, name: 'Snacks' }]);
    await first$;

    const second = await firstValueFrom(service.getTypes());

    expect(second).toEqual([{ id: 1, name: 'Snacks' }]);
  });
});
