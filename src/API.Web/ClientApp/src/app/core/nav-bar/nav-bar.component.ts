import { Component, ElementRef, HostListener, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports: [RouterLink, RouterLinkActive, IconComponent],
})
export class NavBarComponent {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private accountService = inject(AccountService);
  private theme = inject(ThemeService);

  readonly basket = toSignal(inject(BasketService).basket$, { initialValue: null });
  readonly user = toSignal(this.accountService.currentUser$, { initialValue: null });

  readonly itemCount = computed(
    () => this.basket()?.items.reduce((total, item) => total + item.quantity, 0) ?? 0
  );

  readonly themePreference = this.theme.preference;
  readonly themeIcon = computed(() => {
    const preference = this.themePreference();
    return preference === 'dark' ? 'moon' : preference === 'light' ? 'sun' : 'contrast';
  });

  readonly menuOpen = signal(false);
  readonly accountOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    this.accountOpen.set(false);
  }

  toggleAccount(): void {
    this.accountOpen.update((open) => !open);
  }

  closeAll(): void {
    this.menuOpen.set(false);
    this.accountOpen.set(false);
  }

  cycleTheme(): void {
    this.theme.cycle();
  }

  signOut(): void {
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
