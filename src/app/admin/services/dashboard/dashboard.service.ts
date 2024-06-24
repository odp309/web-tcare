import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { IReportReopened } from '../../../shared/types/dashboard';
import moment from 'moment';
import Cookies from 'js-cookie';
import { toast } from 'ngx-sonner';
import { TokenService } from '../../../shared/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends ApiServiceService {
  constructor(http: HttpClient, private tokenService: TokenService) {
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
    entity: string,
    filterBy?: string[],
    filterQuery?: string[],
    monthParams?: string
  ) {
    this.tokenService.ifTokenExpired();
    this.isLoading.next(true);
    if (this.token) {
      let month = monthParams;
      if (!month) {
        month = moment(new Date()).locale('en').format('MMMM');
      }
      let queryParams = '';
      if (filterBy && filterQuery) {
        for (let i = 0; i < filterBy.length; i++) {
          queryParams += `&${filterBy[i]}=${filterQuery[i]}`;
        }
      }
      const key = endpoint.split('-').join('_');

      this.get<any>(
        `private/admin/reports-stats/${endpoint}?filter=${entity}&month=${month}${queryParams}`,
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
              [key]: value,
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
