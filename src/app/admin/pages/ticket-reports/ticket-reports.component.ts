import { Component, DoCheck, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TableComponent } from '../../../shared/components/table/table.component';
import { LabelStatusComponent } from '../../components/label-status/label-status.component';
import { TicketReportsService } from '../../services/ticket-reports.service';
import { EMPTY, Observable } from 'rxjs';
import {
  ITicketReports,
  TResultTicket,
} from '../../../shared/types/ticketReport';
import { AsyncPipe } from '@angular/common';
import moment from 'moment';
import { ToTitleCasePipe } from '../../../shared/pipes/to-title-case/to-title-case.pipe';
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';

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
  ],
  templateUrl: './ticket-reports.component.html',
  styleUrl: './ticket-reports.component.scss',
})
export class TicketReportsComponent implements OnInit {
  constructor(private ticketService: TicketReportsService) {}
  ticketReports$: Observable<ITicketReports> = EMPTY;
  ticketReporsData: TResultTicket[] = [];
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

  ngOnInit(): void {
    this.ticketService.getTicketReports();
    this.ticketReports$ = this.ticketService.getData();
    this.ticketService.getData().subscribe((value) => {
      this.ticketReporsData = value.result;
    });
  }
}
