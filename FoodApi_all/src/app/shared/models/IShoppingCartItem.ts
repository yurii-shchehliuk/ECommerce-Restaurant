export interface IShoppingCartItem {
  id: number;
  price: number;
  totalAmount: number;
  qty: number;
  productName : string;
  imageUrl: string;
  productId: number;
  basketId?: number;
  customerId: number;
  categoryName: string;
}
