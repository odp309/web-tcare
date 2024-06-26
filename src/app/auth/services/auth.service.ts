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
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { IAuth, TLoginBody, TLoginResult } from '../../shared/types/auth';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from '../../shared/services/token.service';
import path from 'path';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiServiceService {
  constructor(
    http: HttpClient,
    private router: Router,
    private tokenService: TokenService
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
    this.tokenService.ifTokenExpired();
    if (!this.isLoading) {
      this.isLoading = true;
      this.post<IAuth, TLoginBody>('public/auth/login', body)
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
              const loginRes: TLoginResult = value.result as TLoginResult;
              Cookies.set('token', loginRes.accessToken);
              Cookies.set(
                'role',
                jwtDecode<{ role: string }>(loginRes.accessToken).role
              );
              Cookies.set('refreshToken', loginRes.token);
              toast.success(value.message);
              this.router.navigate(['/admin/dashboard'], {
                replaceUrl: true,
              });
              return;
            }
          },
          error: (err: IAuth) => {
            this.message.next(err.message);
            toast.error(err.message);
            console.error('Login failed', err);
          },
        });
    }
  }

  logout() {
    const token = Cookies.get('token');
    this.tokenService.ifTokenExpired();
    this.post<IAuth, {}>('public/auth/logout', {}, token)
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
          Cookies.remove('token');
          Cookies.remove('refreshToken');
          Cookies.remove('role');
          toast.success('Logout successfull');
          this.router.navigate(['/auth/login'], {
            replaceUrl: true,
          });
        },
        error: (err: IAuth) => {
          this.message.next(err.message);
          toast.error(err.message);
          console.error('Login failed', err);
        },
      });
  }
}
