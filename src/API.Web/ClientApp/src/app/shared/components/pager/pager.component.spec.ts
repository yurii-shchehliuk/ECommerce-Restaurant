import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagerComponent } from './pager.component';

describe('PagerComponent', () => {
  let fixture: ComponentFixture<PagerComponent>;
  let component: PagerComponent;

  const setUp = (totalCount: number, pageNumber: number, pageSize = 9) => {
    fixture.componentRef.setInput('totalCount', totalCount);
    fixture.componentRef.setInput('pageNumber', pageNumber);
    fixture.componentRef.setInput('pageSize', pageSize);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PagerComponent] }).compileComponents();
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
  });

  it('renders nothing when everything fits on one page', () => {
    setUp(5, 1);

    expect(component.totalPages).toBe(1);
    expect(fixture.nativeElement.querySelector('.pager')).toBeNull();
  });

  it('lists every page without gaps while there are seven or fewer', () => {
    setUp(63, 1);

    expect(component.pages).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('windows the middle of a long run, keeping the first and last page', () => {
    setUp(900, 50);
    const pages = component.pages;

    expect(pages[0]).toBe(1);
    expect(pages[pages.length - 1]).toBe(100);
    expect(pages).toContain(49);
    expect(pages).toContain(50);
    expect(pages).toContain(51);
    // Ellipses on both sides of the window.
    expect(pages.filter((page) => page === null).length).toBe(2);
  });

  it('opens the run out at the start rather than leaving a gap after page one', () => {
    setUp(900, 2);

    expect(component.pages.slice(0, 4)).toEqual([1, 2, 3, 4]);
    expect(component.pages).toContain(null);
    expect(component.pages[component.pages.length - 1]).toBe(100);
  });

  it('opens the run out at the end', () => {
    setUp(900, 99);
    const pages = component.pages;

    expect(pages.slice(-4)).toEqual([97, 98, 99, 100]);
  });

  it('emits the page it was asked for', () => {
    setUp(900, 5);
    const emitted: number[] = [];
    component.pageChanged.subscribe((page) => emitted.push(page));

    component.go(6);

    expect(emitted).toEqual([6]);
  });

  it('ignores a request for the page it is already on, or one out of range', () => {
    setUp(900, 5);
    const emitted: number[] = [];
    component.pageChanged.subscribe((page) => emitted.push(page));

    component.go(5);
    component.go(0);
    component.go(101);

    expect(emitted).toEqual([]);
  });

  it('marks the current page for assistive technology', () => {
    setUp(90, 3);

    const current: HTMLElement = fixture.nativeElement.querySelector('[aria-current="page"]');
    expect(current.textContent?.trim()).toBe('3');
  });
});
