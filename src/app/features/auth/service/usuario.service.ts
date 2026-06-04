import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RegisterRequest, RegisterResponse } from '../models/register.model';
import { Result } from '../models/result.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUsuario = environment.apiUrl + '/usuario';

  constructor(private readonly http: HttpClient) { }

  registrarUsuario(request: RegisterRequest): Observable<Result<RegisterResponse>> {
    return this.http.post<Result<RegisterResponse>>(this.apiUsuario, request);
  }
  activarCuenta(token: string): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(
      `${this.apiUsuario}/activar`,
      {},
      { params: { token } }
    );
  }

  verificarEstatus(publicId: string): Observable<Result<boolean>> {
    return this.http.get<Result<boolean>>(`${this.apiUsuario}/estatus/${publicId}`);
  }

  reenviarActivacion(publicId: string): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(
      `${this.apiUsuario}/reenviar-activacion/${publicId}`,
      {}
    );
  }
}