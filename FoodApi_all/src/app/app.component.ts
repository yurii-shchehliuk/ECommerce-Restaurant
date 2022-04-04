import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Products app';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadUserSessionByToken();
    this.loadUserSessionByToken();
  }

  loadBasket() {
    const user_Id = +localStorage.getItem('user_Id');
    if (user_Id) {
      this.basketService.getBasket(user_Id).subscribe(
        () => {
          console.log('loadBasket()');
        },
        (error) => {
          console.error(error, 'loadBasket()');
        }
      );
    }
  }

  loadUserSessionByToken() {
    const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token).subscribe(
      () => {
        console.log('loadUserSessionByToken()');
      },
      (error) => {
        console.log(error, 'loadUserSessionByToken()');
      }
    );
  }
}
