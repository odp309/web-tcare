import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../shared/services/api-service.service';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  debounceTime,
  finalize,
} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IResponse } from '../../shared/types/response';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

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
  constructor(
    http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    super(http);
  }

  message: BehaviorSubject<string> = new BehaviorSubject('');
  message$: Observable<string> = this.message;
  isLoading = false;

  getMessage() {
    return this.message$;
  }

  login(body: TLoginBody) {
    console.log(this.isLoading);
    if (!this.isLoading) {
      this.isLoading = true;
      this.post<ILogin, TLoginBody>('public/auth/login', body)
        .pipe(
          catchError((e) => {
            this.isLoading = false;
            throw e.error;
          }),
          finalize(() => {
            this.isLoading = false;
          }),
          debounceTime(1000)
        )
        .subscribe({
          next: (value) => {
            this.message.next(value.message);
            if (value.result) {
              this.cookieService.set('token', value.result.accessToken);
              this.cookieService.set('refreshToken', value.result.token);
              toast.success(value.message);
              setTimeout(() => {
                this.router.navigate(['/admin/dashboard'], {
                  replaceUrl: true,
                });
              }, 1000);
              return;
            }
          },
          error: (err: ILogin) => {
            this.message.next(err.message);
            toast.error(err.message);
            console.log('Login failed', err);
          },
          complete: () => {
            console.log('finish');
          },
        });
    }
  }
}
