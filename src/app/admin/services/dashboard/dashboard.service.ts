import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { IReportReopened } from '../../../shared/types/dashboard';
import moment from 'moment';
import Cookies from 'js-cookie';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends ApiServiceService {
  constructor(http: HttpClient) {
    super(http);
  }

  private data: BehaviorSubject<any> = new BehaviorSubject({});
  private data$: Observable<any> = this.data;
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

  getReportStats(
    endpoint: string,
    filterBy?: string[],
    filterQuery?: string[]
  ) {
    this.isLoading.next(true);
    if (this.token) {
      const month = moment(new Date()).locale('en').format('MMMM');
      let queryParams = '';
      if (filterBy && filterQuery) {
        for (let i = 0; i < filterBy.length; i++) {
          queryParams += `&${filterBy[i]}=${filterQuery[i]}`;
        }
      }
      const key = endpoint.split('-').join('_');

      this.get<any>(
        `private/admin/reports-stats/${endpoint}?month=${month}${queryParams}`,
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
            this.data.next({
              ...this.data.getValue(),
              [key]: value.result,
            });
          },
          error: (err: any) => {
            if (err !== null) {
              toast.error(err.message);
              this.errMess.next(err.message);
              console.error('Something went wrong', err);
            }
          },
        });
    }
  }
}
