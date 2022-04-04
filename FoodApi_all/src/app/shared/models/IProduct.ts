export interface IProduct {
  id: number;
  name: string;
  detail: string;
  price: number;
  imageUrl?: string;
  isPopularProduct: boolean;
  categotyId: number;
  //rating: number;
}
