import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class ManageMenuComponent implements OnInit {
  menus: any;
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getAll().subscribe(
      (menus) => {
        // this.menus = menus.data;
      },
      (err) => {
        console.log('menuItems error', err);
      }
    );
    console.log(this.menus, 'all menu items');
  }

  deleteMenu(id: string) {
    const menu = this.menus.find((x) => x.id === id);
    menu.isDeleting = true;
    this.menuService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.menus = this.menus.filter((x) => x.id !== id)));
  }
}
