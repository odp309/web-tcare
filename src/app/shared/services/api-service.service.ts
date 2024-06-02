import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

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
    return this.http.post<TResult>(
      `${environment.apiBaseUrl}/${endpoint}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
