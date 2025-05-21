import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  submitted = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.submitted = true;

    if (!this.username || !this.email || this.password.length < 6) {
      return;
    }

    this.http.post('http://localhost:8080/api/auth/register', {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Ahora puedes iniciar sesión',
          confirmButtonText: 'Ir a login'
        }).then(() => {
          this.router.navigate(['/auth/login']);
        });

        this.username = '';
        this.email = '';
        this.password = '';
        this.submitted = false;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: err.error || 'Revisa los datos e inténtalo de nuevo'
        });
      }
    });
  }
}
