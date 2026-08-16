import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

/**
 * Raises the global progress indicator for requests the user is waiting on.
 *
 * The exclusions are requests that already have their own in-place feedback: order
 * submission has a button spinner, deletions are optimistic, and the email-exists
 * check fires on every keystroke.
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const silent =
      (req.method === 'POST' && req.url.includes('orders')) ||
      req.method === 'DELETE' ||
      req.url.includes('emailexists') ||
      req.url.includes('orderevents');

    if (silent) {
      return next.handle(req);
    }

    this.busyService.busy();
    return next.handle(req).pipe(finalize(() => this.busyService.idle()));
  }
}
