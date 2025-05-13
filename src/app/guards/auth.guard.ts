import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }


  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos

    if (payload.exp && payload.exp < now) {
      localStorage.removeItem('token');
      router.navigate(['/auth/login']);
      return false;
    }
  } catch (e) {
    localStorage.removeItem('token');
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
