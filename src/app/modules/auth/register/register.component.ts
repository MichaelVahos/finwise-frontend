import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  submitted = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.submitted = true;

    if (!this.username || !this.email || !this.password || this.password.length < 6) {
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: res => console.log('Registro exitoso:', res),
      error: err => console.error('Error:', err)
    });
  }
}