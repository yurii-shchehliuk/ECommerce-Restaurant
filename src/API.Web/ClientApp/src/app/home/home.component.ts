import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/components/icon/icon.component';

interface Hop {
  actor: string;
  what: string;
  detail: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink, IconComponent],
})
export class HomeComponent {
  /**
   * The four hops an order actually makes. Every name here is a real thing in this
   * repository: the queue is declared in EventBus.Messages/Common/MessageConstants,
   * and the last hop is exactly what /admin/order-events renders.
   */
  readonly hops: Hop[] = [
    {
      actor: 'API.Identity',
      what: 'Signs you in',
      detail: 'Issues the token the other three validate on their own.',
    },
    {
      actor: 'API.Basket',
      what: 'Holds the basket',
      detail: 'Redis while you shop, SQL Server the moment you order.',
    },
    {
      actor: 'RabbitMQ',
      what: 'Carries the event',
      detail: 'A durable queue called owlet-order-placed.',
    },
    {
      actor: 'API.Admin',
      what: 'Finds out',
      detail: 'Consumes the event and records that it arrived.',
    },
  ];
}
