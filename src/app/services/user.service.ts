import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/usuarios'; 

  constructor(private http: HttpClient) {}

  getPerfil() {
    return this.http.get<any>(`${this.baseUrl}/perfil`);
  }
  cambiarPassword(payload: { currentPassword: string; newPassword: string }) {
    return this.http.put<{ mensaje: string }>('http://localhost:8080/api/usuarios/password', payload);
  }
  
  
}
