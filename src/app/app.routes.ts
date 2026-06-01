import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login/login.page';
import { RegisterPage } from './features/auth/pages/register/register.page';
import { Home } from './features/home/pages/home/home';
import { ActivarCuenta } from './features/auth/pages/activar/activar.page';
import { EsperandoPage } from './features/auth/pages/esperando/esperando.page'; 

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
    path: 'activar', 
    component: ActivarCuenta 
  },
  { 
    path: 'esperando-activacion', 
    component: EsperandoPage 
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];