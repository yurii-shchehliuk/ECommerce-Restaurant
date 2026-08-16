import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { environment } from 'src/environment';
import { NgFor, NgIf } from '@angular/common';

interface Probe {
  label: string;
  path: string;
  /** What the endpoint is there to demonstrate. */
  note: string;
}

/**
 * Exercises API.Identity's `BuggyController` so the error pipeline can be seen
 * working: the interceptor turns each status into a toast, a redirect or a
 * rethrown validation payload, and this page is how you check that it still does.
 *
 * Admin-only, and linked from the account menu rather than the main navigation.
 */
@Component({
    selector: 'app-test-error',
    templateUrl: './test-error.component.html',
    styleUrls: ['./test-error.component.scss'],
    imports: [NgFor, NgIf]
})
export class TestErrorComponent {
  private baseUrl = environment.identityApi.api;

  readonly statusProbes: Probe[] = [
    { label: '400', path: 'buggy/badrequest', note: 'toast' },
    { label: '400 validation', path: 'badrequest/fortytwo', note: 'field errors below' },
    { label: '401', path: 'buggy/AuthorizedAccess', note: 'toast when signed out' },
    { label: '404', path: 'buggy/notfound', note: 'redirect to /not-found' },
    { label: '500', path: 'buggy/servererror', note: 'redirect to /server-error' },
  ];

  readonly policyProbes: Probe[] = [
    { label: 'Anonymous', path: 'Buggy/AllAccess', note: 'no policy' },
    { label: 'Authenticated', path: 'buggy/AuthorizedAccess', note: '[Authorize]' },
    { label: 'User role', path: 'buggy/UserAccess', note: 'Roles = User' },
    { label: 'Admin role', path: 'buggy/AdminAccess', note: 'Roles = Admin' },
    { label: 'User or Admin', path: 'buggy/User_Admin_Access', note: 'Roles = User,Admin' },
    { label: 'Policy', path: 'buggy/PolicyAccess', note: 'named policy' },
    { label: 'Create claim', path: 'buggy/Admin_CreateAccess', note: 'claim-based' },
    { label: 'CRUD claims', path: 'buggy/Admin_Create_Edit_DeleteAccess', note: 'claim-based' },
    {
      label: 'CRUD or super admin',
      path: 'buggy/Admin_Create_Edit_DeleteAccess_Or_SuperAdmin',
      note: 'claim or requirement',
    },
    { label: 'Super admin', path: 'buggy/OnlySuperAdminChecker', note: 'requirement handler' },
  ];

  validationErrors: string[] = [];
  lastResult: { path: string; status: string; ok: boolean } | null = null;

  constructor(private http: HttpClient, private toastr: ToastService) {}

  run(probe: Probe): void {
    this.validationErrors = [];

    this.http.get(this.baseUrl + probe.path).subscribe({
      next: () => {
        this.lastResult = { path: probe.path, status: '200 OK', ok: true };
        this.toastr.success(probe.path, '200 OK');
      },
      error: (error) => {
        const status = error?.statusCode ?? error?.status ?? 'error';
        this.lastResult = { path: probe.path, status: String(status), ok: false };
        this.validationErrors = error?.errors ?? [];
      },
    });
  }
}
