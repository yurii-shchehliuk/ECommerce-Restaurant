import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-paging-header',
    templateUrl: './paging-header.component.html',
    styleUrls: ['./paging-header.component.scss'],
    imports: [NgIf]
})
export class PagingHeaderComponent {
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() totalCount: number;

}
