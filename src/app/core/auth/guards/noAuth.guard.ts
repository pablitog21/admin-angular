import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica si el usuario está autenticado
    return this.authService.isAuthenticated$.pipe(
      take(1), // Toma el primer valor emitido y completa el observable
      map(isAuthenticated => !isAuthenticated), // Invierte el valor: si está autenticado, devuelve false
      tap(isNotAuthenticated => {
        if (!isNotAuthenticated) {
          // Si el usuario está autenticado, redirige a una ruta alternativa
          this.router.navigate(['/dashboard']); // Cambia '/dashboard' según tu aplicación
        }
      })
    );
  }
}
