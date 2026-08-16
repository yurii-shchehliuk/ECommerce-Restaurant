import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

/**
 * Guards the `/admin` branch, which reads every buyer's orders and writes the
 * catalogue. `API.Basket` scopes `api/orders/allOrders` to the Admin role, so a
 * signed-in non-admin who reached these pages would see nothing but 403s; the guard
 * turns that into a redirect instead.
 *
 * `take(1)` matters: `currentUser$` is a ReplaySubject that emits again on sign-out,
 * and without it the guard's observable never completes and the navigation hangs.
 */
export const adminGuard: CanActivateFn = (_route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    take(1),
    map((user) => {
      if (user?.isAdmin) return true;
      if (user) return router.createUrlTree(['/']);
      return router.createUrlTree(['/account/login'], { queryParams: { returnUrl: state.url } });
    })
  );
};
