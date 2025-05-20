import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class RegisterTransactionComponent {
  transaccionEditando = this.transaccionBase();
  modoEdicion = false;

  categoriasGasto: string[] = [
    'Alimentación', 'Transporte', 'Vivienda', 'Salud', 'Educación', 'Entretenimiento', 'Otros'
  ];

  categoriasIngreso: string[] = [
    'Salario', 'Inversiones', 'Regalos', 'Venta', 'Otros'
  ];

  constructor(private http: HttpClient, private router: Router) {}

  get categorias(): string[] {
    return this.transaccionEditando.tipo === 'GASTO' ? this.categoriasGasto : this.categoriasIngreso;
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

  editarTransaccion(transaccion: any) {
    this.transaccionEditando = { ...transaccion };
    this.modoEdicion = true;
  }

  guardar(): void {
  const token = localStorage.getItem('token');
  const payload = {
    tipo: this.transaccionEditando.tipo,
    monto: this.transaccionEditando.monto,
    descripcion: this.transaccionEditando.descripcion,
    categoria: this.transaccionEditando.categoria,
    fecha: this.transaccionEditando.fecha
  };

  const url = this.modoEdicion
    ? `http://localhost:8080/api/transacciones/${this.transaccionEditando.id}`
    : 'http://localhost:8080/api/transacciones';

  const method = this.modoEdicion ? 'put' : 'post';

  this.http.request(method, url, {
    body: payload,
    headers: { Authorization: `Bearer ${token}` },
  }).subscribe({
    next: (res) => {
      alert(this.modoEdicion ? '✅ Transacción actualizada' : '✅ Transacción registrada');
      this.modoEdicion = false;
      this.transaccionEditando = this.transaccionBase();
    },
    error: (err) => {
      console.error(err);
      alert('❌ Error al guardar');
    }
  });
}

irALista(): void {
  this.router.navigate(['/transactions/lista']);
}

}