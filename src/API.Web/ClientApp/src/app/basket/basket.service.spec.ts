import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment';
import { IBasket } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';
import { BasketService } from './basket.service';

const product: IProduct = {
  id: 12,
  name: '10 Piece Wicked',
  description: 'A bucket.',
  price: 16,
  pictureUrl: '/img/wicked.jpg',
  productType: 'Snacks',
  productBrand: 'KFC',
};

describe('BasketService', () => {
  let service: BasketService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BasketService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('starts with no basket rather than an empty one', () => {
    expect(service.getCurrentBasketValue()).toBeNull();
  });

  it('sends every field BasketItem validation requires when adding a product', () => {
    service.addItemToBasket(product);

    const request = http.expectOne(`${environment.basketApi}basket`);
    const sent = request.request.body as IBasket;
    const line = sent.items[0];

    // Omitting any of these three returns a 400 that lists them.
    expect(line.pictureUrl).toBe('/img/wicked.jpg');
    expect(line.brand).toBe('KFC');
    expect(line.type).toBe('Snacks');
    expect(line.quantity).toBe(1);

    request.flush(sent);
  });

  it('remembers the generated basket id so the basket survives a reload', () => {
    service.addItemToBasket(product);
    const request = http.expectOne(`${environment.basketApi}basket`);
    const sent = request.request.body as IBasket;
    request.flush(sent);

    expect(localStorage.getItem('basket_id')).toBe(sent.id);
  });

  it('adds to the quantity of a line that is already there', () => {
    service.addItemToBasket(product, 2);
    const first = http.expectOne(`${environment.basketApi}basket`);
    first.flush(first.request.body);

    service.addItemToBasket(product, 3);
    const second = http.expectOne(`${environment.basketApi}basket`);
    const sent = second.request.body as IBasket;

    expect(sent.items.length).toBe(1);
    expect(sent.items[0].quantity).toBe(5);
    second.flush(sent);
  });

  it('deletes a basket rather than saving it empty when the last line goes', () => {
    service.addItemToBasket(product);
    const created = http.expectOne(`${environment.basketApi}basket`);
    const basket = created.request.body as IBasket;
    created.flush(basket);

    service.removeItemFromBasket(basket.items[0]);

    const deletion = http.expectOne(
      (request) => request.method === 'DELETE' && request.url === `${environment.basketApi}basket`
    );
    deletion.flush(null);

    expect(service.getCurrentBasketValue()).toBeNull();
    expect(localStorage.getItem('basket_id')).toBeNull();
  });

  it('recomputes the totals from the server response, not from what was sent', async () => {
    service.addItemToBasket(product, 2);
    const request = http.expectOne(`${environment.basketApi}basket`);
    const sent = request.request.body as IBasket;
    // The server re-prices; the client must believe the server.
    request.flush({ ...sent, items: [{ ...sent.items[0], price: 1 }] });

    const totals = await firstValueFrom(service.basketTotal$);
    expect(totals?.subtotal).toBe(2);
  });

  it('does nothing when asked to change a line of a basket that does not exist', () => {
    const line = { ...product, productName: '', quantity: 1 } as never;

    service.incrementItemQuantity(line);
    service.decrementItemQuantity(line);
    service.removeItemFromBasket(line);

    http.expectNone(() => true);
    expect(service.getCurrentBasketValue()).toBeNull();
  });

  it('clears the local basket without waiting for the server to confirm the delete', () => {
    service.addItemToBasket(product);
    const created = http.expectOne(`${environment.basketApi}basket`);
    created.flush(created.request.body);

    service.deleteBasket(service.getCurrentBasketValue() as IBasket);
    http.expectOne((request) => request.method === 'DELETE').error(new ProgressEvent('failed'));

    expect(service.getCurrentBasketValue()).toBeNull();
  });
});
