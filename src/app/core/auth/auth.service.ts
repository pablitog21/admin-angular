import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
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
  
}
