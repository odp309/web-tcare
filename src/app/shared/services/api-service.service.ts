import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

type THeaders = {
  'Content-Type'?: string;
  Authorization?: string;
};

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  protected post<TResult, TBody>(
    endpoint: string,
    body?: TBody,
    token?: string
  ) {
    let headers: THeaders = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return this.http.post<TResult>(
      `${environment.apiBaseUrl}/${endpoint}`,
      body ? body : {},
      {
        headers: headers,
      }
    );
  }

  protected get<T>(endpoint: string, token?: string) {
    let headers: THeaders = {};
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return this.http.get<T>(`${environment.apiBaseUrl}/${endpoint}`, {
      headers: headers,
    });
  }

  protected put<TResult, TBody>(
    endpoint: string,
    body?: TBody,
    token?: string
  ) {
    let headers: THeaders = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return this.http.put<TResult>(
      `${environment.apiBaseUrl}/${endpoint}`,
      body,
      {
        headers: headers,
      }
    );
  }

  protected patch<TResult, TBody>(
    endpoint: string,
    body?: TBody,
    token?: string
  ) {
    let headers: THeaders = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return this.http.patch<TResult>(
      `${environment.apiBaseUrl}/${endpoint}`,
      body,
      {
        headers: headers,
      }
    );
  }
}
