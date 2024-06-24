import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service.service';
import Cookies from 'js-cookie';
import {
  IFeedbackTicket,
  ITicketDetail,
  ITrackStatus,
} from '../../../shared/types/ticketReport';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { toast } from 'ngx-sonner';
import { TokenService } from '../../../shared/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class DetailTicketService extends ApiServiceService {
  constructor(http: HttpClient, private tokenService: TokenService) {
    super(http);
  }

  private token = Cookies.get('token');

  private detailTicketData: BehaviorSubject<ITicketDetail> =
    new BehaviorSubject({} as ITicketDetail);
  private detailTicketData$: Observable<ITicketDetail> = this.detailTicketData;

  private trackStatusData: BehaviorSubject<ITrackStatus> = new BehaviorSubject(
    {} as ITrackStatus
  );
  private trackStatusData$: Observable<ITrackStatus> = this.trackStatusData;

  private feedbackData: BehaviorSubject<IFeedbackTicket> = new BehaviorSubject(
    {} as IFeedbackTicket
  );
  private feedbackData$: Observable<IFeedbackTicket> = this.feedbackData;

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isLoading$: Observable<boolean> = this.isLoading;

  getDetailTicket(ticketNumber: string) {
    this.tokenService.ifTokenExpired();
    this.isLoading.next(true);
    this.get<ITicketDetail>(
      `private/admin/ticket-reports/${ticketNumber}/reporter-detail`,
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
          this.detailTicketData.next(value);
        },
        error: (err: ITicketDetail) => {
          if (err !== null) {
            toast.error(err.message);
            console.error('Something went wrong', err);
          }
        },
      });
  }

  getTrackStatusData(id: number) {
    this.tokenService.ifTokenExpired();
    this.isLoading.next(true);
    this.get<ITrackStatus>(
      `admin/ticket-reports/${id}/track-report-status`,
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
          this.trackStatusData.next(value);
        },
        error: (err: ITicketDetail) => {
          if (err !== null) {
            toast.error(err.message);
            console.error('Something went wrong', err);
          }
        },
      });
  }

  getFeedback(id: number) {
    this.tokenService.ifTokenExpired();
    this.isLoading.next(true);
    this.get<IFeedbackTicket>(
      `private/admin/ticket-reports/${id}/feedback`,
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
          this.feedbackData.next(value);
        },
        error: (err: IFeedbackTicket) => {
          if (err !== null) {
            toast.error(err.message);
            console.error('Something went wrong', err);
          }
        },
      });
  }

  getObsvFeedbackData() {
    return this.feedbackData$;
  }

  getObsvTrackData() {
    return this.trackStatusData$;
  }

  getObsvData() {
    return this.detailTicketData$;
  }

  getObsvLoading() {
    return this.isLoading$;
  }
}
