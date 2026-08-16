import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ServerErrorDetail {
  message?: string;
  details?: string;
  statusCode?: number;
}

@Component({
    selector: 'app-server-error',
    templateUrl: './server-error.component.html',
    styleUrls: ['./server-error.component.scss'],
    standalone: false
})
export class ServerErrorComponent {
  /** Handed over by the error interceptor through router state, not fetched here. */
  readonly error: ServerErrorDetail | null;

  constructor(router: Router) {
    this.error = router.getCurrentNavigation()?.extras?.state?.['error'] ?? null;
  }
}
