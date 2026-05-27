import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BancoResponse } from '../models/banco.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private readonly apiBanco = 'http://localhost:8080/api/catalogo';

  constructor(private http: HttpClient) {}

  obtenerBancos(): Observable<Result<BancoResponse>> {
    return this.http.get<Result<BancoResponse>>(`${this.apiBanco}/banco`);
  }

}