import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../shared/services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

type TLogin = {
  statusCode: string;
  message: string;
  result: {
    accessToken: string;
    token: string;
  };
};

export type TLoginBody = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiServiceService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(body: TLoginBody) {
    this.post<TLogin, TLoginBody>('public/auth/login', body)
      .pipe(
        catchError((e) => {
          throw new String(e.statusText);
        })
      )
      .subscribe({
        next(value) {
          console.log('Login success', value);
        },
        error(err) {
          console.log('Login failed', err);
        },
        complete() {
          console.log('finish');
        },
      });
  }
}
