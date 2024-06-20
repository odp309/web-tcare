import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { LucideAngularModule } from 'lucide-angular';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { ToTitleCasePipe } from '../../../shared/pipes/to-title-case/to-title-case.pipe';
import { AsyncPipe, NgClass } from '@angular/common';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { IReportReopened } from '../../../shared/types/dashboard';
import { EMPTY, Observable } from 'rxjs';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardComponent,
    LucideAngularModule,
    PageHeaderComponent,
    ToTitleCasePipe,
    NgClass,
    AsyncPipe,
    LoadingComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private dashboardService: DashboardService) {}
  private token = Cookies.get('token');

  filter: 'personal' | 'division' | 'all' = 'personal';
  classStyle: string = '';
  arrFilterBy: string[] = ['personal', 'division', 'all'];
  filterBy: string[] = [];
  filterQuery: string[] = [];

  reportReopenedData: IReportReopened = {} as IReportReopened;
  data: any = {};
  isLoading$: Observable<boolean> = EMPTY;

  onHandleFilterBtn(strFilterQ: string) {
    if (this.token) {
      this.filterBy = [];
      this.filterQuery = [];

      const username = jwtDecode<{ sub: string }>(this.token).sub;
      this.filter = strFilterQ as 'personal' | 'division' | 'all';

      this.filterBy.push('filter');
      this.filterQuery.push(strFilterQ);

      switch (strFilterQ) {
        case 'personal':
          this.filterBy.push('adminid');
          this.filterQuery.push(username);
          break;
        case 'division':
          this.filterBy.push('division');
          this.filterQuery.push('DGO');
          break;
      }
      this.getDashboardData();
    }
  }

  getDashboardData() {
    this.isLoading$ = this.dashboardService.getIsLoading();
    this.dashboardService.getReportStats(
      'reopened',
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'sla-completed',
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'sla-performance',
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'total',
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'submitted',
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'processed',
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'completed',
      this.filterBy,
      this.filterQuery
    );

    if (this.filter !== 'personal') {
      this.dashboardService.getReportStats(
        'autoclose',
        this.filterBy,
        this.filterQuery
      );
    }
    this.dashboardService.getData().subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    this.onHandleFilterBtn('personal');
  }
}
