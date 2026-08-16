import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription, filter, startWith } from 'rxjs';


export interface Crumb {
  label: string;
  url: string;
}

/**
 * Page heading and breadcrumb trail, derived from the URL.
 *
 * Deriving the trail from `router.url` rather than from route data keeps every route
 * definition free of presentation metadata; the one thing the URL cannot supply is a
 * human name for an id segment, which `setTrailingLabel` fills in from the loaded
 * record.
 */
@Component({
    selector: 'app-section-header',
    templateUrl: './section-header.component.html',
    styleUrls: ['./section-header.component.scss'],
    imports: [RouterLink]
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  crumbs: Crumb[] = [];

  private subscription = new Subscription();

  private static readonly LABELS: Record<string, string> = {
    shop: 'Shop',
    basket: 'Basket',
    checkout: 'Checkout',
    success: 'Order placed',
    orders: 'Orders',
    account: 'Account',
    login: 'Sign in',
    register: 'Sign up',
    admin: 'Admin',
    'order-events': 'Order events',
    'completed-orders': 'All orders',
    'menu-management': 'Products',
    features: 'Features',
    chat: 'Chat',
    'test-error': 'API diagnostics',
    'not-found': 'Not found',
    'server-error': 'Server error',
  };

  ngOnInit(): void {
    this.subscription.add(
      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          startWith(null)
        )
        .subscribe(() => this.build())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get title(): string {
    return this.crumbs.length ? this.crumbs[this.crumbs.length - 1].label : '';
  }

  private build(): void {
    const path = this.router.url.split('?')[0].split('#')[0];
    const segments = path.split('/').filter(Boolean);

    let url = '';
    this.crumbs = segments.map((segment) => {
      url += `/${segment}`;
      return {
        label: SectionHeaderComponent.LABELS[segment] ?? this.humanise(segment),
        url,
      };
    });
  }

  private humanise(segment: string): string {
    const decoded = decodeURIComponent(segment);
    return /^\d+$/.test(decoded) ? `#${decoded}` : decoded.replace(/-/g, ' ');
  }
}
