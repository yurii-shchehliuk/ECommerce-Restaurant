import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from './user.service';


@Component({ templateUrl: './user-list.component.html' })
export class UserListComponent implements OnInit {
    users = null;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
            console.log(this.users, 'all users');

    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
}
