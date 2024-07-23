import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanMatch {

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._check();
    }

    private _check(): Observable<boolean> {
        return this._authService.check().pipe(
            switchMap((authenticated) => of(!authenticated))
        );
    }
}
