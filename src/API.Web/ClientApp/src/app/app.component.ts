import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { BusyService } from './core/services/busy.service';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { AsyncPipe } from '@angular/common';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { RouterOutlet } from '@angular/router';
import { ToastHostComponent } from './core/toast-host/toast-host.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [NavBarComponent, SectionHeaderComponent, RouterOutlet, ToastHostComponent, AsyncPipe]
})
export class AppComponent implements OnInit {
  private basketService = inject(BasketService);
  private accountService = inject(AccountService);
  private busyService = inject(BusyService);

  busy$: Observable<boolean>;

  constructor() {
    this.busy$ = this.busyService.busy$;
  }

  ngOnInit(): void {
    this.restoreSession();
    this.restoreBasket();
  }

  /** A stale or forged token is not an error worth showing; it just means signed out. */
  private restoreSession(): void {
    this.accountService.loadCurrentUser(localStorage.getItem('token')).subscribe({
      error: () => undefined,
    });
  }

  private restoreBasket(): void {
    const basketId = localStorage.getItem('basket_id');
    if (!basketId) {
      return;
    }
    this.basketService.getBasket(basketId).subscribe({ error: () => undefined });
  }
}
