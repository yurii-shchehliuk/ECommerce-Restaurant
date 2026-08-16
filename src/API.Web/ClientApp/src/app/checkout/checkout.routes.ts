import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./checkout.component').then((m) => m.CheckoutComponent),
    title: 'Checkout - Owlet',
  },
  {
    path: 'success',
    loadComponent: () =>
      import('./checkout-success/checkout-success.component').then(
        (m) => m.CheckoutSuccessComponent
      ),
    title: 'Order placed - Owlet',
    data: { chrome: false },
  },
];
