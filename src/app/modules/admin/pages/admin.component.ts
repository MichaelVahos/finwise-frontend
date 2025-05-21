import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
      error: () => alert('❌ Error al cargar usuarios')
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
      alert('✅ Rol actualizado');
      this.cargarUsuarios();
    },
    error: (err) => {
      console.error(err);
      alert('❌ Error al cambiar rol');
    }
  });
}


  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    const token = localStorage.getItem('token');
    this.http.delete(`http://localhost:8080/api/admin/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        alert('✅ Usuario eliminado');
        this.cargarUsuarios();
      },
      error: () => alert('❌ Error al eliminar usuario')
    });
  }

  verTransacciones(usuarioId: number): void {
  this.router.navigate(['/transactions/admin', usuarioId]);
}


}
