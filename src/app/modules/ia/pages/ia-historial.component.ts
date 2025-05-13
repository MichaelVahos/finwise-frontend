import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ia-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ia-historial.component.html',
  styleUrls: ['./ia-historial.component.css']
})
export class IaHistorialComponent implements OnInit {
  historial: any[] = [];
  cargando = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.cargando = true;

    this.http.get<any[]>('http://localhost:8080/api/ia/historial', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.historial = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar historial', err);
        this.cargando = false;
      }
    });
  }
}
