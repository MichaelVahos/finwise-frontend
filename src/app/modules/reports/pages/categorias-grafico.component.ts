import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { IaService } from '../../../services/ia.service';

@Component({
  selector: 'app-categorias-grafico',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FormsModule],
  templateUrl: './categorias-grafico.component.html',
  styleUrls: ['./categorias-grafico.component.css']
})
export class CategoriasGraficoComponent implements OnInit {
  chartType: ChartType = 'doughnut';

  chartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      label: 'Total por categoría (€)',
      data: [],
      backgroundColor: []
    }]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Distribución por categoría' }
    }
  };

  mes: number = new Date().getMonth() + 1;
  anio: number = new Date().getFullYear();
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  anios: number[] = [];

  tablaResumen: { tipo: string, categoria: string, total: number, porcentaje: number }[] = [];
  sugerencia: string = '';
  cargando: boolean = false;

  constructor(private http: HttpClient, private iaService: IaService) {}

  ngOnInit(): void {
    const actual = new Date().getFullYear();
    for (let y = 2023; y <= actual; y++) {
      this.anios.push(y);
    }

    this.cargarDatos();
  }

  cargarDatos(): void {
    const token = localStorage.getItem('token');

    this.http.get<any[]>(`http://localhost:8080/api/transacciones/reporte/categorias`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        const totalGeneral = data.reduce((sum, item) => sum + item.total, 0);

        this.tablaResumen = data.map(item => ({
          tipo: item.tipo,
          categoria: item.categoria,
          total: item.total,
          porcentaje: totalGeneral > 0 ? (item.total / totalGeneral) * 100 : 0
        }));

        this.chartData = {
          labels: data.map(item => `${item.tipo}: ${item.categoria}`),
          datasets: [{
            label: 'Total por categoría (€)',
            data: data.map(item => item.total),
            backgroundColor: data.map(() => this.colorAleatorio())
          }]
        };
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });
  }

  obtenerSugerencia(): void {
    this.cargando = true;
    this.sugerencia = '';

    this.iaService.obtenerSugerencia(this.mes, this.anio).subscribe({
      next: (res) => {
        this.sugerencia = res;
        this.cargando = false;
      },
      error: () => {
        this.sugerencia = 'Error al obtener sugerencia.';
        this.cargando = false;
      }
    });
  }

  exportarPDF(): void {
    const token = localStorage.getItem('token');
    this.http.get(`http://localhost:8080/api/transacciones/reporte/pdf?mes=${this.mes}&anio=${this.anio}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    }).subscribe({
      next: (blob) => this.descargarArchivo(blob, `categorias_${this.mes}_${this.anio}.pdf`),
      error: () => alert('Error al generar PDF')
    });
  }

  exportarExcel(): void {
    const token = localStorage.getItem('token');
    this.http.get(`http://localhost:8080/api/transacciones/reporte/excel?mes=${this.mes}&anio=${this.anio}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    }).subscribe({
      next: (blob) => this.descargarArchivo(blob, `categorias_${this.mes}_${this.anio}.xlsx`),
      error: () => alert('Error al generar Excel')
    });
  }

  private descargarArchivo(blob: Blob, nombre: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private colorAleatorio(): string {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
