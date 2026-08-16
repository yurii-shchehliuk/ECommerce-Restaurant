import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription, catchError, interval, of, startWith, switchMap } from 'rxjs';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { OrderEventsService, ReceivedOrderEvent } from './order-events.service';

/** One rendered row: the event, plus everything the row needs pre-computed. */
interface EventRow {
  event: ReceivedOrderEvent;
  /** UTC instants, or null when the value could not be parsed. */
  publishedAt: string | null;
  consumedAt: string | null;
  /** Milliseconds on the bus, or null if either timestamp failed to parse. */
  latencyMs: number | null;
  /** Bar width, as a percentage of the slowest hop currently on screen. */
  share: number;
  /** Anything over a second was almost certainly waiting on a stopped consumer. */
  slow: boolean;
}

const SLOW_THRESHOLD_MS = 1000;
const POLL_MS = 2000;

/**
 * Live view of what API.Admin has consumed off RabbitMQ.
 *
 * It polls, because there is no server push from Admin to the browser. Two seconds
 * is fast enough to watch a row appear moments after a checkout, and the request is
 * excluded from the global progress indicator so the page does not flicker.
 */
@Component({
  selector: 'app-order-events',
  templateUrl: './order-events.component.html',
  styleUrls: ['./order-events.component.css'],
  imports: [CurrencyPipe, DatePipe, IconComponent, RouterLink],
})
export class OrderEventsComponent implements OnInit, OnDestroy {
  rows: EventRow[] = [];
  error: string | null = null;
  loaded = false;

  private subscription?: Subscription;
  private service = inject(OrderEventsService);

  ngOnInit(): void {
    this.subscription = interval(POLL_MS)
      .pipe(
        startWith(0),
        // The failure has to be caught inside the switchMap. Letting it reach the
        // outer stream ends the subscription, and the page would then sit on
        // "disconnected" for ever instead of reconnecting when Admin comes back.
        switchMap(() => this.service.getReceivedEvents().pipe(catchError(() => of(null))))
      )
      .subscribe((events) => {
        this.loaded = true;

        if (events === null) {
          this.error = 'Could not reach API.Admin.';
          return;
        }

        this.error = null;
        this.rows = this.toRows(events);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  shortId(eventId: string): string {
    return eventId ? eventId.split('-')[0] : '';
  }

  /** The API serialises DateTime with no offset; these values are UTC by contract. */
  asUtc(value: string): string {
    if (!value) {
      return value;
    }
    return value.endsWith('Z') ? value : `${value}Z`;
  }

  /**
   * Scales every bar against the slowest hop on screen rather than a fixed ceiling.
   * A run of five-millisecond deliveries would be invisible against a fixed scale,
   * and the interesting comparison is always between the rows you can see.
   */
  private toRows(events: ReceivedOrderEvent[]): EventRow[] {
    const measured = events.map((event) => {
      const published = this.instant(event.occurredAtUtc);
      const consumed = this.instant(event.receivedAtUtc);
      const latencyMs =
        published === null || consumed === null
          ? null
          : Math.max(0, Math.round(consumed.getTime() - published.getTime()));
      return { event, published, consumed, latencyMs };
    });

    const slowest = Math.max(
      1,
      ...measured.map((m) => m.latencyMs).filter((value): value is number => value !== null)
    );

    return measured.map(({ event, published, consumed, latencyMs }) => ({
      event,
      publishedAt: published ? published.toISOString() : null,
      consumedAt: consumed ? consumed.toISOString() : null,
      latencyMs,
      // A floor of 4%, so a delivery that measured zero still draws a mark.
      share: latencyMs === null ? 0 : Math.max(4, Math.round((latencyMs / slowest) * 100)),
      slow: latencyMs !== null && latencyMs >= SLOW_THRESHOLD_MS,
    }));
  }

  /**
   * Parsed here rather than in the template, because DatePipe throws on a value it
   * cannot read and would take the whole page down with it.
   */
  private instant(value: string): Date | null {
    const parsed = Date.parse(this.asUtc(value));
    return isNaN(parsed) ? null : new Date(parsed);
  }
}
