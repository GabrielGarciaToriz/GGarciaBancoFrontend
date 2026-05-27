import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, Result } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<Result<LoginResponse>> {
    return this.http.post<Result<LoginResponse>>(`${this.apiUrl}/login`, request);
  }

  guardarSesion(usuario: LoginResponse): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerSesion(): LoginResponse | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  cerrarSesion(): void {
    localStorage.clear();
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('usuario');
  }
}