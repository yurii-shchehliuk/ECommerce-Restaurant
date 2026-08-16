import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './core/guards/auth.guard';

/**
 * Everything except the landing page is lazily loaded, so the first paint carries
 * only the shell and the home page.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Owlet' },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then((m) => m.routes),
  },
  {
    path: 'basket',
    loadComponent: () => import('./basket/basket.component').then((m) => m.BasketComponent),
    title: 'Basket - Owlet',
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadChildren: () => import('./checkout/checkout.routes').then((m) => m.routes),
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadChildren: () => import('./orders/orders.routes').then((m) => m.routes),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.routes').then((m) => m.routes),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.routes),
  },
  {
    path: 'features',
    loadChildren: () => import('./features/features.routes').then((m) => m.routes),
  },
  {
    path: 'test-error',
    loadComponent: () =>
      import('./core/test-error/test-error.component').then((m) => m.TestErrorComponent),
    title: 'API diagnostics - Owlet',
  },
  {
    path: 'server-error',
    loadComponent: () =>
      import('./core/server-error/server-error.component').then((m) => m.ServerErrorComponent),
    title: 'Server error - Owlet',
    data: { chrome: false },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page not found - Owlet',
    data: { chrome: false },
  },
];
