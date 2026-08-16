import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shop.component').then((m) => m.ShopComponent),
    title: 'Menu - Owlet',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-details/product-details.component').then((m) => m.ProductDetailsComponent),
  },
];
