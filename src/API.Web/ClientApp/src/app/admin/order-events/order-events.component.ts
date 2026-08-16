import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription, interval, startWith, switchMap } from 'rxjs';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { OrderEventsService, ReceivedOrderEvent } from './order-events.service';

/** One rendered row: the event, plus what the latency bar needs. */
interface EventRow {
  event: ReceivedOrderEvent;
  /** Milliseconds on the bus, or null if either timestamp failed to parse. */
  latencyMs: number | null;
  /** Bar width, as a percentage of the slowest hop currently on screen. */
  share: number;
  /** Anything over a second was almost certainly waiting on a stopped consumer. */
  slow: boolean;
}

const SLOW_THRESHOLD_MS = 1000;

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
    this.subscription = interval(2000)
      .pipe(
        startWith(0),
        switchMap(() => this.service.getReceivedEvents())
      )
      .subscribe({
        next: (events) => {
          this.rows = this.toRows(events);
          this.error = null;
          this.loaded = true;
        },
        error: () => {
          this.error = 'Could not reach API.Admin.';
          this.loaded = true;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /** The API serialises DateTime with no offset; these values are UTC by contract. */
  asUtc(value: string): string {
    if (!value) {
      return value;
    }
    return value.endsWith('Z') ? value : `${value}Z`;
  }

  shortId(eventId: string): string {
    return eventId ? eventId.split('-')[0] : '';
  }

  /**
   * Scales every bar against the slowest hop on screen rather than a fixed ceiling.
   * A run of five-millisecond deliveries would be invisible against a fixed scale,
   * and the interesting comparison is always between the rows you can see.
   */
  private toRows(events: ReceivedOrderEvent[]): EventRow[] {
    const latencies = events.map((event) => this.latencyMs(event));
    const slowest = Math.max(1, ...latencies.filter((value): value is number => value !== null));

    return events.map((event, index) => {
      const latencyMs = latencies[index];
      return {
        event,
        latencyMs,
        // A floor of 4%, so a delivery that was genuinely instant still draws a mark.
        share: latencyMs === null ? 0 : Math.max(4, Math.round((latencyMs / slowest) * 100)),
        slow: latencyMs !== null && latencyMs >= SLOW_THRESHOLD_MS,
      };
    });
  }

  /** Milliseconds between API.Basket publishing the event and API.Admin consuming it. */
  private latencyMs(event: ReceivedOrderEvent): number | null {
    const published = Date.parse(this.asUtc(event.occurredAtUtc));
    const consumed = Date.parse(this.asUtc(event.receivedAtUtc));

    if (isNaN(published) || isNaN(consumed)) {
      return null;
    }

    return Math.max(0, Math.round(consumed - published));
  }
}
