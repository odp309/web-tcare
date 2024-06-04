import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../shared/services/api-service.service';
import { ITicketReports, TResultTicket } from '../../shared/types/ticketReport';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketReportsService extends ApiServiceService {
  constructor(http: HttpClient) {
    super(http);
  }

  private data: BehaviorSubject<ITicketReports> = new BehaviorSubject(
    {} as ITicketReports
  );
  private data$: Observable<ITicketReports> = this.data;
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isLoading$: Observable<boolean> = this.isLoading;

  getData() {
    return this.data$;
  }

  getIsLoading() {
    return this.isLoading$;
  }

  getTicketReports() {
    this.isLoading.next(true);
    this.get<ITicketReports>('ticket-reports')
      .pipe(
        catchError((e) => {
          this.isLoading.next(false);
          throw e.error;
        }),
        finalize(() => {
          this.isLoading.next(false);
        })
      )
      .subscribe({
        next: (value) => {
          this.data.next(value);
        },
        error: (err: ITicketReports) => {
          console.log('Something went wrong', err);
        },
      });
  }
}
