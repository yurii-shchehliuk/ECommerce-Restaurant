import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { PageLabelService } from '../services/page-label.service';
import { SectionHeaderComponent } from './section-header.component';

@Component({ template: 'page', standalone: true })
class StubPageComponent {}

describe('SectionHeaderComponent', () => {
  let fixture: ComponentFixture<SectionHeaderComponent>;
  let router: Router;

  const goTo = async (url: string) => {
    await router.navigateByUrl(url);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeaderComponent, StubPageComponent],
      providers: [
        provideRouter([
          { path: 'shop', component: StubPageComponent },
          { path: 'shop/:id', component: StubPageComponent },
          { path: 'admin/order-events', component: StubPageComponent },
          {
            path: 'account/login',
            component: StubPageComponent,
            data: { chrome: false },
          },
        ]),
      ],
    }).compileComponents();

    // A harness so the router has a real outlet to activate into.
    await RouterTestingHarness.create();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SectionHeaderComponent);
    fixture.detectChanges();
  });

  it('names a known segment rather than echoing the URL', async () => {
    await goTo('/shop');

    expect(fixture.componentInstance.crumbs.map((c) => c.label)).toEqual(['Menu']);
    expect(fixture.componentInstance.title).toBe('Menu');
  });

  it('builds a trail whose links are cumulative paths', async () => {
    await goTo('/admin/order-events');

    expect(fixture.componentInstance.crumbs).toEqual([
      { label: 'Admin', url: '/admin' },
      { label: 'Order events', url: '/admin/order-events' },
    ]);
  });

  it('renders a numeric id as a record number', async () => {
    await goTo('/shop/42');

    expect(fixture.componentInstance.title).toBe('#42');
  });

  it('drops the query string, which is not part of the trail', async () => {
    await goTo('/shop?search=wings');

    expect(fixture.componentInstance.crumbs.length).toBe(1);
  });

  it('renders nothing for a route that opts out of the title bar', async () => {
    await goTo('/account/login');

    expect(fixture.componentInstance.crumbs).toEqual([]);
    expect(fixture.nativeElement.querySelector('h1')).toBeNull();
  });

  it('shows the name a page supplies instead of the raw id', async () => {
    await goTo('/shop/42');
    TestBed.inject(PageLabelService).set('10 Piece Wicked');
    TestBed.tick();
    fixture.detectChanges();

    expect(fixture.componentInstance.title).toBe('10 Piece Wicked');
  });

  it('drops a supplied name on the next navigation', async () => {
    await goTo('/shop/42');
    TestBed.inject(PageLabelService).set('10 Piece Wicked');
    TestBed.tick();
    fixture.detectChanges();

    await goTo('/shop');

    expect(fixture.componentInstance.title).toBe('Menu');
  });

  it('marks the last crumb as the current page', async () => {
    await goTo('/admin/order-events');

    const current = fixture.nativeElement.querySelector('[aria-current="page"]');
    expect(current.textContent.trim()).toBe('Order events');
  });
});
