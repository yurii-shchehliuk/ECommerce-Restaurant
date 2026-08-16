import { Component, input, output } from '@angular/core';

import { IconComponent } from '../icon/icon.component';

/**
 * Page control for the shop grid.
 *
 * Windowed rather than exhaustive: an exhaustive list of page numbers is unusable
 * on a phone once the catalogue grows, so this renders a fixed number of slots
 * with ellipsis gaps, always including the first page, the last page and the
 * current one.
 */
@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css'],
    imports: [IconComponent]
})
export class PagerComponent {
  readonly totalCount = input(0);
  readonly pageSize = input(9);
  readonly pageNumber = input(1);
  readonly pageChanged = output<number>();

  get totalPages(): number {
    const size = this.pageSize();
    return size ? Math.ceil(this.totalCount() / size) : 0;
  }

  /** Page numbers to render; `null` is an ellipsis gap. */
  get pages(): (number | null)[] {
    const total = this.totalPages;
    const current = this.pageNumber();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const shown = new Set<number>([1, total, current]);
    for (const offset of [-1, 1]) {
      const page = current + offset;
      if (page > 1 && page < total) {
        shown.add(page);
      }
    }
    // Keep the control roughly a constant width, so it does not jump about as you
    // page through the catalogue.
    if (current <= 3) {
      [2, 3, 4].forEach((p) => p < total && shown.add(p));
    }
    if (current >= total - 2) {
      [total - 3, total - 2, total - 1].forEach((p) => p > 1 && shown.add(p));
    }

    const sorted = [...shown].sort((a, b) => a - b);
    const out: (number | null)[] = [];
    let previous = 0;
    for (const page of sorted) {
      if (previous && page - previous > 1) {
        out.push(null);
      }
      out.push(page);
      previous = page;
    }
    return out;
  }

  go(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.pageNumber()) {
      return;
    }
    this.pageChanged.emit(page);
  }
}
