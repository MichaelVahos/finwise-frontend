import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  email: string = '';
  rol: string = '';

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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las nuevas contraseñas no coinciden'
      });
      return;
    }

    this.userService.cambiarPassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          text: res?.mensaje ?? 'Se actualizó correctamente.'
        });
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        let mensaje = 'Error inesperado. Intenta más tarde.';

        if (typeof err.error === 'string') {
          mensaje = err.error;
        } else if (err.status === 403) {
          mensaje = 'Contraseña actual incorrecta.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: mensaje
        });
      }
    });
  }
}
