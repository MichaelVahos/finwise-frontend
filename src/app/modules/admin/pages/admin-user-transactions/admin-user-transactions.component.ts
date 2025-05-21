import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-transactions.component.html',
  styleUrls: ['./admin-user-transactions.component.css']
})
export class AdminUserTransactionsComponent implements OnInit {
  transacciones: any[] = [];
  usuarioId: number | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioId = +id;
      this.cargarTransacciones(this.usuarioId);
    }
  }

  cargarTransacciones(id: number): void {
    const token = localStorage.getItem('token');

    this.http.get<any[]>(`http://localhost:8080/api/admin/usuarios/${id}/transacciones`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.transacciones = data,
      error: err => {
        console.error(err);
        alert('❌ Error al cargar transacciones del usuario');
      }
    });
  }
}
