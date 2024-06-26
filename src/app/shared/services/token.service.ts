import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  isTokenExpired() {
    const token = Cookies.get('token');

    if (token) {
      const expiredDate = jwtDecode<{ exp: number }>(token).exp;

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
