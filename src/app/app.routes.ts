import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((x) => x.authRoutes),
  },
];
