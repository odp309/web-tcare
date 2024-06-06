import { Component, DoCheck, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TableComponent } from '../../../shared/components/table/table.component';
import { LabelStatusComponent } from '../../components/label-status/label-status.component';
import { TicketReportsService } from '../../services/ticket-reports.service';
import { EMPTY, Observable } from 'rxjs';
import { TResultTicket } from '../../../shared/types/ticketReport';
import { AsyncPipe } from '@angular/common';
import { ToTitleCasePipe } from '../../../shared/pipes/to-title-case/to-title-case.pipe';
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';

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
  ],
  templateUrl: './ticket-reports.component.html',
  styleUrl: './ticket-reports.component.scss',
})
export class TicketReportsComponent implements OnInit {
  form!: FormGroup;
  constructor(private ticketService: TicketReportsService, fb: FormBuilder) {
    this.form = fb.group({
      search: [''],
    });
  }

  get search() {
    return this.form.get('search');
  }

  ticketReports$: Observable<TResultTicket[]> = EMPTY;
  ticketReportsData: TResultTicket[] = [];
  tHeads = [
    {
      title: 'ID Tiket',
      isAbleToSort: true,
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

  onClick() {
    console.log('click');
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
    this.ticketService.getTicketReports();
    this.ticketReports$ = this.ticketService.getData();
    this.ticketService.getData().subscribe((value) => {
      this.ticketReportsData = value;
    });
  }

  ngOnInit(): void {
    this.getTicketData();
  }
}
