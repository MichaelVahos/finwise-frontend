import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../services/report.service';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';


import { ChartOptions, ChartType, ChartData } from 'chart.js';


@Component({
  selector: 'app-resumen-mensual',
  standalone: true,
  imports: [FormsModule, CommonModule, NgChartsModule],
  templateUrl: './resumen-mensual.component.html',
  styleUrls: ['./resumen-mensual.component.css']
})
export class ResumenMensualComponent implements OnInit {
  totalIngresos = 0;
  totalGastos = 0;
  balance = 0;

  mes: number = new Date().getMonth() + 1;
  anio: number = new Date().getFullYear();

  meses = [
    { numero: 1, nombre: 'Enero' },
    { numero: 2, nombre: 'Febrero' },
    { numero: 3, nombre: 'Marzo' },
    { numero: 4, nombre: 'Abril' },
    { numero: 5, nombre: 'Mayo' },
    { numero: 6, nombre: 'Junio' },
    { numero: 7, nombre: 'Julio' },
    { numero: 8, nombre: 'Agosto' },
    { numero: 9, nombre: 'Septiembre' },
    { numero: 10, nombre: 'Octubre' },
    { numero: 11, nombre: 'Noviembre' },
    { numero: 12, nombre: 'Diciembre' }
  ];

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Resumen visual de ingresos, gastos y balance'
      }
    }
  };

  chartData: ChartData<'bar'> = {
    labels: ['Ingresos', 'Gastos', 'Balance'],
    datasets: [
      {
        label: '€',
        data: [0, 0, 0],
        backgroundColor: ['#198754', '#dc3545', '#0d6efd']
      }
    ]
  };

  chartType: ChartType = 'bar';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.reportService.getResumenMensual(this.mes, this.anio).subscribe({
      next: (data) => {
        this.totalIngresos = data.totalIngresos;
        this.totalGastos = data.totalGastos;
        this.balance = data.balance;
  
        this.chartData = {
          labels: ['Ingresos', 'Gastos', 'Balance'],
          datasets: [
            {
              label: '€',
              data: [this.totalIngresos, this.totalGastos, this.balance],
              backgroundColor: ['#198754', '#dc3545', '#0d6efd']
            }
          ]
        };
      },
      error: (err) => {
        console.error('Error al cargar resumen', err);
      }
    });
  }
  
}