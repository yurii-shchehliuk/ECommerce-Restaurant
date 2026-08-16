import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./orders.component').then((m) => m.OrdersComponent),
    title: 'Your orders - Owlet',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./order-detailed/order-detailed.component').then((m) => m.OrderDetailedComponent),
  },
];
