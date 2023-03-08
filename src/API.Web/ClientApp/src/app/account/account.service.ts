import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject, of } from 'rxjs';
import { IUser } from '../shared/models/user';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IAddress } from '../shared/models/address';
import { iResult } from '../shared/models/result';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  baseUrl = environment.identityApi.api;

  private currentUserSource = new ReplaySubject<IUser>(1);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'user/GetCurrentUser', { headers }).pipe(
      map((result: iResult<IUser>) => {
        if (result?.isSuccess) {
          console.log(result);
          localStorage.setItem('token', result.value.token);
          this.currentUserSource.next(result.value);
        } else {
          this.logout();
        }
      })
    );
  }

  login(values: IUser) {
    return this.http.post(this.baseUrl + 'user/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user_name', user.email);
          localStorage.setItem('isAdmin', user.isAdmin.toString());
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: IUser) {
    return this.http.post(this.baseUrl + 'user/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'user/emailexists?email=' + email);
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'user/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'user/address', address);
  }
}
