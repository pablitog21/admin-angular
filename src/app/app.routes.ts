import { Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { NotAuthGuard } from './core/auth/guards/noAuth.guard';

export const routes: Routes = [
    {
        path: 'sign-in',
        // canActivate: [NotAuthGuard], // Permite acceso sin autenticación
        component: SignInComponent,
    },
    {
        path: '',
        loadComponent: () => import('./layout/layouts/vertical/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./modules/dashboard/dashboard.component')
            },
            {
                path: 'users',
                loadComponent: () => import('./modules/users/users.component')
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    },


];


// {
//     path: 'dashboard',
//     loadComponent: () => import('./modules/dashboard/dashboard.component'),
//     canActivate: [NotAuthGuard] // Permite acceso sin autenticación
// },