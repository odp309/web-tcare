import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
