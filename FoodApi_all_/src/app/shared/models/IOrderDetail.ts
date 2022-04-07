import { IProduct } from './IProduct';

export interface OrderDetail {
  id: number;
  price: number;
  qty: number;
  totalAmount: number;
  orderId: number;
  //order: IOrder;
  productId: number;
  product: IProduct;
}
