import { TestBed } from '@angular/core/testing';
import { PageLabelService } from './page-label.service';

describe('PageLabelService', () => {
  let service: PageLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageLabelService);
  });

  it('starts with nothing, so the breadcrumb falls back to the URL', () => {
    expect(service.label()).toBeNull();
  });

  it('carries the name a page hands it', () => {
    service.set('10 Piece Wicked');

    expect(service.label()).toBe('10 Piece Wicked');
  });

  it('clears, so a name cannot outlive the page that set it', () => {
    service.set('10 Piece Wicked');
    service.clear();

    expect(service.label()).toBeNull();
  });
});
