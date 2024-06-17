import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service.service';
import {
  ITicketReports,
  IUpdateTicket,
} from '../../../shared/types/ticketReport';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import Cookies from 'js-cookie';
import { toast } from 'ngx-sonner';

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
  private errMess: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private errMess$: Observable<string> = this.errMess;

  private token = Cookies.get('token');

  getErrMess() {
    return this.errMess$;
  }

  getData() {
    return this.data$;
  }

  getIsLoading() {
    return this.isLoading$;
  }

  getTicketReports(
    order: 'asc' | 'desc',
    page: number,
    filterBy?: string[],
    filterQuery?: string[]
  ) {
    this.isLoading.next(true);
    let queryParams = '';
    if (filterBy && filterQuery) {
      for (let i = 0; i < filterBy.length; i++) {
        queryParams += `&${filterBy[i]}=${filterQuery[i]}`;
      }
    }
    this.get<ITicketReports>(
      `private/admin/ticket-reports?sort_by=createdAt&order=${order}&page=${page}&limit=8${queryParams}`,
      this.token
    )
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
          this.errMess.next('');
          this.data.next(value);
        },
        error: (err: ITicketReports) => {
          if (err !== null) {
            toast.error(err.message);
            this.errMess.next(err.message);
            console.error('Something went wrong', err);
          }
        },
      });
  }

  updateStatus(id: number, order: 'asc' | 'desc', page: number) {
    this.isLoading.next(true);
    this.patch<IUpdateTicket, { status: string } | {}>(
      `private/admin/ticket-reports/${id}/update-status`,
      {},
      this.token
    )
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
          toast.success(`Update Status ${value.message}`);
          this.getTicketReports(order, page);
        },
        error: (err: IUpdateTicket) => {
          if (err !== null) {
            toast.error(err.message);
            this.errMess.next(err.message);
            console.error('Something went wrong', err);
          }
        },
      });
  }
}
