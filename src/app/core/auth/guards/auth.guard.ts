import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // The constructor injects the Router service, which allows for navigation
  constructor(private router: Router) { }

  // The canActivate method is called to determine if a route can be activated
  canActivate(
    route: ActivatedRouteSnapshot,      // The route that is being accessed
    state: RouterStateSnapshot          // The current state of the router
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the code is running in a browser environment and if the 'username' item exists in localStorage
    if (typeof window !== 'undefined' && localStorage.getItem('username')) {
      // If the user is authenticated (i.e., 'username' exists in localStorage), allow access to the route
      return true;
    } else {
      // If the user is not authenticated, navigate to the 'login' route
      this.router.navigate(['sign-in']);
      // Prevent access to the route
      return false;
    }
  }
}

