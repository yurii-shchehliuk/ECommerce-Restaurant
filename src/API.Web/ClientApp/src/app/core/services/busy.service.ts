import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Tracks in-flight requests so the shell can show one global progress indicator.
 *
 * A counter rather than a boolean: overlapping requests each raise and lower it, and
 * the indicator only clears when the last one finishes.
 */
@Injectable({ providedIn: 'root' })
export class BusyService {
  private count = 0;
  private busySource = new BehaviorSubject<boolean>(false);

  readonly busy$: Observable<boolean> = this.busySource.asObservable();

  busy(): void {
    this.count++;
    this.busySource.next(true);
  }

  idle(): void {
    this.count = Math.max(0, this.count - 1);
    if (this.count === 0) {
      this.busySource.next(false);
    }
  }
}
