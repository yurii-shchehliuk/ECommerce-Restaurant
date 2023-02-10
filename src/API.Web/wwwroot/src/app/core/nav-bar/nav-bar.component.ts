import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/account/account.service';
import { AuthenticateDialogComponent } from '../dialogs/authenticate-dialog/authenticate-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  authenticateDropDown() {
    const dialogRef = this.dialog.open(AuthenticateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ddl() {
    // this.currentUser$.subscribe((res) => {
    //   console.log(res, 'ddl obs');
    // });
  }

  logout() {
    this.accountService.logout();
  }
}
