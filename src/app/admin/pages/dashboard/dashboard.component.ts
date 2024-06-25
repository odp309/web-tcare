import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { LucideAngularModule } from 'lucide-angular';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { ToTitleCasePipe } from '../../../shared/pipes/to-title-case/to-title-case.pipe';
import { AsyncPipe, NgClass } from '@angular/common';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import {
  IReportReopened,
  IWeeklyGraph,
  TChosenDropdown,
  TGraphWeekData,
  TGraphWeekLabel,
} from '../../../shared/types/dashboard';
import { EMPTY, Observable } from 'rxjs';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { BarChartComponent } from '../../components/chart/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from '../../components/chart/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from '../../components/chart/line-chart/line-chart.component';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import moment from 'moment';
import toTitleCase from '../../../shared/utils/toTitleCase';
import { ButtonComponent } from '../../../shared/components/button/button.component';

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
    BarChartComponent,
    DoughnutChartComponent,
    LineChartComponent,
    DropdownComponent,
    ButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private dashboardService: DashboardService) {}
  private token = Cookies.get('token');
  name: string = '';

  filterEntity: 'personal' | 'division' | 'all' = 'personal';
  classStyle: string = '';
  arrFilterBy: string[] = ['personal', 'division', 'all'];
  filterBy: string[] = [];
  filterQuery: string[] = [];

  filterDropdown: TGraphWeekLabel = {
    category: ['gagal transfer', 'gagal topup', 'gagal payment'],
    status: ['diajukan', 'dalam proses', 'selesai'],
    rating: ['1', '2', '3', '4', '5'],
  };
  chosenDropdown: TChosenDropdown = {
    category: '',
    status: '',
    rating: '',
  };

  isFetchDashboardCard: boolean = false;

  private monthNow = moment(new Date()).locale('en').format('MMMM');
  month = this.monthNow;
  monthDropdown = {
    pholder: this.monthNow,
    items: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  };
  idxDateNow = this.monthDropdown.items.indexOf(this.monthNow);

  weekLabel: TGraphWeekLabel = {} as TGraphWeekLabel;
  graphWeekData: TGraphWeekData = {} as TGraphWeekData;

  doughnutLabel: TGraphWeekLabel = {} as TGraphWeekLabel;
  doughnutData: TGraphWeekData = {} as TGraphWeekData;

  reportReopenedData: IReportReopened = {} as IReportReopened;
  data: any = {};
  isLoading$: Observable<boolean> = EMPTY;

  onHandleFilterBtn(strFilterQ: string) {
    if (this.token) {
      this.filterBy = [];
      this.filterQuery = [];

      this.filterEntity = strFilterQ as 'personal' | 'division' | 'all';

      this.checkEntityFilter(strFilterQ);
      this.getDashboardCardData();
      this.getInitDashboardGraphData();
    }
  }

  checkEntityFilter(strFilterQ: string) {
    if (this.token) {
      switch (strFilterQ) {
        case 'personal':
          const username = jwtDecode<{ sub: string }>(this.token).sub;
          this.filterBy.push('adminid');
          this.filterQuery.push(username);
          break;
        case 'division':
          const division = jwtDecode<{ division: string }>(this.token).division;
          this.filterBy.push('division');
          this.filterQuery.push(division);
          break;
      }
    }
  }

  onHandleLeftGraph(endpoint: string, filter: string, filterQ: string) {
    this.isFetchDashboardCard = false;
    if (this.token) {
      this.checkEntityFilter(this.filterEntity);

      if (filter === 'month') {
        this.month = filterQ;
        this.dashboardService.getReportStats(
          endpoint,
          this.filterEntity,
          this.filterBy,
          this.filterQuery,
          this.month
        );
        this.dashboardService.getData().subscribe((data) => {
          this.data = data;
          if (data.category && data.status && data.rating) {
            this.mappingDataLabels(endpoint, data[endpoint]);
          }
        });
        return;
      }
      const idxFilter = this.filterBy.indexOf(filter);
      if (
        this.filterBy.length !== 0 &&
        this.filterQuery.length !== 0 &&
        idxFilter !== -1
      ) {
        this.filterBy[idxFilter] = filter;
        this.filterQuery[idxFilter] = filterQ;
        this.chosenDropdown[endpoint as keyof typeof this.filterDropdown] =
          filterQ;

        this.dashboardService.getReportStats(
          endpoint,
          this.filterEntity,
          this.filterBy,
          this.filterQuery,
          this.month
        );
        this.dashboardService.getData().subscribe((data) => {
          this.data = data;
          if (data.category && data.status && data.rating) {
            this.mappingDataLabels(endpoint, data[endpoint]);
          }
        });

        return;
      }
      this.chosenDropdown[endpoint as keyof typeof this.filterDropdown] =
        filterQ;
      this.filterBy.push(filter);
      this.filterQuery.push(filterQ);
      this.dashboardService.getReportStats(
        endpoint,
        this.filterEntity,
        this.filterBy,
        this.filterQuery,
        this.month
      );
      this.dashboardService.getData().subscribe((data) => {
        this.data = data;
        if (data.category && data.status && data.rating) {
          this.mappingDataLabels(endpoint, data[endpoint]);
        }
      });
    }
  }

  pushFilter(endpoint: string, graphQ: string) {
    if (endpoint === 'rating') {
      this.filterBy.push('rate');
      this.filterQuery.push(graphQ);
      return;
    }
    this.filterBy.push('name');
    this.filterQuery.push(graphQ);
  }

  getInitDashboardGraphData() {
    const endpoints = ['category', 'status', 'rating'];

    if (this.token) {
      this.checkEntityFilter('personal');
      for (let ep of endpoints) {
        let filterQ =
          this.filterDropdown[ep as keyof typeof this.filterDropdown][0];

        if (ep === 'rating') {
          filterQ =
            this.filterDropdown.rating[this.filterDropdown.rating.length - 1];
        }
        this.chosenDropdown[ep as keyof typeof this.filterDropdown] = filterQ;
        this.pushFilter(ep, filterQ);
        this.dashboardService.getReportStats(
          ep,
          this.filterEntity,
          this.filterBy,
          this.filterQuery
        );
      }
      this.dashboardService.getData().subscribe((data) => {
        this.data = data;
        if (data.category && data.status && data.rating) {
          for (let end of endpoints) {
            this.mappingDataLabels(end, data[end]);
          }
        }
      });
      this.filterBy = [];
      this.filterQuery = [];
    }
  }

  mappingDataLabels(endpoint: string, arrResult: IWeeklyGraph) {
    const objKeys: string[] = Object.keys(arrResult.result).sort();
    const tempWeekLabel: string[] = [];
    const tempGraphData: number[] = [];
    const tempDoughnutData: number[] = [];
    const tempDoughnutLabel: string[] = [];
    for (let key of objKeys) {
      tempWeekLabel.push(toTitleCase(key, '_'));
      tempGraphData.push(
        arrResult.result[key as keyof typeof arrResult.result]
      );
    }
    this.weekLabel = { ...this.weekLabel, [endpoint]: tempWeekLabel };
    this.graphWeekData = { ...this.graphWeekData, [endpoint]: tempGraphData };

    tempDoughnutData.push(
      arrResult.total,
      arrResult.total_all_year - arrResult.total
    );
    tempDoughnutLabel.push(
      toTitleCase(
        this.chosenDropdown[endpoint as keyof typeof this.chosenDropdown],
        ' '
      ),
      'Lainnya'
    );
    this.doughnutData = { ...this.doughnutData, [endpoint]: tempDoughnutData };
    this.doughnutLabel = {
      ...this.doughnutLabel,
      [endpoint]: tempDoughnutLabel,
    };
  }

  getDashboardCardData() {
    this.isFetchDashboardCard = true;
    this.isLoading$ = this.dashboardService.getIsLoading();
    this.dashboardService.getReportStats(
      'reopened',
      this.filterEntity,
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'sla-completed',
      this.filterEntity,
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'sla-performance',
      this.filterEntity,
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'total',
      this.filterEntity,
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'submitted',
      this.filterEntity,
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'processed',
      this.filterEntity,
      this.filterBy,
      this.filterQuery
    );
    this.dashboardService.getReportStats(
      'completed',
      this.filterEntity,
      this.filterBy,
      this.filterQuery
    );

    if (this.filterEntity !== 'personal') {
      this.dashboardService.getReportStats(
        'autoclose',
        this.filterEntity,
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
    this.getInitDashboardGraphData();
    if (this.token) {
      this.name = jwtDecode<{ firstName: string }>(this.token).firstName;
    }
  }
}
