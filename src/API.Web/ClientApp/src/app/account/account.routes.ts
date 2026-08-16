import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    title: 'Sign in - Owlet',
    data: { chrome: false },
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
    title: 'Create an account - Owlet',
    data: { chrome: false },
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];
