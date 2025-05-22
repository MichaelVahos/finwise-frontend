// list.component.ts actualizado
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  transacciones: any[] = [];
  mes: number = new Date().getMonth() + 1;
  anio: number = new Date().getFullYear();
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  anios: number[] = [];
  transaccionEditando: any = this.transaccionBase();
  modoEdicion = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const actual = new Date().getFullYear();
    for (let y = 2023; y <= actual; y++) {
      this.anios.push(y);
    }
    this.cargarTransacciones();
  }

  cargarTransacciones(): void {
    const token = localStorage.getItem('token');
    this.http.get<any[]>(`http://localhost:8080/api/transacciones?mes=${this.mes}&anio=${this.anio}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.transacciones = data,
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar transacciones',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  editarTransaccion(transaccion: any) {
    this.transaccionEditando = { ...transaccion };
    this.modoEdicion = true;
  }

  eliminarTransaccion(id: number) {
    const token = localStorage.getItem('token');
    this.http.delete(`http://localhost:8080/api/transacciones/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Transacción eliminada',
          timer: 1500,
          showConfirmButton: false
        });
        this.cargarTransacciones();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  guardarEdicion(): void {
    const token = localStorage.getItem('token');
    this.http.put(`http://localhost:8080/api/transacciones/${this.transaccionEditando.id}`, this.transaccionEditando, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Transacción actualizada',
          timer: 1500,
          showConfirmButton: false
        });
        this.modoEdicion = false;
        this.transaccionEditando = this.transaccionBase();
        this.cargarTransacciones();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  transaccionBase() {
    return {
      id: null,
      tipo: 'GASTO',
      monto: 0,
      descripcion: '',
      categoria: '',
      fecha: new Date().toISOString().split('T')[0]
    };
  }
}
