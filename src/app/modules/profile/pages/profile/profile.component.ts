import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Datos del perfil
  username: string = '';
  email: string = '';
  rol: string = '';

  // Formulario de cambio de contraseña
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getPerfil().subscribe({
      next: (data) => {
        this.username = data.username;
        this.email = data.email;
        this.rol = data.rol;
      },
      error: (err) => {
        console.error('Error al cargar perfil', err);
      }
    });
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }

    this.userService.cambiarPassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (res) => {
        alert('✅ ' + (res?.mensaje ?? 'Contraseña actualizada exitosamente'));
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        if (typeof err.error === 'string') {
          alert('Error al actualizar la contraseña: ' + err.error);
        } else if (err.status === 403) {
          alert('Contraseña actual incorrecta.');
        } else {
          alert('Error inesperado. Intenta más tarde.');
        }
      }
    });
  }
}
