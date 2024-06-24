import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  token = Cookies.get('token');

  isTokenExpired() {
    if (this.token) {
      const expiredDate = jwtDecode<{ exp: number }>(this.token).exp;

      return expiredDate < Date.now() / 1000;
    }
    return false;
  }

  ifTokenExpired() {
    if (this.isTokenExpired()) {
      Cookies.remove('token');
      Cookies.remove('role');
      Cookies.remove('refreshToken');
      localStorage.clear();
      return;
    }
  }
}
