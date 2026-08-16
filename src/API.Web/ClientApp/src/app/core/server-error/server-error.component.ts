import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';


interface ServerErrorDetail {
  message?: string;
  details?: string;
  statusCode?: number;
}

@Component({
    selector: 'app-server-error',
    templateUrl: './server-error.component.html',
    styleUrls: ['./server-error.component.css'],
    imports: [RouterLink, IconComponent]
})
export class ServerErrorComponent {
  /** Handed over by the error interceptor through router state, not fetched here. */
  readonly error: ServerErrorDetail | null;

  constructor() {
    const router = inject(Router);

    this.error = router.currentNavigation()?.extras?.state?.['error'] ?? null;
  }
}
