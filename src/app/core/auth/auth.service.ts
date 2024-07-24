import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../../layout/layouts/user/user';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { AuthUtils } from './auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: boolean = false;

  constructor(private httpClient: HttpClient,
    private userService: UserService
  ) { }

  set accessToken(token: string) {
    localStorage.setItem('token', token)
  }

  get accessToken(): string {
    return localStorage.getItem('token') || '';
  }


  signIn(username: User): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/v1/auth/login`, username)
      .pipe(
        map((username: any) => {
          this.authenticated = true;
          this.accessToken = username.token;

          return username
        })
      )
  }

  signInUsingToken(): Observable<any> {
    return this.httpClient.post('api/auth/sign-in-with-token', {
      accessToken: this.accessToken
    }).pipe(
      catchError(() =>

        of(false)
      ),
      switchMap((response: any) => {
        if (response.accessToken) {
          this.accessToken = response.accessToken;
        }

        this.authenticated = true;

        this.userService.user = response.user;

        return of(true);
      })
    );
  }

  check(): Observable<boolean> {
    if (this.authenticated) {
      return of(true);
    }

    if (!this.accessToken) {
      return of(false);
    }

    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    return this.signInUsingToken();
  }

}
