import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../shared/services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IResponse } from '../../shared/types/response';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

interface ILogin extends IResponse {
  result: {
    accessToken: string;
    token: string;
  } | null;
}

type TLoginBody = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiServiceService {
  constructor(http: HttpClient, private cookieService: CookieService) {
    super(http);
  }

  message: BehaviorSubject<string> = new BehaviorSubject('');
  message$: Observable<string> = this.message;

  getMessage() {
    return this.message$;
  }

  login(body: TLoginBody) {
    this.post<ILogin, TLoginBody>('public/auth/login', body)
      .pipe(
        catchError((e) => {
          throw e.error;
        })
      )
      .subscribe({
        next: (value) => {
          this.message.next(value.message);
          if (value.result) {
            console.log(value.result);
            this.cookieService.set('token', value.result.accessToken);
            this.cookieService.set('refreshToken', value.result.token);
            toast.success(value.message);
            return;
          }
        },
        error: (err: ILogin) => {
          console.log('Login failed', err);
          this.message.next(err.message);
          toast.error(err.message);
        },
      });
  }
}
