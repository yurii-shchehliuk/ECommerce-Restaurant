import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { BusyService } from './core/services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  busy$: Observable<boolean>;

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private busyService: BusyService
  ) {
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
