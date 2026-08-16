import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, startWith, switchMap } from 'rxjs';
import { OrderEventsService, ReceivedOrderEvent } from './order-events.service';

/**
 * Live view of what API.Admin has consumed off RabbitMQ.
 *
 * It polls rather than subscribing to anything: there is no server push from Admin
 * to the browser, and pretending otherwise would be the sort of claim this project
 * has been cleaned up to stop making. Two seconds is fast enough to watch a row
 * appear moments after a checkout.
 */
@Component({
  selector: 'app-order-events',
  templateUrl: './order-events.component.html',
  styleUrls: ['./order-events.component.scss'],
})
export class OrderEventsComponent implements OnInit, OnDestroy {
  events: ReceivedOrderEvent[] = [];
  error: string = null;
  loaded = false;

  private subscription: Subscription;

  constructor(private service: OrderEventsService) {}

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
        error: (err) => {
          this.error = 'Could not reach API.Admin. Is the container running?';
          this.loaded = true;
          console.log('getReceivedEvents', err);
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
  busLatencyMs(event: ReceivedOrderEvent): number {
    const published = Date.parse(this.asUtc(event.occurredAtUtc));
    const consumed = Date.parse(this.asUtc(event.receivedAtUtc));

    if (isNaN(published) || isNaN(consumed)) return null;

    return Math.max(0, Math.round(consumed - published));
  }

  /** The API serialises DateTime with no offset; these values are UTC by contract. */
  asUtc(value: string): string {
    if (!value) return value;
    return value.endsWith('Z') ? value : `${value}Z`;
  }

  trackByEventId(_index: number, event: ReceivedOrderEvent): string {
    return event.eventId;
  }

  shortId(eventId: string): string {
    return eventId ? eventId.split('-')[0] : '';
  }
}
