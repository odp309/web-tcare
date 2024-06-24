import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './shared/guard/auth/auth.guard';
import { adminGuard } from './shared/guard/admin/admin.guard';
import { tokenGuard } from './shared/guard/token.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: LandingPageComponent,
        pathMatch: 'full',
        canActivate: [authGuard, tokenGuard],
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((x) => x.authRoutes),
    canActivate: [authGuard, tokenGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.adminRoutes),
    canActivate: [adminGuard, tokenGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
