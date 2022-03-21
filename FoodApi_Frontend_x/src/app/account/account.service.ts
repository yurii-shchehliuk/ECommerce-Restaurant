import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/IUser';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1); //cache one user
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(values: any) {
    return this.http.post(this.baseUrl + 'accounts/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.access_token);
          localStorage.setItem('user_Id', user.user_Id);
          this.currentUserSource.next(user);
        }
      })
    );
  }
  register(values: any) {
    return this.http.post(this.baseUrl + 'accounts/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          // localStorage.setItem('token', user.access_token);
          console.error(user);
        }
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('user_Id');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/account/login');
  }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http
      .get(this.baseUrl + 'accounts/GetCurrentUser', { headers })
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.access_token);
            this.currentUserSource.next(user);
          }
        })
      );
  }
}
