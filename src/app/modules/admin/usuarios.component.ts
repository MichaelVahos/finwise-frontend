import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  cargando = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.cargando = true;
    const token = localStorage.getItem('token');

    this.http.get<any[]>('http://localhost:8080/api/admin/usuarios', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.usuarios = res;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
      }
    });
  }

  cambiarRol(id: number, nuevoRol: string): void {
    const token = localStorage.getItem('token');
    this.http.put(`http://localhost:8080/api/admin/usuarios/${id}/rol`, { rol: nuevoRol }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        Swal.fire('Rol actualizado', 'El rol del usuario fue cambiado correctamente.', 'success');
        this.obtenerUsuarios();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cambiar el rol del usuario.', 'error');
      }
    });
  }

  eliminarUsuario(id: number): void {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer.',
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
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
            this.obtenerUsuarios();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        });
      }
    });
  }
}
