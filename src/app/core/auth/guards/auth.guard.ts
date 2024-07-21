import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Inyecta el AuthService y el Router en el constructor
  constructor(private authService: AuthService, private router: Router) {}

  // Implementa el método canActivate para controlar el acceso a las rutas
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Obtiene el estado de autenticación del AuthService
    return this.authService.isAuthenticated$.pipe(
      // Toma solo el primer valor emitido por el observable
      take(1),
      // Mapea el valor emitido (booleano) a otro valor booleano (true/false)
      map(isAuthenticated => !!isAuthenticated),
      // Realiza una acción secundaria basada en el valor booleano
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          // Si el usuario no está autenticado, redirige a la página de login
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
