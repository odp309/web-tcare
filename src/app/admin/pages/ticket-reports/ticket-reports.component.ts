import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TableComponent } from '../../../shared/components/table/table.component';
import { LabelStatusComponent } from '../../components/label-status/label-status.component';
import { TicketReportsService } from '../../services/ticket-reports/ticket-reports.service';
import { ITicketReports } from '../../../shared/types/ticketReport';
import { AsyncPipe } from '@angular/common';
import { ToTitleCasePipe } from '../../../shared/pipes/to-title-case/to-title-case.pipe';
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside/click-outside.directive';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription, debounceTime } from 'rxjs';
import toLowerSnakeCase from '../../../shared/utils/toLowerSnakeCase';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

type TDateFilter = {
  type: 'text' | 'date';
  id: string;
  name: string;
  placeholder: string;
  errText: string;
  fcName: string;
  isDisabled?: boolean;
};

@Component({
  selector: 'app-ticket-reports',
  standalone: true,
  imports: [
    LucideAngularModule,
    TableComponent,
    LabelStatusComponent,
    AsyncPipe,
    ToTitleCasePipe,
    FormatDatePipe,
    RatingsComponent,
    PageHeaderComponent,
    InputFieldComponent,
    DropdownComponent,
    PageHeaderComponent,
    ClickOutsideDirective,
    InputFieldComponent,
    ModalComponent,
    ButtonComponent,
    LoadingComponent,
    PaginationComponent,
  ],
  templateUrl: './ticket-reports.component.html',
  styleUrl: './ticket-reports.component.scss',
})
export class TicketReportsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  limit = 8;
  form!: FormGroup;

  constructor(
    private ticketService: TicketReportsService,
    fb: FormBuilder,
    private router: Router
  ) {
    this.form = fb.group({
      search: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  ticketReportsData: ITicketReports = {} as ITicketReports;
  isLoading$: Observable<boolean> = EMPTY;

  startDateType: 'text' | 'date' = 'text';
  endDateType: 'text' | 'date' = 'text';

  dataOrder: 'asc' | 'desc' = 'asc';
  dataOrderIcon: 'chevron-up' | 'chevron-down' = 'chevron-up';
  filterBy: string[] = [];
  filterQuery: string[] = [];

  isEndDateDisabled: boolean = true;
  startDateSubscription!: Subscription;
  endDateSubscription!: Subscription;
  searchSubscription!: Subscription;

  pageToFetch: number = 1;
  numOfLoopsChanger: number = 1;

  tokenDivision: string = '';

  isPageNextPrevDisabled = {
    prev: true,
    next: false,
  };

  tHeads = [
    {
      title: 'ID Tiket',
      isAbleToSort: false,
    },
    {
      title: 'Tanggal',
      isAbleToSort: true,
    },
    {
      title: 'Kategori',
      isAbleToSort: false,
    },
    {
      title: 'Divisi',
      isAbleToSort: false,
    },
    {
      title: 'Rating',
      isAbleToSort: false,
    },
    {
      title: 'Rentang Response',
      isAbleToSort: false,
    },
    {
      title: 'Status',
      isAbleToSort: false,
    },
    {
      title: 'Action',
      isAbleToSort: false,
    },
  ];

  dropdownComp = [
    {
      pholder: 'Filter by Category',
      items: ['gagal transfer', 'gagal topup', 'gagal payment'],
      chosen: '',
    },
    {
      pholder: 'Filter by Rating',
      items: ['1', '2', '3', '4', '5'],
      chosen: '',
    },
    {
      pholder: 'Filter by Status',
      items: ['Diajukan', 'Dalam Proses', 'Selesai'],
      chosen: '',
    },
    {
      pholder: 'Filter by Division',
      items: ['CXC', 'DGO', 'WPP'],
      chosen: '',
    },
  ];

  dateFilter: TDateFilter[] = [
    {
      type: 'text',
      id: 'startDate',
      name: 'startDate',
      placeholder: 'Start Date',
      errText: '',
      fcName: 'startDate',
    },
    {
      type: 'text',
      id: 'endDate',
      name: 'endDate',
      placeholder: 'End Date',
      errText: '',
      fcName: 'endDate',
      isDisabled: true,
    },
  ];

  get search() {
    return this.form.get('search');
  }

  get startDate() {
    return this.form.get('startDate');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  onClickButtonPage(page: number) {
    this.pageToFetch = page;
    this.getTicketData();
  }

  onClickSort() {
    if (this.dataOrder === 'asc') {
      this.dataOrder = 'desc';
      this.dataOrderIcon = 'chevron-down';
      this.getTicketData();
      return;
    }
    this.dataOrder = 'asc';
    this.dataOrderIcon = 'chevron-up';
    this.getTicketData();
  }

  onHandleFilter(filter: string, filterQ: string) {
    const modFilter = toLowerSnakeCase(filter);
    const idxFilter = this.filterBy.indexOf(modFilter);
    if (this.filterBy.length !== 0 && idxFilter !== -1) {
      this.filterQuery[idxFilter] = filterQ;
      this.pageToFetch = 1;
      this.numOfLoopsChanger = 1;
      localStorage.setItem('filterBy', JSON.stringify(this.filterBy));
      localStorage.setItem('filterQuery', JSON.stringify(this.filterQuery));
      this.getTicketData();
      return;
    }
    this.filterBy.push(modFilter);
    this.filterQuery.push(filterQ);
    localStorage.setItem(filter, filterQ);
    localStorage.setItem('filterBy', JSON.stringify(this.filterBy));
    localStorage.setItem('filterQuery', JSON.stringify(this.filterQuery));
    this.pageToFetch = 1;
    this.numOfLoopsChanger = 1;
    this.getTicketData();
  }

  onResetFilter(filter: string) {
    const modFilter = toLowerSnakeCase(filter);
    if (modFilter === 'start_date') {
      this.dateFilter[1] = { ...this.dateFilter[1], isDisabled: true };
    }
    localStorage.removeItem(modFilter);
    const idxItem = this.filterBy.indexOf(modFilter);
    this.filterBy.splice(idxItem, 1);
    this.filterQuery.splice(idxItem, 1);
    localStorage.setItem('filterBy', JSON.stringify(this.filterBy));
    localStorage.setItem('filterQuery', JSON.stringify(this.filterQuery));

    this.getTicketData();
  }

  onSubscribeSearch() {
    if (this.search) {
      this.searchSubscription = this.search.valueChanges
        .pipe(debounceTime(400))
        .subscribe((value) => {
          if (value !== '') {
            this.onHandleFilter('ticket_number', value.toUpperCase());
            return;
          }
          this.onResetFilter('ticket_number');
        });
    }
  }

  onSubscribeDate() {
    if (this.startDate) {
      this.startDateSubscription = this.startDate.valueChanges.subscribe(
        (value) => {
          if (value !== '') {
            this.dateFilter[1] = { ...this.dateFilter[1], isDisabled: false };
            this.onHandleFilter('start_date', value);
          }
        }
      );
    }
    if (this.endDate) {
      this.endDateSubscription = this.endDate.valueChanges.subscribe(
        (value) => {
          if (value !== '') {
            this.onHandleFilter('end_date', value);
          }
        }
      );
    }
  }

  onHandleUpdateStatus(id: number) {
    this.ticketService.updateStatus(id, this.dataOrder, 1);
  }

  getTicketData() {
    localStorage.setItem('page', this.pageToFetch.toString());
    this.ticketService.getTicketReports(
      this.dataOrder,
      this.pageToFetch,
      this.filterBy,
      this.filterQuery
    );
    this.ticketService.getData().subscribe((value) => {
      this.ticketReportsData = value;
      if (value.total_page === 1) {
        this.isPageNextPrevDisabled = {
          prev: true,
          next: true,
        };
        return;
      }
      this.isPageNextPrevDisabled = {
        prev: true,
        next: false,
      };
    });
    this.isLoading$ = this.ticketService.getIsLoading();
  }

  navigateToDetail(ticketNum: string, id: number) {
    this.router.navigate(
      ['admin', 'ticket-reports', ticketNum, 'detail-ticket'],
      {
        queryParams: { ticketId: id },
      }
    );
  }

  ngOnInit(): void {
    const filterByLocal = localStorage.getItem('filterBy');
    const filterQueryLocal = localStorage.getItem('filterQuery');
    const categoryLocal = localStorage.getItem('category');
    const ratingLocal = localStorage.getItem('rating');
    const statusLocal = localStorage.getItem('status');
    const divisionLocal = localStorage.getItem('division');
    const startDateLocal = localStorage.getItem('start_date');
    const endDateLocal = localStorage.getItem('end_date');
    const searchLocal = localStorage.getItem('ticket_number');
    const pageLocal = localStorage.getItem('page');
    const token = Cookies.get('token');

    if (token) {
      this.tokenDivision = jwtDecode<{ division: string }>(token).division;
    }
    if (pageLocal) {
      this.pageToFetch = parseInt(pageLocal);
    }
    if (categoryLocal) {
      this.dropdownComp[0].chosen = categoryLocal;
    }
    if (ratingLocal) {
      this.dropdownComp[1].chosen = ratingLocal;
    }
    if (statusLocal) {
      this.dropdownComp[2].chosen = statusLocal;
    }
    if (divisionLocal) {
      this.dropdownComp[3].chosen = divisionLocal;
    }
    if (startDateLocal && this.startDate) {
      this.startDate.setValue(startDateLocal);
    }
    if (endDateLocal && this.endDate) {
      this.endDate.setValue(endDateLocal);
    }
    if (searchLocal && this.search) {
      this.search.setValue(searchLocal);
    }
    if (filterByLocal && filterQueryLocal) {
      this.filterBy = JSON.parse(filterByLocal);
      this.filterQuery = JSON.parse(filterQueryLocal);
    }
    this.getTicketData();
  }

  ngAfterViewInit(): void {
    this.onSubscribeDate();
    this.onSubscribeSearch();
  }

  ngOnDestroy(): void {
    this.startDateSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
}
