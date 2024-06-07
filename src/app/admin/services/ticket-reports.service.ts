import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../shared/services/api-service.service';
import { ITicketReports, TResultTicket } from '../../shared/types/ticketReport';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class TicketReportsService extends ApiServiceService {
  constructor(http: HttpClient, private cookieService: CookieService) {
    super(http);
  }

  private data: BehaviorSubject<ITicketReports> = new BehaviorSubject(
    {} as ITicketReports
  );
  private data$: Observable<ITicketReports> = this.data;
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isLoading$: Observable<boolean> = this.isLoading;
  private token = Cookies.get('token');

  getData() {
    return this.data$;
  }

  getIsLoading() {
    return this.isLoading$;
  }

  getTicketReports() {
    this.isLoading.next(true);
    this.get<ITicketReports>('private/admin/ticket-reports', this.token)
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

  updateStatus(id: number, body: any) {
    this.isLoading.next(true);
    this.put<any, any>(`ticket-reports-dummy/${id}`, body)
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
        next: () => {
          this.getTicketReports();
        },
        error: (err: any) => {
          console.log('Something went wrong', err);
        },
      });
  }
}
