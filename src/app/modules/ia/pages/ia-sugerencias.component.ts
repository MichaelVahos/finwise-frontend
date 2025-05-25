// ia-sugerencias.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ia-sugerencias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ia-sugerencias.component.html',
  styleUrls: ['./ia-sugerencias.component.css']
})
export class IaSugerenciasComponent {
  tab: 'objetivo' | 'habitos' | 'pregunta' = 'objetivo';

  objetivo = '';
  pregunta = '';
  respuestaObjetivo = '';
  respuestaHabitos = '';
  respuestaPregunta = '';

  cargandoObjetivo = false;
  cargandoHabitos = false;
  cargandoPregunta = false;

  constructor(private http: HttpClient) {}

  enviarObjetivo() {
    const token = localStorage.getItem('token');
    if (!token || !this.objetivo.trim()) return;

    this.cargandoObjetivo = true;
    this.http.post<any>('http://localhost:8080/api/ia/objetivo', {
      descripcion: this.objetivo
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: res => this.respuestaObjetivo = res.respuesta,
      error: () => Swal.fire({ icon: 'error', title: 'Error al generar sugerencia' }),
      complete: () => this.cargandoObjetivo = false
    });
  }

  analizarHabitos() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.cargandoHabitos = true;
    this.http.get<any>('http://localhost:8080/api/ia/habitos', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: res => this.respuestaHabitos = res.respuesta,
      error: () => Swal.fire({ icon: 'error', title: 'Error al analizar hábitos' }),
      complete: () => this.cargandoHabitos = false
    });
  }

  enviarPregunta() {
    const token = localStorage.getItem('token');
    if (!token || !this.pregunta.trim()) return;

    this.cargandoPregunta = true;
    this.http.post<any>('http://localhost:8080/api/ia/preguntar', {
      pregunta: this.pregunta
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: res => this.respuestaPregunta = res.respuesta,
      error: () => Swal.fire({ icon: 'error', title: 'Error al procesar la pregunta' }),
      complete: () => this.cargandoPregunta = false
    });
  }
}