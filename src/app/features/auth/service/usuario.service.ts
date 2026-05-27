import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RegisterRequest, RegisterResponse } from '../models/register.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUsuario = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) {}

  registrarUsuario(request: RegisterRequest): Observable<Result<RegisterResponse>> {
    return this.http.post<Result<RegisterResponse>>(this.apiUsuario, request);
  }

}