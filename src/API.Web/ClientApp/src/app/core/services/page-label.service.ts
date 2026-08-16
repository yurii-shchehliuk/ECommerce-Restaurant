import { Injectable, signal } from '@angular/core';

/**
 * The one thing a URL cannot supply: a human name for an id segment.
 *
 * `/shop/12` is a product and `/orders/12` is an order, and neither the number nor
 * the path says which product or whose order. A page that has just loaded the
 * record knows, and hands the name here; the breadcrumb uses it for the trailing
 * crumb instead of the raw id.
 *
 * Cleared on every navigation by the breadcrumb itself, so a stale name from the
 * previous page can never be shown against the next one.
 */
@Injectable({ providedIn: 'root' })
export class PageLabelService {
  readonly label = signal<string | null>(null);

  set(label: string): void {
    this.label.set(label);
  }

  clear(): void {
    this.label.set(null);
  }
}
