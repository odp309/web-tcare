import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Cookies from 'js-cookie';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  // if (!token || role !== 'admin') {
  //   router.navigate(['auth/login'], { replaceUrl: true });
  //   return false;
  // }

  if (token && role === 'admin') {
    router.navigate(['admin/dashboard'], { replaceUrl: true });
    return false;
  }
  return true;
};
