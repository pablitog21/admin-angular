import { Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'sign-in',
    canActivate: [NoAuthGuard], // Permite acceso sin autenticación
    component: SignInComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./layout/layouts/vertical/layout/layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component')
      },
      {
        path: 'users',
        loadComponent: () => import('./modules/users/users.component')
      }
    ]
  }



];