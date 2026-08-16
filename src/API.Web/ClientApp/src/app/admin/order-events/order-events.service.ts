import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

export interface ReceivedOrderEvent {
  id: number;
  eventId: string;
  orderId: number;
  buyerEmail: string;
  paymentIntentId: string;
  status: string;
  total: number;
  itemCount: number;
  /** When API.Basket published the event. */
  occurredAtUtc: string;
  /** When API.Admin consumed it off RabbitMQ. */
  receivedAtUtc: string;
}

/**
 * Reads the order events API.Admin has consumed from the bus.
 *
 * This is the only part of the client that talks to API.Admin. Everything it shows
 * arrived over RabbitMQ from API.Basket - nothing on this screen is written by the
 * storefront directly.
 */
@Injectable({ providedIn: 'root' })
export class OrderEventsService {
  private http = inject(HttpClient);

  private baseUrl = environment.adminApi;

  getReceivedEvents(take = 20): Observable<ReceivedOrderEvent[]> {
    return this.http.get<ReceivedOrderEvent[]>(`${this.baseUrl}OrderEvents?take=${take}`);
  }
}
