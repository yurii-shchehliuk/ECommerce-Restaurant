import { IShoppingCartItem } from "./IShoppingCartItem";
import {v4 as uuidv4} from 'uuid'
export interface IBasket{
  id: number;
  items: IShoppingCartItem[];
}

export class Basket implements IBasket{
  id = uuidv4();
  items: IShoppingCartItem[] = [];
}

export interface IBasketTotals{
  shipping: number;
  subtotal: number;
  total: number;
}
