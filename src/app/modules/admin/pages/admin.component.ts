import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminUsersComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('http://localhost:8080/api/admin/usuarios', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.usuarios = data,
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
      }
    });
  }

  cambiarRol(usuario: any): void {
    const token = localStorage.getItem('token');
    const nuevoRol = usuario.rol === 'ADMIN' ? 'USER' : 'ADMIN';

    this.http.put(
      `http://localhost:8080/api/usuarios/${usuario.id}/rol`,
      { nuevoRol },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'text'
      }
    ).subscribe({
      next: () => {
        Swal.fire('Rol actualizado', `El rol del usuario ${usuario.username} ha sido cambiado.`, 'success');
        this.cargarUsuarios();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cambiar el rol.', 'error');
      }
    });
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        this.http.delete(`http://localhost:8080/api/admin/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Usuario eliminado exitosamente.', 'success');
            this.cargarUsuarios();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        });
      }
    });
  }

  verTransacciones(usuarioId: number): void {
    this.router.navigate(['/transactions/admin', usuarioId]);
  }
}
