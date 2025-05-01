import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload.authorities || [];
      const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos

      // Verifica expiración del token
      if (payload.exp && payload.exp < now) {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
        return false;
      }

      const expectedRole = next.data['role'];
      if (roles.includes(expectedRole)) {
        return true;
      }

      this.router.navigate(['/unauthorized']);
      return false;

    } catch (e) {
      // Error al decodificar el token
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
