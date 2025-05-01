import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8080/api/transacciones';

  constructor(private http: HttpClient) {}

  getResumenMensual(mes: number, anio: number): Observable<{
    totalIngresos: number;
    totalGastos: number;
    balance: number;
  }> {
    return this.http.get<{
      totalIngresos: number;
      totalGastos: number;
      balance: number;
    }>(`${this.baseUrl}/reporte/resumen?mes=${mes}&anio=${anio}`);
  }
}
