import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        localStorage.setItem('token', res.token); // Guarda el token
        this.router.navigate(['/dashboard']);     // Redirige al dashboard
      },
      error: (err) => {
        this.error = 'Credenciales inválidas';
        console.error('Error de login:', err);
      },
    });
  }
}