import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FooterComponent } from '../../../components/footer.component'; 

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isAdmin: boolean = false;
  username: string | null = '';
  resumen = { ingresos: 0, gastos: 0 };
  categoriaTop: { categoria: string, total: number } = { categoria: 'Sin datos', total: 0 };
  ultimas: any[] = [];
/*
  accesos = [
    {
      titulo: 'Registrar Transacciones',
      descripcion: 'Agrega tus ingresos y gastos de forma rápida y segura.',
      ruta: '/transactions/nueva'
    },
    {
      titulo: 'Ver Transacciones',
      descripcion: 'Consulta, edita o elimina tus ingresos y gastos.',
      ruta: '/transactions/lista'
    },
    {
      titulo: 'Reporte Mensual',
      descripcion: 'Visualiza ingresos, gastos y balance mensual.',
      ruta: '/resumen-mensual'
    },
    {
      titulo: 'Categorías',
      descripcion: 'Consulta tus gastos agrupados con gráficas.',
      ruta: '/reports/categorias'
    },
    {
      titulo: 'IA Sugerencias',
      descripcion: 'Resuelve dudas, recibe análisis y recomendaciones financieras.',
      ruta: '/ia/sugerencias'
    },
    {
      titulo: 'Historial de IA',
      descripcion: 'Consulta sugerencias generadas anteriormente.',
      ruta: '/ia/historial'
    },
    {
      titulo: 'Mi Perfil',
      descripcion: 'Revisa tus datos y cambia tu contraseña.',
      ruta: '/profile'
    }
  ];
*/
accesos = [
  {
    titulo: 'Registrar Transacciones',
    descripcion: 'Agrega tus ingresos y gastos de forma rápida y segura.',
    ruta: '/transactions/nueva',
    icono: 'bi bi-pencil-square'
  },
  {
    titulo: 'Ver Transacciones',
    descripcion: 'Consulta, edita o elimina tus ingresos y gastos.',
    ruta: '/transactions/lista',
    icono: 'bi bi-list-check'
  },
  {
    titulo: 'Reporte Mensual',
    descripcion: 'Visualiza ingresos, gastos y balance mensual.',
    ruta: '/resumen-mensual',
    icono: 'bi bi-calendar3'
  },
  {
    titulo: 'Categorías',
    descripcion: 'Consulta tus gastos agrupados con gráficas.',
    ruta: '/reports/categorias',
    icono: 'bi bi-pie-chart-fill'
  },
  {
    titulo: 'IA Sugerencias',
    descripcion: 'Resuelve dudas, recibe análisis y recomendaciones financieras.',
    ruta: '/ia/sugerencias',
    icono: 'bi bi-stars'
  },
  {
    titulo: 'Historial de IA',
    descripcion: 'Consulta sugerencias generadas anteriormente.',
    ruta: '/ia/historial',
    icono: 'bi bi-clock-history'
  },
  {
    titulo: 'Mi Perfil',
    descripcion: 'Revisa tus datos y cambia tu contraseña.',
    ruta: '/profile',
    icono: 'bi bi-person-circle'
  }
];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username = payload.sub;
      this.isAdmin = payload.authorities?.includes('ROLE_ADMIN') || false;
      this.cargarResumen(token);
      this.cargarCategoriaTop(token);
      this.cargarUltimas(token);
    }
  }

  irA(ruta: string) {
    if (this.router.url === ruta) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([ruta]);
      });
    } else {
      this.router.navigateByUrl(ruta);
    }
  }

  private cargarResumen(token: string) {
    this.http.get<any>('http://localhost:8080/api/transacciones/resumen/actual', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.resumen = data,
      error: err => console.error('Error al cargar resumen', err)
    });
  }

  private cargarCategoriaTop(token: string) {
    this.http.get<any>('http://localhost:8080/api/transacciones/categoria-top', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.categoriaTop = data,
      error: err => console.error('Error al cargar categoría top', err)
    });
  }

  private cargarUltimas(token: string) {
    this.http.get<any[]>('http://localhost:8080/api/transacciones/ultimas', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.ultimas = data,
      error: err => console.error('Error al cargar últimas transacciones', err)
    });
  }
}
