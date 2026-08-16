import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.css'],
})
export class PagingHeaderComponent {
  readonly pageNumber = input(1);
  readonly pageSize = input(9);
  readonly totalCount = input(0);

  readonly from = computed(() => (this.pageNumber() - 1) * this.pageSize() + 1);
  readonly to = computed(() => Math.min(this.pageNumber() * this.pageSize(), this.totalCount()));
}
