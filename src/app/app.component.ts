import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'finwise-frontend';

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isAdmin = payload.authorities?.includes('ROLE_ADMIN');
        if (isAdmin) {
          document.body.classList.add('admin-mode');
        } else {
          document.body.classList.remove('admin-mode');
        }
      } catch (e) {
        console.error('Error al leer el token:', e);
        document.body.classList.remove('admin-mode');
      }
    } else {
      document.body.classList.remove('admin-mode');
    }
  }
}
