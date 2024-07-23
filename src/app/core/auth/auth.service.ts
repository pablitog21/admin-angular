import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../../layout/layouts/user/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: boolean = false;

  constructor(private httpClient: HttpClient) { }

  set accessToken(token: string){
    localStorage.setItem('token', token)
  }

  get accessToken(): string{
    return localStorage.getItem('token') || '';
  }


signIn(user: User): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/login`, user)
      .pipe(
        map((user: any) => {
          this.authenticated = true;
          this.accessToken = user.token;

          return user
        })
      )
  }

  signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this.httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this.authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

   check(): Observable<boolean> {
        // Check if the user is logged in
        if (this.authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
  
}
