import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TableComponent } from '../../../shared/components/table/table.component';
import { LabelStatusComponent } from '../../components/label-status/label-status.component';
import { TicketReportsService } from '../../services/ticket-reports.service';
import { EMPTY, Observable, filter } from 'rxjs';
import {
  ITicketReports,
  TResultTicket,
} from '../../../shared/types/ticketReport';
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
  ],
  templateUrl: './ticket-reports.component.html',
  styleUrl: './ticket-reports.component.scss',
})
export class TicketReportsComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private ticketService: TicketReportsService,
    fb: FormBuilder,
    public router: Router
  ) {
    this.form = fb.group({
      search: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  ticketReports$: Observable<ITicketReports> = EMPTY;
  ticketReportsData: TResultTicket[] = [];

  startDateType: 'text' | 'date' = 'text';
  endDateType: 'text' | 'date' = 'text';

  dataOrder: 'asc' | 'desc' = 'asc';
  dataOrderIcon: 'chevron-up' | 'chevron-down' = 'chevron-up';
  filterBy: string[] = [];
  filterQuery: string[] = [];

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
    },
    {
      pholder: 'Filter by Rating',
      items: ['1', '2', '3', '4', '5'],
    },
    {
      pholder: 'Filter by Status',
      items: ['Diajukan', 'Dalam Proses', 'Selesai'],
    },
  ];

  get search() {
    return this.form.get('search');
  }

  get startDate() {
    return this.form.get('startDate');
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
    if (filter === 'category') {
      if (this.filterBy.length !== 0) {
        this.filterQuery[0] = `"${filterQ}"`;
        this.getTicketData();
        return;
      }
      this.filterBy.push(filter);
      this.filterQuery.push(`"${filterQ}"`);
      this.getTicketData();
      return;
    }
    this.filterBy.push(filter);
    this.filterQuery.push(filterQ);
    this.getTicketData();
  }

  onResetFilter(filter: string) {
    const idxItem = filter.indexOf(filter);
    this.filterBy.splice(idxItem, 1);
    this.filterQuery.splice(idxItem, 1);
    this.getTicketData();
  }

  onHandleUpdateStatus(id: number) {
    const existingData = this.ticketReportsData.find((data) => data.id === id);
    let newStatus = '';
    if (existingData) {
      switch (existingData.status.toLowerCase()) {
        case 'diajukan':
          newStatus = 'dalam proses';
          break;
        case 'dalam proses':
          newStatus = 'selesai';
          break;
      }
    }
    this.ticketService.updateStatus(id, {
      ...existingData,
      status: newStatus,
    });
  }

  getTicketData() {
    this.ticketService.getTicketReports(
      this.dataOrder,
      this.filterBy,
      this.filterQuery
    );
    this.ticketReports$ = this.ticketService.getData();
    this.ticketService.getData().subscribe((value) => {
      this.ticketReportsData = value.result;
    });
  }

  ngOnInit(): void {
    this.getTicketData();
  }
}
