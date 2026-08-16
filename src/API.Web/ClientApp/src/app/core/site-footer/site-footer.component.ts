import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css'],
  imports: [RouterLink],
})
export class SiteFooterComponent {
  /**
   * The four services the browser can actually reach, and the gateway prefix each
   * one sits behind. Everything named here is routed in src/nginx/nginx.local.conf.
   */
  readonly services = [
    { name: 'API.Identity', role: 'Accounts and tokens', prefix: '/svc/identity' },
    { name: 'API.Basket', role: 'Catalogue, basket, orders', prefix: '/svc/basket' },
    { name: 'API.Admin', role: 'Consumed order events', prefix: '/svc/admin' },
    { name: 'API.Web', role: 'This bundle', prefix: '/' },
  ];
}
