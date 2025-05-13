import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IaService {

  private apiUrl = 'http://localhost:8080/api/ia';

  constructor(private http: HttpClient) {}

  obtenerSugerencia(mes: number, anio: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/sugerencia?mes=${mes}&anio=${anio}`, {
      responseType: 'text'
    });
  }

  obtenerResumen(mes: number, anio: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/resumen?mes=${mes}&anio=${anio}`, {
      responseType: 'text'
    });
  }
  
}
