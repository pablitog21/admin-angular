import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // URL del backend
  private authSubject = new BehaviorSubject<boolean>(false); // Estado de autenticación

  constructor(private http: HttpClient) {
    this.checkAuthentication();
  }

  // Observable para acceder al estado de autenticación
  get isAuthenticated$(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  // Método para autenticar al usuario
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token); // Guardar token en localStorage
          this.authSubject.next(true); // Actualizar estado de autenticación
        }
      })
    );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken'); // Eliminar token de localStorage
    this.authSubject.next(false); // Actualizar estado de autenticación
  }

  // Método para verificar si el usuario está autenticado al iniciar la aplicación
  private checkAuthentication(): void {
    const token = localStorage.getItem('authToken');
    this.authSubject.next(!!token); // Actualizar estado de autenticación
  }
}
