import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment';
import { IAddress } from '../shared/models/address';
import { ILoginCredentials, IRegisterDetails, IUser } from '../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private baseUrl = environment.identityApi.api;
  private currentUserSource = new ReplaySubject<IUser | null>(1);

  readonly currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Called once at start-up with whatever is in local storage. A missing token is the
   * signed-out case, not an error, so it short-circuits without a request.
   */
  loadCurrentUser(token: string | null): Observable<IUser | null> {
    if (!token) {
      this.currentUserSource.next(null);
      return of(null);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(`${this.baseUrl}user/GetCurrentUser`, { headers }).pipe(
      map((user) => {
        this.setSession(user);
        return user;
      })
    );
  }

  login(credentials: ILoginCredentials): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.baseUrl}user/login`, credentials)
      .pipe(map((user) => this.setSession(user)));
  }

  register(details: IRegisterDetails): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.baseUrl}user/register`, details)
      .pipe(map((user) => this.setSession(user)));
  }

  logout(): void {
    localStorage.clear();
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}user/emailexists`, { params: { email } });
  }

  getUserAddress(): Observable<IAddress> {
    return this.http.get<IAddress>(`${this.baseUrl}user/address`);
  }

  updateUserAddress(address: IAddress): Observable<IAddress> {
    return this.http.put<IAddress>(`${this.baseUrl}user/address`, address);
  }

  private setSession(user: IUser): IUser {
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('user_name', user.email);
      this.currentUserSource.next(user);
    }
    return user;
  }
}
