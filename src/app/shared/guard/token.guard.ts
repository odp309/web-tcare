import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';

export const tokenGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  tokenService.ifTokenExpired();
  return !tokenService.isTokenExpired();
};
