import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'test-error', component: TestErrorComponent,  },
  { path: 'server-error', component: ServerErrorComponent,  },
  { path: 'not-found', component: NotFoundComponent,  },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), },
  { path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule), },
  { path: 'features', loadChildren: () => import('./features/features.module').then(mod => mod.FeaturesModule), },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./checkout/checkout.module')
      .then(mod => mod.CheckoutModule),   },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module')
      .then(mod => mod.OrdersModule),   },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module')
      .then(mod => mod.AccountModule)
  },
  // { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
