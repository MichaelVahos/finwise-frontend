import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-categorias-grafico',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './categorias-grafico.component.html',
  styleUrls: ['./categorias-grafico.component.css']
})
export class CategoriasGraficoComponent implements OnInit {
  chartType: ChartType = 'doughnut';

  chartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        label: 'Total por categoría (€)',
        data: [],
        backgroundColor: []
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Distribución por categoría'
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    this.http.get<any[]>('http://localhost:8080/api/transacciones/reporte/categorias', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        const labels = data.map(item => item.categoria);
        const valores = data.map(item => item.total);
        const colores = data.map(() => this.colorAleatorio());

        // ⚠️ Aquí forzamos que Angular lo detecte como nuevo objeto
        this.chartData = {
          labels,
          datasets: [{
            label: 'Total por categoría (€)',
            data: valores,
            backgroundColor: colores
          }]
        };
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });
  }

  private colorAleatorio(): string {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgb(${r}, ${g}, ${b})`;
  }
}