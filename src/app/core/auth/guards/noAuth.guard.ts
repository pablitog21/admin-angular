import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  // The constructor injects the Router service, which allows for navigation
  constructor(private router: Router) { }

  // The canActivate method is called to determine if a route can be activated
  canActivate(
    route: ActivatedRouteSnapshot,      // The route that is being accessed
    state: RouterStateSnapshot          // The current state of the router
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the code is running in a browser environment and if the 'ingresado' item exists in localStorage
    if (typeof window !== 'undefined' && localStorage.getItem('ingresado')) {
      // If the user is authenticated (i.e., 'ingresado' exists in localStorage), navigate to the 'menu/inicio' route
      this.router.navigate(['dashboard']);
      // Prevent access to the route since the user is already authenticated
      return false;
    } else {
      // If the user is not authenticated, allow access to the route
      return true;
    }
  }
}
