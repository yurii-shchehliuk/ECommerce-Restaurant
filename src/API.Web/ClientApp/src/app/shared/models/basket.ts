export interface IBasket {
  id: string;
  items: IBasketItem[];
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingPrice?: number;
}

export interface IBasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export interface IBasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}

/**
 * `crypto.randomUUID` is available in every browser this project targets and in any
 * secure context, which includes localhost - so the basket id needs no dependency.
 */
export class Basket implements IBasket {
  id = crypto.randomUUID();
  items: IBasketItem[] = [];
}
