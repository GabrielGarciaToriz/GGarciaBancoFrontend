import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login/login.page';
import { RegisterPage } from './features/auth/pages/register/register.page';
import { Home } from './features/home/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
