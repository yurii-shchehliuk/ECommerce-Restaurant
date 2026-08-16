import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';
import { BasketSummaryComponent } from './basket-summary.component';

const basketItem: IBasketItem = {
  id: 12,
  productName: 'Ten-Piece Grill Box',
  price: 16,
  quantity: 2,
  pictureUrl: '/img/grill-box.jpg',
  brand: 'Owlet',
  type: 'Snacks',
};

const orderItem: IOrderItem = {
  productId: 12,
  productName: 'Ten-Piece Grill Box',
  price: 16,
  quantity: 2,
  pictureUrl: '/img/grill-box.jpg',
};

describe('BasketSummaryComponent', () => {
  let fixture: ComponentFixture<BasketSummaryComponent>;
  let component: BasketSummaryComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketSummaryComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketSummaryComponent);
    component = fixture.componentInstance;
  });

  it('keys a basket item by id', () => {
    fixture.componentRef.setInput('items', [basketItem]);
    fixture.detectChanges();

    expect(component.rows()[0].productId).toBe(12);
    expect(component.rows()[0].type).toBe('Snacks');
  });

  it('keys an order item by productId, which is the other name for the same thing', () => {
    fixture.componentRef.setInput('items', [orderItem]);
    fixture.detectChanges();

    expect(component.rows()[0].productId).toBe(12);
    expect(component.rows()[0].type).toBeNull();
  });

  it('shows the quantity controls only when the list is editable', () => {
    fixture.componentRef.setInput('items', [basketItem]);
    fixture.componentRef.setInput('editable', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.qty__btn').length).toBe(2);

    fixture.componentRef.setInput('editable', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.qty__btn').length).toBe(0);
  });

  it('never offers to edit an order, which is a record of what happened', () => {
    fixture.componentRef.setInput('items', [orderItem]);
    fixture.componentRef.setInput('editable', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.line__remove')).toBeNull();
  });

  it('emits the original object the caller passed in, not the projected row', () => {
    fixture.componentRef.setInput('items', [basketItem]);
    fixture.detectChanges();

    let emitted: IBasketItem | undefined;
    component.remove.subscribe((item) => (emitted = item));
    component.removeBasketItem(component.rows()[0]);

    expect(emitted).toBe(basketItem);
  });

  it('renders nothing at all for an empty list, leaving the empty state to the page', () => {
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.lines')).toBeNull();
  });
});
