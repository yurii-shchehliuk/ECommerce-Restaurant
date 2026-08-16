import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

/**
 * Guards the routes that need a signed-in user.
 *
 * `take(1)` matters: `currentUser$` is a ReplaySubject that emits again on sign-out,
 * and without it the guard's observable never completes and the navigation hangs.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    take(1),
    map((user) =>
      user
        ? true
        : router.createUrlTree(['/account/login'], { queryParams: { returnUrl: state.url } })
    )
  );
};
