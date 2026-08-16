import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environment';
import { OrderEventsComponent } from './order-events.component';
import { ReceivedOrderEvent } from './order-events.service';

const event = (
  eventId: string,
  occurredAtUtc: string,
  receivedAtUtc: string
): ReceivedOrderEvent => ({
  id: 1,
  eventId,
  orderId: 1,
  buyerEmail: 'demo@owlet.dev',
  paymentIntentId: '',
  status: 'Pending',
  total: 37,
  itemCount: 1,
  occurredAtUtc,
  receivedAtUtc,
});

describe('OrderEventsComponent', () => {
  let fixture: ComponentFixture<OrderEventsComponent>;
  let component: OrderEventsComponent;
  let http: HttpTestingController;

  const feed = (events: ReceivedOrderEvent[]) => {
    http.expectOne((r) => r.url.startsWith(`${environment.adminApi}OrderEvents`)).flush(events);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderEventsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderEventsComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
  });

  it('treats the timestamps as UTC, which is what the API means by them', () => {
    // The API serialises DateTime with no offset. Read as local time, a 5 ms hop
    // would come out as hours.
    expect(component.asUtc('2026-08-16T17:37:33.591')).toBe('2026-08-16T17:37:33.591Z');
    expect(component.asUtc('2026-08-16T17:37:33.591Z')).toBe('2026-08-16T17:37:33.591Z');
  });

  it('shortens an event id to its first group', () => {
    expect(component.shortId('1d235e0d-1111-2222-3333-444455556666')).toBe('1d235e0d');
    expect(component.shortId('')).toBe('');
  });

  it('scales each latency bar against the slowest hop on screen', fakeAsync(() => {
    fixture.detectChanges();
    feed([
      event('a', '2026-08-16T10:00:00.000', '2026-08-16T10:00:00.100'), // 100 ms
      event('b', '2026-08-16T10:00:00.000', '2026-08-16T10:00:00.050'), // 50 ms
    ]);

    expect(component.rows[0].latencyMs).toBe(100);
    expect(component.rows[0].share).toBe(100);
    expect(component.rows[1].latencyMs).toBe(50);
    expect(component.rows[1].share).toBe(50);

    discardPeriodicTasks();
  }));

  it('still draws a mark for a delivery that measured zero', fakeAsync(() => {
    fixture.detectChanges();
    feed([
      event('a', '2026-08-16T10:00:00.000', '2026-08-16T10:00:00.500'),
      event('b', '2026-08-16T10:00:00.000', '2026-08-16T10:00:00.000'),
    ]);

    expect(component.rows[1].latencyMs).toBe(0);
    expect(component.rows[1].share).toBeGreaterThan(0);

    discardPeriodicTasks();
  }));

  it('flags a hop that waited on the broker, so it does not read as an ordinary one', fakeAsync(() => {
    fixture.detectChanges();
    feed([
      event('slow', '2026-08-16T10:00:00.000', '2026-08-16T10:00:14.280'), // an outage
      event('fast', '2026-08-16T10:00:00.000', '2026-08-16T10:00:00.005'),
    ]);

    expect(component.rows[0].slow).toBe(true);
    expect(component.rows[1].slow).toBe(false);

    discardPeriodicTasks();
  }));

  it('reports an unparseable pair as unknown rather than as zero', fakeAsync(() => {
    fixture.detectChanges();
    feed([event('bad', 'not-a-date', 'also-not')]);

    expect(component.rows[0].latencyMs).toBeNull();
    expect(component.rows[0].share).toBe(0);

    discardPeriodicTasks();
  }));

  it('says the consumer is unreachable rather than showing an empty feed', fakeAsync(() => {
    fixture.detectChanges();
    http
      .expectOne((r) => r.url.startsWith(`${environment.adminApi}OrderEvents`))
      .error(new ProgressEvent('failed'));
    fixture.detectChanges();

    expect(component.error).toContain('API.Admin');
    expect(fixture.nativeElement.querySelector('.pill--down')).not.toBeNull();

    discardPeriodicTasks();
  }));

  it('recovers on the next poll once the consumer answers again', fakeAsync(() => {
    fixture.detectChanges();
    http
      .expectOne((r) => r.url.startsWith(`${environment.adminApi}OrderEvents`))
      .error(new ProgressEvent('failed'));
    fixture.detectChanges();

    tick(2000);
    feed([event('a', '2026-08-16T10:00:00.000', '2026-08-16T10:00:00.100')]);

    expect(component.error).toBeNull();
    expect(component.rows.length).toBe(1);

    discardPeriodicTasks();
  }));
});
