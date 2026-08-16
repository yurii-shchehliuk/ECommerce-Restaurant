import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'order-events',
    loadComponent: () =>
      import('./order-events/order-events.component').then((m) => m.OrderEventsComponent),
    title: 'Order events - Owlet',
  },
  {
    path: 'completed-orders',
    loadComponent: () =>
      import('./completed-orders/completed-orders.component').then(
        (m) => m.CompletedOrdersComponent
      ),
    title: 'All orders - Owlet',
  },
  {
    path: 'menu-management',
    loadComponent: () => import('./products/products.component').then((m) => m.ProductsComponent),
    title: 'Catalogue - Owlet',
  },
  { path: '', pathMatch: 'full', redirectTo: 'order-events' },
];
