import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/core/services/toast.service';

/**
 * Turns HTTP failures into something the user can see.
 *
 * 400s with a validation payload are rethrown so the submitting form can render them
 * against the offending fields; everything else surfaces as a toast, or as a
 * dedicated page for the two statuses that mean the request will never succeed.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            if (error.error?.errors) {
              return throwError(() => error.error);
            }
            this.toastr.error(error.error?.message ?? 'Bad request', '400');
            break;
          case 401:
            this.toastr.error(error.error?.message ?? 'Please sign in again', '401');
            break;
          case 404:
            this.router.navigateByUrl('/not-found');
            break;
          case 500: {
            const extras: NavigationExtras = { state: { error: error.error } };
            this.router.navigateByUrl('/server-error', extras);
            break;
          }
          case 0:
            this.toastr.error('The service did not respond.', 'Network error');
            break;
        }
        return throwError(() => error);
      })
    );
  }
}
