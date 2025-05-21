import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
      error: (err) => {
        alert('❌ Error al cargar usuarios');
        this.cargando = false;
      }
    });
  }

  cambiarRol(id: number, nuevoRol: string): void {
    const token = localStorage.getItem('token');
    this.http.put(`http://localhost:8080/api/admin/usuarios/${id}/rol`, { rol: nuevoRol }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        alert('✅ Rol actualizado');
        this.obtenerUsuarios();
      },
      error: () => alert('❌ Error al cambiar rol')
    });
  }

  eliminarUsuario(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    const token = localStorage.getItem('token');
    this.http.delete(`http://localhost:8080/api/admin/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        alert('🗑️ Usuario eliminado');
        this.obtenerUsuarios();
      },
      error: () => alert('❌ Error al eliminar usuario')
    });
  }
}
