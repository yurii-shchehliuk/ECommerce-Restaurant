import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Subscription, interval, startWith, switchMap } from 'rxjs';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { OrderEventsService, ReceivedOrderEvent } from './order-events.service';

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
  styleUrls: ['./order-events.component.scss'],
  imports: [CurrencyPipe, DatePipe, IconComponent],
})
export class OrderEventsComponent implements OnInit, OnDestroy {
  events: ReceivedOrderEvent[] = [];
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
          this.events = events;
          this.error = null;
          this.loaded = true;
        },
        error: () => {
          this.error = 'Could not reach API.Admin. Is the container running?';
          this.loaded = true;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Milliseconds between API.Basket publishing the event and API.Admin consuming it.
   * This is the only number on the page that says anything about the bus itself.
   */
  busLatencyMs(event: ReceivedOrderEvent): number | null {
    const published = Date.parse(this.asUtc(event.occurredAtUtc));
    const consumed = Date.parse(this.asUtc(event.receivedAtUtc));

    if (isNaN(published) || isNaN(consumed)) {
      return null;
    }

    return Math.max(0, Math.round(consumed - published));
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
}
