import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthServiceService } from './app/authService/auth-service.service';

export const adminGuardGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  let isAdmin = await authService.isAdmin()
  if (isAdmin) {
      return true;
  }
  return router.parseUrl('');
};
export const pasSousFifreGuardGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  let isAdmin = await authService.isNonSousFifre()
  if (isAdmin) {
      return true;
  }
  return router.parseUrl('');
};
export const sousFifreGuardGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  let isAdmin = await authService.isSousFifre()
  if (isAdmin) {
      return true;
  }
  return router.parseUrl('');
};

