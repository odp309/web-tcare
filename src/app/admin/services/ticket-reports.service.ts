import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../shared/services/api-service.service';
import { ITicketReports } from '../../shared/types/ticketReport';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import Cookies from 'js-cookie';
import { toast } from 'ngx-sonner';

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
      `private/admin/ticket-reports?sort_by=createdAt&order=${order}&page=1&limit=9${queryParams}`,
      this.token
    )
      .pipe(
        catchError((e) => {
          this.isLoading.next(false);
          console.log(e.error);
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
          this.getTicketReports('desc');
        },
        error: (err: any) => {
          console.error('Something went wrong', err);
        },
      });
  }
}
