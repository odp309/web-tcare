import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

type THeaders = {
  'Content-Type': string;
  Authorization?: string;
};

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  protected post<TResult, TBody>(
    endpoint: string,
    body: TBody,
    token?: string
  ) {
    let headers: THeaders = {
      'Content-Type': 'application/json',
    };
    if (token) {
      console.log('object', token);
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return this.http.post<TResult>(
      `${environment.apiBaseUrl}/${endpoint}`,
      body,
      {
        headers: headers,
      }
    );
  }
}
