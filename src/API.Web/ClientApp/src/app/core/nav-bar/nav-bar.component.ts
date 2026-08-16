import { Component, ElementRef, HostListener, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/account/account.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    imports: [RouterLink, IconComponent, RouterLinkActive, AsyncPipe]
})
export class NavBarComponent implements OnInit {
  private basketService = inject(BasketService);
  private accountService = inject(AccountService);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  basket$!: Observable<IBasket | null>;
  currentUser$!: Observable<IUser | null>;

  menuOpen = false;
  accountOpen = false;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  itemCount(basket: IBasket | null): number {
    return basket ? basket.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  }

  toggleAccount(): void {
    this.accountOpen = !this.accountOpen;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeAll(): void {
    this.accountOpen = false;
    this.menuOpen = false;
  }

  logout(): void {
    this.closeAll();
    this.accountService.logout();
  }

  /** A menu that stays open after you click past it is the usual bug here. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.closeAll();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeAll();
  }
}
