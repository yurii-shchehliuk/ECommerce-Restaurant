import { Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription, filter, startWith } from 'rxjs';
import { PageLabelService } from '../services/page-label.service';

export interface Crumb {
  label: string;
  url: string;
}

/**
 * Page title and breadcrumb trail, derived from the URL.
 *
 * Deriving the trail from `router.url` rather than from route data keeps route
 * definitions free of presentation metadata. The one thing a route may say is
 * `data: { chrome: false }`, which suppresses this bar entirely - used by the
 * single-purpose centred pages (sign in, sign up, order placed, not found), where
 * a full-width title above a narrow card is chrome for its own sake and would give
 * the page a second h1.
 */
@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css'],
  imports: [RouterLink],
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private pageLabel = inject(PageLabelService);

  crumbs: Crumb[] = [];

  private subscription = new Subscription();

  constructor() {
    // A record's name arrives after its page has fetched it, which is always after
    // the navigation that rendered this bar; patch the trailing crumb when it does.
    effect(() => {
      const label = this.pageLabel.label();
      if (label && this.crumbs.length) {
        this.crumbs = [
          ...this.crumbs.slice(0, -1),
          { ...this.crumbs[this.crumbs.length - 1], label },
        ];
      }
    });
  }

  private static readonly LABELS: Record<string, string> = {
    shop: 'Menu',
    basket: 'Basket',
    checkout: 'Checkout',
    orders: 'Orders',
    account: 'Account',
    admin: 'Admin',
    'order-events': 'Order events',
    'completed-orders': 'All orders',
    'menu-management': 'Catalogue',
    features: 'Features',
    chat: 'Chat',
    'test-error': 'API diagnostics',
  };

  ngOnInit(): void {
    this.subscription.add(
      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          startWith(null)
        )
        .subscribe(() => {
          // Dropped before the new page has a chance to set one, so a name from the
          // page just left can never appear against the page just arrived at.
          this.pageLabel.clear();
          this.build();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get title(): string {
    return this.crumbs.length ? this.crumbs[this.crumbs.length - 1].label : '';
  }

  private build(): void {
    if (this.deepestRoute().snapshot.data['chrome'] === false) {
      this.crumbs = [];
      return;
    }

    const path = this.router.url.split('?')[0].split('#')[0];
    let url = '';

    this.crumbs = path
      .split('/')
      .filter(Boolean)
      .map((segment) => {
        url += `/${segment}`;
        return {
          label: SectionHeaderComponent.LABELS[segment] ?? this.humanise(segment),
          url,
        };
      });
  }

  private deepestRoute(): ActivatedRoute {
    let route = this.route.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private humanise(segment: string): string {
    const decoded = decodeURIComponent(segment);
    return /^\d+$/.test(decoded) ? `#${decoded}` : decoded.replace(/-/g, ' ');
  }
}
