import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TicketReportsComponent } from './pages/ticket-reports/ticket-reports.component';
import { DetailTicketComponent } from './pages/detail-ticket/detail-ticket.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'ticket-reports',
        component: TicketReportsComponent,
        pathMatch: 'full',
      },
      {
        path: 'ticket-reports/:ticketNum/detail-ticket',
        component: DetailTicketComponent,
        pathMatch: 'full',
      },
    ],
  },
];
