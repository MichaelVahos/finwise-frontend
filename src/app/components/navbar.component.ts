import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare const bootstrap: any; // para usar bootstrap.Collapse

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLargeScreen = window.innerWidth >= 992;

  @HostListener('window:resize')
  onResize() {
    this.isLargeScreen = window.innerWidth >= 992;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.authorities?.includes('ROLE_ADMIN');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }

  navigateAndClose(path: string): void {
    this.router.navigate([path]);
    if (!this.isLargeScreen) {
      const navbarCollapse = document.getElementById('navbarContent');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    }
  }
}
