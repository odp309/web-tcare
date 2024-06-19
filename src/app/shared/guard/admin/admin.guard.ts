import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Cookies from 'js-cookie';

export const adminGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const role = Cookies.get('role');

  if (role !== 'admin') {
    router.navigate(['auth/login']);
    return false;
  }
  return true;
};
